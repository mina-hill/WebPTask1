// server.js (AI Generated)
const express = require('express');
const session = require('express-session');
const routes = require('./routes/routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'myStrongSecretKey123!',
  resave: false,
  saveUninitialized: false,   // don't save empty sessions
  cookie: {
    httpOnly: true,           // prevents JS access to cookie
    maxAge: 1000 * 60 * 60    // session expires after 1 hour
  }
}));

// Routes
app.use('/', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
