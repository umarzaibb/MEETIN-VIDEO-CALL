import React from 'react';
import './Meeting.css';

export default function Controls({
  audio,
  video,
  screenShare,
  setAudio,
  setVideo,
  setScreenShare,
  handleEndCall
}) {


const toggleAudio = () => {
  if (audio) {
    // turn audio OFF
    setAudio(false);
  } else {
    // turn audio ON → screen share must be OFF
    setAudio(true);
    setScreenShare(false);
  }
};

const toggleVideo = () => {
  if (video) {
    // turn video OFF
    setVideo(false);
  } else {
    // turn video ON → screen share must be OFF
    setVideo(true);
    setScreenShare(false);
  }
};

const toggleScreen = () => {
  if (screenShare) {
    // turn screen share OFF
    setScreenShare(false);
  } else {
    // turn screen share ON → audio & video must be OFF
    setScreenShare(true);
    setAudio(false);
    setVideo(false);
  }
};



  return (
    <div className="controllers">

      {/* Video */}
      <div className="control-item" onClick={toggleVideo}>
       <i
          className={`fa-solid fa-camera ${
            video ? 'active' : 'off'
          }`}
        ></i>
        <span className="tooltip">{video ? 'Camera On' : 'Camera Off'}</span>
      </div>

      {/* End Call */}
      <div className="control-item end">
        <i className="fa-solid fa-phone-slash" onClick={handleEndCall}></i>
        <span className="tooltip">End Call</span>
      </div>

      {/* Audio */}
      <div className="control-item" onClick={toggleAudio}>
        <i
          className={`fa-solid ${
            audio ? 'fa-microphone-lines' : 'fa-microphone-lines-slash'
          } ${audio ? 'active' : 'off'}`}
        ></i>
        <span className="tooltip">{audio ? 'Mic On' : 'Mic Off'}</span>
      </div>

      {/* Screen Share */}
      <div className="control-item" onClick={toggleScreen}>
        <i
          className={`fa-solid fa-desktop ${
            screenShare ? 'active' : 'off'
          }`}
        ></i>
        <span className="tooltip">
          {screenShare ? 'Stop Sharing' : 'Share Screen'}
        </span>
      </div>

      {/* Chat */}
      <div className="control-item">
        <i className="fa-solid fa-message"></i>
        <span className="tooltip">Chat</span>
      </div>

    </div>
  );
}
