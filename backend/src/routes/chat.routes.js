const express = require("express");
const {
  accessChatController,
  getChatsController,
} = require("../controllers/chat.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, accessChatController);
router.get("/", authMiddleware, getChatsController);

module.exports = router;