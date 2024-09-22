import { createClient, RedisClientType } from "redis";
let redisClient: RedisClientType;

console.log("Initiating redis server connection.");
redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT as unknown as number,
    },
});
redisClient.on("error", (err: any) => {
    console.error("Redis connection, Error : ", err.message);
});
redisClient.on("connect", () => {
    console.log("Redis Client Trying to Establish Connection.");
});
redisClient.on("ready", () => {
    console.log("Redis Client Connection Established.");
});
redisClient.on("end", () => {
    console.log("Redis Client Ended.");
});
redisClient.on("reconnecting", () => {
    console.debug("Redis Client Reconnecting.");
});
redisClient.connect();

console.debug("Redis connection established.");

export default redisClient;
