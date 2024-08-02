import React from 'react';
import './FeatureCards.css';

const FeatureCards = () => {
  return (
    <section className="feature-cards">
      <div className="card">
        <h3>Poll 1</h3>
        <p>We bring all of your money to one place, from balances and bills to credit score and more.</p>
      </div>
      <div className="cards">
        <h3>Poll 2</h3>
        <p>Easily create budgets, and see suggestions based on your spending.</p>
      </div>
      <div className="cards">
        <h3>Poll 2</h3>
        <p>Check your free credit score as many times as you like, and get tips to help improve it.</p>
      </div>
    </section>
  );
};

export default FeatureCards;
