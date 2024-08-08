import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
const API_URL_USERS = `${API_URL}/users`;
const API_URL_POLLS = `${API_URL}/polls`;
const API_URL_PUBLIC_POLLS = `${API_URL}/public-polls`;
const API_URL_PUBLIC = `${API_URL}/public`;

const getUserName = async (userId) => {
  try {
    const response = await axios.get(`${API_URL_USERS}/${userId}`);
    return response.data.username;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL_USERS}/fetch`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL_USERS}/add`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const fetchPollsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL_POLLS}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching polls by user:', error);
    throw error;
  }
};

const fetchPollById = async (pollId) => {
  try {
    const response = await axios.get(`${API_URL_POLLS}/${pollId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching poll by ID:', error);
    throw error;
  }
};

const createPoll = async (pollData) => {
  try {
    const response = await axios.post(API_URL_POLLS, pollData);
    return response.data;
  } catch (error) {
    console.error('Error creating poll:', error);
    throw error;
  }
};

const fetchPollsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL_POLLS}/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching polls by category:', error);
    throw error;
  }
};

const submitPollResponse = async (data) => {
  try {
    const response = await axios.post(API_URL_PUBLIC_POLLS, data);
    return response.data;
  } catch (error) {
    console.error('Error submitting poll response:', error);
    throw error;
  }
};

const fetchPublicPollById = async (pollId) => {
  try {
    const response = await axios.get(`${API_URL_PUBLIC_POLLS}/polls/${pollId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching public poll by ID:', error);
    throw error;
  }
};

const fetchPublicUsers = async () => {
  try {
    const response = await axios.get(API_URL_PUBLIC);
    return response.data;
  } catch (error) {
    console.error('Error fetching public users:', error);
    throw error;
  }
};

const addUser = async (nickname, age) => {
  try {
    const response = await axios.post(API_URL_PUBLIC, { nickname, age: parseInt(age, 10) });
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export default {
  getUserName,
  fetchUsers,
  createUser,
  fetchPollsByUser,
  fetchPollById,
  createPoll,
  fetchPollsByCategory,
  submitPollResponse,
  fetchPublicPollById,
  fetchPublicUsers,
  addUser
};
