import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connect", socket => {
    socket.emit("myKey", socket.id);
    socket.join("room");

    socket.on("sendMessage", message => {
        socket.broadcast.to("room").emit("sentMessage", message);
    });

});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log("Listening to PORT : " + PORT));