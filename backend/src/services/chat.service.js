const Chat = require("../models/chat.model");

const accessChat = async (currentUserId, userId) => {
  if (!userId) {
    throw new Error("UserId is required");
  }

  let chat = await Chat.findOne({
    isGroupChat: false,
    participants: { $all: [currentUserId, userId] },
  })
    .populate("participants", "-password")
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "-password",
      },
    });

  if (chat) {
    return chat;
  }

  const newChat = await Chat.create({
    isGroupChat: false,
    participants: [currentUserId, userId],
  });

  const fullChat = await Chat.findById(newChat._id).populate(
    "participants",
    "-password"
  );

  return fullChat;
};

const getUserChats = async (userId) => {
  const chats = await Chat.find({
    participants: { $in: [userId] },
  })
    .populate("participants", "-password")
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "-password",
      },
    })
    .sort({ updatedAt: -1 });

  return chats;
};

module.exports = {
  accessChat,
  getUserChats,
};