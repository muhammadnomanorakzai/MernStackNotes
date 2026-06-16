export const expressAdvancedRateLimit = {
  id: "express-advanced-rate-limit",
  title: "Advanced Rate Limiting — Per-route & Per-user",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Security", "Rate Limit", "DDoS", "Redis", "Middleware", "User Tracking"],

  definition:
    "Advanced Rate Limiting goes beyond simple IP-based blocking. it involves applying different limits to different types of routes (e.g., stricter for /login than for /home) and tracking limits per-user ID or individual API key to prevent targeted abuse by authenticated users.",

  simpleExplanation:
    "Simple rate limiting is like a 'One Snack per Person' rule at a party based on your face. Advanced Rate Limiting is like a 'Two Gold Coins per Person' rule based on your ID card. It doesn't matter if you wear a mask (change IP); the system knows YOUR unique ID and stops you if you try to take a third coin. It also means you can be generous with the dance floor (Public API) but very strict with the Buffet (Expensive API calls).",

  romanUrduRevision:
    "Basic rate limiting sirf IP address dekhti hai, lekin 'Advanced' rate limiting route aur user ke hisab se chalti hai. Maslan, aap login page par bohot sakht limit laga sakte hain (5 attempts per minute) lekin data fetch karne par naram (1000 requests per hour). Agar koi user logged in hai, toh hum 'req.user.id' use karte hain taake IP change karne se bhi wo limit ko dodge na kar sake. Production mein hum Redis use karte hain taake multiple servers par limit share ho sake.",

  why: "Resource Management and Targeted Protection. Professional APIs often have 'Tiers' (Free vs Pro). A Pro user should have a higher rate limit than a guest. Also, sensitive endpoints like password reset or payment processing need much stricter limits than a simple GET request. Moving the 'Limit Data' out of memory and into 'Redis' ensures that even if you restart your server or have 10 servers, the limits remain accurate.",

  how: [
    "Step 1 - Use 'express-rate-limit' but configure a custom 'keyGenerator'.",
    "Step 2 - Identify users by 'req.user.id' or 'req.headers.authorization'.",
    "Step 3 - Define multiple limiter instances (e.g., 'authLimiter', 'publicApiLimiter').",
    "Step 4 - Apply them specifically to the routes they protect.",
    "Step 5 - Use 'rate-limit-redis' for distributed systems where many servers need to share the same limit count.",
  ],

  diagram: `
flowchart TD
    A[Public Route] --> B[100 req / min]
    C[Login Route] --> D[5 req / min]
    E[Post Route] --> F[Check User ID]
    F -- "Pro User" --> G[10,000 req / day]
    F -- "Free User" --> H[100 req / day]
    style D fill:#e74c3c,color:white
    style G fill:#2ecc71,color:white
    style H fill:#f1c40f,color:black
  `,

  analogy:
    "Imagine a 'Membership Club'. A Guest can only ask 3 questions at the reception. A Silver Member can ask 10. A Gold Member can ask as many as they want. If a Guest changes their hat (Changes IP), they might get another 3 questions. But if the club checks their 'Member Card' (User ID), changing hats won't work. This is the difference between IP-based and ID-based limiting.",

  realLifeExample:
    "Cloudinary or AWS API: When you use a cloud service, you have a monthly limit. They don't track your IP address (because it changes). They track your 'API Key' or 'User ID'. If you exceed your quota for image uploads, they return a '429 Too Many Requests', even if you try to call them from 5 different computers.",

  code: `
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

// 1. STRICT LIMITER (For Login/Auth)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts per IP per 15 mins
  message: 'Too many login attempts, please try again later.'
});

// 2. PER-USER LIMITER (For APIs)
const userApiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000,
  keyGenerator: (req) => {
    // Track by user ID if logged in, fallback to IP
    return req.user ? req.user.id : req.ip;
  },
  handler: (req, res) => {
    res.status(429).json({ error: 'Monthly/Hourly quota exceeded' });
  }
});

// APPLY DIFFERENTLY
app.post('/api/login', loginLimiter, (req, res) => { ... });
app.get('/api/posts', userApiLimiter, (req, res) => { ... });

app.listen(3000);
  `,

  commonMistake: [
    "Not using a store like Redis (memory based limits reset every time you restart your dev server).",
    "Forgetting that bots can rotate IPs easily; per-user limiting is much more effective for authenticated abuse.",
    "Setting global limits too low (you might accidentally block your own favicon or CSS requests if they are handled by Express).",
    "Not returning the 'Retry-After' header, which helps good clients know when to try again.",
  ],

  interviewSummary: [
    "Advanced rate limiting uses dynamic keys (User ID, API Key) instead of just IP.",
    "Tiered rate limiting allows different quotas for different user levels (Free/Pro).",
    "Redis is the preferred store for rate-limit data in distributed architectures.",
    "The 429 status code should always include a clear reason for the block.",
  ],
};
