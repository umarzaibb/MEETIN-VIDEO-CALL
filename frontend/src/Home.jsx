import React, { useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router';

export default function Home() {
  let navigate= useNavigate();
  let username=localStorage.getItem('username');


  return (
    <>
      <div className="LandingPageDiv">
        <nav
          class="navbar navbar-expand-lg bg-body-primary "
          data-bs-theme="dark"
        >
          <div class="container-fluid">
            <a class="navbar-brand fs-2 ms-3" href="#">
              MEETIN
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div
              class="collapse navbar-collapse position-absolute end-0"
              id="navbarNav"
            >
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active me-3" aria-current="page" href="#">
                    Join as Guest
                  </a>
                </li>
                {!username?<><button
                  class="btn btn-outline-primary me-3"
                  type="submit"
                  onClick={()=>navigate('/login')}
                >
                  Login
                </button>
                <li class="nav-item">
                  <a class="nav-link me-4" href="/signup">
                    Signup
                  </a>
                </li></>: <a class="nav-link me-4" href="/meeting">
                   Create / Join Meeting
                  </a>}
              </ul>
            </div>
          </div>
        </nav>

        <div className="LandingPageText">
          <h1>
            <span style={{ color: "rgb(255, 119, 0)" }}>Connect</span> with your
            Loved Ones
          </h1>
          <p>Cover a distance by MEETIN VIDEO CONFERENCE</p>
          <button>Get Started </button>
        </div>

        <div className="imageVideoCall">
          <img src="/Adobe_Express_file.png" />
        </div>
      </div>
    </>
  )
}
