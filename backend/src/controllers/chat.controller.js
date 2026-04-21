const {
  accessChat,
  getUserChats,
} = require("../services/chat.service");

const accessChatController = async (req, res) => {
  try {
    const { userId } = req.body;

    const chat = await accessChat(req.user.userId, userId);

    res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getChatsController = async (req, res) => {
  try {
    const chats = await getUserChats(req.user.userId);

    res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  accessChatController,
  getChatsController,
};