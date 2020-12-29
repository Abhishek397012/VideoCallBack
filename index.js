const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://we-meet-demo.herokuapp.com/",
    methods: ["GET", "POST"],
  },
});

const room = "afasds";

app.get("/", (req, res) => {
  res.send("I am on!!!");
});

app.get("/name", (req, res) => {
  res.send("Abhishek Sharma");
});

io.on("connection", socket => {
  socket.on("join-room", userId => {
    console.log("userConneted with id: ", userId); // debuging
    socket.join(room);
    socket.to(room).broadcast.emit("user-connected", userId);
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server Running at port: ${PORT}`));
