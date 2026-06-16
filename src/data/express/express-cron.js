export const expressCron = {
  id: "express-cron",
  title: "Scheduled Tasks — Node-Cron & Automation",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Node-Cron", "Scheduling", "Cron Job", "Automation", "Tasks", "Timed Events"],

  definition:
    "Node-Cron is a small task scheduler in pure JavaScript for Node.js. It allows you to schedule tasks (functions) to run at specific times or intervals (e.g., every minute, every day at midnight) using the standard 'crontab' syntax.",

  simpleExplanation:
    "Imagine setting an 'Alarm' on your phone to remind you to take your medicine every morning at 8:00 AM. Node-Cron is that alarm system for your server. You can tell it: 'Every Sunday night, clean up the temporary files' or 'Every hour, update the currency exchange rates.' Once you set it, it runs automatically without you doing anything.",

  romanUrduRevision:
    "Node-Cron tasks ko schedule karne ke liye use hota hai. Agar aap chahte hain ke koi function rozana raat 12 baje chale (jaise database backup), toh aap node-cron use karenge. Is mein 5 ya 6 stars ( * * * * * ) se time define kiya jata hai (minute, hour, day of month, month, day of week).",

  realLifeExample:
    "Monthly Subscription Billing: On the 1st of every month at 00:00, your server runs a cron job that finds all active users, calculates their bill, and generates an invoice automatically.",

  why: "Efficiency and Automation. You shouldn't manually run cleanup scripts or database backups. Scheduled tasks ensure these critical maintenance jobs happen reliably and consistently, even when you are asleep. It keeps your database clean and your data up-to-date automatically.",

  how: [
    "Step 1 - Install 'node-cron'.",
    "Step 2 - Import 'cron'.",
    "Step 3 - Use 'cron.schedule('time', callback)' to define the schedule.",
    "Step 4 - Use the 5-star syntax: 'Minute Hour DayOfMonth Month DayOfWeek'.",
    "Step 5 - Start the app. The cron jobs will initialize and wait for their scheduled time.",
  ],

  diagram: `
graph TD
    Start[Server Starts] --> Init[Init Cron Jobs]
    Init --> Wait[Waiting for scheduled time...]
    Wait -- "Matches * * * * *" --> Execute[Run Task Function]
    Execute --> Log[Log Result]
    Log --> Wait
    style Execute fill:#f39c12,color:white
  `,

  analogy:
    "It's like an 'Automatic Sprinkler System' for a garden. You don't go out and water the plants every day; you set a timer to run the sprinklers every morning at 6:00 AM. The system handles the timing, so your garden stays green automatically.",

  code: `
const cron = require('node-cron');
const express = require('express');
const app = express();

// 1. Schedule a task to run every minute
cron.schedule('* * * * *', () => {
  console.log('--- Running cleanup task every minute ---');
  // Logic: Delete old temp files, reset daily counters, etc.
});

// 2. Schedule a task to run daily at midnight
// Syntax: 'minute hour day-of-month month day-of-week'
cron.schedule('0 0 * * *', () => {
  console.log('Performing daily database backup...');
});

// 3. Conditional scheduling (Stop/Start)
const task = cron.schedule('*/5 * * * *', () => {
  console.log('Every 5 minutes, only if server is healthy');
}, { scheduled: false });

task.start(); // Start the task manually

app.listen(3000);
  `,

  commonMistake: [
    "Using the wrong number of stars—standard cron uses 5, but some libraries support seconds (6 stars). Check the documentation!",
    "Setting heavy tasks to run during peak traffic hours (e.g., running a full DB backup at 2:00 PM when everyone is using the site).",
    "Forgetting about 'Timezones'. By default, cron uses the server's local time, which might be different from yours.",
    "Running duplicate cron jobs in a clustered environment (e.g., if you have 4 PM2 instances, the same cron job might run 4 times simultaneously). Fix: Use a Redis lock or a dedicated 'worker' instance for crons.",
  ],

  interviewSummary:
    "Node-Cron is a lightweight task scheduler for Node.js using crontab syntax. It's ideal for periodic maintenance, data syncing, and automated reporting. For production scaling with multiple instances, use a centralized solution like Bull with cron support.",

  interviewQA: [
    {
      q: "What does '*/15 * * * *' mean?",
      a: "It means the task will run 'Every 15 minutes' every day, every month.",
    },
    {
      q: "How do you prevent a cron job from running multiple times in a cluster?",
      a: "You can use a library like 'redlock' with Redis to ensure only one instance acquires the lock to run the task, or have a dedicated 'cron-worker' process that isn't scaled.",
    },
  ],
};
