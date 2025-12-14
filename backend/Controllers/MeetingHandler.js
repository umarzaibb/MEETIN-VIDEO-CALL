const httpStatus= require('http-status').status;
const Meeting= require('../Models/Meeting.js');
const User= require('../Models/User.js');
const jwt= require('jsonwebtoken');

async function RegisterMeeting(req,res) {
    let {meetingID}= req.body;
    const authHeader = req.headers['authorization'];


  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: 'Request failed! Try to login again.'
    });
  }

  const access_token = authHeader.split(" ")[1];
    
    if(!meetingID) {
        return res.status(httpStatus.BAD_REQUEST).json({
          'message': 'Meeting ID is required!'
        });
    }

  let username=jwt.decode(access_token)?.username;
  console.log(username);

    let admin=await User.findOne({username});

    console.log(admin);

    if(!admin) {
        return res.status(httpStatus.BAD_REQUEST).json({
          'message': 'Error while creating meeting.'
        });
    }

    let my_meeting= new Meeting({meetingID, start_time: new Date(), admin });
    await my_meeting.save().then(()=>{
        return res.status(httpStatus.CREATED).json({
          'message': 'Meeting created successfully!'
        });
    }).catch((e)=> {
          return res.status(httpStatus.BAD_REQUEST).json({
          'message': e.message
        });
    })
}

async function IsMeetingAvailable( req, res ) {
  
   let {meetingID}= req.body; 

    if(!meetingID) {
        return res.status(httpStatus.BAD_REQUEST).json({
          'message': 'Meeting ID is required!'
        });
    }

    let meeting=await Meeting.findOne({meetingID});
     if(!meeting) {
        return res.status(httpStatus.BAD_REQUEST).json({
          'message': 'Meeting room is not created. Please try valid meeting ID'
        });
    }

    return res.status(httpStatus.ACCEPTED).json({
          'message': 'Successfully enterred meeting room. Enjoy!'
        });

}

module.exports= {RegisterMeeting, IsMeetingAvailable};