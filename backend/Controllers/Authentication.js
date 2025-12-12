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

// async function isAccessTokenValid(accessToken) {
//     let isValid=jwt.verify(accessToken, process.env.SECRET_OF_JWT);
// }


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

    if(!user){
        return res.status(httpStatus.BAD_REQUEST).json({
            'message': 'Incorrect username'
        });
    }
    let isPasswordCorrect= await bcrypt.compare(password, user.password);
    
    if(isPasswordCorrect) {
        let refresh_token= randomUUID();
        user.token=refresh_token;
        user.token_validation=getDate30DaysFromNow();
        user.save();

        // let accessToken= jwt.sign({username: user.username}, process.env.SECRET_OF_JWT, {expiresIn: '0.25h'});

        console.log(refresh_token);

        res.cookie('refresh_token', refresh_token, {expires: getDate30DaysFromNow() , httpOnly: true});

        res.status(httpStatus.ACCEPTED).json({
            'message': 'You have successfully logged in!'
        });
        return;
        }

        else{

             res.status(httpStatus.BAD_REQUEST).json({
            'message': 'Incorrect password'
        });

        }
}


async function getAccessToken(req, res) {
  const { refresh_token } = req.cookies;
  // Check if refresh token exists
  if (!refresh_token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: 'Refresh token is missing. Please login again.'
    });
  }

  try {
    // Find user by refresh token (ensure the find is awaited)
    const user = await User.findOne({ token:refresh_token });

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: 'Invalid refresh token. Please login again.'
      });
    }

    // Check if the refresh token has expired
    const currDate = new Date();
    if (user.token_validation < currDate) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: 'Session expired! Please login again.'
      });
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.SECRET_OF_JWT,
      { expiresIn: '0.25h' }
    );

    console.log('access_token = ', accessToken);

    // Return new access token in response
    return res.status(httpStatus.ACCEPTED).json({
      access_token: accessToken
    });
  } catch (error) {
    // General error handling (e.g., DB connection issues)
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while generating the access token.'
    });
  }
}


module.exports= {Signup, Login, getAccessToken};