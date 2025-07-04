import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import axios from 'axios';
import './Login.css';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Handle login action
  const handleLogin = async () => {
    console.log('Logging in with', username, password); // Check what is being sent
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      if (response.status === 200) {
        localStorage.setItem('userId', response.data.userId); // Store userId on login
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid credentials'); // Show alert for invalid login
    }
  };
  

  // Handle navigation to the register page
  const handleRegister = () => {
    navigate('/register'); // Redirect to register page when clicked
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <h1 className="login-title">WELCOME *_*</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
        />
        <button onClick={handleLogin} style={{fontFamily : 'cursive'}} className="login-button">Login</button>
        <button onClick={handleRegister} style={{fontFamily :  'cursive'}} className="register-button">Register</button>
      </div>
    </div>
  );
  
  
}

export default Login;

