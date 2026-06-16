export const expressProxy = {
  id: "express-proxy",
  title: "Proxy Middleware — http-proxy-middleware",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Proxy", "Reverse Proxy", "Middleware", "Gateway", "Architecture", "Microservices"],

  definition:
    "Proxy middleware allows your Express server to act as an intermediary, forwarding incoming requests to another server (or microservice) and sending the response back to the client. This is widely used for creating API Gateways, avoiding CORS issues during development, and routing requests to different backends.",

  simpleExplanation:
    "Imagine you are a secretary. When someone calls and asks for technical support, you don't answer the question yourself; you 'proxy' (transfer) the call to the expert in the IT department. To the caller, it feels like they are still talking to you, but the actual work is being done elsewhere. In Express, you can take a request for '/api/weather' and silently forward it to 'weather-service.com'.",

  romanUrduRevision:
    "Proxy middleware aik 'darmiyani rasta' (middleman) ki tarah kaam karta hai. Client server ko request bhejta hai, aur server woh request kisi doosre server ko pass kar deta hai. Is se client ko ye nahi pata chalta ke data asliyat mein kahan se aa raha hai. 'http-proxy-middleware' is ke liye sabse famous library hai.",

  realLifeExample:
    "Development Environment CORS fix: Your React app runs on port 3000 and your Express API on port 5000. To avoid CORS errors, you can set up a proxy in your Express server (or Vite/Webpack) that forwards all '/api' requests to port 5000 automatically.",

  why: "Security and Modularization. Proxies help hide your internal microservice architecture (only the proxy is public). They also help in 'Load Balancing' and can consolidate multiple different APIs under a single domain name, making it easier for the frontend to manage.",

  how: [
    "Step 1 - Install 'http-proxy-middleware'.",
    "Step 2 - Import 'createProxyMiddleware'.",
    "Step 3 - Define the 'target' (where the request should go).",
    "Step 4 - Set 'changeOrigin: true' if the target server needs to think the request came from your proxy's domain.",
    "Step 5 - Use 'app.use('/path', createProxyMiddleware({ target: '...' }))'.",
  ],

  diagram: `
graph LR
    User[Client/Browser] -- "GET /api/users" --> Proxy["Express Proxy (Port 3000)"]
    Proxy -- "Fowards to" --> Backend["Actual API (Port 5000)"]
    Backend -- JSON Data --> Proxy
    Proxy -- JSON Data --> User
  `,

  analogy:
    "It's like a 'Travel Agency'. You go to the agency (Proxy) to book a trip to Paris. The agency doesn't own the airplane or the hotel; they just talk to the airline (Backend 1) and the hotel (Backend 2) on your behalf. You only deal with the agent.",

  code: `
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 1. Forward all requests starting with /api to another server
app.use('/api', createProxyMiddleware({
  target: 'https://api.external-service.com',
  changeOrigin: true, // Needed for virtual hosted sites
  pathRewrite: {
    '^/api': '', // Remove '/api' from the forwarded URL
  },
  onProxyReq: (proxyReq, req, res) => {
    // Add custom headers if needed
    proxyReq.setHeader('x-added-header', 'my-auth-token');
  }
}));

app.listen(3000, () => {
  console.log('Proxy Server is running on port 3000');
});

// Example: Calling http://localhost:3000/api/users 
// will proxy to https://api.external-service.com/users
  `,

  commonMistake: [
    "Not setting 'changeOrigin: true' when proxying to a different domain, which often causes the target server to reject the request.",
    "Forgetting about 'Body Parsing'. If you use 'express.json()' before the proxy, the request body might get 'swallowed' and not reach the target server. Fix: move the proxy middleware ABOVE any body parsers.",
    "Incorrect 'pathRewrite' logic, resulting in 404 errors because the URL being sent to the target is wrong.",
    "Not handling proxy errors; if the target server is down, your proxy should return a 502 Bad Gateway instead of crashing.",
  ],

  interviewSummary:
    "Proxying in Express is efficiently handled by http-proxy-middleware. It allows for request forwarding, path rewriting, and header manipulation. It is a core pattern in microservices and modern frontend development environments.",

  interviewQA: [
    {
      q: "What is the difference between a Forward Proxy and a Reverse Proxy?",
      a: "A Forward Proxy (like a VPN) hides the client from the server. A Reverse Proxy (like Nginx or this middleware) hides the server(s) from the client.",
    },
    {
      q: "Why should you use a proxy for CORS issues?",
      a: "Because CORS is a browser-only security feature. Servers don't care about CORS. By routing requests through your own server first, the browser sees the request as 'same-origin'.",
    },
  ],
};
