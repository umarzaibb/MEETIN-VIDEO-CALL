import React, { useState } from 'react';
import './JoinMeeting.css';
import axios, { HttpStatusCode } from 'axios';
import { useNavigate } from 'react-router';

export default function Meeting() {

  let navigate= useNavigate();
  let [meetingID, setMeetingID]= useState();

 function Logout() {
  axios.delete('http://localhost:8000/user/logout', {withCredentials: true}).then((response)=>{
    console.log(response.status);
    if(response.status===HttpStatusCode.Accepted){
      localStorage.removeItem('username');
      navigate("/");
    }
  }).catch((e)=>{
     console.log(e.message);
  })
 }

 function onChangeMeetingID(event) {
      setMeetingID(event.target.value);
 }

 function onCreateMeeting() {
   axios.post('http://localhost:8000/meeting', {meetingID}).then((response)=>{
      if(response.status== HttpStatusCode.Created) {
         navigate('/meeting'+'/'+meetingID);
      }
   }).catch(e=>{
     alert(e.message);
   })
 }

 function onJoiningMeeting () {
   
         navigate('/meeting'+'/'+meetingID);
 }

    return (
   <>
      <div className="join-meeting-div">
        <div className="nav">
          <h1>Apna Video Call</h1>
          <span>
            <span className="nav-user">
              <a onClick={Logout}>Logout</a>
              <p id="username"></p>
              <i className="fa-solid fa-circle-user"></i>
              <p className="username-nav">{localStorage.getItem("username")}</p>
            </span>
          </span>
        </div>

        <div className="join-meeting-form">
          <form onSubmit={(event)=>{
            event.preventDefault();
          }}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label text-light fs-5">
                Meeting ID
              </label>
              <input
                onChange={onChangeMeetingID}
                value={meetingID}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text text-light">
                Share this meeting id with others to join!
              </div>
            </div>
            <button onClick={onCreateMeeting}  className="btn btn-dark me-3">
              Create
            </button>
            <button className="btn btn-primary" onClick={onJoiningMeeting} >
              Join
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
