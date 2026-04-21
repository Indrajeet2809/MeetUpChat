const dotenv = require("dotenv").config();
const connectDB = require("./src/config/db");
const app = require("./src/app");
const http = require("http")
const { Server } = require("socket.io")


const PORT = process.env.PORT || 8000;

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});