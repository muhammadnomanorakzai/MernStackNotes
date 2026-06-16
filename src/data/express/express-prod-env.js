export const expressProdEnv = {
  id: "express-prod-env",
  title: "Production Environment — NODE_ENV & Best Practices",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Production", "Deployment", "NODE_ENV", "Security", "Optimization", "Best Practices", "Stability"],

  definition:
    "A Production Environment is the live setting where your Express application is accessible to real users. Optimizing for production involves setting 'NODE_ENV=production', which triggers built-in performance optimizations in Express and many libraries, while also enforcing strict security measures and logging policies.",

  simpleExplanation:
    "Running your app in 'Development' is like a rehearsal for a play—mistakes are okay, and everything is slow and detailed. 'Production' is the 'Opening Night'. Everything must be fast, secure, and professional. By telling Express 'NODE_ENV=production', it stops focusing on helpful developer errors and starts focusing on raw speed and keeping the users safe from seeing internal server secrets.",

  romanUrduRevision:
    "Production environment woh live server hota hai jahan asli users aapki app use karte hain. 'NODE_ENV=production' set karna sabse zaroori hai kyunke is se Express bohot si performance optimizations on kar deta hai aur security leaks rokta hai. Is mein hum debugging information chupate hain aura caching enable karte hain.",

  realLifeExample:
    "Error Handling in Prod: In development, if your database fails, Express might show a full 'Stack Trace' with file paths and line numbers. In Production, we catch this and only show a polite 'Something went wrong!' message. This prevents hackers from seeing your internal folder structure and database technology.",

  why: "Security and Speed. In production, 'Middleware' (like compression) becomes vital for performance. 'Security' (like Helmet and CORS) becomes vital to prevent attacks. Most importantly, performance is roughly 3x better in 'production' mode because Express caches templates and simplifies internal logic.",

  how: [
    "Step 1 - Set 'NODE_ENV=production' in your server environment variables.",
    "Step 2 - Use 'Compression' middleware to shrink response sizes.",
    "Step 3 - Use 'Helmet' to set secure HTTP headers.",
    "Step 4 - Disable 'X-Powered-By' header to hide that you are using Express.",
    "Step 5 - Use a professional logging tool like 'Winston' or 'Pino' instead of 'console.log'.",
  ],

  diagram: `
graph TD
    Dev[Development Mode] -- "NODE_ENV=development" --> D_Logic[Detailed Logs / No Cache / Unminified]
    Prod[Production Mode] -- "NODE_ENV=production" --> P_Logic[Hidden Errors / View Cache / Compressed]
    P_Logic -- "Result" --> Speed[High Performance & Security]
    D_Logic -- "Result" --> Debug[Easy Debugging]
  `,

  analogy:
    "It's like a 'Restaurant Kitchen'. In Development, guests can walk into the kitchen and see the messy cooking process (Logs/Stacks). In Production, the door is closed; guests only see the final, perfect dish (Clean UI), and the kitchen operates at maximum speed to serve everyone.",

  code: `
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

// 1. Production Security
app.use(helmet()); 
app.disable('x-powered-by'); // Hide Express finger-print

// 2. Production Performance
if (process.env.NODE_ENV === 'production') {
  app.use(compression()); // Gzip compression for smaller payloads
  console.log('--- Production Mode Active ---');
}

// 3. Clean Error Handling (No stack traces for users)
app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.status(err.status || 500).json({
    message: err.message,
    stack: isProd ? null : err.stack // Hide stack in Prod
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
  `,

  commonMistake: [
    "Forgetting to set 'NODE_ENV=production'. This is the #1 reason for slow performance in Node.js apps.",
    "Leaving 'nodemon' running in production (Nodemon is for dev; use PM2 or Docker in prod).",
    "Logging sensitive data like user passwords or credit card numbers to the server console.",
    "Not using 'Trust Proxy' setting when running behind Nginx, which can mess up your rate-limiting and user IP tracking.",
  ],

  interviewSummary:
    "Productionizing an Express app involves performance tuning (compression, caching), security hardening (Helmet, hiding headers), and robust error management. 'NODE_ENV' is the primary flag used to toggle these optimizations and security layers.",

  interviewQA: [
    {
      q: "What does 'app.disable(\"x-powered-by\")' do?",
      a: "It removes the 'X-Powered-By: Express' header from responses. This is a security best practice called 'Security through Obscurity' which makes it harder for attackers to target known Express vulnerabilities.",
    },
    {
      q: "Why is 'compression' middleware important in production?",
      a: "It compresses the HTTP response body using Gzip/Brotli, reducing the amount of data transferred over the network and speeding up the page load for users with slow connections.",
    },
  ],
};
