const Message = require("../models/message.model");
const Chat = require("../models/chat.model");

const sendMessage = async ({ senderId, chatId, content }) => {
  if (!chatId || !content) {
    throw new Error("ChatId and content are required");
  }

  const message = await Message.create({
    sender: senderId,
    chat: chatId,
    content,
    seenBy: [senderId],
  });

  const fullMessage = await Message.findById(message._id)
    .populate("sender", "-password")
    .populate("chat");

  await Chat.findByIdAndUpdate(chatId, {
    latestMessage: fullMessage._id,
  });

  return fullMessage;
};

const getMessagesByChatId = async (chatId) => {
  if (!chatId) {
    throw new Error("ChatId is required");
  }

  const messages = await Message.find({ chat: chatId })
    .populate("sender", "-password")
    .populate("chat")
    .sort({ createdAt: 1 });

  return messages;
};

module.exports = {
  sendMessage,
  getMessagesByChatId,
};