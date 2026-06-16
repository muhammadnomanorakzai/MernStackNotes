export const expressProcessExceptions = {
  id: "express-process-exceptions",
  title: "Process-level Exception Handlers — unhandledRejection & uncaughtException",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Process", "Node.js", "Crash", "unhandledRejection", "uncaughtException", "Production", "Safety Net"],

  definition:
    "Node.js exposes two critical process-level events for catching errors that escape your normal error handling: 'unhandledRejection' fires when a Promise is rejected and no .catch() or try/catch handles it; 'uncaughtException' fires when a synchronous error is thrown outside of any try/catch. Both are the absolute last line of defense before your server crashes silently.",

  simpleExplanation:
    "Imagine every single exit door in a building (try/catch blocks, .catch() handlers) is locked, and someone still manages to sneak out. 'uncaughtException' and 'unhandledRejection' are two security guards that stand at the back wall of the building. They catch ANYTHING that slips through every other door. Without them, that person just walks out into the dark undetected (the server crashes without a trace). With them, you at least get a report of what happened.",

  romanUrduRevision:
    "Node.js mein 'process' object par do events hote hain jo last resort ke taur par kaam karte hain. 'uncaughtException' tab fire hota hai jab koi synchronous error kisi try/catch mein nahi pakda gaya. 'unhandledRejection' tab fire hota hai jab koi Promise reject ho aur uska .catch() nahi laga. Dono mein humein error log karna chahiye aur server ko gracefully band karna chahiye. Sirf error log karna kaafi nahi; process ka restart zaruri hai kyunke wo ab unpredictable state mein hai.",

  why: "Ultimate Safety Net. No matter how carefully you write code, occasional bugs slip through — especially in third-party library code or complex async chains. These process-level handlers ensure that: 1) You always know about the crash (via logging). 2) The server does NOT continue running in a broken state, potentially serving incorrect data. 3) Your process manager (PM2, Docker, Kubernetes) gets the signal to restart cleanly.",

  how: [
    "Step 1 - Add 'process.on(\"uncaughtException\", handler)' at the very TOP of your 'server.js'.",
    "Step 2 - Add 'process.on(\"unhandledRejection\", handler)' after the server starts listening.",
    "Step 3 - In both handlers: log the error with a logger like Winston.",
    "Step 4 - Close the HTTP server gracefully using 'server.close()'.",
    "Step 5 - Call 'process.exit(1)' AFTER the server has closed (non-zero exit code signals abnormal termination to PM2).",
  ],

  diagram: `
flowchart TD
    A[Uncaught Error in Code] --> B{Where?}
    B -- "Synchronous throw" --> C[uncaughtException event]
    B -- "Promise .reject()" --> D[unhandledRejection event]
    C --> E[Log Error]
    D --> E
    E --> F[server.close() - stop new requests]
    F --> G[process.exit(1) - signal PM2 to restart]
    style E fill:#e74c3c,color:white
    style G fill:#c0392b,color:white
  `,

  analogy:
    "Think of a 'Nuclear Power Plant'. It has hundreds of specific safety systems (your try/catch handlers). But at the very end, it has a 'SCRAM' system — an emergency shutdown. No matter what, if all other systems fail, the SCRAM kills the reactor completely and safely. 'process.exit(1)' is your SCRAM system. It's drastic, but infinitely safer than a leaking, broken process continuing to run.",

  realLifeExample:
    "Production MERN API: Your MongoDB connection string is mis-configured after a deployment. The 'mongoose.connect()' call at startup throws an unhandled rejection. Without a handler, the server starts but crashes on the first DB operation, and the crash happens silently. With 'process.on(\"unhandledRejection\")', you get an immediate, detailed log entry and a clean restart via PM2, saving hours of debugging.",

  code: `
// --- server.js (Must be at the very top) ---
const app = require('./app');

// 1. UNCAUGHT EXCEPTION (synchronous)
// MUST be called FIRST, before anything else
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...', err.name, err.message);
  process.exit(1); // Immediate exit (no DB close needed, state is corrupt)
});

// --- Start the server ---
const server = app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// 2. UNHANDLED REJECTION (async/promise)
// After server starts so we have 'server' reference
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...', err.name, err.message);

  // Gracefully: finish pending requests, then exit
  server.close(() => {
    process.exit(1); // PM2 / Docker will restart automatically
  });
});
  `,

  commonMistake: [
    "Registering 'uncaughtException' AFTER other code runs (missed errors that happen before registration).",
    "Continuing to run after an 'uncaughtException' — the Node.js documentation explicitly warns the process state may be corrupted.",
    "Using 'process.exit(0)' (success code) instead of 'process.exit(1)' — this tells the process manager 'All good!', so it won't restart.",
    "Not logging the error before exiting (you'll have a restarted server with no clue why it crashed).",
  ],

  interviewSummary: [
    "'uncaughtException' catches synchronous errors that escape all try/catch blocks.",
    "'unhandledRejection' catches async Promise rejections with no .catch() handler.",
    "Best practice: log the error, close the server gracefully, then exit with code 1.",
    "A process manager like PM2 will detect the non-zero exit and restart the server automatically.",
  ],
};
