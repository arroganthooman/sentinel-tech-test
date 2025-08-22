// server.ts
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // sesuaikan dengan FE lo
  },
});

interface ChatMessage {
  username: string;
  message: string;
  timestamp: number;
}

const rooms: Record<string, ChatMessage[]> = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", ({ username, room }) => {
    socket.join(room);
    console.log(`${username} joined room ${room}`);

    // Kirim history
    if (rooms[room]) {
      socket.emit("chatHistory", rooms[room]);
    } else {
      rooms[room] = [];
    }
  });

  socket.on("sendMessage", ({ username, room, message }) => {
    const chatMessage: ChatMessage = {
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




// import express from 'express';
// import http from 'http';
// import { Server, Socket } from 'socket.io';
// import { nanoid } from 'nanoid';

// interface ChatMessage {
//   id: string;
//   user: string;
//   text: string;
//   ts: number;
// }

// interface ClientToServerEvents {
//   chat: (msg: { user: string; text: string }) => void;
// }

// interface ServerToClientEvents {
//   chat: (msg: ChatMessage) => void;
// }

// const app = express();
// const server = http.createServer(app);

// const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
//   cors: { origin: '*' },
// });

// io.on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
//   console.log('🔌 A user connected:', socket.id);

//   socket.on('chat', (msg) => {
//     const payload: ChatMessage = {
//       id: nanoid(),
//       user: msg.user || 'Anonymous',
//       text: msg.text,
//       ts: Date.now(),
//     };

//     io.emit('chat', payload);
//   });

//   socket.on('disconnect', () => {
//     console.log('❌ User disconnected:', socket.id);
//   });
// });

// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () => {
//   console.log(`✅ Socket.IO server running at http://localhost:${PORT}`);
// });
