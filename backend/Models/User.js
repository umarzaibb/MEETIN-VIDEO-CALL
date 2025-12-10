const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const UserModel= new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:  {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    token_validation: {
        type: Date
    }
});

const User= mongoose.model('User', UserModel);

module.exports= User;