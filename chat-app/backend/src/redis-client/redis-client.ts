import { createClient, RedisClientType } from "redis";

export const initRedis = async () => {
  const redis = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
  });

  redis.on("error", (err: Error) => console.error("Redis Client Error", err));

  await redis.connect();
  console.log("Connected to Redis");
  return redis;
};

export type RedisClient = Awaited<ReturnType<typeof initRedis>>;