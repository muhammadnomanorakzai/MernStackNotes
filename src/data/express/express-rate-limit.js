export const expressRateLimit = {
  id: "express-rate-limit",
  title: "express-rate-limit — DDoS & Brute-force Protection",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Rate Limit", "Security", "DDoS", "Brute Force", "Middleware", "Protection"],

  definition:
    "Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset. It tracks the number of requests coming from a specific IP address and blocks further requests once a predefined threshold is reached within a specific window of time.",

  simpleExplanation:
    "Imagine a vending machine that gives out free snacks. A greedy person might try to press the button 1,000 times in a minute to take everything. Rate limiting is like a 'Timer' on that machine: 'Only 3 snacks per person every hour'. This stops one person (or a robotic hacker) from overwhelming your server and making it slow for everyone else.",

  romanUrduRevision:
    "Rate limiting app ke server ko spam aur DDoS attacks se bachata hai. Isse hum restrict kar sakte hain ke ek IP se kitni requests aa sakti hain ek muqarrar waqt mein (e.g., 100 requests every 15 minutes). Agar koi limit cross kare, toh server usse '429 Too Many Requests' error bhej deta hai. Login aur Signup pages par ise use karna security ke liye lazmi hai.",

  why: "Security and Availability. A malicious script can try to guess passwords by sending thousands of requests a second (Brute-force). Or, a DDoS attack can crash your server by overloading it with traffic. Rate limiting acts as a shield, ensuring your server only processes a reasonable amount of work, keeping it alive for real users.",

  how: [
    "Step 1 - Install the package: 'npm install express-rate-limit'.",
    "Step 2 - Import it: 'const rateLimit = require(\"express-rate-limit\");'.",
    "Step 3 - Define the limit: specify 'windowMs' (time) and 'max' (requests).",
    "Step 4 - Create a limiter instance and apply it globally with 'app.use()'.",
    "Step 5 - Or apply it to specific sensitive routes like '/api/login'.",
  ],

  diagram: `
flowchart TD
    A[User Request] --> B{Limiter Check}
    B -- "Count < Limit" --> C[Process Request]
    B -- "Count > Limit" --> D[Status 429: Too Many Requests]
    C --> E[Update Counter in Memory]
    style B fill:#3498db,color:white
    style D fill:#e74c3c,color:white
  `,

  analogy:
    "Think of a 'Speed Camera' on a highway. You are allowed to drive, but if you go too fast (too many requests per second), the camera catches you and gives you a fine (a block). This keeps the road safe for everyone else and stops people from being reckless.",

  realLifeExample:
    "A Forget Password Feature: You don't want a hacker to try and guess the reset code for an email. You apply a strict rate limit of '5 attempts per hour per IP' on the '/reset-password' route. This makes it practically impossible for someone to hack the code via brute-force.",

  code: `
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

// 1. DEFINE THE LIMITER
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 'window'
  standardHeaders: true, // Return rate limit info in the 'RateLimit-*' headers
  legacyHeaders: false, // Disable the 'X-RateLimit-*' headers
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// 2. APPLY GLOBALLY (To all requests)
// app.use(apiLimiter);

// 3. APPLY TO SPECIFIC ROUTE (Professional way)
app.post('/api/login', apiLimiter, (req, res) => {
  res.send('Login attempt processed.');
});

app.listen(3000);
  `,

  commonMistake: [
    "Using memory-store in a cluster/multi-server environment (the limit won't be shared across servers; use a Redis store instead).",
    "Setting the limit too low, which accidentally blocks real users who are just browsing quickly.",
    "Not handling proxies correctly (remember to set 'app.set(\"trust proxy\", 1)' if you are behind Heroku/Nginx).",
    "Forgetting to whitelist internal services or your own IP during testing.",
  ],

  interviewSummary: [
    "Rate-limiting prevents brute-force attacks and DDoS attempts.",
    "Express-rate-limit creates a simple in-memory or Redis-backed bucket for IP tracking.",
    "It returns a 429 HTTP status code when the limit is exceeded.",
    "Applying limits to auth routes is a core security requirement for production apps.",
  ],
};
