import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Reuse the same CSS for consistency

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });
      if (response.status === 201) {
        alert('Registration successful');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed', error);
      alert('Username already taken');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <h1 className="login-title">Register</h1>
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
        <button onClick={handleRegister} className="login-button">Register</button>
        <button onClick={handleBackToLogin} className="register-button">Back to Login</button>
      </div>
    </div>
  );
}

export default Register;



