const JWT = require('jsonwebtoken');
const User = require('../models/users');
const { SECRET_TOKEN } = require('../configuration/index');

signToken = user => {
    return JWT.sign({
        iss: 'authenTest',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, SECRET_TOKEN);
}

module.exports = {
    signUp: async (req, res, next) => {

        const { email, password } = req.value.body;
        // check deplicate user
        const foundUser = await User.findOne({ "local.email": email });

        if (foundUser) {
            return res.status(403).json({ error: 'email is already in use' });
        }

        //create user to db
        const newUser = new User({ 
            method: 'local',
            local: {
                email: email, 
                password: password 
            }
        });
        await newUser.save();

        //create token
        const token = signToken(newUser);

        //return token
        res.status(200).json({ token });
    },

    signIn: async (req, res, next) => {
        // generate token
        const token = signToken(req.user);
        res.status(200).json({ token });
    },

    googleOAuth: async (req, res, next) => {
        // generate token

        const token = signToken(req.user);
        res.status(200).json({ token });
    },


    facebookOAuth: async (req, res, next) => {
        // generate token

        const token = signToken(req.user);
        res.status(200).json({ token });
    },


    secret: async (req, res, next) => {
        res.json({ secret: 'resource' });
    }
}