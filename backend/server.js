var app = require("./config/app");
var sockets = require("./config/socket.js");
var server = app.start();
//include db models
var models = require("./models");
// Main socket
sockets.io.on("connection", (socket) => {
  socket.emit("default", () => {
    // query the db to see if the db
  });
  socket.on("session-start", async (name) => {
    // save the session name to the database
    let session = await models.Session.create({
      name: name,
      start: new Date(),
    });
    socket.emit("session-started", { session: session.id });
  });
  socket.on("greet", function (data) {
    console.log(data);
    socket.emit("respond", { hello: "Hey, Mr.Client!" });
  });
  socket.on("disconnect", function () {
    console.log("Socket disconnected");
  });
});
// Session socket
sockets.sessionNamespace.on("connection", () => {
  console.log("Session client connected");
});
