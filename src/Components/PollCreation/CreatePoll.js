import React, { useState } from 'react';
import './CreatePoll.css';
import Modal from './Catagory';
import addServices from '../../Services/addServices';
import { useNavigate } from 'react-router-dom';

function CreatePoll({ pollDetails, userId }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [rating, setRating] = useState(pollDetails.rating || 0);
  const [yesValue, setYesValue] = useState(pollDetails.yesValue || 0);
  const [noValue, setNoValue] = useState(pollDetails.noValue || 0);
  const navigate = useNavigate();

  const style = {
    fontFamily: pollDetails.style.fontFamily || 'Roboto, Arial, sans-serif',
    fontSize: pollDetails.style.fontSize || '20px',
    color: pollDetails.style.fontColor || '#333333',
    backgroundColor: pollDetails.style.backgroundColor || '#F5F5DC',
  };  

  const renderOptions = () => {
    switch (pollDetails.pollType) {
      case 'Single Choice Polls':
        return (
          <div className="poll-options">
            {pollDetails.options.map((option, index) => (
              <label key={index} className="poll-option">
                <input type="radio" name="SingleChoice" />
                {option}
                <br></br>
              </label>
            ))}
          </div>
        );
      case 'Multiple Choice Polls':
        return (
          <div className="poll-options">
            {pollDetails.options.map((option, index) => (
              <label key={index} className="poll-option">
                <input type="checkbox" name="MultipleChoice" />
                {option}
                <br></br>
              </label>
            ))}
          </div>
        );
      case 'Rating Polls':
        return (
          <div className="rating-polls">
  {[...Array(5)].map((_, index) => (
    <div className="star-wrapper" key={index}>
      <span
        className={`star ${index < rating ? 'filled' : ''}`}
        onClick={() => setRating(index + 1)}
      >
        ★
      </span>
    </div>
  ))}
</div>

        );
      case 'Yes/No Polls':
        return (
          <div className="yes-no-polls">
            <div className="slider-container">
              <div className="slider-group">
                <label>Yes:</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={yesValue}
                  className="slider"
                  onChange={() => {
                    setYesValue(yesValue === 0 ? 100 : 0);
                    setNoValue(yesValue === 0 ? 0 : 100);
                  }}
                />
                <label>No:</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={noValue}
                  className="slider"
                  onChange={() => {
                    setNoValue(noValue === 0 ? 100 : 0);
                    setYesValue(noValue === 0 ? 0 : 100);
                  }}
                />
              </div>
            </div>
          </div>
        );
      case 'Ranking Polls':
        return (
          <div className="ranking-polls">
            <ul>
              {pollDetails.options.map((option, index) => (
                <li key={index} className="ranking-option">
                  {option}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'Open-Ended Polls':
        return (
          <div className="open-ended-polls">
            <textarea placeholder="Type your answer here..." readOnly />
          </div>
        );
      case 'Matrix Polls':
        return (
          <div className="matrix-polls">
            <table>
              <thead>
                <tr>
                  <th></th>
                  {pollDetails.matrixColumns.map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pollDetails.matrixRows.map((row, index) => (
                  <tr key={index}>
                    <td>{row}</td>
                    {pollDetails.matrixColumns.map((_, colIndex) => (
                      <td key={colIndex}>
                        <input type="radio" name={`matrix-${index}`} disabled />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'Demographic Polls':
        return (
          <div className="demographic-polls">
            <label>
              Age:
              <input type="number" readOnly />
            </label>
            <label>
              Gender:
              <select disabled>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>
              Location:
              <input type="text" readOnly />
            </label>
          </div>
        );
      case 'Poll with Comments':
        return (
          <div className="poll-with-comments">
            {pollDetails.options.map((option, index) => (
              <label key={index}>
                <input type="checkbox" name="pollWithComments" />
                {option}
              </label>
            ))}
            <textarea placeholder="Add your comments here..." readOnly />
          </div>
        );
      case 'Image Polls':
        return (
          <div className="image-polls">
            {pollDetails.images.map((image, index) => (
              <div key={index} className="poll-image">
                <img src={image} alt={`Poll option ${index}`} />
              </div>
            ))}
          </div>
        );
      case 'Time-based Polls':
        return (
          <div className="time-based-polls">
            <label>
              Start Time:
              <input type="datetime-local" readOnly />
            </label>
            <label>
              End Time:
              <input type="datetime-local" readOnly />
            </label>
          </div>
        );
      case 'Conditional Polls':
        return (
          <div className="conditional-polls">
            <label>
              If answer to question 1 is:
              <select disabled>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </label>
            <label>
              Show:
              <select disabled>
                <option value="question2">Question 2</option>
                <option value="question3">Question 3</option>
              </select>
            </label>
          </div>
        );
      default:
        return <div>Please select a poll type.</div>;
    }
  };

  const handleSubmit = async () => {
    if (!selectedOption) {
      alert('Please select a category before submitting.');
      return;
    }
    const fontSize = parseInt(pollDetails.style.fontSize, 10);
    const userIdLong = parseInt(userId, 10);

    const pollData = {
      userId: userIdLong,
      pollType: pollDetails.pollType,
      question: pollDetails.question,
      option1: pollDetails.options[0] || '',
      option2: pollDetails.options[1] || '',
      option3: pollDetails.options[2] || '',
      option4: pollDetails.options[3] || '',
      option5: pollDetails.options[4] || '',
      fontFamily: pollDetails.style.fontFamily,
      fontSize: fontSize,
      fontColor: pollDetails.style.fontColor,
      backgroundColor: pollDetails.style.backgroundColor,
      pollCategory: selectedOption,
    };

    console.log('Submitting poll data:', pollData);

    try {
      const response = await addServices.createPoll(pollData); // Use the service function
      console.log('Poll created:', response);
      setModalOpen(false);
      navigate('/userDashboard');
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };


  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setModalOpen(false);
  };

  return (
    <>
      <center style={{ marginTop: "20px" }}><h1>Poll Preview</h1></center>
      <div className="create-poll" style={style}>
        <div className="poll-question">
          <strong>{pollDetails.question}</strong>
        </div>
        {renderOptions()}
      </div>
      <center>
        <button className='btns' onClick={() => setModalOpen(true)}>Select Category</button>
        <button className='btns' onClick={handleSubmit}>Submit</button>
      </center>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        options={pollDetails.options}
        onSelect={handleSelectOption}
      />
    </>
  );
}

export default CreatePoll;
