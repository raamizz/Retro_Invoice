const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")

router.post("/user/signup", userController.signUp);
router.post("/user/login", userController.login);
router.get("/user/details", userController.getUserDetails);
router.post("/user/refresh-token", userController.refreshToken);

module.exports = router;
