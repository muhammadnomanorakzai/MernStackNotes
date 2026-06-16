export const expressGracefulShutdown = {
  id: "express-graceful-shutdown",
  title: "Graceful Shutdown — SIGTERM Handling",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Graceful Shutdown", "SIGTERM", "Process Management", "Production", "Connection Cleanup", "Reliability"],

  definition:
    "Graceful shutdown is the practice of stopping a server process while ensuring that no data is lost and all current requests are completed. Instead of killing the process instantly, you catch termination signals (like SIGTERM), stop accepting new requests, finish the ones in progress, and close database connections properly.",

  simpleExplanation:
    "Imagine a restaurant closing for the night. A 'Sudden Shutdown' is like turning off the lights and locking the doors while people are still eating. A 'Graceful Shutdown' is like flipping the sign to 'Closed' (stop new orders), allowing the people inside to finish their meal, and then carefully cleaning the kitchen before leaving. In Express, this means your users don't see 'Connection Failed' errors while you are updating your server.",

  romanUrduRevision:
    "Graceful shutdown ka matlab hai server ko tameez se band karna. Jab hum server update karte hain ya restart karte hain, toh humein 'SIGTERM' signal milta hai. Us waqt foran server band nahi karna chahiye, balke pending requests poori hone ka intezar karna chahiye aur phir database ko 'close()' karna chahiye taake data corrupt na ho.",

  realLifeExample:
    "Zero-Downtime Deployment with PM2: When you run 'pm2 reload', PM2 sends a SIGTERM to your old process. If you handle this gracefully, the old process finished its last few API calls while the new one starts taking over. The user never experiences a broken request during the transition.",

  why: "Data Integrity and User Experience. If you kill a process while it's halfway through writing a 50MB file or updating a database record, you end up with 'Corrupt Data'. Graceful shutdown ensures your application is 'Transactionally Safe' and professional.",

  how: [
    "Step 1 - Listen for 'SIGTERM' (sent by PM2/Docker) or 'SIGINT' (Ctrl+C).",
    "Step 2 - Call 'server.close()'—this stops the server from accepting NEW connections.",
    "Step 3 - Inside the callback, close your Database connections (MongoDB, Redis, etc.).",
    "Step 4 - Optional: Set a timeout (e.g., 30s) to force kill the process if it takes too long.",
    "Step 5 - Finally, call 'process.exit(0)'.",
  ],

  diagram: `
sequenceDiagram
    participant OS as PM2 / Docker
    participant Server as Express Server
    participant DB as MongoDB / Redis

    OS->>Server: Send SIGTERM Signal
    Server->>Server: Stop accepting new requests (server.close)
    Note over Server: Finish pending requests...
    Server->>DB: Close DB Connections
    DB-->>Server: OK
    Server->>OS: Process.exit(0)
  `,

  analogy:
    "It's like a 'Elevator'. If you stop it suddenly, people get stuck between floors. A graceful stop means the elevator finishes going to the current floor, opens the doors to let people out, and then turns off.",

  code: `
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const server = app.listen(3000, () => console.log('Server on 3000'));

// --- GRACEFUL SHUTDOWN LOGIC ---

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  
  // 1. Stop accepting new requests
  server.close(() => {
    console.log('HTTP server closed');
    
    // 2. Close database connections
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      
      // 3. Exit process (0 for success)
      process.exit(0);
    });
  });

  // 4. Force shutdown after 30s if tasks hang
  setTimeout(() => {
    console.error('Could not close connections in time, forceful shutdown');
    process.exit(1);
  }, 30000);
});
  `,

  commonMistake: [
    "Not handling 'SIGINT' (Ctrl+C). While SIGTERM is for production, SIGINT is used in development. Both usually need the same cleanup logic.",
    "Forgetting to call 'process.exit(0)' inside the 'server.close' callback (the process might hang indefinitely waiting for a hidden timer to finish).",
    "Not closing Database connections, which can lead to 'Too many connections' errors on the DB server during frequent redeployments.",
    "Accepting new requests during the shutdown phase (server.close() handles this by default, but only for the HTTP server).",
  ],

  interviewSummary:
    "Graceful shutdown involves catching process signals (SIGTERM/SIGINT) to ensure a clean exit. Key steps include stopping new listener connections, completing active requests, and releasing resource handles like database connections and file descriptors.",

  interviewQA: [
    {
      q: "What is the difference between SIGTERM and SIGKILL?",
      a: "SIGTERM (signal 15) is a polite request to stop, allowing the process to clean up. SIGKILL (signal 9) is an immediate, forceful kill by the OS that cannot be ignored or handled.",
    },
    {
      q: "Why is graceful shutdown important in Docker/Kubernetes?",
      a: "K8s scales pods up and down frequently. If a pod doesn't shut down gracefully, ongoing user requests will be cut off, leading to 502/504 errors.",
    },
  ],
};
