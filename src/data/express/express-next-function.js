export const expressNextFunction = {
  id: "express-next-function",
  title: "next() — Passing Control",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["next()", "Middleware", "Chain", "Control Flow", "Error Handling"],

  definition:
    "The 'next()' function is a function in the Express router which, when invoked, executes the next middleware in the current stack. If the current middleware function does not end the request-response cycle, it must call 'next()' to pass control to the next middleware function. Otherwise, the request will be left hanging.",

  simpleExplanation:
    "Think of 'next()' as a 'Green Light' in a series of traffic signals. Each middleware is a signal. When a middleware finishes its job (like checking your ID), it calls 'next()' to turn the light green and let you move to the next signal. If a middleware doesn't call 'next()' and doesn't send a response, it's like a signal that is stuck on Red—the traffic (your request) never moves.",

  romanUrduRevision:
    "next() function ka kaam request ko agle middleware ya route handler tak pahochan hota hai. Agar aap middleware mein 'res.send' nahi kar rahe, toh 'next()' call karna lazmi hai, warna browser load hota rahega aur timeout ho jayega. Error handling ke liye hum 'next(err)' bhi use karte hain.",

  why: "Middleware is designed for 'Chaining'. You might want one function to log the time, another to verify a user, and a third to fetch data. 'next()' is the glue that connects these independent functions into a single, smooth request-response cycle. It also allows for specialized error-handling middleware.",

  how: [
    "Step 1 - Include 'next' as the third argument in your middleware function signature.",
    "Step 2 - Call 'next()' at the end of your logic to proceed normally.",
    "Step 3 - Call 'next(error)' to skip all remaining non-error middleware and jump to the error handler.",
    "Step 4 - Do NOT call 'next()' if you have already sent a response (e.g., res.json(...)).",
  ],

  diagram: `
flowchart LR
    A[Request] --> B[Middleware A]
    B -- next() --> C[Middleware B]
    C -- next() --> D[Route Handler]
    D -- res.send --> E[Response]
    B -- stop --> F[res.send]
    style B fill:#3498db,color:white
    style C fill:#3498db,color:white
  `,

  analogy:
    "Imagine a relay race. Each runner (Middleware) carries a baton (the Request). When a runner finishes their lap, they pass the baton to the next runner using 'next()'. The race only finishes when a runner reaches the finish line (Response). If a runner stops and forgets to pass the baton, the race is stuck.",

  realLifeExample:
    "An Authentication Flow: \n1. Middleware A checks if a cookie exists. If yes, it calls 'next()'. \n2. Middleware B checks if the session in the cookie is valid. If yes, it calls 'next()'. \n3. The Route Handler finally shows the user's secret dashboard. If any step fails, they send a 401 error instead of calling 'next()'.",

  code: `
const express = require('express');
const app = express();

const checkStatus = (req, res, next) => {
  const isServerMaintenance = false;
  
  if (isServerMaintenance) {
    // Stop the cycle and send response
    return res.status(503).send('Site under maintenance');
  }
  
  // Pass control to next step
  next(); 
};

app.use(checkStatus);

app.get('/dashboard', (req, res) => {
  res.send('Welcome to your dashboard!');
});

app.listen(3000);
  `,

  commonMistake: [
    "Forgetting the () in 'next' (it's a function call, so you must write 'next()').",
    "Sending a response AND calling next() (this will cause an error because the response is already finished).",
    "Not handling errors logically: if you encounter an error, call 'next(error)' to let Express's error handler deal with it.",
    "Thinking 'next()' behaves like 'return' (code after next() will still execute unless you write 'return next()').",
  ],

  interviewSummary: [
    "next() is used to move to the next middleware in the stack.",
    "Without next(), the request-response cycle is terminated or hung.",
    "next('route') skips the rest of the middleware in the current router stack.",
    "next(err) triggers the error-handling middleware.",
  ],
};
