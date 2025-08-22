import { createServer } from "http";
import { Server } from "socket.io";
import express, { Response } from "express";
import dotenv from "dotenv";

dotenv.config()

const app = express();

app.get("/health", (req: any, res: Response) => {
  console.log("masuk health check")
  res.json({
    "status": "healthy"
  })
})

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
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

    console.log(`${username} sends a message: ${message}`)

    rooms[room].push(chatMessage);
    io.to(room).emit("receiveMessage", chatMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log("Server running on port 3001");
});