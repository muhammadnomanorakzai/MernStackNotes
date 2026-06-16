export const expressZeroDowntime = {
  id: "express-zero-downtime",
  title: "Zero-Downtime Deployment — PM2 Ecosystem",
  category: "Express",
  difficulty: "Advanced",
  tags: ["PM2", "Zero-Downtime", "Reload", "Cluster Mode", "Production", "Reliability", "Deployment"],

  definition:
    "Zero-Downtime Deployment is a technique that allows you to update your application code on a live server without the website ever going 'offline'. By using PM2's 'Cluster Mode' and the 'reload' command, new processes are started while old ones are still finishing their tasks, ensuring at least one version of the app is always available to handle traffic.",

  simpleExplanation:
    "Imagine a 'Relay Race'. When one runner (Old App Version) finishes their lap, they don't just stop and leave. They pass the baton to the next runner (New App Version) who is already running at full speed. Because of this smooth handoff, the race (Your Website) never stops for even a second. PM2 manages this handoff automatically so your users never see a '502 Bad Gateway' error during updates.",

  romanUrduRevision:
    "Zero-downtime deployment ka matlab hai ke jab aap apni app update karein, toh website aik second ke liye bhi band na ho (no 404/502 errors). PM2 mein 'pm2 reload' command use karne se naye processes bari bari start hote hain aur purane tameez se band hote hain. Is ke liye app ko 'Cluster Mode' mein chalana zaroori hai.",

  realLifeExample:
    "E-Commerce Flash Sale: You need to fix a small bug during a massive sale with 10,000 active shoppers. If you use 'restart', the site goes down for 5 seconds and you lose thousands of dollars. If you use 'reload' with 4 clusters, PM2 replaces them one-by-one. The site stays live, and the shoppers never even notice the update happened.",

  why: "Professionalism and Continuity. In the modern web, 'Downtime' is unacceptable. A zero-downtime strategy ensures your users have a 99.99% uptime experience. It allows developers to deploy updates multiple times a day with total confidence, knowing they aren't disrupting anyone's workflow or transaction.",

  how: [
    "Step 1 - Create an 'ecosystem.config.js' file for PM2.",
    "Step 2 - Set 'instances: \"max\"' (or a number like 4) to enable Cluster Mode.",
    "Step 3 - Set 'exec_mode: \"cluster\"'.",
    "Step 4 - Deploy your new code to the server.",
    "Step 5 - Run 'pm2 reload ecosystem.config.js' (instead of 'restart').",
    "Step 6 - PM2 will perform a 'Rolling Update' across all your CPU cores.",
  ],

  diagram: `
graph TD
    subgraph Instances [PM2 Clusters]
        P1[Process 1: v1]
        P2[Process 2: v1]
        P3[Process 3: v1]
        P4[Process 4: v1]
    end
    Admin[Developer] -- "pm2 reload" --> PM2[PM2 Manager]
    PM2 -- "Step 1" --> P1_New[P1: Start v2]
    P1_New -- "Wait ready" --> P1_Old[P1: Stop v1]
    PM2 -- "Step 2" --> P2_New[P2: Start v2]
    P2_New -- "Wait ready" --> P2_Old[P2: Stop v1]
    Note over Instances: Rolling hand-off ensures 100% Availability
  `,

  analogy:
    "It's like 'Changing Tires on a Moving Car' (hypothetically). Instead of stopping the car (Website Down), you have 4 wheels (Clusters). You replace one wheel at a time while the other 3 keep the car moving. By the time you're done, the car is running on new tires without ever standing still.",

  code: `
// --- ecosystem.config.js ---
module.exports = {
  apps: [{
    name: "mern-app",
    script: "./src/server.js",
    
    // 1. Enable Cluster Mode
    instances: "max", // Use all CPU cores
    exec_mode: "cluster",
    
    // 2. Zero-downtime settings
    listen_timeout: 3000, // Wait 3s for app to be ready
    kill_timeout: 5000,   // Wait 5s for graceful shutdown
    
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
};

// --- Deployment Command ---
// git pull origin main
// npm install
// pm2 reload ecosystem.config.js --env production
  `,

  commonMistake: [
    "Using 'pm2 restart' instead of 'pm2 reload'. 'Restart' kills ALL processes at once, causing immediate downtime. 'Reload' is zero-downtime.",
    "Not handling 'Graceful Shutdown' (Topic 82) in your code. If the code doesn't listen for SIGTERM, PM2 will force-kill it, potentially cutting off active user requests.",
    "Using 'instances: 1'. If you only have one instance, PM2 has to kill it to start the new one, which means at least a 1-2 second gap where the site is down.",
    "Not checking 'pm2 logs' after a reload to ensure the new version actually started correctly.",
  ],

  interviewSummary:
    "Zero-downtime deployment is achieved in Node.js primarily through PM2's cluster mode and the 'reload' signal. It allows for continuous integration and delivery (CI/CD) without impacting the user experience, making it a cornerstone of modern production infrastructure.",

  interviewQA: [
    {
      q: "What is the key difference between PM2 Restart and PM2 Reload?",
      a: "Restart stops and kills all processes immediately. Reload starts a new process first and only kills the old one once the new one is 'ready', ensuring no gap in service.",
    },
    {
      q: "Why do you need 'exec_mode: cluster' for zero-downtime?",
      a: "Because zero-downtime requires at least two processes to exist simultaneously during the handoff. Cluster mode allows PM2 to manage multiple instances of the same app seamlessly.",
    },
  ],
};
