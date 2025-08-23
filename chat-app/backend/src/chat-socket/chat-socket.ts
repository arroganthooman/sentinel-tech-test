import { Server, Socket } from "socket.io";
// import { RedisClientType } from "redis";
import { ChatMessage } from "../interfaces/interfaces";
import { RedisClient } from "../redis-client/redis-client";

export const initChatSocket = (io: Server, redis: RedisClient) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", async ({ username, room }) => {
      socket.join(room);
      console.log(`${username} joined room ${room}`);

      // Get chat history from Redis
      const history = await redis.lRange(`room:${room}`, 0, -1);
      const parsedHistory = history.map((msg: string) => JSON.parse(msg));
      socket.emit("chatHistory", parsedHistory);
    });

    socket.on("sendMessage", async ({ username, room, message }) => {
      const chatMessage: ChatMessage = {
        username,
        message,
        timestamp: Date.now(),
      };

      console.log(`${username} sends a message: ${message}`);

      // Push message to Redis (list)
      await redis.rPush(`room:${room}`, JSON.stringify(chatMessage));

      // Emit message to room
      io.to(room).emit("receiveMessage", chatMessage);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
