import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Components/LandingPage/SplitLandingPage';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/SignIn/Login';
import App from './Components/UserDashboard/Apps';
import Main from './Components/PollCreation/Main';

import Education from './Components/PollDashboard/Education';
import SocialMedia from './Components/PollDashboard/SocialMedia';
 import Healthcare from './Components/PollDashboard/Healthcare';
 import Technology from './Components/PollDashboard/Technology';
 import Sports from './Components/PollDashboard/Sports';
 import Entertainment from './Components/PollDashboard/Entertainment';
 import Government from './Components/PollDashboard/Government';
import Dashboard from './Components/PollDashboard/Dashboard';
import Settings from './Components/PollDashboard/Settings';
import DisplayPolls from './Components/UserDashboard/DisplayPolls';

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
              <Route path="/DisplayPolls" element={<DisplayPolls/>}/>
            </Routes>
        </Router>
    );
};

export default Routing;