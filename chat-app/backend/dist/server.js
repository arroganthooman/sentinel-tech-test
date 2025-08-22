"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // sesuaikan dengan FE lo
    },
});
const rooms = {};
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("joinRoom", ({ username, room }) => {
        socket.join(room);
        console.log(`${username} joined room ${room}`);
        // Kirim history
        if (rooms[room]) {
            socket.emit("chatHistory", rooms[room]);
        }
        else {
            rooms[room] = [];
        }
    });
    socket.on("sendMessage", ({ username, room, message }) => {
        const chatMessage = {
            username,
            message,
            timestamp: Date.now(),
        };
        rooms[room].push(chatMessage);
        io.to(room).emit("receiveMessage", chatMessage);
    });
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
server.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
