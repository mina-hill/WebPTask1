// server.js
const express = require('express');
const session = require('express-session');
const routes = require('./routes/routes');

const app = express();

// Middleware
app.use(express.json());
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true
}));

// Routes
app.use('/', routes);

// Start Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});