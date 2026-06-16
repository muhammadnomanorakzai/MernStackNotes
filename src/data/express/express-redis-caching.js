export const expressRedisCaching = {
  id: "express-redis-caching",
  title: "Redis Caching with Express — Blazing Fast Performance",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Redis", "Caching", "Performance", "ioredis", "MERN", "Latency"],

  definition:
    "Redis is an open-source, in-memory data store that acts as a lightning-fast 'cache' between your Express server and your database (like MongoDB). It stores data in RAM instead of on a disk, allowing for sub-millisecond retrieval times for frequently accessed information.",

  simpleExplanation:
    "Imagine your API is like a restaurant. Normally, when a customer orders, the chef has to cook every dish from scratch (Database Query). This takes time. Redis is like the 'Hot Shelf' where the chef keeps pre-prepared, popular dishes. When someone orders a popular item, you hand it over instantly. You only cook from scratch if the item isn't on the shelf or it's gone cold (Expired).",

  romanUrduRevision:
    "Redis ek in-memory database hai jo express apps ki speed barhane ke liye use hota hai. Baar baar use hone wala data (jaise product list) hum database se dhoondne ke bajaye Redis (RAM) mein rakh dete hain. Agli baar jab wahi data chahiye hoga, toh server MongoDB ki bajaye Redis se lightning speed mein return karega.",

  realLifeExample:
    "E-commerce Trending Products: Every visitor to your site views the same trending products. Instead of querying MongoDB thousands of times per second for the same data, you store the product list in Redis for 5 minutes. This reduces database load by 95% and makes the page load instantly for every user.",

  why: "The primary reason is 'Latency Reduction'. A standard database query might take 50ms-200ms depending on complexity. A Redis lookup takes <1ms. For high-traffic applications, this difference prevents server bottlenecks, saves database costs, and provides a smooth, premium user experience.",

  how: [
    "Step 1 - Install Redis on your server/local machine and the 'ioredis' package.",
    "Step 2 - Initialize the Redis client in your Express app: const redis = new Redis().",
    "Step 3 - Before querying Database, check Redis using 'await redis.get(cacheKey)'.",
    "Step 4 - If data exists (Cache Hit), parse JSON and return immediately.",
    "Step 5 - If data doesn't exist (Cache Miss), query MongoDB.",
    "Step 6 - Save the fetched data to Redis with a TTL (Time To Live): 'redis.setex(key, time, value)'.",
  ],

  diagram: `
sequenceDiagram
    participant Client
    participant Express
    participant Redis
    participant MongoDB

    Client->>Express: GET /products
    Express->>Redis: Check cache (get 'products')
    Redis-->>Express: Cache Miss (null)
    Express->>MongoDB: db.products.find()
    MongoDB-->>Express: [Product Data]
    Express->>Redis: SETEX 'products' (TTL 300s)
    Express-->>Client: Return Products

    Note over Client,MongoDB: Second Request
    Client->>Express: GET /products
    Express->>Redis: Check cache (get 'products')
    Redis-->>Express: Cache HIT (Data)
    Express-->>Client: Return Products (Instant)
  `,

  analogy:
    "It's like a student's backpack. The library contains millions of books (Database), but it's far away. The student keeps the 2-3 books they need for today's classes in their backpack (Redis). If they need a book, they check the backpack first. Only if it's not there do they walk to the library.",

  code: `
const express = require('express');
const Redis = require('ioredis');
const Product = require('./models/Product');
const app = express();

const redis = new Redis(); // Default: localhost:6379

app.get('/api/products', async (req, res) => {
  const CACHE_KEY = 'trending_products';

  try {
    // 1. Try fetching from Redis
    const cachedData = await redis.get(CACHE_KEY);
    if (cachedData) {
      console.log("⚡ serving from cache");
      return res.json(JSON.parse(cachedData));
    }

    // 2. Cache Miss - Fetch from Database
    console.log("🐢 serving from database");
    const products = await Product.find().limit(20);

    // 3. Store in Redis for 10 minutes (600 seconds)
    await redis.setex(CACHE_KEY, 600, JSON.stringify(products));

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
  `,

  commonMistakes: [
    "Caching sensitive user data under a generic key (causing data leaks between users).",
    "Setting a TTL that is too long, leading to 'Stale Data' (showing old prices or info).",
    "Forgetting to invalidate (clear) the cache when the underlying data is updated in the database.",
    "Not handling Redis connection failures, which could crash the entire Express process.",
  ],

  interviewSummary:
    "Redis is an in-memory key-value store used to cache expensive operations. Key concepts include Cache Hits vs. Misses, TTL (Time To Live), and Cache Invalidation. In a MERN stack, it serves as a critical performance layer between Express and MongoDB to handle high concurrency.",

  interviewQA: [
    {
      q: "What is the difference between Redis and MongoDB?",
      a: "Redis is an in-memory data store (RAM-based, volatile, ultra-fast) while MongoDB is a document-based database (Disk-based, persistent, handles large datasets).",
    },
    {
      q: "What is 'Cache Invalidation'?",
      a: "It is the process of removing or updating cached data when the original source (Database) changes, ensuring users don't see outdated information.",
    },
  ],
};

