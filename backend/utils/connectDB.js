const mongoose= require('mongoose');

//Extract env
require('dotenv').config();

module.exports= async()=>{
   mongoose.connect(process.env.MONGODB_ACCESS)
   .then(
    console.log("~ Connection established with mongodb")
   );
}