import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Login() {
  let navigate=useNavigate();
  let [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  let [showToast, setShowToast] = useState(false);
  let [toast_msg, set_toast_msg] = useState("");

  let HandleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  function onSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8000/user/login", formValues , {withCredentials:true})
      .then((response) => {
        localStorage.setItem('username', formValues.username);
        set_toast_msg(response.data.message);
        setShowToast(true);
        navigate('/meeting');
        
        // axios.interceptors.request.use(
        //   (config) => {
        //     if (token) {
        //       config.headers.Authorization = "Bearer " + token;
        //     }

        //     return config;
        //   },
        //   (error) => {
        //     return Promise.reject(error);
        //   }
        // );
      })
      .catch((e) => {
        set_toast_msg(e.response.data.message);
        setShowToast(true);
      });
  }

  function onClickHideToast() {
    setShowToast(false);
  }
  return (
    <>
      <div className="Body">
        <div
          className={`toast ${showToast ? "show" : ""} align-items-center`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{toast_msg}</div>
            <button
              type="button"
              id="toastCloseBtn"
              onClick={onClickHideToast}
              data-bs-dismiss="toast"
              aria-label="Close"
            >
              X
            </button>
          </div>
        </div>
        <div className="signup-form">
          <h1 id="signup-heading">Login</h1>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                name="username"
                onChange={HandleChange}
                value={formValues.username}
              />
            </div>

            <label htmlFor="inputPassword5" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="inputPassword5"
              name="password"
              className="form-control"
              onChange={HandleChange}
              value={formValues.password}
            />
            <button type="submit" id="submit-btn" className="btn btn-dark">
              Submit
            </button>
          </form>
          <p>
            Did'nt have account? <a href="/signup">Signup</a>
          </p>
          <br />
        </div>
      </div>
    </>
  );
}
