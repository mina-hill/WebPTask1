// routes.js (AI Generated)
const express = require('express');
const router = express.Router();
const User = require('../User');

// Authentication Middleware
function authMiddleware(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send('Access denied. Please login.');
  }
}

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
    if (password.length < 4) {
      return res.status(400).send('Password must be at least 4 characters');
    }

    const user = new User(username.trim(), password);
    const message = await user.register();
    res.send(message);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error during registration');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }

    const user = new User(username.trim(), password);
    const foundUser = await user.login();

    if (foundUser) {
      req.session.user = username.trim();
      res.send('Login successful');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error during login');
  }
});

// Dashboard Route (Protected)
router.get('/dashboard', authMiddleware, (req, res) => {
  res.send(`Welcome ${req.session.user}`);
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.send('Logout successful');
  });
});

module.exports = router;
