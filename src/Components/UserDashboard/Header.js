import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate,  Link } from 'react-router-dom';
import axios from 'axios';
import addServices from '../../Services/addServices';

const Header = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      const loggedInUserId = localStorage.getItem('loggedInUserId');
      if (loggedInUserId) {
        try {
          const name = await addServices.getUserName(loggedInUserId);
          setUserName(name); // Assuming the API returns an object with a 'name' property
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserName();
  }, []);

  const handleClick = () => {
    navigate('/');
  };

  return (
    <header className="headers">
      <div className="logo">{userName ? `Welcome, ${userName}` : 'Loading...'}</div>
      <nav className="nav">
        <a href="#">How it works</a>
        <a href="#">Explore</a>
        <Link to="/DisplayPolls">List</Link>
        <a href="#">View</a>
        <a href="#" className='blinking' style={{ color: "goldenrod" }}>Premium</a>
      </nav>
      <div className="auth-buttons">
        <button className="sign-up" onClick={handleClick}>Log out</button>
      </div>
    </header>
  );
};

export default Header;
