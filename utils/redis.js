const { Redis } = require('ioredis');

const HOST = process.env.REDIS_HOST || 'localhost';
const PORT = process.env.REDIS_PORT || 6379;

const redisClient = new Redis({ host: HOST, port: PORT });

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = redisClient;
