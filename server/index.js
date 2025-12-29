const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo').default || require('connect-mongo'); 
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data'); 

const requestLogger = require('./middleware/requestlogger');

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

const mongoUrl = process.env.MONGO_URI;
mongoose.connect(mongoUrl)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Connection Error: ", err));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: mongoUrl,
        collectionName: 'sessions'
    }),
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24, 
        httpOnly: true,
        secure: false 
    }
}));
app.use(requestLogger);
app.use('/api/auth', authRoutes);
app.use('/api/items', dataRoutes); 

app.get('/hello', (req, res) => {
    res.send("Hello from my server ✅");
});

app.listen(5000, () => console.log('Server running on port 5000'));