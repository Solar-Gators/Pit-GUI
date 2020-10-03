var config = require("./app-config"),
  express = require("./express"); // refers to express.js file in our application not Express the Middleware helper for Node.js
const socketio = require("socket.io");
var sockets = require("./socket.js");
const http = require("http");
module.exports.start = function () {
  var app = express.init();
  const server = http.createServer(app);
  sockets.io = socketio(server);
  sockets.sessionNamespace = sockets.io.of("/session");
  sockets.dataNamespace = sockets.io.of("/live");
  sockets.io.on("connection", (socket) => {
    console.log("New connection.");
  });
  server.listen(config.port, function () {
    console.log("App.js file is listening on port", config.port);
  });
};
