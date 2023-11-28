import React, { useState } from 'react';
import Login from './login';
import Dashboard from './dashboard';
import Register from './register';
import Student from '../student2/StudentDashBoard'

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
