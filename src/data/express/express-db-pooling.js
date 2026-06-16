export const expressDbPooling = {
  id: "express-db-pooling",
  title: "Database Connection Pooling — Scalable DB Management",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["MongoDB", "Mongoose", "Performance", "Pooling", "Connections"],

  definition:
    "Database Connection Pooling is a technique used to maintain a cache of database connections so that connections can be reused when future requests to the database are required. Instead of opening and closing a new connection for every single request, the application borrows an existing 'live' connection from the pool.",

  simpleExplanation:
    "Imagine a bank with 5 open counters. When a customer arrives, they go to any available counter. Once done, the counter stays open for the next customer. If every customer had to wait for a new counter to be built and a new teller hired before being served, and then the counter was demolished after they left—that's what 'No Pooling' looks like. Pooling keeps the counters ready and the tellers waiting.",

  romanUrduRevision:
    "Har database request ke liye naya connection banana slow aur costly hota hai. 'Pool' ek ready-made connections ka set hota hai jo pehle se bana hota hai. Jab request aati hai, Express pool se ek connection leta hai, apna kaam karta hai, aur wapas pool mein chor deta hai taake agla banda use kar sake.",

  realLifeExample:
    "A food delivery app during lunch hour: Thousands of orders are placed simultaneously. If the app opened a new connection for every order status check, the database would crash from over-connection. Pooling allows 20-50 connections to handle thousands of requests by rapidly 'sharing' them.",

  why: "Resource Efficiency. Creating a TCP connection to a database involves many steps (Handshake, SSL, Auth) which can take 100ms+. With pooling, these connections are established once at startup. This reduces latency, prevents database exhaustion, and allows the server to handle high concurrent traffic without overhead.",

  how: [
    "Step 1 - Use a library that supports pooling (Mongoose/MongoDB driver do this by default).",
    "Step 2 - Pass pooling options in your connection string or setup object.",
    "Step 3 - Set 'maxPoolSize' (e.g., 20) to limit total open connections.",
    "Step 4 - Set 'minPoolSize' (e.g., 5) to keep a few connections always ready.",
    "Step 5 - Use lifecycle events to monitor pool health.",
  ],

  diagram: `
graph TD
    Client1[Request 1] --> Pool
    Client2[Request 2] --> Pool
    Client3[Request 3] --> Pool
    subgraph Pool [Connection Pool - max: 10]
        C1[Conn 1]
        C2[Conn 2]
        C3[Conn 3]
    end
    Pool --> DB[(Database)]
    DB -- "Release" --> Pool
  `,

  analogy:
    "It's like a fleet of Taxis. Instead of every citizen buying their own car for a single trip and then selling it immediately, a taxi company maintains 10 cars. A car picks someone up, drops them off, and is immediately available for the next person. The 'Pooling' strategy saves money, space, and time.",

  code: `
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // --- POOLING CONFIGURATION ---
      maxPoolSize: 50,       // Max simultaneous connections
      minPoolSize: 10,       // Keep 10 connections warm
      socketTimeoutMS: 45000, // Close idle connections after 45s
      serverSelectionTimeoutMS: 5000, // Fail fast if DB is down
    });
    console.log("🚀 MongoDB Connected with Pool Size 50");
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
  }
};
  `,

  commonMistakes: [
    "Setting maxPoolSize too high (exhausting database RAM/CPU).",
    "Setting maxPoolSize too low (causing requests to wait in line, increasing latency).",
    "Calling mongoose.connect() inside a route handler instead of once at app startup.",
    "Using a free-tier database (like MongoDB Atlas M0) with a high pool size (it will reject them).",
  ],

  interviewSummary:
    "Connection Pooling is essential for production performance. It reuses existing database connections to avoid the high cost of creating new ones. In MERN apps, Mongoose handles this via 'maxPoolSize' and 'minPoolSize' configurations.",

  interviewQA: [
    {
      q: "Why is 'minPoolSize' important?",
      a: "It ensures that even during quiet periods, a few connections remain active, so the first request after a lull doesn't suffer from 'cold start' latency.",
    },
    {
      q: "What happens if all connections in the pool are busy?",
      a: "The incoming request enters a queue and waits for a connection to be released back into the pool. If it waits too long, it will timeout.",
    },
  ],
};

