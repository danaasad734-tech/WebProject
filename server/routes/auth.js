const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');


router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error("Register Error:", err.message); 
        res.status(500).json({ message: err.message }); 
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });
 
        req.session.userId = user._id;
        res.json({ message: "Logged in successfully!", user: { username: user.username } });
    } catch (err) {
        console.error("Login Error:", err.message); 
        res.status(500).json({ message: err.message });
    }
});
 
router.post("/logout", (req, res) => {
      req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;