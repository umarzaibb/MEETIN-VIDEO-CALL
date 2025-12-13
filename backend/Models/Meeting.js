const mongoose= require('mongoose');

let meetingSchema= new mongoose.Schema({
   meetingID: {
    type: String,
    required: true
   },

   admin : {
    type: ObjectId,
    required: true
   },

   s_time: {
    type: Date,
    required: true
   }
});

let Meeting= mongoose.model('Meeting', meetingSchema);

module.exports= Meeting;