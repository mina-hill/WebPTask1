const express = require('express');
const session = require('express-session');
const sessionRoutes = require('./routes/sessionRoutes');

const app = express();

app.use(session({
    secret: "gggggghhhhhh",
    resave: false,
    saveUninitialized: false
}));

app.use('/session', sessionRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});