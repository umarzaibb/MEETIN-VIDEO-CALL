const express= require('express');
const connectDB=require('./utils/connectDB.js');
const authenticationRoute= require('../backend/Routes/authenticationRoutes.js');
const meetingRoutes =require('./Routes/meetingRoutes.js');
const cors= require('cors');
const cookieParser= require('cookie-parser');


const corsOptions = {
  origin: 'http://localhost:5173',  // Allow only this origin
  credentials: true,                // Allow cookies and other credentials
};
const app=express();
let port=8000;

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/", meetingRoutes);
app.use("/user", authenticationRoute);

app.listen(port, ()=>{
    console.log('----- Listening on port 8000 -----');
});


connectDB();
