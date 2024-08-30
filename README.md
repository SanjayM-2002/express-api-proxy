# Express API Proxy Server

A Simple API Proxy Server built in Node.js

## Tech Stack

- **Node.js**, **Express.js**, **Redis**

## Local Setup

Clone the repo

```bash
https://github.com/SanjayM-2002/express-api-proxy.git
```

```bash
cd express-api-proxy
```

Start Redis locally

```bash
docker run --name my-redis -d -p 6379:6379 redis
```

Set up .env in root:

```bash
PORT = 5000
API_URL = "https://api.open-meteo.com/v1/forecast"
REDIS_HOST = "127.0.0.1"
REDIS_PORT = 6379
RATE_LIMIT_DURATION = 60000
RATE_LIMIT_COUNT = 5
CACHE_DURATION = 300000
```

```bash
npm install
```

For running application:

```bash
npm run dev
```

## Demo Video - Approach

[Video Link](https://www.loom.com/share/90eb54f4bbc1416f9359567ada546ad6?sid=fee2bfd0-7fac-4335-80e2-6361ac0d7edc)

## Demo Video - Working

[Video Link](https://www.loom.com/share/d31b5a8b0b0b45d6b06f054f56dcb833?sid=85a65e50-0089-460e-a750-cf1e046e3f83)

## License

[MIT](https://choosealicense.com/licenses/mit/)
