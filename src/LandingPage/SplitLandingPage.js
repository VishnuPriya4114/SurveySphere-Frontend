import React from 'react';
import './landing.css';
import { useNavigate } from 'react-router-dom';

const SplitLandingPage = () => {
  const navigate = useNavigate();

  const handleMouseEnter = (direction) => {
    const container = document.querySelector('.containers');
    container.classList.add(`hover-${direction}`);
  };

  const handleMouseLeave = (direction) => {
    const container = document.querySelector('.containers');
    container.classList.remove(`hover-${direction}`);
  };

  const handleClick = (path) => () => {
    navigate(path);
  };

  return (
    <div className="containers">
      <div
        className="split top"
        onMouseEnter={() => handleMouseEnter('top')}
        onMouseLeave={() => handleMouseLeave('top')}
      >
      <h1 className="head1" style={{marginBottom:'20px'}}>Create Your Own Poll</h1>
      <button className="button" onClick={handleClick('/login')}>
        Sign In
      </button>

      </div>
      <div
        className="split bottom"
        onMouseEnter={() => handleMouseEnter('bottom')}
        onMouseLeave={() => handleMouseLeave('bottom')}
      >
        <h1 className="head1" style={{marginBottom:"20px"}}>Make Your Opinion Matter</h1>
        <input type="text" className="nickname-input" placeholder="Enter your nickname" style={{ width: "300px", color: 'black' }} />
        <input type="text" className="nickname-input" placeholder="Enter your age" style={{ width: "300px", color: 'black' }} />
        <button className="button" onClick={handleClick('/publicdashboard')}>
          Poll
        </button>
      </div>
    </div>
  );
};

export default SplitLandingPage;
