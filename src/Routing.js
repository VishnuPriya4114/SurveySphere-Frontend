import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './LandingPage/SplitLandingPage';
import SignUp from './SignUp/SignUp';
import Login from './SignIn/Login';
import App from './UserDashboard/App';
import Main from './PollCreation/Main';

import Education from './PollDashboard/Education';
import SocialMedia from './PollDashboard/SocialMedia';
 import Healthcare from './PollDashboard/Healthcare';
 import Technology from './PollDashboard/Technology';
 import Sports from './PollDashboard/Sports';
 import Entertainment from './PollDashboard/Entertainment';
 import Government from './PollDashboard/Government';
import Dashboard from './PollDashboard/Dashboard';
import Settings from './PollDashboard/Settings';

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={<Landing/>} />  
                <Route path="/login" element={<Login/>} />     
                <Route path="/userdashboard" element={<App/>} />     
                <Route path="/main" element={<Main/>} />  
                
                <Route path="/publicdashboard" element={<Dashboard />} /> 
                <Route path="/education" element={<Education />} />
              <Route path="/social" element={<SocialMedia />} />
              <Route path="/health" element={<Healthcare />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/entertainment" element={<Entertainment />} />
              <Route path="/government" element={<Government />} />
              <Route path="/Settings" element={<Settings/>}/>
            </Routes>
        </Router>
    );
};

export default Routing;