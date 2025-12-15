import React, { useEffect, useRef } from "react";
import "./VideoCall.css";
import { useNavigate } from "react-router";

export default function VideoCall({props}) {

  let videoRef= useRef();
  let navigate= useNavigate();


 async function getUserPermission() {
      try {
        let UserCamera= await navigator.mediaDevices.getUserMedia({'video': true});
        if(UserCamera) {
         props.setCamera(true);
        }

        let UserAudio= await navigator.mediaDevices.getUserMedia({'audio': true});
        if(UserAudio) {
          props.setMicrophone(true);
        }

        if(UserCamera && UserCamera && !props.screenSharing) {
          let UserVideoCall= await navigator.mediaDevices.getUserMedia({'audio': props.microphone, 'video': props.camera});


          if(videoRef.current) {
            videoRef.current.srcObject= UserVideoCall;
          }
        }
       


      } catch (error) {
        console.log(error.message);
        navigate('/meeting');
      }
  }


  useEffect(()=>{
    getUserPermission();
  },[]);

  return (
    <>
      <div className="video-container">
        <div className="meeting-video-container">

          {/* Other participants' video boxes (scrollable) */}
          <div className="participants-video-boxes-container">
            {/* Other participants */}
            <div className="participant-video-box">
              <video id="participant-video" autoPlay muted></video>
            </div>
            <div className="participant-video-box">
              <video id="participant-video" autoPlay muted></video>
            </div>

           
            <div className="participant-video-box">
              <video id="participant-video" autoPlay muted></video>
            </div>

             <div className="participant-video-box">
              <video id="participant-video" autoPlay muted></video>
            </div>

             <div className="participant-video-box">
              <video id="participant-video" autoPlay muted></video>
            </div>

             <div className="participant-video-box">
              <video id="participant-video" autoPlay muted></video>
            </div>

             <div className="participant-video-box">
              <video id="participant-video" autoPlay muted></video>
            </div>

             <div className="participant-video-box">
              <video id="participant-video" autoPlay muted></video>
            </div>

             <div className="participant-video-box">
              <video id="participant-video" autoPlay muted></video>
            </div>
            
           
           
            {/* Add more participant video boxes here */}
          </div>
        </div>

        {props.camera ? (
          <div className="video-call-box">
            {/* Insert your video stream element here */}
            <video ref={videoRef} id="video" playsInline autoPlay></video>
          </div>
        ) : (
          <div className="camera-off-box">
            {/* Font Awesome Icon for User */}
            <i
              className="fa-solid fa-user-circle"
              style={{ fontSize: "4rem", color: "#4CAF50" }}
            ></i>

            {/* Username */}
            <p className="username">Username</p>

            {/* Message about camera being off */}
            <span className="camera-off-info">Your Camera is Off</span>
          </div>
        )}
      </div>
    </>
  );
}
