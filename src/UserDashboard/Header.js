import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate('/');
  }
  return (
    <header className="headers">
      <div className="logo">Mint</div>
      <nav className="nav">
        <a href="#">How it works</a>
        <a href="#">Credit Cards & More</a>
        <a href="#">Investing</a>
        <a href="#">Loans</a>
        <a href="#">Resources</a>
      </nav>
      <div className="auth-buttons">
        <button className="sign-up" onClick={handleClick}>Log out</button>
      </div>
    </header>
  );
};

export default Header;
