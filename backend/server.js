const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./config/database")
const userRoutes = require("./controllers/userController")
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use("/api",userRoutes)
app.use("/api", adminRoutes);

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