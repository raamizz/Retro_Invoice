const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")
const authenticateToken = require('../middleware/auth');

router.post("/user/signup", userController.signUp);
router.post("/user/login", userController.login);
router.get("/user/details", authenticateToken, userController.getUserDetails);

module.exports = router;


