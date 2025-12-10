const { randomUUID } = require('crypto');
const User= require('../Models/User.js');
const httpStatus= require('http-status').status;
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

//EXTRACTING_ENV
require('dotenv').config();

function getDate30DaysFromNow() {
  const now = new Date();
  now.setDate(now.getDate() + 30);
  return now;
}


async function Signup(req,res) {
    
    let {username, email, password}= req.body;

    //check if any form values are not filled
    if(!(username && email && password)) {
        res.status(httpStatus.BAD_REQUEST).json({
        message: 'Please provide username, email and password, One of them is missing!'
       });
       return;
    }

    //check if user already exists
    let isUserExist_username=await User.findOne({username});
    let isUserExist_email=await User.findOne({email});

    if(isUserExist_username || isUserExist_email) {
        res.status(httpStatus.BAD_REQUEST).json({
        message: 'Username or email already exists!'
       });
       return;
    }

    let hashedPassword=await bcrypt.hash(password, 10); //2nd parameter= salt rounds
    let newUser= new User({username, email , password: hashedPassword});
    newUser.save().then(
        res.status(httpStatus.CREATED).json({
            message: 'Congratulations! Your account has been created.'
        })
    ).catch((e)=>{
       return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        })
    });
}

async function Login(req,res) {

    let {username, password}= req.body;

    if(!(username && password)) {

       res.status(httpStatus.BAD_REQUEST).json({
        message: 'Please provide username, email and password, One of them is missing!'
       });
       return;

    }

    let user= await User.findOne({username});
    console.log(user);
    if(!user){
         res.status(httpStatus.BAD_REQUEST).json({
            'message': 'Incorrect username'
        });
    }
    let isPasswordCorrect= await bcrypt.compare(password, user.password);
    
    if(isPasswordCorrect) {
        let token= randomUUID();
        user.token=token;
        user.token_validation=getDate30DaysFromNow();
        user.save();

        let accessToken= jwt.sign({username: user.username}, process.env.SECRET_OF_JWT, {expiresIn: '0.25h'});

        console.log('access token= ',accessToken);
        res.status(httpStatus.ACCEPTED).json({
            'access_token': accessToken,
            'message': 'You have successfully logged in!'
        });
        return;
        }
}

module.exports= {Signup, Login};
