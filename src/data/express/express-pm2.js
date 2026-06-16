export const expressPm2 = {
  id: "express-pm2",
  title: "PM2 — Production-Grade Process Management",
  category: "Express",
  difficulty: "Advanced",
  tags: ["PM2", "Production", "Process Manager", "Clustering", "Monitoring", "Zero-downtime"],

  definition:
    "PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime, and to facilitate common system admin tasks like logging and monitoring.",

  simpleExplanation:
    "Running your app with 'node server.js' is like driving a car without a dashboard or a spare tire. If it breaks down, it just stops. PM2 is like a 24/7 mechanic and autopilot system for your car. It watches your app, restarts it if it crashes, scales it to use all engines (CPU cores), and keeps a detailed log of every trip.",

  romanUrduRevision:
    "PM2 production deployments ke liye standard tool hai. 'node server.js' direct nahi chalaya jata kyunke crash hone par app band ho jati hai. PM2 app ko khud restart karta hai, multi-core setup (clustering) manage karta hai, aur zero-downtime reloads allow karta hai.",

  realLifeExample:
    "A fintech API that must be online 24/7: When you push a new update, you use 'pm2 reload'. PM2 starts new workers with the new code first, then gracefully kills the old ones. This ensures that not a single payment request is lost during the update.",

  why: "Reliability and Scalability. In production, you need 'Process Monitoring' (auto-restart on crash), 'Log Management' (access logs/errors easily), and 'Cluster Mode' (utilize all CPU cores). PM2 handles all of this out of the box with simple commands, saving you from writing complex infra code.",

  how: [
    "Step 1 - Install PM2 globally: 'npm install -g pm2'.",
    "Step 2 - Start an app in cluster mode: 'pm2 start app.js -i max'.",
    "Step 3 - View live logs: 'pm2 logs'.",
    "Step 4 - Deploy using an 'ecosystem.config.js' file for consistent settings.",
    "Step 5 - Use 'pm2 startup' to ensure the app survives server reboots.",
  ],

  diagram: `
graph TD
    PM2[PM2 Master Process]
    PM2 --> W1[Worker 1]
    PM2 --> W2[Worker 2]
    PM2 --> W3[Worker 3]
    PM2 --> W4[Worker 4]
    W1 -- Crash! --> R[PM2 Auto-Restart]
    R --> W1_New[Worker 1 - Fresh]
  `,

  analogy:
    "It's like a TV Station manager. If an actor faints (app crashes), the manager immediately sends in a double (auto-restart) so the audience (users) never sees a black screen. The manager also makes sure there are enough cameras (workers) to cover the whole stadium.",

  code: `
// ecosystem.config.js
module.exports = {
  apps : [{
    name: "my-app",
    script: "./server.js",
    instances: "max", // Use all CPU cores
    exec_mode: "cluster",
    watch: false, // Don't watch in production
    max_memory_restart: "1G", // Restart if hits 1GB RAM
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}

// Commands:
// pm2 start ecosystem.config.js --env production
// pm2 monit (Real-time dashboard)
// pm2 reload my-app (Zero-downtime)
  `,

  commonMistakes: [
    "Using 'pm2 restart' instead of 'pm2 reload' (restart kills all workers at once, causing downtime).",
    "Forgetting to run 'pm2 save' after 'pm2 startup', so the list doesn't persist after reboot.",
    "Monitoring logs by ssh-ing and reading files manually (use 'pm2 logs' or 'pm2 monit').",
    "Not configuring 'max_memory_restart', which can lead to server-wide OOM (Out of Memory) crashes.",
  ],

  interviewSummary:
    "PM2 is the de-facto process manager for Node.js. Its core features include clustering, automatic restarts, monitoring, and environment management. It is essential for any production-grade MERN stack application.",

  interviewQA: [
    {
      q: "What is the difference between 'pm2 restart' and 'pm2 reload'?",
      a: "'Restart' kills and restarts all processes immediately (with downtime). 'Reload' restarts workers one by one (zero downtime).",
    },
    {
      q: "How does PM2 handle load balancing in cluster mode?",
      a: "It uses the native Node.js cluster module which utilizes a Round-Robin approach to distribute incoming connections across workers.",
    },
  ],
};

