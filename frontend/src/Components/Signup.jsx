import React, { useState } from "react";
import "./Signup.css";
import axios from 'axios';

export default function Signup() {

    let [formValues, setFormValues]=useState({
        username: '',
        email: '',
        password: ''
    });

    let [showToast, setShowToast]= useState(false);
    let [toast_msg, set_toast_msg]= useState("");

    let HandleChange =(event)=>{
       setFormValues({...formValues, [event.target.name]: event.target.value});
    }


    function onSubmit(event) {
      event.preventDefault();
      axios.post('http://localhost:8000/user/signup', formValues)
      .then((response)=>{
       set_toast_msg(response.data.message + " Please log in to continue.");
       setShowToast(true);
      }).catch((e)=>{
        set_toast_msg(e.response.data.message);
       setShowToast(true);
      });

    }

    function onClickHideToast( ) {
      setShowToast(false);
    }

  return (
    <>
      <div className="Body">
       <div className={`toast ${showToast? 'show': ''} align-items-center`} role="alert" aria-live="assertive" aria-atomic="true">
  <div className="d-flex">
    <div className="toast-body">
      {toast_msg}
    </div>
     <button type="button" id="toastCloseBtn"  onClick={onClickHideToast} data-bs-dismiss="toast" aria-label="Close">X</button>
  </div>
</div>
           <div className="signup-form">
            <h1 id="signup-heading">Signup</h1>
        
     <form onSubmit={onSubmit}>
         <div className="mb-3">
         <label htmlFor="Name" className="form-label">
          Username
        </label>
      <input type="text" id="inputName" className="form-control" name="username" onChange={HandleChange} value={formValues.username} />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          onChange={HandleChange} value={formValues.email}
        />
      </div>
      <label htmlFor="inputPassword5" className="form-label" >
        Password
      </label>
      <input type="password" id="inputPassword5" name="password" className="form-control"
      onChange={HandleChange} value={formValues.password} />
      <div id="passwordHelpBlock" className="form-text" >
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </div>
      <button type="submit" id="submit-btn" className="btn btn-dark">Submit</button>
     </form><br/>
     <span>Already have account? <a href="/login"> Login</a></span>
           </div>
      </div>
    </>
  );
}
