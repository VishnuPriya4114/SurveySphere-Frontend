import React, { useState } from 'react';
import './Main.css';
import UserDetails from './UserDetails';
import CreatePoll from './CreatePoll';

function Main() {
  const [pollDetails, setPollDetails] = useState({
    pollType: '',
    question: '',
    options: [],
    style: {
      fontFamily: 'Arial',
      fontSize: '16px',
      fontColor: '#000000',
      backgroundColor: '#ffffff',
    },
    yesNoValue: '0',
    rating: 0,
    matrixRows: [],
    matrixColumns: [],
    images: [],
  });

  const handlePollDetailsChange = (details) => {
    setPollDetails((prevDetails) => ({
      ...prevDetails,
      ...details,
    }));
  };

  const loggedInUserId = localStorage.getItem('loggedInUserId');

  return (
    <div className="app-container">
      <div className="left-panel">
        <UserDetails pollDetails={pollDetails} onPollDetailsChange={handlePollDetailsChange} />
      </div>
      <div className="right-panel">
      <CreatePoll pollDetails={pollDetails} userId={loggedInUserId} />
      </div>
    </div>
  );
}

export default Main;
