import React, { useState } from 'react';
import './landing.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import addServices from '../../Services/addServices';

const SplitLandingPage = () => {
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePollSubmit = async () => {
    if (!nickname || !age) {
      setError('Please enter both nickname and age.');
      return;
    }

    try {
      const response = await addServices.fetchPublicUsers();
      const user = response.find(user => user.nickname === nickname);

      if (user) {
        localStorage.setItem('publicId', user.publicId);
        navigate('/publicdashboard');
      } else {
        const newUser = await addServices.addUser(nickname, age);
        localStorage.setItem('publicId', newUser.publicId);
        navigate('/publicdashboard');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="containers">
      <div className="split left">
        <div className="landing-card">
          <h1 className="lefthead1">Formulate Your Unique Poll</h1>
          <p>When you can gather opinions easily, decision-making becomes better. We help you effortlessly create and manage polls in one place.</p>
          <button className="button" onClick={() => navigate('/login')}>Sign In</button>
        </div>
      </div>
      <div className="split right">
        <div className="landing-card">
          <h1 className="head1">Express Your Views, Create Impact</h1>
          <input
            type="text"
            className="nickname-input"
            placeholder="Enter your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <input
            type="number"
            className="nickname-input"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button className="button" onClick={handlePollSubmit}>Poll</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SplitLandingPage;
