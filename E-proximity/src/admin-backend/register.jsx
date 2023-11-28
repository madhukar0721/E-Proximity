// src/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ setToken }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role is student

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      const response = await axios.post('http://localhost:3000/register', {
        name,
        username,
        password,
        role,
      });

      const { accessToken } = response.data;
      setToken(accessToken);
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <div>
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="faculty">Faculty</option>
          <option value="student">Student</option>
        </select>
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
