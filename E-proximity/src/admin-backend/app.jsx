// src/App.js
import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './register';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <div>
      {token ? (
        <Dashboard token={token} />
      ) : (
        <div>
          <Login setToken={setToken} />
          <Register setToken={setToken} />
        </div>
      )}
    </div>
  );
};

export default App;
