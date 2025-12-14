import { createRoot } from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router';
import Home from './Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import JoinMeeting from './Components/JoinMeeting.jsx';
import AuthProvider from './utils/AuthProvider';
import Meeting from './Components/Meeting.jsx';

createRoot(document.getElementById('root')).render(
   
     <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>}> </Route>
        <Route path="/signup" element={<Signup/>}> </Route>
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/meeting" element={<AuthProvider><JoinMeeting></JoinMeeting></AuthProvider>}> </Route>
        <Route path="/meeting/*" element={<AuthProvider><Meeting></Meeting></AuthProvider>}> </Route>
        
      </Routes>
     </BrowserRouter>
)
