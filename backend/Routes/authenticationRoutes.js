const express= require('express');
const Authentication= require('../Controllers/Authentication.js');
const wrapAsync= require('../utils/wrapAsync.js');

let router= express.Router();

router.post('/signup',(req,res)=> wrapAsync(req,res,Authentication.Signup) );

router.post('/login',(req,res)=> wrapAsync(req,res,Authentication.Login) );

module.exports= router;