const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.post("/user/signup", userController.signup);
router.post("/user/login", userController.login);
module.exports = router;
