const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://madhukar:madhukar@aith.iebemsz.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Schema definition
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'faculty', 'student'],
    required: true,
  },
});

// Hashing password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

const User = mongoose.model('User', userSchema);

// Secret key for JWT
const secretKey = 'yourSecretKey';

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

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { name, username, password, role } = req.body;

    // Validate input
    if (!name || !username || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({
      name,
      username,
      password,
      role,
    });

    await newUser.save();
    const accessToken = jwt.sign({ id: newUser._id, username: newUser.username, role: newUser.role }, secretKey);
    res.json({ accessToken });
  } catch (error) {
    console.error('Registration failed:', error.message);
    res.status(500).json({ error: 'Registration failed' });
  }
});
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If authentication is successful, generate and return a JWT token
    const accessToken = jwt.sign({ id: user._id, username: user.username, role: user.role }, secretKey);
    res.json({ accessToken });
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
});
app.get('/user-data', authenticateToken, (req, res) => {
  // Fetch user data from the database or other data source
  // In this example, we'll send back dummy data
  const userData = {
    username: req.user.username,
    role: req.user.role,
  };
  res.json(userData);
});

// ... (remaining code)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
