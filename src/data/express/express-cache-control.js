export const expressCacheControl = {
  id: "express-cache-control",
  title: "Response Caching — Mastering Cache-Control Headers",
  category: "Express",
  difficulty: "Advanced",
  tags: ["HTTP Headers", "Caching", "Performance", "CDN", "Browser Cache", "Latency"],

  definition:
    "Cache-Control is an HTTP header used to specify browser and intermediary (like CDN) caching policies. It dictates how, for how long, and by whom a response can be cached, significantly reducing server load and improving page load speeds for repeat visitors.",

  simpleExplanation:
    "Every time a user visits your site, their browser asks your server for files. Caching is like giving the user a copy of those files and saying, 'Don't ask me for these again for the next 7 days; just use this copy.' This makes your website feel instant because the 'request' never even leaves the user's computer.",

  romanUrduRevision:
    "Cache-Control header browser ko batata hai ke kitni der tak server se naya data mangne ki zaroorat nahi hai. Agar hum 'max-age=3600' bhejte hain, toh 1 ghante tak browser server ko disturb nahi karega aur purana data hi dikhayega. Sensitive data (banking/health) ke liye hum 'no-store' use karte hain.",

  realLifeExample:
    "Static Assets: CSS files, Logos, and JavaScript bundles rarely change. By setting a long cache duration (e.g., 1 year), you ensure that returning users don't have to download these files twice, saving bandwidth and speed.",

  why: "To optimize 'Bandwidth' and 'Latency'. By offloading requests to the browser or a CDN, you reduce the number of direct hits to your Express server. This leads to cheaper infrastructure costs and a significantly faster 'Time to Interaction' for your users.",

  how: [
    "Step 1 - Determine which resources are static (images) vs dynamic (user profile).",
    "Step 2 - Use 'res.set()' to set the 'Cache-Control' header.",
    "Step 3 - Use 'public' for data that can be cached by anyone (including CDNs).",
    "Step 4 - Use 'private' for data meant for a single user only (browser only).",
    "Step 5 - Set 'max-age' in seconds (e.g., 3600 for 1 hour).",
  ],

  diagram: `
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Open site
    Browser->>Server: Request index.css
    Server-->>Browser: index.css + Cache-Control: max-age=3600
    Browser->>User: Renders Page

    Note over User,Server: 10 Minutes Later
    User->>Browser: Open site again
    Browser->>Browser: Check local cache
    Browser-->>User: Renders Page (Instant, no server call)
  `,

  analogy:
    "It's like a 'Fridge' at home. If you have milk in the fridge (Cache), you don't go to the Store (Server) every time you want a glass of milk. You only go to the store when the fridge is empty or the milk has expired (max-age reached).",

  code: `
const express = require('express');
const app = express();

// 1. Static Assets (Long-term cache)
app.use('/static', express.static('public', {
  maxAge: '1y', // Cache for 1 year
  immutable: true
}));

// 2. Public API Data (Short-term cache)
app.get('/api/products', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600'); // 1 hour
  res.json(products);
});

// 3. User Dashboard (Private cache)
app.get('/api/dashboard', (req, res) => {
  res.set('Cache-Control', 'private, max-age=60'); // 1 min, browser only
  res.json(userData);
});

// 4. Sensitive Data (No cache)
app.get('/api/banking', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.json(transactions);
});
  `,

  commonMistakes: [
    "Using 'public' for sensitive user data (allowing CDNs/Proxies to store and potentially leak it).",
    "Not using cache-busting (e.g., filename-v1.css) when using long 'max-age'. If you don't change the filename, users won't see your updates.",
    "Confusing 'no-cache' with 'no-store'. 'no-cache' still caches but revalidates; 'no-store' never saves the data.",
    "Setting zero cache for everything (causing unnecessary server load).",
  ],

  interviewSummary:
    "Cache-Control is the most powerful tool for client-side and CDN performance. It uses directives like 'public', 'private', 'no-store', and 'max-age' to control data freshness and storage location. Proper caching strategy can reduce server traffic by 80% or more.",

  interviewQA: [
    {
      q: "What is 'ETag' in relation to caching?",
      a: "An ETag is a unique identifier (hash) for a version of a resource. The browser sends it to the server to check if the file has changed; if not, the server returns a 304 Not Modified status.",
    },
    {
      q: "When should you use 'no-store'?",
      a: "For highly sensitive data that should never be saved on disk or in volatile memory, such as credit card details or personal medical records.",
    },
  ],
};

