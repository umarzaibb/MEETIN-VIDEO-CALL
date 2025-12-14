const express= require('express');
const wrapAsync= require('../utils/wrapAsync.js');
const verifyUser=require('../Middlewares/verifyAccessToken.js');
const Meetings= require('../Controllers/MeetingHandler.js');

let router= express.Router();

router.post('/meeting',verifyUser,(req,res)=> wrapAsync(req,res,Meetings.RegisterMeeting) );

module.exports= router;