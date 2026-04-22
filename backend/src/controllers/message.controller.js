const {
  sendMessage,
  getMessagesByChatId,
} = require("../services/message.service");

const sendMessageController = async (req, res) => {
  try {
    const { chatId, content } = req.body;

    const message = await sendMessage({
      senderId: req.user.userId,
      chatId,
      content,
    });

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMessagesController = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await getMessagesByChatId(chatId);

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendMessageController,
  getMessagesController,
};