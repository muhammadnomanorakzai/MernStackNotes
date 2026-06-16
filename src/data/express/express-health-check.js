export const expressHealthCheck = {
  id: "express-health-check",
  title: "Health Check Endpoints — Monitoring & Liveness",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Health Check", "Monitoring", "Liveness", "Readiness", "Production", "Reliability"],

  definition:
    "A Health Check endpoint is a special URL (usually '/health' or '/status') that returns a response indicating whether the server is running correctly. It is used by load balancers, container orchestrators (like Kubernetes), and monitoring tools to detect and automatically restart failing instances.",

  simpleExplanation:
    "Imagine a doctor checking your pulse. A health check endpoint is your server's pulse. Every few seconds, a monitoring tool 'pokes' your server and asks, 'Are you okay?' If your server responds 'Yes' (HTTP 200), everything is fine. If it doesn't respond or says 'No' (HTTP 500), the system knows your server is sick and can automatically try to fix it or stop sending traffic to it.",

  romanUrduRevision:
    "Health check aik simple endpoint hota hai jo batata hai ke server sahi chal raha hai ya nahi. Load balancers (jaise AWS ya Nginx) is ko bar bar call karte hain taake check kar sakein ke server traffic lene ke liye tayyar hai. Agar database down ho toh hum /health se 500 error bhej sakte hain.",

  realLifeExample:
    "Kubernetes Liveness Probe: You have your Express app in a Docker container. You configure Kubernetes to check /health every 10 seconds. If your app has a memory leak and freezes, it won't respond to /health. Kubernetes will automatically kill that container and start a fresh one, ensuring your website stays live without manual intervention.",

  why: "Reliability in Production. You don't want to find out that your website is down from a customer's tweet. Health checks allow for 'Auto-healing' architectures. They also help during deployments—only when the new server's /health path returns 200 does the load balancer send real traffic to it.",

  how: [
    "Step 1 - Create a GET route at '/health' or '/api/status'.",
    "Step 2 - Inside the route, check critical dependencies (database connection, memory usage, uptime).",
    "Step 3 - If everything is fine, return HTTP 200 with 'OK'.",
    "Step 4 - If a dependency is broken (e.g., MongoDB is down), return HTTP 503 (Service Unavailable) or 500.",
    "Step 5 - Keep the response extremely lightweight (don't perform heavy logic here).",
  ],

  diagram: `
graph LR
    LB[Load Balancer] -- "Check /health" --> S1[Server 1]
    LB -- "Check /health" --> S2[Server 2]
    LB -- "Check /health" --> S3[Server 3]
    S1 -- "200 OK" --> LB
    S2 -- "500 Error!" --> LB
    LB -- "Sends Traffic" --> S1
    LB -- "Stop! Server sick" --> S2
    LB -- "Sends Traffic" --> S3
  `,

  analogy:
    "It's like a 'Security Guard' checking the doors of a building every hour. If the guard finds a door unlocked or broken (500 error), they immediately call for backup to fix it. If everything is locked (200 OK), they move on. It's a proactive check to prevent disasters.",

  code: `
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.get('/health', async (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };

  try {
    // 1. Check Database connection
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }

    // 2. Check System Memory
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    healthCheck.memory = \`\${Math.round(memoryUsage)}MB\`;

    // 3. Respond with 200
    res.status(200).json(healthCheck);
  } catch (error) {
    healthCheck.message = error.message;
    // 4. Respond with 503 Service Unavailable
    res.status(503).json(healthCheck);
  }
});

app.listen(3000);
  `,

  commonMistake: [
    "Performing a FULL database query in the health check (this can cause heavy load if the health check runs every few seconds). Just check the 'connection state'.",
    "Logging every single health check call to your main log file (this will fill up your logs with thousands of 'GET /health 200' lines; exclude it from Morgan logs).",
    "Only checking if the server is running, but ignoring critical third-party APIs or Redis connections that your app depends on.",
    "Not protecting the endpoint: Occasionally, '/health' might leak sensitive info like memory usage—consider using a secret header or IP restriction if it's publicly accessible.",
  ],

  interviewSummary:
    "Health check endpoints are vital for observability and orchestration. They provide real-time status of the application and its dependencies, enabling automated monitoring tools to make decisions on routing and process management.",

  interviewQA: [
    {
      q: "What is the difference between a Liveness Probe and a Readiness Probe?",
      a: "A Liveness probe checks if the app is alive (if not, restart it). A Readiness probe checks if the app is ready to serve traffic (if not, stop sending traffic but don't restart it yet).",
    },
    {
      q: "What HTTP status should a failing health check return?",
      a: "Usually 503 (Service Unavailable) or 500 (Internal Server Error).",
    },
  ],
};
