export const expressClustering = {
  id: "express-clustering",
  title: "Clustering — Maximizing Multi-Core CPU Performance",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Node.js", "Clustering", "Performance", "Scalability", "Multi-processing"],

  definition:
    "Node.js runs in a single thread, which means it only utilizes one CPU core by default. The Cluster module allows you to create multiple 'worker' processes that run on different CPU cores, shared under the same server port. This enables your Express application to handle much higher traffic by distributing the load across all available processors.",

  simpleExplanation:
    "If your server has 8 CPU cores, 7 of them stay idle while your Node.js app worked on just 1. It's like having 8 stoves in a kitchen but only 1 chef cooking. Clustering is like hiring 8 chefs to work on all 8 stoves simultaneously. Now, you can cook 8 times as much food in the same amount of time.",

  romanUrduRevision:
    "Node.js by default ek hi CPU core use karta hai. Cluster module humein ijazat deta hai ke hum apne app ki multiple copies (workers) baki cores par bhi chalayen. Har worker apna kaam karta hai par port same rehti hai. Is se app ki capacity aur reliability dono barh jati hain.",

  realLifeExample:
    "An 8-core production server: Without clustering, a single worker might handle 500 req/sec. With clustering, you can run 8 workers, theoretically handling up to 4,000 req/sec on the exact same hardware without spending an extra penny on infrastructure.",

  why: "To achieve 'Horizontal Scaling' on a single machine. Clustering prevents your CPU from becoming a bottleneck, provides better fault tolerance (if one worker crashes, others stay alive), and increases the overall throughput of your API.",

  how: [
    "Step 1 - Use 'cluster.isPrimary' to distinguish between the manager (Master) and the workers.",
    "Step 2 - Identify the number of CPU cores using 'os.cpus().length'.",
    "Step 3 - Call 'cluster.fork()' inside a loop to spawn workers.",
    "Step 4 - Move your Express server logic into the 'else' block (where isPrimary is false).",
    "Step 5 - Set up an 'exit' listener to automatically restart workers if they crash.",
  ],

  diagram: `
graph TD
    Master[Primary Process] --> W1[Worker 1 - Core 1]
    Master --> W2[Worker 2 - Core 2]
    Master --> W3[Worker 3 - Core 3]
    Master --> W4[Worker 4 - Core 4]
    LB[OS Load Balancer] --> W1
    LB --> W2
    LB --> W3
    LB --> W4
  `,

  analogy:
    "Imagine a busy Toll Plaza. If there's only 1 lane open, traffic piles up (Single Thread). Clustering is like opening 8 lanes—each lane has its own officer, but they all serve the same highway. Traffic flows much faster.",

  code: `
const cluster = require('cluster');
const os = require('os');
const express = require('express');

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(\`Primary \${process.pid} is running\`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(\`worker \${worker.process.pid} died. Restarting...\`);
    cluster.fork();
  });
} else {
  const app = express();
  app.get('/', (req, res) => res.send('Worker ' + process.pid));
  app.listen(3000);
}
  `,

  commonMistakes: [
    "Thinking workers share memory (they don't; you must use Redis for sessions/global variables).",
    "Spawning more workers than CPU cores (this causes performance overhead due to context switching).",
    "Not handling worker crashes (if all workers die, your server is down).",
    "Using clustered mode in local development (makes debugging harder; usually used only in production).",
  ],

  interviewSummary:
    "The Cluster module is Node.js's native way to handle multi-core processing. It uses a Master/Worker model where the Master process manages the lifecycle of Worker processes that handle incoming HTTP requests.",

  interviewQA: [
    {
      q: "How do workers communicate with each other?",
      a: "They don't share memory, so they communicate via IPC (Inter-Process Communication) or a shared data store like Redis.",
    },
    {
      q: "What is 'Primary' vs 'Worker'?",
      a: "The 'Primary' (Master) process handles the creation and monitoring of 'Workers', while 'Workers' perform the actual CPU-intensive tasks and handle network traffic.",
    },
  ],
};

