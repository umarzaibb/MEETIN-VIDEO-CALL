const mongoose= require('mongoose');

let meetingSchema= new mongoose.Schema({
   meetingID: {
    type: String,
    required: true,
    unique: true
   },

   admin : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
   },

   start_time: {
    type: Date,
    required: true
   }
});

let Meeting= mongoose.model('Meeting', meetingSchema);

module.exports= Meeting;