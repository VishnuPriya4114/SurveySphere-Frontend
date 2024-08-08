import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeatureCards.css';
import PollOptions from '../PollOptions';
import addServices from '../../Services/addServices';

const FeatureCards = () => {
  const [cards, setCards] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    if (loggedInUserId) {
      addServices.fetchPollsByUser(loggedInUserId)
        .then(response => {
          const fetchedCards = response.map(poll => ({
            pollId: poll.pollId,
            pollType: poll.pollType,
            question: poll.question,
            option1: poll.option1,
            option2: poll.option2,
            option3: poll.option3,
            option4: poll.option4,
            option5: poll.option5,
            fontFamily: poll.fontFamily,
            fontSize: poll.fontSize,
            fontColor: poll.fontColor,
            backgroundColor: poll.backgroundColor,
            pollCategory: poll.pollCategory,
            rating: poll.rating,
            yesValue: poll.yesValue,
            noValue: poll.noValue,
            matrixColumns: poll.matrixColumns,
            matrixRows: poll.matrixRows,
            images: poll.images
          }));
          fetchedCards.sort((a, b) => b.pollId - a.pollId); // Sort cards in descending order by pollId
          setCards(fetchedCards);
        })
        .catch(error => {
          console.error('There was an error fetching the polls!', error);
        });
    }
  }, []);

  const loadMore = () => {
    if (visibleCount >= cards.length) {
      setHasMore(false);
      return;
    }
    setVisibleCount(prevCount => prevCount + 2); // Load 2 more polls
  };

  return (
    <section className="feature-cards-container">
      {cards.slice(0, visibleCount).map(card => (
        <div key={card.pollId} className="polling-card-item" style={{ fontFamily: card.fontFamily, fontSize: `${card.fontSize}px`, color: card.fontColor, backgroundColor: card.backgroundColor }}>
          <div className="poll-title" style={{ fontSize: `${card.fontSize}px` }}>
            <strong>{card.question}</strong>
          </div>
          <PollOptions pollDetails={card} />
          <div className="card-button-group">
            <button className="change-button-class">Change</button>
            <button className="delete-button-class">Delete</button>
          </div>
        </div>
      ))}
      <div className="button-container">
        <button className="show-more-button" onClick={loadMore}>
          {hasMore ? '+' : 'X'}
        </button>
        {!hasMore && <div className="no-more-polls-message">No more polls to display</div>}
      </div>
    </section>
  );
};

export default FeatureCards;
