// src/App.js
import React, { useState, useEffect } from 'react';
import Dashboard from './dashboard';
import Login from './login';
import Register from './register';
import Login2 from './login2';

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for a stored token on component mount
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (newToken) => {
    // Set the token in the state and store it in localStorage
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    // Clear the token from the state and localStorage
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <div>
      {token ? (
        < token={token} onLogout={handleLogout} />
      ) : (
        <div>
          <Login setToken={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default App;
