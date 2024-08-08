import React, { useState } from 'react';
import './Category.css';

const PollOptions = ({ pollDetails, onResponseChange }) => {
  const [selectedResponse, setSelectedResponse] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSelectedResponse(value);
    onResponseChange(pollDetails.pollId, pollDetails.pollType, value);
  };

  const handleRatingClick = (index) => {
    setRating(index + 1);
    onResponseChange(pollDetails.pollId, pollDetails.pollType, index + 1);
  };

  const handleCommentsChange = (e) => {
    const { value } = e.target;
    setComments(value);
    onResponseChange(pollDetails.pollId, pollDetails.pollType, value);
  };

  const handleMultipleChoiceChange = (e) => {
    const { value, checked } = e.target;
    let updatedSelectedOptions;

    if (checked) {
      updatedSelectedOptions = [...selectedOptions, value];
    } else {
      updatedSelectedOptions = selectedOptions.filter(option => option !== value);
    }

    setSelectedOptions(updatedSelectedOptions);
    onResponseChange(pollDetails.pollId, pollDetails.pollType, updatedSelectedOptions.join(', '));
  };

  const renderOptions = () => {
    const options = [
      pollDetails.option1,
      pollDetails.option2,
      pollDetails.option3,
      pollDetails.option4,
      pollDetails.option5
    ].filter(Boolean);

    switch (pollDetails.pollType) {
      case 'Single Choice Polls':
        return (
          <div className="single-choice-options">
            {options.map((option, index) => (
              <label key={index} className="option-label">
                <input type="radio" name={`single-choice-${pollDetails.pollId}`} value={option} onChange={handleChange} />
                {option}
              </label>
            ))}
          </div>
        );
      case 'Multiple Choice Polls':
        return (
          <div className="multiple-choice-options">
            {options.map((option, index) => (
              <label key={index} className="option-label">
                <input type="checkbox" name={`multiple-choice-${pollDetails.pollId}`} value={option} onChange={handleMultipleChoiceChange} />
                {option}
              </label>
            ))}
          </div>
        );
      case 'Rating Polls':
        return (
          <div className="rating-options">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`rating-star ${index < rating ? 'filled' : ''}`}
                onClick={() => handleRatingClick(index)}
              >
                ★
              </span>
            ))}
          </div>
        );
      case 'Yes/No Polls':
        return (
          <div className="yes-no-options">
            <label>
              <input type="radio" name={`yes-no-${pollDetails.pollId}`} value="Yes" onChange={handleChange} />
              Yes
            </label>
            <br />
            <label>
              <input type="radio" name={`yes-no-${pollDetails.pollId}`} value="No" onChange={handleChange} />
              No
            </label>
          </div>
        );
      case 'Ranking Polls':
        return (
          <div className="ranking-options">
            <ul>
              {options.map((option, index) => (
                <li key={index} className="ranking-item">
                  {option}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'Open-Ended Polls':
        return (
          <div className="open-ended-option">
            <textarea placeholder="Type your answer here..." readOnly />
          </div>
        );
      case 'Matrix Polls':
        return (
          <div className="matrix-options">
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
          <div className="demographic-options">
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
            {options.map((option, index) => (
              <label key={index} className="option-label">
                <input type="checkbox" name={`poll-comments-${pollDetails.pollId}`} />
                {option}
              </label>
            ))}
            <textarea
              placeholder="Add your comments here..."
              value={comments}
              onChange={handleCommentsChange}
            />
          </div>
        );
      case 'Image Polls':
        return (
          <div className="image-polls">
            {pollDetails.images.map((image, index) => (
              <div key={index} className="image-option">
                <img src={image} alt={`Poll option ${index}`} />
              </div>
            ))}
          </div>
        );
      case 'Time-based Polls':
        return (
          <div className="time-based-options">
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
          <div className="conditional-options">
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

  return (
    <div>
      {renderOptions()}
    </div>
  );
};

export default PollOptions;
