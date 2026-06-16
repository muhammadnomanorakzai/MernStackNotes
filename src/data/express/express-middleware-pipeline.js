export const expressMiddlewarePipeline = {
  id: "express-middleware-pipeline",
  title: "Middleware Execution Pipeline — How the Chain Works",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Middleware", "Pipeline", "Chain", "Next", "Order of Execution", "Flow"],

  definition:
    "The Middleware Execution Pipeline is the sequential process through which an HTTP request passes until a response is sent. It follows a 'First-In, First-Out' (FIFO) order based on code definition. Each middleware in the pipeline has the power to mutate the request, stop the chain, or hand off the request to the next function.",

  simpleExplanation:
    "Think of the Middleware Pipeline as an 'Assembly Line'. A raw request enters from one side. worker 1 adds a timestamp, worker 2 checks the user's ID, and worker 3 formats the data. If any worker finds a problem, they take the request off the line (Response). If they finish their job, they push the request to the next worker using 'next()'. The order of workers matters—you can't paint the car before the doors are attached!",

  romanUrduRevision:
    "Express ka middleware pipeline bilkul ek line ki tarah hai jahan request ek ke baad ek functions se guzarti hai. Inka execution order wahi hota hai jo aapne code mein likha hota hai. Agar aap ne authentication middleware logging se pehle likha hai, toh pehle auth check hoga. Is chain ko samajhna bugs dhoondne ke liye bohot zaroori hai.",

  why: "Understanding the pipeline is the difference between a beginner and a senior developer. It allows you to build complex features like 'Request Tracing', 'Global Error Handling', and 'Performance Monitoring'. If you don't understand the flow, you'll struggle with issues like 'Headers already sent' or requests that mysteriously 'hang' forever.",

  how: [
    "Step 1 - Register global middleware at the top with 'app.use()'.",
    "Step 2 - Register path-specific middleware or routers.",
    "Step 3 - Define route handlers (which are actually just terminal middleware).",
    "Step 4 - Ensure every middleware either calls 'next()' or sends a response (res.send/json).",
    "Step 5 - Place the 4-parameter error handler at the very end of the pipeline.",
  ],

  diagram: `
flowchart LR
    A[Request] --> B[Global: Logger]
    B --> C[Global: JSON Parser]
    C --> D[Router: Auth Check]
    D --> E[Route: Fetch Data]
    E --> F[res.json]
    D -- "Fail" --> G[Error Middleware]
    G --> H[res.status 500]
    style B fill:#f39c12,color:white
    style C fill:#f39c12,color:white
    style D fill:#3498db,color:white
    style G fill:#e74c3c,color:white
  `,

  analogy:
    "Imagine a series of Water Filters. The first filter ignores small particles but catches large leaves. The second filter catches sand. The third filter purifies the water. If you put the purifier first and it gets clogged with leaves, the whole system stops working. The order of filters is the Middleware Pipeline.",

  realLifeExample:
    "A Data Enrichment Flow: A request comes in. Middleware 1 adds 'req.startTime = Date.now()'. Middleware 2 looks up the user in a database and adds 'req.user = userObj'. Finally, the route handler calculates how long the request took by subtracting 'req.startTime' from current time. Because of the pipeline, the route handler has all the info it needs.",

  code: `
const express = require('express');
const app = express();

// 1. First in line
app.use((req, res, next) => {
  req.receivedAt = Date.now();
  console.log('Step 1: Time Recorded');
  next();
});

// 2. Second in line
app.use((req, res, next) => {
  console.log('Step 2: Checking Security...');
  next();
});

// 3. The Terminal step
app.get('/test', (req, res) => {
  const duration = Date.now() - req.receivedAt;
  res.send(\`Step 3: Response sent in \${duration}ms\`);
});

app.listen(3000);
  `,

  commonMistake: [
    "Placing body-parser middleware AFTER routes that need to read the body.",
    "Forgetting to call 'next()', causing the request to hang at a certain step in the pipeline.",
    "Confusing the execution order (it is ALWAYS top-to-bottom in your file).",
    "Writing a middleware that sends a response AND then calls 'next()' (causes an error).",
  ],

  interviewSummary: [
    "Middleware execution is sequential and follows the definition order.",
    "The 'next()' function is the trigger to move to the next item in the pipeline.",
    "A middleware stack can be broken at any point by sending a response.",
    "A well-structured pipeline is key to modular and clean Express applications.",
  ],
};
