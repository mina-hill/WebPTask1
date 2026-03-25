// routes.js
const express = require('express');
const router = express.Router();

const User = require('../User');

// Authentication Middleware
function authMiddleware(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.send('Access denied. Please login.');
  }
}

// Register Route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User(username, password);
  const message = await user.register();
  res.send(message);
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = new User(username, password);
  const foundUser = await user.login();

  if (foundUser) {
    req.session.user = username;
    res.send('Login successful');
  } else {
    res.send('Invalid username or password');
  }
});

// Dashboard Route (Protected)
router.get('/dashboard', authMiddleware, (req, res) => {
  res.send(`Welcome ${req.session.user}`);
});

// Logout Route added wowww
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('Logout successful');
  });
});

module.exports = router;