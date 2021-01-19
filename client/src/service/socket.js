import io from "socket.io-client";
export const socket = io("ws://localhost:8080", { transports: ["websocket"] }); //TODO Should make it adaptable
export const sessionSocket = io("ws://localhost:8080/session");
