export const expressCors = {
  id: "express-cors",
  title: "cors Middleware — Cross-Origin Configuration",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["CORS", "Security", "Middleware", "Cross-Origin", "API", "Frontend-Backend"],

  definition:
    "CORS (Cross-Origin Resource Sharing) is a security feature implemented by browsers that restricts web pages from making requests to a different domain than the one that served the web page. The 'cors' middleware for Express allows you to easily enable or configure these cross-origin requests by adding the necessary HTTP headers.",

  simpleExplanation:
    "Browser-side security is like a 'Strict Gatekeeper'. If your frontend is at 'mysite.com' and your backend is at 'api.mysite.com', the browser will block the request because they are 'Different Origins'. The 'cors' middleware is like giving the gatekeeper a 'Guest List'. You tell the server: 'It's okay to let requests from mysite.com pass through'. Without it, your React app won't be able to talk to your Node.js server.",

  romanUrduRevision:
    "CORS ek security mechanism hai jo browser mein chalta hai. Agar aapka frontend aur backend alag domains par hain, toh browser requests block kar dega. Isse solve karne ke liye hum 'cors' package use karte hain. Yeh server par register hota hai aur browser ko batata hai ke 'falaan site ko permission hai data lene ki'. Production mein humesha specific origins allow karni chahiye.",

  why: "In modern MERN apps, the frontend (React) and backend (Express) are often hosted on different URLs. Without CORS properly configured, you'll see a 'CORS Error' in the console, and your API calls will fail. Using this middleware ensures that your API is accessible to your frontend while still remaining protected from malicious sites.",

  how: [
    "Step 1 - Install the package: 'npm install cors'.",
    "Step 2 - Import it: 'const cors = require(\"cors\");'.",
    "Step 3 - Use 'app.use(cors())' for global access (not recommended for production).",
    "Step 4 - Configure it with an 'origin' option to allow only specific domains.",
    "Step 5 - Use it as route-specific middleware if you only need it for certain endpoints.",
  ],

  diagram: `
flowchart LR
    A[Frontend: localhost:3000] --> B[Browser]
    B -- "Preflight (OPTIONS)" --> C[Backend: localhost:5000]
    C -- "Access-Control-Allow-Origin: *" --> B
    B -- "Actual Request" --> C
    C -- "Data Sent" --> A
    style C fill:#27ae60,color:white
    style B fill:#3498db,color:white
  `,

  analogy:
    "Imagine you are at a fancy hotel (the Server). A person from another hotel across the street (the Cross-Origin Request) wants to use your pool. The security guard (the Browser) stops them. However, if the hotel manager (CORS Middleware) has signed a 'Sharing Agreement' and told the guard to 'Allow guests from Hotel X', the person can enter and swim.",

  realLifeExample:
    "A Full-Stack Deploy: You host your React app on Netlify and your Express server on Render. When React tries to fetch 'getUsers', the browser checks the 'Access-Control-Allow-Origin' header. If your Express server has 'cors' configured with your Netlify URL, the data flows perfectly. If not, the request fails.",

  code: `
const express = require('express');
const cors = require('cors');
const app = express();

// 1. BASIC USAGE (Allows everything - Dangerous!)
// app.use(cors());

// 2. PROFESSIONAL CONFIGURATION
const corsOptions = {
  origin: 'https://www.mysite.com', // Only allow this site
  methods: 'GET,POST,PUT,DELETE',  // Only allow these methods
  allowedHeaders: 'Content-Type,Authorization', // Custom headers
  optionsSuccessStatus: 200 // Some legacy browsers crash on 204
};

app.use(cors(corsOptions));

app.get('/data', (req, res) => {
  res.json({ message: 'CORS-enabled data response' });
});

app.listen(5000);
  `,

  commonMistake: [
    "Using 'app.use(cors())' with default settings in production (allows everyone to hit your API).",
    "Forgetting the 'origin' must include http/https and have NO trailing slash.",
    "Not configuring headers if you are sending custom tokens (like JWT) in the request.",
    "Confusing CORS with backend security; CORS only protects the browser, it doesn't stop tools like Postman.",
  ],

  interviewSummary: [
    "CORS stands for Cross-Origin Resource Sharing.",
    "It is a browser-enforced security mechanism.",
    "The 'cors' middleware adds 'Access-Control-Allow-Origin' and other headers to responses.",
    "Preflight requests (OPTIONS) are sent by the browser before the actual request to verify permissions.",
  ],
};
