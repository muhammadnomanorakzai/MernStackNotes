export const expressApiKeyAuth = {
  id: "express-api-key-auth",
  title: "API Key Authentication — Partner & Service Access",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["API Key", "Authentication", "Security", "Middleware", "B2B", "Service-to-Service"],

  definition:
    "API Key Authentication is a simple and common method of identifying and authorizing clients making requests to your API. Typically, a long, unique, and random string is provided to a user or developer, which they must include in a custom header (e.g., 'X-API-KEY') on every request.",

  simpleExplanation:
    "Think of an API Key as a 'Special Spare Key' you give to a friend (another developer or a partner company). You don't want them to use your main front door (The User Login), but you want them to be able to access the office (the API data). You give them a key that only works for certain things. If they lose the key or start acting weird, you can 'Deactivate' that specific key without affecting anyone else.",

  romanUrduRevision:
    "API Key authentication mostly B2B (Business to Business) ya public APIs ke liye use hoti hai. Is mein hum user ko ek lamba random string generate kar ke dete hain jo wo headers mein bhejte hain. JWT ke muqable mein yeh asaan hai kyunki server ko isey 'verify' karne ke liye bas database se match karna hota hai. Yeh mostly computer-to-computer communication ke liye use hota hai, insaano ke login ke liye nahi. Yaad rakhein ke API keys ko hamesha environment variables ya safe database mein rakhna chahiye.",

  why: "Simplicity and Long-lived Access. Unlike JWTs or Sessions, API keys don't expire quickly. They are meant to be 'Set and Forget' for tools and scripts. Using API keys allows you to track exactly which partner is using your API, how many requests they are making, and you can instantly revoke access if they violate your terms. It's the standard for services like Google Maps, Stripe, or OpenAI.",

  how: [
    "Step 1 - Generate a unique, random UUID or hash for each user.",
    "Step 2 - Store the key securely in your database (optionally hashed).",
    "Step 3 - Create a middleware that looks for 'x-api-key' in 'req.headers'.",
    "Step 4 - Perform a database lookup to find the user/service associated with that key.",
    "Step 5 - Grant access via 'next()' or block via 401 Unauthorized.",
  ],

  diagram: `
flowchart LR
    A[Partner Script] -- "Headers: x-api-key=abc-123" --> B[Express Server]
    B --> C[API Key Middleware]
    C -- "Lookup DB for 'abc-123'" --> D{Found?}
    D -- "No" --> E[res.status 401]
    D -- "Yes" --> F[next()]
    F --> G[Service Logic / Data]
    style C fill:#3498db,color:white
    style E fill:#e74c3c,color:white
  `,

  analogy:
    "Think of an 'Intercom System' at an apartment building. To get in, you can either use your personal fob (User Login/JWT) OR you can type in a 'Service Code' (the API Key) given to the delivery guy. The service code lets them in to drop off the package, but doesn't let them go into your personal bedroom (User-only routes).",

  realLifeExample:
    "Stripe API: When you integrate Stripe payments into your site, you don't 'Log in' to Stripe every time you make a transaction. You go to your Stripe dashboard, copy your 'API KEY', and paste it into your Node.js config. That key allows your server to talk to Stripe's server securely and indefinitely.",

  code: `
const express = require('express');
const app = express();

// 1. REUSABLE API KEY MIDDLEWARE
const validateApiKey = (req, res, next) => {
  const apiKey = req.get('x-api-key'); // Look for custom header

  if (!apiKey) {
    return res.status(401).json({ error: 'API Key is missing' });
  }

  // In real apps, lookup this key in your Database
  const VALID_KEYS = ['noman-key-123', 'admin-key-789'];
  
  if (!VALID_KEYS.includes(apiKey)) {
    return res.status(401).json({ error: 'Invalid API Key' });
  }

  next(); // Access granted
};

// 2. PROTECT PUBLIC API ROUTES
app.get('/api/v1/public-stats', validateApiKey, (req, res) => {
  res.json({ users_online: 500, active_projects: 12 });
});

app.listen(3000);
  `,

  commonMistake: [
    "Hardcoding the API keys directly in your source code (always use .env and a database).",
    "Logging the API Keys in your console or Morgan logs (if someone sees the logs, they steal the keys).",
    "Passing the API Key as a URL parameter (e.g., /api?key=123). This is dangerous because it shows up in browser history and server logs; use headers instead.",
    "Not using HTTPS (without encryption, anyone on the network can see and steal the key in plain text).",
  ],

  interviewSummary: [
    "API Key authentication is a simple, stateless way to identify service clients.",
    "It is primarily used for computer-to-computer (M2M) communication.",
    "API keys should be passed via custom headers, not URL parameters.",
    "Revocation is simple: delete the key from the database to instantly block access.",
  ],
};
