const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// different values of room creates different rooms
const room = "afasds";

app.get("/", (req, res) => {
  res.send("I am on!!!");
});

app.get("/name", (req, res) => {
  res.send("Abhishek Sharma");
});

// server
io.on("connection", socket => {
  // new socket requests to join room
  socket.on("join-room", userId => {
    // server joins client to room
    socket.join(room);
    // server sends a message to all in room except current user that a new user is connected
    socket.to(room).broadcast.emit("user-connected", userId);
    // tell everyone a user has left
    socket.on("disconnect", () => {
      socket.to(room).broadcast.emit("user-disconnected", userId);
    });
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server Running at port: ${PORT}`));
