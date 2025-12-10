import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router';
import Home from './Home';
import Signup from './Components/Signup';
import Login from './Components/Login';

createRoot(document.getElementById('root')).render(
   
     <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>}> </Route>
        <Route path="/signup" element={<Signup/>}> </Route>
        <Route path="/login" element={<Login/>}> </Route>
      </Routes>
     </BrowserRouter>
)
