import React, { useState, useEffect } from 'react';
import './UserDetails.css';

const fontFamilies = [
  'Arial', 'Verdana', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia', 'Palatino', 'Garamond', 'Comic Sans MS', 'Arial Black', 'Tahoma', 'Impact'
];

function UserDetails({ pollDetails, onPollDetailsChange }) {
  const [localPollDetails, setLocalPollDetails] = useState(pollDetails);

  useEffect(() => {
    setLocalPollDetails(pollDetails);
  }, [pollDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalPollDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleStyleChange = (e) => {
    const { name, value } = e.target;
    setLocalPollDetails((prevDetails) => ({
      ...prevDetails,
      style: {
        ...prevDetails.style,
        [name]: value,
      },
    }));
  };

  const handleOptionsChange = (e, index) => {
    const newOptions = [...localPollDetails.options];
    newOptions[index] = e.target.value;
    setLocalPollDetails((prevDetails) => ({
      ...prevDetails,
      options: newOptions,
    }));
  };
 
  const handleAddOption = () => {
    setLocalPollDetails((prevDetails) => ({
      ...prevDetails,
      options: [...prevDetails.options, ''],
    }));
  };

  const handlePollTypeChange = (e) => {
    setLocalPollDetails((prevDetails) => ({
      ...prevDetails,
      pollType: e.target.value,
      options: [], // Reset options when poll type changes
    }));
  };

  const handleSaveChanges = () => {
    onPollDetailsChange(localPollDetails);
  };

  return (
    <>
    <center><h1 style={{fontSize:"34px",marginTop:"20px"}}>Poll Details</h1></center>
    <div className="user-details">
      <div className="form-group">
        <label className="userslable" htmlFor="pollType">Poll Type</label>
        <select className="tag" id="pollType" name="pollType" value={localPollDetails.pollType} onChange={handlePollTypeChange}>
          <option value="">Select Poll Type</option>
          <option value="Single Choice Polls">Single Choice Polls</option>
          <option value="Multiple Choice Polls">Multiple Choice Polls</option>
          <option value="Rating Polls">Rating Polls</option>
          <option value="Yes/No Polls">Yes/No Polls</option>
          <option value="Ranking Polls">Ranking Polls</option>
          <option value="Open-Ended Polls">Open-Ended Polls</option>
          <option value="Matrix Polls">Matrix Polls</option>
          <option value="Demographic Polls">Demographic Polls</option>
          <option value="Poll with Comments">Poll with Comments</option>
          <option value="Image Polls">Image Polls</option>
          <option value="Time-based Polls">Time-based Polls</option>
          <option value="Conditional Polls">Conditional Polls</option>
        </select>
      </div>
      <div className="form-group">
        <label className="user-label" htmlFor="question">Question</label>
        <input
          className="tag"
          type="text"
          id="question"
          name="question"
          value={localPollDetails.question}
          onChange={handleChange}
        />
      </div>
      {(localPollDetails.pollType === 'Multiple Choice Polls' || localPollDetails.pollType === 'Single Choice Polls') && (
        <div>
          <center><label style={{color:"black"}}className="users-label">Options</label></center>
          {localPollDetails.options.slice(0, 5).map((option, index) => (
            
            <div key={index} className="input-container">
            <span className="option-number">{index + 1}.</span>
              <input
                className="option-tag"
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionsChange(e, index)}
              />
            </div>
          ))}
          {localPollDetails.options.length > 5 && (
            <div className="option-limit-message">Option limit reached</div>
          )}
          <center><button style={{width:"200px"}}className="buttonm" onClick={handleAddOption}>Add Option</button></center>
        </div>
      )}
      
      {/*<div className="form-group">
        <label className="user-label" htmlFor="fontFamily">Font Family</label>
        <select className="tag" id="fontFamily" name="fontFamily" value={localPollDetails.style.fontFamily} onChange={handleStyleChange}>
          {fontFamilies.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="user-label" htmlFor="fontSize">Font Size</label>
        <input
        className="tag"
          type="text"
          id="fontSize"
          name="fontSize"
          value={localPollDetails.style.fontSize}
          onChange={handleStyleChange}
        />
      </div>
      <div className="form-group">
        <label className="user-label" htmlFor="fontColor">Font Color</label>
        <input
        className="tag"
          type="color"
          id="fontColor"
          name="fontColor"
          value={localPollDetails.style.fontColor}
          onChange={handleStyleChange}
        />
      </div>
      <div className="form-group">
        <label className="user-label" htmlFor="backgroundColor">Background Color</label>
        <input
        className="tag"
          type="color"
          id="backgroundColor"
          name="backgroundColor"
          value={localPollDetails.style.backgroundColor}
          onChange={handleStyleChange}
        />
      </div>*/}
      </div>
      <center><button style={{marginTop:"20px",width:"200px"}}className="buttonm" onClick={handleSaveChanges}>Save Changes</button></center>
    </>
  );
}

export default UserDetails;
