export const expressErrorMiddleware = {
  id: "express-error-middleware",
  title: "Error-handling Middleware — The 4 Parameters",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Error Handling", "Middleware", "err", "req", "res", "next", "4 parameters"],

  definition:
    "Error-handling middleware functions are defined in the same way as other middleware, except they have four arguments instead of three: (err, req, res, next). This specific signature tells Express that this function is meant for handling errors across the entire application stack.",

  simpleExplanation:
    "Think of Error-handling Middleware as the 'Emergency Room' (ER) of your app. Normal middleware are like departments in a hospital (Pharmacy, X-ray). If something goes wrong in any department (an Error), they don't try to fix it there; they send the patient to the ER. The ER is special because it knows exactly how to handle 'Errors' (the extra 1st parameter).",

  romanUrduRevision:
    "Error-handling middleware Express mein wo ek hi function hai jisme 4 parameters hote hain: (err, req, res, next). Yeh hamesha code ke end par likha jata hai taake agar pure system mein kahin bhi koi 'next(err)' call ho, toh wo yahan pahochan jaye. Iske baghair client ko ajeeb se system errors nazar aa sakte hain jo security ke liye khatarnak hain.",

  why: "Centralized error handling is vital for security and UX. You should never show the raw stack trace (technical details) to the user. Instead, you catch the error, log it for yourself, and send a clean 'Something went wrong' message to the user. This one function can protect your entire app from crashing and leaking sensitive info.",

  how: [
    "Step 1 - Define a middleware function with FOUR arguments: '(err, req, res, next)'.",
    "Step 2 - Identify the error type or status code.",
    "Step 3 - Use 'console.error(err.stack)' for your own debugging logs.",
    "Step 4 - Send a user-friendly response using 'res.status(500).json(...)'.",
    "Step 5 - CRITICAL: Place this code AFTER all other app.use() and route calls.",
  ],

  diagram: `
flowchart TD
    A[Request] --> B[Route Handler]
    B -- "Oops! Error" --> C[next(err)]
    C --> D{Express Pipeline}
    D -- "Skips Normal" --> E[Error Middleware\n4 Params]
    E --> F[res.status 500]
    E --> G[Internal Logger]
    style E fill:#e74c3c,color:white
  `,

  analogy:
    "Imagine a water filtration plant. If a pipe bursts (an Error), you don't want the muddy water to reach the customers (the Response). You need a 'Waste Pipe' (Error Middleware) at the very end of the system. Every time a problem occurs, the machinery automatically diverts the mud into that waste pipe so the main system can stay safe.",

  realLifeExample:
    "Database Failure: A user tries to fetch a profile, but your database is down. Instead of the browser waiting forever, your code catches the problem and calls 'next(err)'. The Error Middleware then sends a 500 status code with a message: 'Our database is temporarily resting, please try later.'",

  code: `
const express = require('express');
const app = express();

app.get('/broken', (req, res, next) => {
  // Trigger an error manually
  const err = new Error('Database connection failed!');
  err.status = 503;
  next(err); // Jumps straight to error middleware
});

// --- THE ERROR HANDLER (MUST BE LAST) ---
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error('SERVER_ERROR:', err.message);
  
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

app.listen(3000);
  `,

  commonMistake: [
    "Defining the error handler with only 3 parameters (Express will treat it as a normal middleware and skip it during an error).",
    "Placing the error handler at the top of the file (it will run before the routes even exist).",
    "Leaking the full stack trace in production (only show the 'stack' in development mode).",
    "Forgetting to provide a default status code (always fallback to 500 if err.status is missing).",
  ],

  interviewSummary: [
    "Error-handling middleware is identified by its 4-parameter signature.",
    "It must be placed at the end of the middleware stack.",
    "Calling next(err) skips all non-error middleware and goes straight to the error handler.",
    "It is essential for preventing sensitive data leaks via raw error messages.",
  ],
};
