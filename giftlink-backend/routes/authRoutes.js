const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const connectToDatabase = require('../models/db');

const router = express.Router();

const secret = process.env.JWT_SECRET || 'setasecret';

// Registers a new user and returns a token
router.post('/register', async (req, res, next) => {
  try {
    const { username, password, email, first_name, last_name } = req.body;

    if (!username || !password || !email || !first_name || !last_name) {
      return res.status(400).json({
        message: 'username, password, email, first_name and last_name are required',
      });
    }

    if (username.length < 4 || username.length > 20) {
      return res
        .status(400)
        .json({ message: 'The username length must be between 4 and 20 characters' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ message: 'The email format is not valid' });
    }

    const db = await connectToDatabase();
    const users = db.collection('users');

    const existing = await users.findOne({ username });
    if (existing) {
      return res.status(409).json({ message: 'An account with that username already exists' });
    }

    const existingEmail = await users.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: 'An account with that email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = crypto.randomUUID();
    const doc = {
      _id: userId,
      user_id: userId,
      username,
      first_name,
      last_name,
      email,
      password: hashedPassword,
      created_at: Date.now(),
    };

    const result = await users.insertOne(doc);
    const token = jwt.sign({ user_id: userId, username }, secret, { expiresIn: '2h' });

    res.status(201).json({
      success: true,
      id: result.insertedId,
      username,
      email,
      token,
    });
  } catch (error) {
    next(error);
  }
});

// Logs in an existing user and returns a token
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'A username and password are required to log in' });
    }

    const db = await connectToDatabase();
    const users = db.collection('users');

    const user = await users.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ user_id: user.user_id, username }, secret, { expiresIn: '2h' });

    res.status(200).json({
      success: true,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    next(error);
  }
});

// Updates the signed-in user's own profile
router.put('/update', async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'A valid Bearer token is required' });
    }

    const token = authHeader.split(' ')[1];
    let payload;
    try {
      payload = jwt.verify(token, secret);
    } catch (e) {
      return res.status(401).json({ message: 'The token is invalid or has expired' });
    }

    const { first_name, last_name, email } = req.body;

    if (!first_name && !last_name && !email) {
      return res
        .status(400)
        .json({ message: 'Provide at least one of first_name, last_name or email to update' });
    }

    const db = await connectToDatabase();
    const users = db.collection('users');

    const updates = {};
    if (first_name) updates.first_name = first_name;
    if (last_name) updates.last_name = last_name;
    if (email) updates.email = email;

    const result = await users.updateOne({ user_id: payload.user_id }, { $set: updates });

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'No user found for that token' });
    }

    res.status(200).json({ success: true, updated: result.modifiedCount });
  } catch (error) {
    next(error);
  }
});

module.exports = router;