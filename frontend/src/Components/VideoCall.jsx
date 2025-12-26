import React, { useEffect, useRef } from "react";
import "./VideoCall.css";

export default function VideoCall({localStream}) {


  return (
    <>
      <div className="video-container">
        <div className="meeting-video-container">

          {/* Other participants' video boxes (scrollable) */}
          <div className="participants-video-boxes-container">
            {/* Other participants */}
            <div className="participant-video-box">
             <div className={`audio-wave ${true ? "active" : ""}`}>
      {[...Array(5)].map((_, i) => (
        <span key={i}></span>
      ))}
    </div>
              {/* <video id="participant-video" autoPlay muted></video> */}
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

        
         <div className="video-call-box">
            {/* Insert your video stream element here */} 
            <video id="video" ref={localStream} playsInline autoPlay></video>
          </div>
       
       
          <div className="camera-off-box">
            {/* Font Awesome Icon for User */}
            {/* <i
              className="fa-solid fa-user-circle"
              style={{ fontSize: "4rem", color: "#4CAF50" }}
            ></i> */}

              <div className={`audio-wave ${true ? "active" : ""}`}>
      {[...Array(5)].map((_, i) => (
        <span key={i}></span>
      ))}
    </div>

            {/* Username */}
            <p className="username">Username</p>

            {/* Message about camera being off */}
            <span className="camera-off-info">Your Camera is Off</span>
          </div>
        
      </div>
    </>
  );
}
