import { createServer } from "http";
import { Server } from "socket.io";
import express, { Response } from "express";
import dotenv from "dotenv";
import { initRedis } from "./redis-client/redis-client";
import { initController } from "./controller/controller";
import { initChatSocket } from "./chat-socket/chat-socket";

const initApp = async () => {
  dotenv.config();
  
  const app = express();
  initController(app)

  const redis = await initRedis()
  
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  initChatSocket(io, redis);
  
  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
}

initApp()