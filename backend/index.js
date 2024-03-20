const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Secret key for JWT
const secretKey = 'yourSecretKey';

// Sample user data (replace this with your user data)
const users = [
  { id: 1, username: 'admin', password: 'adminpass', role: 'admin' },
  { id: 2, username: 'faculty', password: 'facultypass', role: 'faculty' },
  { id: 3, username: 'student', password: 'studentpass', role: 'student' },
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.sendStatus(401);

  const accessToken = jwt.sign(user, secretKey);
  res.json({ accessToken });
});

app.get('/admin', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  res.json({ message: 'Admin resource' });
});

app.get('/faculty', authenticateToken, (req, res) => {
  if (req.user.role !== 'faculty') return res.sendStatus(403);
  res.json({ message: 'Faculty resource' });
});

app.get('/student', authenticateToken, (req, res) => {
  if (req.user.role !== 'student') return res.sendStatus(403);
  res.json({ message: 'Student resource' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
