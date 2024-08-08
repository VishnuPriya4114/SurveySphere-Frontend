import React, { useEffect, useState } from 'react';
import './DisplayPolls.css';
import PollOptions from '../PollOptions';
import { useNavigate } from 'react-router-dom';
import addServices from '../../Services/addServices';
import ResultModel from './ResultModel'; // Import the modal component

const DisplayPolls = () => {
  const [pollsByCategory, setPollsByCategory] = useState({});
  const [selectedPollId, setSelectedPollId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const fetchPolls = async () => {
      try {
        const polls = await addServices.fetchPollsByUser(loggedInUserId);

        // Group polls by category
        const groupedPolls = polls.reduce((acc, poll) => {
          const category = poll.pollCategory || 'Uncategorized';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(poll);
          return acc;
        }, {});

        setPollsByCategory(groupedPolls);
      } catch (error) {
        console.error('There was an error fetching the polls!', error);
      }
    };

    fetchPolls();
  }, []);

  const openModal = (pollId) => {
    setSelectedPollId(pollId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPollId(null);
  };

  return (
    <div className="display-polls-container">
      {Object.keys(pollsByCategory).map(category => (
        <div key={category} className="polls-by-category">
          <div className="category-title-container">
            <h2 className="category-title">{category}</h2>
            <button className="load-more-button" onClick={() => navigate('/main')}>+</button>
          </div>
          <div className="polls-card-list">
            {pollsByCategory[category].map(poll => (
              <div key={poll.pollId} className="poll-card" style={{ fontFamily: poll.fontFamily, fontSize: `${poll.fontSize}px`, color: poll.fontColor, backgroundColor: poll.backgroundColor }}>
                <div className="poll-title" style={{ fontSize: `${poll.fontSize}px` }}>
                  <strong>{poll.question}</strong>
                </div>
                <PollOptions pollDetails={poll} />
                <div className="poll-card-buttons">
                  <button className="poll-change-button">Change</button>
                  <button className="poll-delete-button">Delete</button>
                  <button className="poll-result-button" onClick={() => openModal(poll.pollId)}>Result</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {isModalOpen && <ResultModel pollId={selectedPollId} onClose={closeModal} />}
    </div>
  );
};

export default DisplayPolls;
