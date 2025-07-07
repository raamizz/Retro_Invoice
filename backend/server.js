const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./config/database")
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const invoiceRoutes = require('./routes/invoiceRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use("/api",userRoutes)
app.use("/api", adminRoutes);
app.use("/api", userRoutes); 
app.use('/api/invoices', invoiceRoutes);

pool.connect()
  .then(() => {
    console.log("Connected to PostGre");
    app.listen(PORT, '192.168.0.172', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("PostGre connection failed:", err.message);
  });