// server.js
const express = require('express');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

// Sample API route
app.get('/api/playing', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM playing_with_neon');
      res.json(result.rows);
    } catch (err) {
      console.error('DB error:', err.message);
      res.status(500).send('Something went wrong');
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
