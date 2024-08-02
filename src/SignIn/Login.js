import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.get('http://localhost:8080/api/users/fetch');
      const user = response.data.find((user) => user.username === username);
      if (user) {
        if (user.password === password) {
          localStorage.setItem('loggedInUserId', user.userId);
          setSuccess(true);
          navigate('/userDashboard'); // Redirect to dashboard on successful login
        } else {
          setError('Invalid username or password');
          setSuccess(false);
        }
      } else {
        setError('Invalid username or password');
        setSuccess(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while logging in. Please try again later.');
      setSuccess(false);
    }
  };

  return (
    <div className='sphere'>
      <div className="login-container">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <br />
      </div>
      <div>
        <h2>If you don't have an account</h2>
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}

export default Login;
