const express= require('express');
const connectDB=require('./utils/connectDB.js');
const authenticationRoute= require('../backend/Routes/authenticationRoutes.js');
const cors= require('cors');


const app=express();
let port=8000;

//middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use("/", authenticationRoute);

app.listen(port, ()=>{
    console.log('----- Listening on port 8000 -----');
});


connectDB();
