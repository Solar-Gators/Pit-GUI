var app = require("./config/app");
var sockets = require("./config/socket.js");
var server = app.start();
var models = require("./models");
let blocked = false;
let session;

// Main socket
sockets.io.on("connection", (socket) => {
    console.log("New connection.");
    socket.on("session-button-start", async () => {
        if(blocked == false){
            console.log("session-button-start");
            session = await models.session.create({
                //start: new Date().toTimeString()
                start: new Date()
            });
            socket.emit("session-server-created", { id: session.id });
            blocked = true;
        }
        else{
            socket.emit("session-button-blocked");
        }
    });
    socket.on("session-button-end", (data) => {
        console.log("session-button-end");
        session.update({ 
            name: data.name,
            //end: new Date().toTimeString()
            end: new Date()
        });
        blocked = false;
    });
    socket.on("disconnect", () => {
        console.log("Socket disconnected");
    });
});

// Session socket
sockets.sessionNamespace.on("connection", () => {
    console.log("Session client connected");
});
