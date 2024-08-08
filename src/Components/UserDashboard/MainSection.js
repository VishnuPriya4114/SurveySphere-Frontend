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
      <h1>Create Your Polls Effortlessly</h1>
      <p>When you can gather opinions easily, decision-making becomes better. We help you effortlessly create and manage polls in one place.</p>      
        <button className="sign-up-free" onClick={handleClick('/main')}>+ Create </button>
      </div>
      <div className="intro-image">
        <img style={{height:"300px",width:"400px"}} src="https://img.freepik.com/premium-vector/woman-reading-testimonials-leaving-comments-consumer-review-comment-rate-service-goods-customer-feedback_48369-46228.jpg?ga=GA1.1.699157368.1722849884&semt=ais_hybrid" alt="Financial Overview" />
      </div>
    </section>
  );
};

export default MainSection;
