const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema();

//create a schema 

const userSchema = new mongoose.Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String,
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    }
});


userSchema.pre('save', async function (next) {
    try {
        if(this.method !== 'local'){
            next();
        }

        const salt = await bcrypt.genSalt(10);

        const passwordHash = await bcrypt.hash(this.local.password, salt);

        this.local.password = passwordHash;

        next();

    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.local.password);
    } catch (error) {
       console.log(error);
    }
};

//create model
const User = mongoose.model('user', userSchema);


//export model
module.exports = User;