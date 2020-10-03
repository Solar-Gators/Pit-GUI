var app = require("./config/app");
var sockets = require("./config/socket.js");
var server = app.start();
sockets.io.on("connection", (socket) => {
  console.log("New connection.");
  socket.on("clicked", () => {
    console.log("Clicked.");
  });
  socket.on("greet", function (data) {
    console.log(data);
    socket.emit("respond", { hello: "Hey, Mr.Client!" });
  });
  socket.on("disconnect", function () {
    console.log("Socket disconnected");
  });
});
