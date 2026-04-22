const express = require("express");
const {
  sendMessageController,
  getMessagesController,
} = require("../controllers/message.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, sendMessageController);
router.get("/:chatId", authMiddleware, getMessagesController);

module.exports = router;