// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ token }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user-data', {
          headers: {
            Authorization: token,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error.message);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <div>
      <h2>Dashboard</h2>
      {userData && userData.role === 'student' ? (
        <div>
          <p>Welcome, {userData.username}!</p>
          {/* Display other user-related information for students */}
        </div>
      ) : (
        <p>You do not have access to the dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
