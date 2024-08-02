import React from 'react';
import { useNavigate } from 'react-router-dom';
import   './Category.css';

const Education = () => {
    const handleClick = () => {
        alert('Thank you for participating in the education poll!');
    };
const navigate= useNavigate();
 
    return (
        <div className="education-poll-container">
            <h1>Education Poll</h1>
            <p>We value your opinion on various educational topics. Please take a moment to participate in our poll and share your thoughts.</p>
            <button onClick={handleClick} className="poll-button">Submit Your Vote</button>
            <button className="back-button" onClick={() => navigate('/publicdashboard')}></button>
        </div>
    );
};

export default Education;