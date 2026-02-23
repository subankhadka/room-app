const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
  const {
    fullname, email, mobile, city, address,
    rooms, rent, deposit, description
  } = req.body;

  await pool.query(`
    INSERT INTO room_rental_registrations
    (fullname, email, mobile, city, address, rooms, rent, deposit, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    fullname, email, mobile, city, address,
    rooms, rent, deposit, description
  ]);

  res.json({ message: 'Property registered successfully' });
});

module.exports = router;
