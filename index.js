const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const color = ["FF0000", "FFA500", "FFFF00", "808000"];
const connections = [];
var id = 0;

io.on("connection", (socket) => {
  socket.on("cordinate", (x, y) => {
    if (!connections.includes(socket.id)) {
      connections.push(socket.id);
    }
    // console.log(connections);
    socket.broadcast.emit(
      "cordinate",
      connections.indexOf(socket.id),
      color[connections.indexOf(socket.id) % 4],
      x,
      y
    );
  });

  socket.on("disconnect", (reason) => {
    // console.log(socket.id+'user disconnected');
    socket.broadcast.emit("dis", socket.id);
  });

  socket.on("myClick", (data) => {
    console.log("myClick in server.js");
    // console.log(socket);
    // console.log(data);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
