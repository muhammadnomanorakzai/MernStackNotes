export const expressMiddlewareIntro = {
  id: "express-middleware-intro",
  title: "What is Middleware? — Logic Between Steps",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Middleware", "app.use", "next", "Req-Res Cycle", "Chain", "Global Middleware"],

  definition:
    "Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. These functions can execute any code, make changes to the request and response objects, end the cycle, or call the next middleware in the stack.",

  simpleExplanation:
    "Middleware is like a 'Security Guard' or a 'Filter' that stands between the user's request and your main route logic. Before the request reaches the final destination, it passes through these functions. They can do things like check if the user is logged in (Auth), log who is visiting (Logger), or unwrap data (Body Parser).",

  romanUrduRevision:
    "Middleware Express ka wo part hai jo request aur response ke darmiyan chalta hai. Iske paas 'req', 'res', aur ek 'next' function hota hai. Agar middleware kaam poora kar leta hai, toh wo 'next()' call karta hai taake request agle stage tak pahochan sake. Authentication aur Logging ke liye yeh sab se best tool hai.",

  why: "Middleware allows for clean, modular, and reusable code. Instead of adding 'isLoggedIn' checks manually in 50 different routes, you write one middleware and apply it globally or to specific groups of routes. This 'Pipe' architecture is what makes Express so powerful and flexible.",

  how: [
    "Step 1 - Define a function with 'req', 'res', and 'next' parameters.",
    "Step 2 - Perform your logic (e.g., logging or checking a token).",
    "Step 3 - CRITICAL: Call 'next()' if you want the request to move to the next function.",
    "Step 4 - Or call 'res.send()' if you want to stop the request here (e.g., if auth fails).",
    "Step 5 - Register it using 'app.use()' for global use or as an argument in specific routes.",
  ],

  diagram: `
flowchart LR
    A[Client Request] --> B[Middleware 1\nLogger]
    B -->|next| C[Middleware 2\nAuth]
    C -->|next| D[Route Handler\nLogic]
    D --> E[res.send]
    C -- "No Token" --> G[res.status 401]
    style B fill:#f39c12,color:white
    style C fill:#3498db,color:white
  `,

  analogy:
    "Think of an assembly line in a car factory. The first worker puts on the wheels (Middleware 1). The next worker puts on the doors (Middleware 2). Finally, the last worker paints the car (Route Handler). If the first worker sees a broken wheel, they stop the line (End Cycle) and don't pass the car to the next workers.",

  realLifeExample:
    "Logging Middleware: Every time someone visits any page of your site, you want to record their IP address. Instead of writing 'console.log' inside every route, you write one global middleware at the top that logs the request and then calls 'next()' to let the user see the page.",

  code: `
const express = require('express');
const app = express();

// 1. CUSTOM MIDDLEWARE DEFINITION
const myLogger = (req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  
  // 2. CRITICAL: Pass control to next step
  next(); 
};

// 3. GLOBAL REGISTRATION
app.use(myLogger);

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/users', (req, res) => {
  res.send('Users Page');
});

app.listen(3000);
  `,

  commonMistake: [
    "Forgetting to call 'next()'. This causes the request to get 'stuck' and the browser to spin forever without an error.",
    "Calling 'next()' after already sending a response (e.g., calling res.send() and then next()).",
    "Not understanding the order of middleware (Express runs them exactly in the order they are written in the code).",
    "Putting global middleware (like 'app.use(cors)') below the route definitions.",
  ],

  interviewSummary: [
    "Middleware has access to req, res, and the next function.",
    "It can modify request and response objects for downstream use.",
    "Execution order is top-to-bottom.",
    "A middleware must either end the cycle (res.send) or call next().",
  ],
};
