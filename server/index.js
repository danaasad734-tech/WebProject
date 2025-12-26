// index.js
const authRoutes = require('./routes/auth');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo').default; 
require('dotenv').config();
const requestLogger = require('./middleware/requestlogger');

const app = express();
app.use(requestLogger);
app.use(express.json());
app.use('/api/auth', authRoutes);

const mongoUrl = process.env.MONGO_URI;
app.use(session({
    secret: 'sara_secret',
    resave: false,
    saveUninitialized: false,

store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
}),
   cookie: { 
    maxAge: 1000 * 60 * 60 * 24, 
    httpOnly: true,
    secure: false 
}
}));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Connection Error: ", err));

 app.use('/api/auth', authRoutes);

app.get('/hello', (req, res) => {
    res.send("Hello from my server ✅");
});

app.listen(5000, () => console.log(' Server running on port 5000'));