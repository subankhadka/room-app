const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hash]
  );

  res.json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  if (rows.length === 0) return res.status(401).json({ error: 'User not found' });

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(401).json({ error: 'Wrong password' });

  req.session.user = user;
  res.json({ message: 'Login successful', user });
});

module.exports = router;
