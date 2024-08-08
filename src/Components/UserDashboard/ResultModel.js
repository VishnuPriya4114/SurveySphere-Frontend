import React, { useEffect, useState } from 'react';
import './ResultModel.css';
import addServices from '../../Services/addServices';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ResultModel = ({ pollId, onClose }) => {
  const [pollDetails, setPollDetails] = useState({
    type: '',
    options: [],
    optionCounts: {},
    comments: [],
  });

  useEffect(() => {
    const fetchPollDetails = async () => {
      try {
        const pollData = await addServices.fetchPollById(pollId);
        const { pollType, option1, option2, option3, option4, option5 } = pollData;
        const publicPollData = await addServices.fetchPublicPollById(pollId);

        const optionCounts = {};
        if (pollType === 'Yes/No Polls') {
          optionCounts['Yes'] = 0;
          optionCounts['No'] = 0;
        } else if (pollType === 'Rating Polls') {
          for (let i = 1; i <= 5; i++) {
            optionCounts[i] = 0;
          }
        } else {
          [option1, option2, option3, option4, option5].forEach(option => {
            if (option) {
              optionCounts[option] = 0;
            }
          });
        }

        const comments = [];
        publicPollData.forEach(response => {
          if (pollType === 'Poll with Comments') {
            comments.push(response.response);
          } else {
            const selectedOptions = pollType === 'Multiple Choice Polls'
              ? response.response.split(',').map(option => option.trim())
              : [response.response];

            selectedOptions.forEach(option => {
              if (optionCounts.hasOwnProperty(option)) {
                optionCounts[option]++;
              }
            });
          }
        });

        setPollDetails({
          type: pollType,
          options: [option1, option2, option3, option4, option5].filter(option => option),
          optionCounts,
          comments,
        });
      } catch (error) {
        console.error('There was an error fetching the poll details!', error);
      }
    };

    if (pollId) {
      fetchPollDetails();
    }
  }, [pollId]);

  const getChartData = () => {
    const labels = [];
    const data = [];

    if (pollDetails.type === 'Yes/No Polls') {
      labels.push('Yes', 'No');
      data.push(pollDetails.optionCounts['Yes'] || 0, pollDetails.optionCounts['No'] || 0);
    } else if (pollDetails.type === 'Rating Polls') {
      for (let i = 1; i <= 5; i++) {
        labels.push(i);
        data.push(pollDetails.optionCounts[i] || 0);
      }
    } else if (pollDetails.type === 'Poll with Comments') {
      // Comments are not represented as a bar chart
      return null;
    } else {
      labels.push(...pollDetails.options);
      data.push(...Object.values(pollDetails.optionCounts));
    }

    return {
      labels,
      datasets: [
        {
          label: 'Poll Results',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="simple-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Poll Result for ID: {pollId}</h2>
        <p>Type: {pollDetails.type || 'No type available'}</p>

        {pollDetails.type === 'Poll with Comments' ? (
          <div>
            {pollDetails.comments.length > 0 ? (
              <ul>
                {pollDetails.comments.map((comment, index) => (
                  <li key={index}>{index + 1}. {comment}</li>
                ))}
              </ul>
            ) : (
              <p>No comments available for this poll.</p>
            )}
          </div>
        ) : (
          <div style={{ width: '100%', height: '400px' }}>
            {getChartData() ? (
              <Bar data={getChartData()} options={chartOptions} />
            ) : (
              <p>No data available for chart.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultModel;
