import React from 'react';

function LoginForm({ username, password, setUsername, setPassword, onLogin }) {
  return (
    <div className="login-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onLogin}>Login</button>
    </div>
  );
}

export default LoginForm;
