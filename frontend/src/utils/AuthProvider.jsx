import React, { useState, useLayoutEffect, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Loader from './Loader.jsx';

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8000';
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch access token on component mount
  useEffect(() => {
    axios
      .get(`${baseUrl}/user/get_access_token`, { withCredentials: true })
      .then((response) => {
        if (response.status === 202) { // HttpStatusCode.Accepted => 202
          console.log(response.data.access_token);
          setToken(response.data.access_token);
        }
      })
      .catch((e) => {
        if (e.response || e.response.status === 401) { // HttpStatusCode.Unauthorized => 401
          navigate('/login');
        } else {
          alert(e.message);
        }
      }).finally(()=>{
        setLoading(false);
      });

  }, [navigate]);

  // Axios request interceptor for adding Authorization header
  useLayoutEffect(() => {
    const myInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log("token set");
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }

    );

    // Clean up the interceptor on unmount or token change
    return () => {
      axios.interceptors.request.eject(myInterceptor);
    };
  }, [token]); // Re-run this effect when token changes

if (loading) {
  return <Loader></Loader>
}

  // Return wrapped children
  return <>{children}</>;
}
