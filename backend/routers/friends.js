const express = require("express");
const friendsController = require("../controllers/friends");
const router = express.Router();

router.get("/friend", friendsController.allFriends);

module.exports = router;
