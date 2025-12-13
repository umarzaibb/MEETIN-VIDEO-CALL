import React from 'react';
import './JoinMeeting.css';

export default function Meeting() {

    return (
   <>
      <div className="join-meeting-div">
        <div className="nav">
          <h1>Apna Video Call</h1>
          <span>
            <span className="nav-user">
              <a >Logout</a>
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
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text text-light">
                Share this meeting id with others to join!
              </div>
            </div>
            <button  className="btn btn-dark me-3">
              Create
            </button>
            <button className="btn btn-primary" >
              Join
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
