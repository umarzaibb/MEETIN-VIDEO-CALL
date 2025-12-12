const express= require('express');
const Authentication= require('../Controllers/Authentication.js');
const wrapAsync= require('../utils/wrapAsync.js');
const { default: verifyAccessToken } = require('../Middlewares/verifyAccessToken.js');
const verifyUser=require('../Middlewares/verifyAccessToken.js');

let router= express.Router();

router.post('/signup',(req,res)=> wrapAsync(req,res,Authentication.Signup) );

router.post('/login',(req,res)=> wrapAsync(req,res,Authentication.Login) );

router.get('/get_access_token',(req,res)=> wrapAsync(req,res,Authentication.getAccessToken) );

router.post('/meeting',verifyUser,(req,res)=> wrapAsync(req,res,(req,res)=>{
    res.send('okayyyyyy');
}) );


module.exports= router;