import React from 'react';
import Header from './Header';
import MainSection from './MainSection';
import FeatureCards from './FeatureCards';
import './Apps.css'


function Apps() {
  return (
    <div className="App">
      <Header />
      <MainSection />
      <h1 style={{color:"white",marginLeft:"20px"}}>Recently created Polls</h1>
      <FeatureCards />
    </div>
  );
}

export default Apps;
 