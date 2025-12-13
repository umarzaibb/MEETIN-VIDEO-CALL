import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8000';
  const [token, setToken] = useState(null);

  // Fetch access token on component mount
  useEffect(() => {
    axios
      .get(`${baseUrl}/get_access_token`, { withCredentials: true })
      .then((response) => {
        if (response.status === 202) { // HttpStatusCode.Accepted => 202
          setToken(response.data.access_token);
        }
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) { // HttpStatusCode.Unauthorized => 401
          navigate('/login');
        } else {
          alert(e.message);
        }
      });
  }, [navigate]);

  // Axios request interceptor for adding Authorization header
  useEffect(() => {
    const myInterceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
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

  // Return wrapped children
  return <>{children}</>;
}
