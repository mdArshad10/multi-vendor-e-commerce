import Redis from "ioredis"
import { env } from "../config/createEnv";

let redis: Redis | null = null;


export const getRedisClient = (): Redis => {
    if (!redis) {
        redis = new Redis(env.REDIS_URL, { lazyConnect: true });

        redis.on('error', (error) => {
            console.error({ err: error }, 'Redis connection error');
        });

        redis.on('connect', () => {
            console.info('Redis connection established');
        });

        redis.on('reconnect', () => {
            console.info('Redis reconnecting...');
        });

        redis.on('close', () => {
            console.warn('Redis connection closed');
        });
    }

    return redis;
}

export const connectRedis = async () => {
    const client = getRedisClient();
    if (client.status == "ready" || client.status === 'connecting') {
        return;
    }
    await client.connect();
}

export const disconnectRedis = async () => {
    if (!redis) {
        return;
    }
    await redis.disconnect();
    redis = null;
}