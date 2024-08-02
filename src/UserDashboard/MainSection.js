import React from 'react';
import './MainSection.css';
import { useNavigate } from 'react-router-dom';

const MainSection = () => {
  const navigate=useNavigate();
  const handleClick=(path)=>()=>{
    navigate(path);
  }
  return (
    <section className="main-section">
      <div className="intro-text">
        <h1>It's all coming together</h1>
        <p>When you're on top of your money, life is good. We help you effortlessly manage your finances in one place.</p>
        <button className="sign-up-free" onClick={handleClick('/main')}>+ Create </button>
      </div>
      <div className="intro-image">
        <img src="https://img.freepik.com/free-vector/posts-concept-illustration_114360-112.jpg?ga=GA1.1.459237625.1721796584&semt=ais_user" alt="Financial Overview" />
      </div>
    </section>
  );
};

export default MainSection;
