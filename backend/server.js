const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./config/database")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

pool.connect()
  .then(() => {
    console.log("Connected to PostGre");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("PostGre connection failed:", err.message);
  });
