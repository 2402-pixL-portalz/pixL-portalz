const express = require('express');
const router = express.Router();
const { registerUser, authenticateUser } = require('../db/user');

// Test endpoint
router.get("/test", (req, res) => {
  res.send("TESTING");
});

// User registration
router.post('/register', async (req, res) => {
  try {
    const user = await registerUser(req.body.username, req.body.password);
    res.status(201).json(user); // Return user data as JSON with status 201
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ message: error.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const user = await authenticateUser(req.body.username, req.body.password);
    res.status(200).json(user); // Return user data as JSON with status 200
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;