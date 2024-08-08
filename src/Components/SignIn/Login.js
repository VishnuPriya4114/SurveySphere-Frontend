import React, { useState } from 'react';
import './login.css'; // Updated CSS file name
import { useNavigate } from 'react-router-dom';
import addServices from '../../Services/addServices';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await addServices.fetchUsers();
      const user = response.find((user) => user.username === username);
      if (user) {
        if (user.password === password) {
          localStorage.setItem('loggedInUserId', user.userId);
          setSuccess(true);
          navigate('/userDashboard');
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
    <div className='background-container'>
      <div className="login-box">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
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
          <div className="input-group">
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
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className='login-btn'>Login</button>
        </form>
        <br />
        <div>
          <h4>If you don't have an account</h4>
          <button className='signup-btn' onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
