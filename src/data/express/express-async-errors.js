export const expressAsyncErrors = {
  id: "express-async-errors",
  title: "Async Error Handling — try/catch & next(err)",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Async", "Await", "Error Handling", "next(err)", "Try-Catch", "Promises"],

  definition:
    "Async error handling in Express refers to the methodology of catching errors that occur inside asynchronous code blocks (like database calls or API requests). In Express 4, asynchronous errors are NOT automatically caught and passed to error-handling middleware; they must be manually caught and passed using 'next(err)'.",

  simpleExplanation:
    "Normal errors are like a fire alarm in a building—they go off automatically. But an 'Async Error' is like a fire in a basement where there are no sensors. If you don't 'Catch' the fire yourself and manually pull the alarm (call next(err)), no one will ever know there's a problem, and the building (your app) will just stop working without telling anyone why.",

  romanUrduRevision:
    "Async functions (async/await) ke andar error handle karna bohot zaroori hai kyunki Express 4 inhein khud-ba-khud catch nahi karsakta. Agar aap database se data mangwa rahe hain aur error aa jaye, toh aapko 'try-catch' block use kar ke 'catch' ke andar 'next(err)' call karna hoga. Iske baghair aapka server hang ho jayega.",

  why: "Most of your real-world Express code will be asynchronous (database queries, external API calls, file reads). If an error happens inside an 'await' block and you don't catch it, your app will trigger an 'UnhandledPromiseRejection', which can crash your process. Proper async error handling makes your app 'Self-Healing' and reliable.",

  how: [
    "Step 1 - Use 'async' in your route handler definition.",
    "Step 2 - Wrap all asynchronous logic inside a 'try' block.",
    "Step 3 - In the 'catch(err)' block, call 'next(err)'.",
    "Step 4 - The error will then travel to your 4-parameter error middleware.",
    "Step 5 - Pro Tip: Use a 'wrapper function' or 'express-async-errors' package to avoid writing try-catch in every route.",
  ],

  diagram: `
flowchart LR
    A[Client Request] --> B[Async Handler]
    B --> C{Try}
    C -- "await db.find()" --> D[Success Response]
    C -- "Error!" --> E[Catch Block]
    E --> F[next(err)]
    F --> G[Error Middleware]
    style E fill:#e74c3c,color:white
    style F fill:#e67e22,color:white
  `,

  analogy:
    "Imagine you are ordering a package online. 'Async' is the time it takes for the package to be delivered. If the delivery truck crashes (an Error), the computer system doesn't know. The only way the company knows there's an error is if you manually 'Report a Problem' (call next(err)). If you don't report it, the system thinks the package is still coming forever.",

  realLifeExample:
    "An External API Call: You are fetching weather data from another site. If that site is down, your 'await axios.get()' will fail. If you don't have a try-catch, your server will stop and never send a response to the user. Using try-catch + next(err) ensures the user gets a proper 'Weather service down' message.",

  code: `
const express = require('express');
const app = express();

// 1. MANUAL TRY-CATCH METHOD
app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await Database.find(req.params.id);
    if (!user) throw new Error('User not found');
    res.json(user);
  } catch (err) {
    // Manually pass the error to Express
    next(err); 
  }
});

// 2. THE SMART WRAPPER METHOD (Cleaner)
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/product/:id', asyncHandler(async (req, res) => {
  const product = await DB.getProduct(req.params.id);
  res.json(product);
  // No try-catch needed! Errors are caught by the wrapper.
}));

app.listen(3000);
  `,

  commonMistake: [
    "Forgetting to call 'next(err)' in the catch block (the most common cause of hanging servers).",
    "Assuming Express 4 catches async errors automatically (Express 5 does, but 4 doesn't).",
    "Not using 'await' inside the try block, which causes the catch block to miss the error.",
    "Having an empty catch block 'catch(e) {}' which 'swallows' the error and makes debugging impossible.",
  ],

  interviewSummary: [
    "In Express 4, you must manually pass async errors to next().",
    "Unhandled promise rejections can crash the Node.js process.",
    "The try-catch pattern is the standard way to handle async/await errors.",
    "Async wrappers are a professional way to keep route handlers clean and 'DRY'.",
  ],
};
