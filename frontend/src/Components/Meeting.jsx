import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {io} from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router';
import './Meeting.css';
import axios, { HttpStatusCode } from 'axios';
import VideoCall from './VideoCall.jsx';

export default function Meeting() {

  let [microphone, setMicrophone]= useState(true);
  let [camera, setCamera]= useState(true);
  let [screenSharing, setScreenShare]= useState(false);
  let [msgBox, setMsgBox]= useState(true);

  let socket= useRef();
  let navigate= useNavigate();
  let location= useLocation();

  useLayoutEffect(()=>{

    let meetingID=location.pathname.split('/')[2];
    console.log(meetingID);

    axios.post('http://localhost:8000/is-meeting-available', {meetingID}).then((response)=>{
      if(response.status== HttpStatusCode.Accepted) {
        console.log(response);
      }
   }).catch(e=>{
     alert(e.message);
     navigate('/meeting');
   })

  socket.current= io('http://localhost:3000', {
    withCredentials: true
  });

  return ()=>{
    socket.current.disconnect();
  }

  },[]);

  function LeaveMeeting () {
     socket.current.disconnect();
     navigate('/meeting');
  }

  return (
    <div className='mainDiv'>
    <VideoCall camera={camera} microphone={microphone}></VideoCall>

      <div className='controllers'>
        {camera? <i className="fa-solid fa-camera" onClick={()=>setCamera(false)}></i>: <i style={{color: 'gray'}} className="fa-solid fa-camera" onClick={()=>setCamera(true)}></i>}


        <i className="fa-solid fa-phone-slash" onClick={LeaveMeeting} style={{color: "red"}} ></i>


        {microphone?<i className="fa-solid fa-microphone-lines" onClick={()=>setMicrophone(false)}></i>:
        <i className="fa-solid fa-microphone-lines-slash" onClick={()=>setMicrophone(true)}></i> }
        {screenSharing?<i className="fa-solid fa-desktop" onClick={()=>setScreenShare(false)}></i>: <i style={{color: 'gray'}} className="fa-solid fa-desktop" onClick={()=>setScreenShare(true)}></i>}
        {msgBox? <i className="fa-solid fa-message" onClick={()=>setMsgBox(false)}></i>: <i style={{color: 'gray'}} className="fa-solid fa-message" onClick={()=>setMsgBox(true)}></i>}
      </div>
    </div>
  )
}
