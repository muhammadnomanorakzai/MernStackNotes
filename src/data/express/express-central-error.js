export const expressCentralError = {
  id: "express-central-error",
  title: "Centralized Error Handling Middleware",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Error Handling", "Middleware", "Centralized", "Best Practices", "Production", "Clean Code"],

  definition:
    "Centralized Error Handling Middleware is a single, global Express middleware (with 4 parameters: 'err, req, res, next') that catches ALL errors from every route in your application. Instead of writing error responses inside each route, every route hands its errors to this one middleware using 'next(err)', creating a single source of truth for error responses.",

  simpleExplanation:
    "Imagine 1,000 workers in a factory. Without a centralized system, each worker deals with their own machine breakdown by calling a different repair person. A centralized system means ALL breakdowns go to ONE 'Emergency Desk'. That desk knows exactly what to do, how to log it, and what message to send back. Your error middleware IS that Emergency Desk for your Express server.",

  romanUrduRevision:
    "Agar aap har route mein 'try/catch' likh kar wahan se error handle karein, toh yeh bohot messy ho jata hai. Centralized error handling ka matlab hai ke ek AKELA middleware saari application ki errors handle kare. Route mein sirf 'next(err)' call karna hota hai aur baaki sara kaam yeh ek middleware kar deta hai—status code set karna, message format karna, logging karna. Yeh production-grade apps ki pehchaan hai.",

  why: "Single Responsibility. Each route should only be responsible for its 'Happy Path' logic. Error paths should be delegated to a specialist. This keeps your route handlers clean (under 10 lines), makes error formatting consistent across the ENTIRE app, and means you only have to update one place to change how ALL errors look.",

  how: [
    "Step 1 - Create a function with EXACTLY 4 parameters: '(err, req, res, next)'.",
    "Step 2 - Register it AFTER all routes: 'app.use(errorHandler);'.",
    "Step 3 - Read the error status: 'err.statusCode || 500'.",
    "Step 4 - Return a consistent JSON shape: '{ success, message, stack }'.",
    "Step 5 - In routes, trigger it using 'next(new Error(\"message\"))' or 'next(err)' in catch blocks.",
  ],

  diagram: `
flowchart LR
    A[Route 1: Error] -- "next(err)" --> E
    B[Route 2: Error] -- "next(err)" --> E
    C[Route 3: Error] -- "next(err)" --> E
    E[Global Error Handler\n4-param middleware] --> F[Formatted Response]
    style E fill:#e74c3c,color:white
    style F fill:#2ecc71,color:white
  `,

  analogy:
    "Think of a Country's Emergency Services (999/911). No matter if there's a fire, a robbery, or a medical emergency, everyone calls the SAME number. The operator at that one central number then decides who to dispatch. In Express, 'next(err)' dials the number, and your error middleware is the operator who handles everything from there.",

  realLifeExample:
    "Production API: Without centralized handling, you might forget to write a try/catch in one route and a user gets a completely blank 500 error or a server crash. With a global handler, even uncaught route errors fall through to this middleware, which logs the stack trace, sends a clean JSON error, and keeps the server running.",

  code: `
const express = require('express');
const app = express();

// --- YOUR ROUTES ---
app.get('/safe', (req, res) => {
  res.send('All good here!');
});

app.get('/crash', (req, res, next) => {
  try {
    throw new Error('Something broke!');
  } catch (err) {
    next(err); // Hand to centralised handler
  }
});

// --- THE CENTRALIZED HANDLER ---
// MUST have 4 params: (err, req, res, next)
// MUST be registered AFTER all routes/middlewares
const globalErrorHandler = (err, req, res, next) => {
  // 1. Read from err object
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(\`[ERROR] \${statusCode} - \${message}\`);

  // 2. Send consistent, clean response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      // Only show stack trace in development
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

app.use(globalErrorHandler); // << LAST!

app.listen(3000);
  `,

  commonMistake: [
    "Registering the error handler BEFORE your routes (it will never receive any errors).",
    "Using only 3 parameters (Express will treat it as a regular middleware, not an error handler).",
    "Sending the stack trace in production (this reveals your server's internal structure to hackers).",
    "Calling 'next()' without an argument in the error handler (this passes the request to the next regular middleware instead of ending it).",
  ],

  interviewSummary: [
    "Express error handlers must have exactly 4 parameters to be recognized as error handlers.",
    "They must be registered after ALL routes using app.use().",
    "All routes can delegate to this handler using next(err).",
    "It is the single source of truth for all error responses in the application.",
  ],
};
