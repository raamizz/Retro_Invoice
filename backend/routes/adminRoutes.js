const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/admin/signup", adminController.signUp);

module.exports = router; 