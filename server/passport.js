const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const { ExtractJwt } = require('passport-jwt');
const { SECRET_TOKEN } = require('./configuration/index');
const User = require('./models/users');

// Jwt Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: SECRET_TOKEN
},
    async (payload, done) => {
        try {
            // find user
            const user = await User.findById(payload.sub);
            // user doesn't exists
            if (!user) {
                return done(null, false);
            }
            // otherwise
            done(null, user);

        } catch (error) {
            done(error, false);
        }
    }))

//Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: '1032155726183-cho0muahlj8cja9itp9pgg32tmadib4f.apps.googleusercontent.com',
    clientSecret: 'LUTRmW8LbMlTKxt2D6MEsD0a'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // check whether current user is exists in our DB
        const existingUser = await User.findOne({ 'google.id': profile.id });

        if(existingUser){
            return done(null, existingUser);
        }


        const newUser = new User({
            method: 'google',
            google:{
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();

        done(null, newUser);

    } catch (error) {
        done(error, false, error.message);
    }
    
}));

// Facebook strategy
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: "394571935400991",
    clientSecret: "169bcc1ff24bb0950710d1345cafad63"
}, async (accessToken, refreshToken, profile, done) => {
    try {

        console.log("profile:", profile);
        console.log("accessToken:", accessToken);
        console.log("refreshToken:", refreshToken);
        // check whether current user is exists in our DB
        const existingUser = await User.findOne({ 'facebook.id': profile.id });

        if(existingUser){
            return done(null, existingUser);
        }


        const newUser = new User({
            method: 'facebook',
            facebook:{
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();

        done(null, newUser);

    } catch (error) {
        done(error, false, error.message);
    }
    
}));


//Loccal Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // find the user
        const user = await User.findOne({ "local.email": email });

        if (!user) {
            return done(null, false);
        }

        // // check the password is correct
        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
            return done(null, false);
        }

        done(null, user);

    } catch (error) {
        done(error, false);
    }
}))