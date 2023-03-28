require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const messages = require("./messages.js");
const { Server } = require("socket.io");

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.LOCAL_HOST,
  },
});

const PORT = process.env.PORT || 3001;

io.on("connection", (socket) => {
  console.log("a user connected");

  messages.onSocket(socket);

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
