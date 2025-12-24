import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router";
import "./Meeting.css";
import axios, { HttpStatusCode } from "axios";
import VideoCall from "./VideoCall.jsx";
import Controls from "./Controls.jsx";

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
let meetingID;

export default function Meeting() {
  let socketRef = useRef();
  let navigate = useNavigate();
  let [connectedUser, setConnectedUser] = useState({});
  let connectionRef = useRef({}); //{forID: connection}
  let queueICE = useRef({});
  let [audio, setAudio]= useState(false);
  let [video, setVideo] = useState(false);
  let [screenShare, setScreenShare]= useState(false);
  let localStream= useRef();

  async function getUserMedia() {
    if(audio && video) {
      navigator.mediaDevices.getUserMedia(
        {'audio': audio,
         'video' : video
        }
      ).then((res)=>{
        localStream.current=res;
      }).catch((err)=>{
        setAudio(false);
        setVideo(false);
      });
    }

    else if(audio) {
     navigator.mediaDevices.getUserMedia(
        {'audio': audio}
      ).then((res)=>{
        localStream.current=res;
      }).catch((err)=>{
        setAudio(false);
      });
    }

    else if(video) {
     navigator.mediaDevices.getUserMedia(
        {'video' : video}
      ).then((res)=>{
        localStream.current=res;
      }).catch((err)=>{
        setVideo(false);
      });
    }

    else if(screenShare) {
      navigator.mediaDevices.getDisplayMedia( )
      .then((res)=>{
        localStream.current=res;
      }).catch((err)=>{
        setScreenShare(false);
      });
    }
  }

  function setConfigurationWEBRTC(pc, targetID) {
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit("signal-ice-candidate", {
          ice: event.candidate,
          senderID: socketRef.current.id,
          receiverID: targetID,
        });
      }
    };

    pc.addEventListener("connectionstatechange", (event) => {
      if (pc.connectionState === "connected") {
        console.log("Webrtc connection created successfully....");
      }
    });
  }

  let createWebRTC_OFFER = async (USERS) => {
    let keysArray = Object.keys(USERS);
    if (keysArray.length <= 1) {
      return;
    }

    let lastUserID = keysArray[keysArray.length - 1];

    if (lastUserID === socketRef.current.id) {
      for (let i = 0; i < keysArray.length - 1; i++) {
        let targetID = keysArray[i];

        let condition =
           targetID != socketRef.current.id &&
          !connectionRef.current[targetID];

        if (condition) {
          let pc = new RTCPeerConnection(configuration);
           setConfigurationWEBRTC(pc, targetID);
            let dc = pc.createDataChannel("my-data-channel");

          dc.onopen = (event) => {
            console.log("Data channel successfully created...");
          };

          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socketRef.current.emit("signal-offer", {
            offer,
            senderID: socketRef.current.id,
            receiverID: targetID,
          });

          connectionRef.current[targetID] = pc;
          console.log(
            "PEER_CONNECTION = ",
            connectionRef.current[targetID]
          );
        }
      }
    }
  };

  useEffect(()=>{
    getUserMedia();
  }, [video, audio, screenShare]);

  useLayoutEffect(() => {
    meetingID = location.pathname.split("/")[2];

    axios
      .post("http://localhost:8000/is-meeting-available", { meetingID })
      .then((response) => {
        if (response.status != HttpStatusCode.Accepted) {
          navigate("/meeting");
        }
      })
      .catch((e) => {
        alert(e.message);
        navigate("/meeting");
      });

    socketRef.current = io("http://localhost:3000", {
      withCredentials: true,
    });

    socketRef.current.emit("join-meeting", {
      meetingID,
      username: localStorage.getItem("username"),
    });

    socketRef.current.on("get-connected-users", ({ allUsers }) => {
      createWebRTC_OFFER(allUsers);
      setConnectedUser({ ...allUsers });
    });

    socketRef.current.on("signal-ice-candidate", async ({ ice, senderID }) => {
      let pc=connectionRef.current[senderID];
      if (ice && pc) {
        if (!pc.remoteDescription) {
          queueICE.current[senderID].push(ice);
        } else {
          if (
            queueICE.current[senderID] &&
            queueICE.current[senderID].length > 0
          ) {
            console.log(
              "📦 Processing",
              queueICE.current[senderID].length,
              "queued ICE candidates for",
              senderID
            );
            for (let candidate of queueICE.current[senderID]) {
              try {
                await pc.addIceCandidate(new RTCIceCandidate(candidate));
              } catch (e) {
                console.error("❌ Error adding queued ICE candidate:", e);
              }
            }
          }

          try {
            await connectionRef.current[senderID].addIceCandidate(ice);
          } catch (e) {
            console.error("Error adding received ice candidate", e);
          }
        }
      }
    });

    socketRef.current.on("signal-offer", async ({ offer, senderID }) => {
      if (offer && senderID) {
        let pc = new RTCPeerConnection(configuration);
        console.log(offer);
        setConfigurationWEBRTC(pc, senderID);
        pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        if (!connectionRef.current[senderID]) {
          connectionRef.current[senderID] = pc;
        }

        console.log("ans_pc = ", pc);
        socketRef.current.emit("signal-answer", {
          answer,
          senderID: socketRef.current.id,
          receiverID: senderID,
        });
      }
    });

    socketRef.current.on("signal-answer", async ({ answer, senderID }) => {
      if (answer && senderID && connectionRef.current[senderID]) {
        const remoteDesc = new RTCSessionDescription(answer);
        await connectionRef.current[senderID].setRemoteDescription(remoteDesc);
        console.log(connectionRef.current[senderID]);
      }
    });

    return () => {
      socketRef.current.disconnect();
      delete connectionRef.current;
    };
  }, []);

  function LeaveMeeting() {
    socket.current.disconnect();
    navigate("/meeting");
  }

  return (
    <div className="mainDiv">
      <VideoCall></VideoCall>
      <Controls></Controls>
    </div>
  );
}
