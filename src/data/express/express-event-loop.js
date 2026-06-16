export const expressEventLoop = {
  id: "express-event-loop",
  title: "Avoiding Blocking the Event Loop — Performance First",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Node.js", "Event Loop", "Non-blocking", "CPU Intensive", "Asynchronous", "Worker Threads"],

  definition:
    "Node.js runs on a single-threaded Event Loop. Blocking the Event Loop means running synchronous, CPU-intensive code that prevents the loop from moving to the next task. Because Express is built on this loop, a single blocked request can freeze the entire server for all users simultaneously.",

  simpleExplanation:
    "Imagine a fast-food counter with only one worker (Event Loop). They can handle hundreds of orders if they just take the money and pass the order to the kitchen (I/O). But if a customer asks the worker to personally cook a 20-course meal (CPU task), the worker stops serving everyone else. The entire line of customers waits until that one meal is done. You must never let the worker 'cook' at the front counter.",

  romanUrduRevision:
    "Node.js single-threaded hai, iska matlab hai ke aik waqt mein aik hi kaam hota hai. Agar aap koi heavy calculation wala code (jaise image processing ya heavy loops) direkt Express route mein dal dein ge, toh poora server ruk jaye ga. Is se bachne ke liye heavy tasks ko 'Worker Threads' ya background processes mein bhejna chahiye.",

  realLifeExample:
    "Bcrypt Hashing: When you hash a password with a high salt round synchronously, it can take 500ms. During those 500ms, your server cannot respond to any other request. If 10 people try to login at once, your server becomes completely unresponsive. Always use the asynchronous version of such libraries.",

  why: "Reliability and Scale. A blocked event loop leads to 'Latency Spikes' and 'Timeout Errors' that are hard to debug. In a high-traffic environment, even a 100ms block can waterfall into a total system collapse as requests pile up faster than they can be cleared.",

  how: [
    "Step 1 - Audit your code for synchronous methods (e.g., fs.readFileSync, crypto.randomBytesSync).",
    "Step 2 - Replace them with their asynchronous counterparts (e.g., promises or callbacks).",
    "Step 3 - Move CPU-intensive tasks (image resizing, video encoding) to 'Worker Threads'.",
    "Step 4 - Offload extremely heavy jobs to a dedicated job queue like 'Bull' or 'RabbitMQ'.",
    "Step 5 - Use 'setImmediate()' to break down very long synchronous loops into smaller chunks.",
  ],

  diagram: `
graph TD
    subgraph EventLoop [The Event Loop]
        Task1[Request 1]
        Task2[Request 2]
        HeavyTask[CPU Heavy Task - BLOCKED!]
        Task3[Request 3 - WAITING]
    end
    HeavyTask -.-> Solution[Solution: Move to Worker Thread]
  `,

  analogy:
    "It's like a 'Receptionist' at a hotel. If the receptionist starts personally cleaning a room, they can't answer the phone or check in new guests. A good receptionist stays at the desk and calls a 'Housekeeper' (Worker Thread) to clean the room while they continue helping guests.",

  code: `
const express = require('express');
const { Worker } = require('worker_threads');
const app = express();

// ❌ BAD: Blocking the Event Loop
app.get('/heavy-task-bad', (req, res) => {
  let count = 0;
  for (let i = 0; i < 1e9; i++) { count++; } // Blocks everything!
  res.send('Count is ' + count);
});

// ✅ GOOD: Using Worker Threads
app.get('/heavy-task-good', (req, res) => {
  const worker = new Worker('./heavy-worker.js');
  
  worker.on('message', (result) => {
    res.send('Count is ' + result); // Result arrives non-blocking
  });

  worker.on('error', (err) => res.status(500).send(err));
});
  `,

  commonMistakes: [
    "Using synchronous File System methods in an Express route (fs.readFileSync).",
    "Running complex JSON parsing on extremely large strings synchronously.",
    "Performing heavy encryption or compression on the main thread.",
    "Writing nested loops that process millions of records in memory without yielding.",
  ],

  interviewSummary:
    "Node.js performance relies on 'Not Blocking the Event Loop'. You should keep the main thread for fast, non-blocking I/O operations and offload CPU-heavy calculations to other processes or threads. Use profiling tools to detect high 'Event Loop Latency'.",

  interviewQA: [
    {
      q: "What is the 'libuv' thread pool?",
      a: "Libuv is the library Node.js uses for asynchronous I/O. It maintains a pool of threads (default 4) to handle operations like file system access and crypto that would otherwise block the main thread.",
    },
    {
      q: "How can you detect if your event loop is blocked?",
      a: "You can monitor 'Event Loop Latency' using tools like 'clinic.js', 'strongloop', or by using the 'perf_hooks' module to measure the time between loop iterations.",
    },
  ],
};

