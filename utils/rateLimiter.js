const { getIPv4Address } = require('./getIpAddress');
const redisClient = require('./redis');

const rateLimiter = async (req, res, next) => {
  const userId = getIPv4Address(req.ip);
  console.log('userId is: ', userId);
  const currentTime = Date.now();
  console.log('curr time is: ', currentTime);

  const RATE_LIMIT_DURATION = parseInt(
    process.env.RATE_LIMIT_DURATION || '60000',
    10
  );
  const RATE_LIMIT_COUNT = parseInt(process.env.RATE_LIMIT_COUNT || '5', 10);
  console.log(
    'duration: ' + RATE_LIMIT_DURATION + ', count: ' + RATE_LIMIT_COUNT
  );

  try {
    const data = (await redisClient.hgetall(userId)) || {};
    console.log('data is: ', data);
    if (Object.keys(data).length === 0) {
      await redisClient.hset(userId, {
        createdAt: currentTime,
        count: 1,
      });
      req.rateLimitStatus = 'Allowed';
      return next();
    }

    let diff = currentTime - parseInt(data['createdAt']);
    console.log('diff is: ', diff);
    if (diff > RATE_LIMIT_DURATION) {
      await redisClient.hset(userId, {
        createdAt: currentTime,
        count: 1,
      });
      req.rateLimitStatus = 'Allowed';
      return next();
    }

    if (parseInt(data['count']) >= RATE_LIMIT_COUNT) {
      req.rateLimitStatus = 'Rate Limit Exceeded';
      return res.status(429).json({
        success: 'false',
        message: 'too many requests',
      });
    } else {
      await redisClient.hset(userId, {
        count: parseInt(data['count']) + 1,
      });
      req.rateLimitStatus = 'Allowed';
      return next();
    }
  } catch (err) {
    console.error('Error in rate limiter:', err);
    req.rateLimitStatus = 'Error';
    return res.status(500).json({
      success: 'false',
      message: 'Internal Server Error',
    });
  }
};

module.exports = { rateLimiter };
