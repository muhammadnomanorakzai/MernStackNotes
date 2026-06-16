export const expressConditionalMiddleware = {
  id: "express-conditional-middleware",
  title: "Conditional Middleware — Dynamic Pipeline Flow",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Middleware", "Conditional", "Flow Control", "Logic", "Dynamic Middleware"],

  definition:
    "Conditional middleware refers to the technique of executing a middleware function only if certain conditions are met (e.g., specific HTTP headers, environment variables, or request properties). This is achieved either by wrapping the middleware in an 'if' statement or by creating a higher-order function that handles the logic.",

  simpleExplanation:
    "Imagine a security guard at a club who only checks IDs if you look under 30. If you look 50, he just waves you in (skips the middleware). Conditional middleware works the same way—you can tell Express: 'Only run the logging middleware if we are in Development mode' or 'Only verify the token if the user is trying to access a private page'. It keeps your server fast by skipping unnecessary work.",

  romanUrduRevision:
    "Conditional middleware ka matlab hai middleware ko kisi khas shart (condition) par chalana. Maslan, aap chahte hain ke Morgan logger sirf 'development' mode mein chale aur production mein na chale. Iske liye hum 'if' statements ya wrapper functions use karte hain taake app ki performance behtar rahe aur sirf zaroori logic hi execute ho.",

  why: "In production, every middleware adds a small delay (latency) to the request. By making middleware conditional, you ensure that your production server isn't wasting time on development-only tools like detailed logging or debugging proxies. It also helps in A/B testing or enabling/disabling features without restarting the server.",

  how: [
    "Step 1 - Use an 'if' statement inside 'app.use()' to check environment variables (e.g., process.env.NODE_ENV).",
    "Step 2 - Create a wrapper middleware that checks a condition and either calls the real middleware or 'next()'.",
    "Step 3 - Use ternary operators for simple toggles.",
    "Step 4 - Ensure that even if the condition is false, 'next()' is eventually called so the request doesn't hang.",
  ],

  diagram: `
flowchart LR
    A[Request] --> B{Is Condition Met?}
    B -- Yes --> C[Run Middleware]
    C --> D[next]
    B -- No --> D
    D --> E[Route Handler]
    style B fill:#3498db,color:white
  `,

  analogy:
    "Think of a Toll Plaza. Some cars have an 'E-Tag' (the condition). If they have it, they pass through a special fast lane (Middleware A). If they don't have it, they go through the manual payment lane (Middleware B). The logic at the entrance of the plaza decides which lane (middleware) the car should take based on the E-Tag.",

  realLifeExample:
    "Development Logging: You use the 'morgan' middleware to see every request in your terminal. However, you don't want this in production because it fills up your disk space. You write 'if (process.env.NODE_ENV === \"development\") { app.use(morgan(\"dev\")); }'. Now your server is clean and fast in production.",

  code: `
const express = require('express');
const app = express();

// 1. ENVIRONMENT-BASED CONDITION
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log('DEV_LOG:', req.method, req.url);
    next();
  });
}

// 2. LOGIC-BASED CONDITIONAL WRAPPER
const conditionalMiddleware = (condition, middleware) => {
  return (req, res, next) => {
    if (condition(req)) {
      return middleware(req, res, next);
    }
    next();
  };
};

// Only run this if request has a specific header
app.use(conditionalMiddleware(
  (req) => req.headers['x-special'] === 'true',
  (req, res, next) => {
    console.log('Special Header Detected!');
    next();
  }
));

app.get('/', (req, res) => res.send('Hello World'));

app.listen(3000);
  `,

  commonMistake: [
    "Forgetting the 'else' case or not calling 'next()' when the condition is false (the request hangs).",
    "Checking conditions that are too expensive to compute, which defeats the purpose of optimization.",
    "Not handling errors that might occur inside the conditional middleware logic.",
    "Hardcoding environment strings (use constants or variables instead).",
  ],

  interviewSummary: [
    "Conditional middleware optimizes the request-response pipeline.",
    "Commonly used for environment-specific features (logging, debugging).",
    "Can be implemented via wrappers or simple if/else blocks.",
    "Must always ensure the chain continues via next() even if the condition is not met.",
  ],
};
