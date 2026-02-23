const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
  const { keywords } = req.body;

  const keywordArray = keywords.split(',');

  const placeholders = keywordArray.map(() => '?').join(',');

  const query1 = `
    SELECT * FROM room_rental_registrations_apartment
    WHERE country IN (${placeholders})
       OR city IN (${placeholders})
       OR address IN (${placeholders})
  `;

  const query2 = `
    SELECT * FROM room_rental_registrations
    WHERE country IN (${placeholders})
       OR city IN (${placeholders})
       OR address IN (${placeholders})
  `;

  const params = [...keywordArray, ...keywordArray, ...keywordArray];

  const [data1] = await pool.query(query1, params);
  const [data2] = await pool.query(query2, params);

  res.json([...data1, ...data2]);
});

module.exports = router;
