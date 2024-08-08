import React, { useEffect, useState } from 'react';
import './Category.css';
import { useNavigate } from 'react-router-dom';
import PollOptions from './PollOptions';
import addServices from '../../Services/addServices';

const SocialMedia = () => {
  const [polls, setPolls] = useState([]);
  const [responses, setResponses] = useState({});
  const [submittedPolls, setSubmittedPolls] = useState(new Set()); // Track submitted polls
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const pollsPerPage = 2; // Polls per page
  const navigate = useNavigate();
  const publicId = localStorage.getItem('publicId'); // Retrieve publicId

  useEffect(() => {
    const fetchPolls = async () => {
      if (!publicId) {
        console.error('Public ID is not available');
        return;
      }

      try {
        const fetchedPolls = await addServices.fetchPollsByCategory('SocialMedia');
        setPolls(fetchedPolls);

        // Retrieve and set submitted polls for the current publicId
        const submitted = JSON.parse(localStorage.getItem(`submittedPolls_${publicId}`)) || [];
        setSubmittedPolls(new Set(submitted));
      } catch (error) {
        console.error('Error fetching polls:', error);
      }
    };

    fetchPolls();
  }, [publicId]); // Depend on publicId

  const handleResponseChange = (pollId, responseType, response) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [pollId]: { responseType, response }
    }));
  };

  const handleSubmit = async (pollId) => {
    if (!publicId) {
      alert('Please sign in to submit a response.');
      return;
    }

    if (submittedPolls.has(pollId)) return; // Prevent duplicate submissions

    const category = 'SocialMedia';
    const currentDate = new Date().toISOString();

    const { responseType, response } = responses[pollId] || {};

    if (!responseType || !response) {
      alert('Please select an option before submitting.');
      return;
    }

    const data = {
      pollId,
      publicId,
      category,
      date: currentDate,
      responseType,
      response
    };

    try {
      await addServices.submitPollResponse(data);
      // Update local storage and state
      const updatedSubmittedPolls = new Set(submittedPolls);
      updatedSubmittedPolls.add(pollId);
      localStorage.setItem(`submittedPolls_${publicId}`, JSON.stringify([...updatedSubmittedPolls]));
      setSubmittedPolls(updatedSubmittedPolls);
    } catch (error) {
      console.error('Error submitting poll response:', error);
      alert('There was an error submitting your response. Please try again.');
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * pollsPerPage < polls.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedPolls = Array.isArray(polls) ? polls.slice(currentPage * pollsPerPage, (currentPage + 1) * pollsPerPage) : [];

  return (
    <div className="polls-wrapper">
      <div className="education-poll-container">
        <center>
          <h1>Education Polls</h1>
          <p>We value your opinion on various educational topics. Please take a moment to participate in our poll and share your thoughts.</p>
        </center>
        <button className="back-buttons" onClick={() => navigate('/publicdashboard')} style={{ color: "white" }}>Home</button>
      </div>
      {polls.length === 0 ? (
        <>
          <div className="no-polls-message">Currently, no polls are available.</div>
          <center>
            <img src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127829.jpg?ga=GA1.1.459237625.1721796584&semt=ais_hybrid" alt="No Data" className="avatar" />
          </center>
        </>
      ) : (
        <>
          <div className="polls-container">
            {displayedPolls.map((pollDetails) => {
              const style = {
                fontFamily: pollDetails.fontFamily || 'Arial',
                fontSize: `${pollDetails.fontSize}px` || '16px',
                color: pollDetails.fontColor || '#000',
                backgroundColor: pollDetails.backgroundColor || '#fff',
              };
              const isSubmitted = submittedPolls.has(pollDetails.pollId);
              return (
                <div key={pollDetails.pollId} className="poll-card" style={style}>
                  <div className="poll-title" style={{ fontSize: `${pollDetails.fontSize}px` }}>
                    <strong>{pollDetails.question}</strong>
                  </div>
                  <PollOptions pollDetails={pollDetails} onResponseChange={handleResponseChange} />
                  <button
                    className="submit"
                    style={{ width: "150px", marginTop: "10px", backgroundColor: isSubmitted ? "#B0B0B0" : "rgb(12, 57, 82)" }}
                    onClick={() => handleSubmit(pollDetails.pollId)}
                    disabled={isSubmitted}
                  >
                    {isSubmitted ? 'Submitted' : 'Submit'}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="navigation-arrows">
            <button className="arrow left-arrow" onClick={handlePreviousPage} disabled={currentPage === 0}>&#8249;</button>
            <button className="arrow right-arrow" onClick={handleNextPage} disabled={(currentPage + 1) * pollsPerPage >= polls.length}>&#8250;</button>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialMedia;
