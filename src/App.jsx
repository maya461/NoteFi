import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <Router>
      <div>
        {/* Header with light/dark mode toggle */}

      


        <header
          style={{
            backgroundColor: darkMode ? 'var(--header-bg-dark)' : 'var(--header-bg-light)', 
            color: darkMode ? 'var(--text-color)' : 'var(--text-color)',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1 style={{ margin: 0  , fontFamily: 'Libre Baskerville, serif'}}>NoteFi</h1>
          {/* theme toggle button */}
          <button
            onClick={toggleDarkMode}
            className="theme-toggle-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
            }}
          >
            {darkMode ? <NightlightIcon style={{color:'whitesmoke'}} /> : <LightModeIcon />}
          </button>
        </header>

        {/* Routes */}
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
      </Routes>

      </div>
    </Router>
  );
}

export default App;
