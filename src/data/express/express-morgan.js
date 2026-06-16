export const expressMorgan = {
  id: "express-morgan",
  title: "morgan Middleware — HTTP Request Logging",
  category: "Express",
  difficulty: "Beginner",
  tags: ["Morgan", "Logging", "Middleware", "Monitoring", "Debugging", "HTTP"],

  definition:
    "Morgan is an HTTP request logger middleware for Node.js. It simplifies the process of logging information about incoming requests (like Method, URL, Status Code, and Response Time) to the console or a file, which is essential for debugging and monitoring server activity.",

  simpleExplanation:
    "Think of 'Morgan' as a 'CCTV Camera' for your server. Every time someone walks into your shop (makes a request), Morgan records: What time they came, which door they used, and how long they stayed. Without Morgan, your server terminal would be quiet and empty, making it impossible to know if anyone is using your site or if there are errors happening in the background.",

  romanUrduRevision:
    "Morgan middleware ka kaam server par aane waali har request ka record rakhna hai. Yeh aapko terminal mein dikhata hai ke kaunsa URL hit hua, status code kya tha, aur response mein kitna time laga. Debugging ke liye yeh bohot zaroori hai. Production mein hum ise files mein log kar sakte hain taake baad mein audit kiya ja sake.",

  why: "Visibility. When your server is running in production, you can't 'see' what users are doing. Morgan provides a live feed of activity. If you see a sudden spike in 404 errors, you know a link is broken. If you see 500 errors, you know your code is crashing. It helps you find and fix problems before users even report them.",

  how: [
    "Step 1 - Install the package: 'npm install morgan'.",
    "Step 2 - Import it: 'const morgan = require(\"morgan\");'.",
    "Step 3 - Choose a format (e.g., 'dev', 'tiny', 'combined', 'common').",
    "Step 4 - Use it globally: 'app.use(morgan(\"dev\"));'.",
    "Step 5 - For production, configure it to write to a log file using 'fs.createWriteStream'.",
  ],

  diagram: `
flowchart LR
    A[Client Request] --> B[Morgan Middleware]
    B --> C[Format Log String]
    C --> D[Output to Console/File]
    D --> E[Next Middleware]
    E --> F[Route Handler]
    style B fill:#3498db,color:white
    style D fill:#f1c40f,color:black
  `,

  analogy:
    "Imagine a Security Guard with a 'Visitor Log Book'. Every time a person enters the building, the guard writes down their name and arrival time. If something goes missing later, you can check the log book to see who was in the building at that exact time. Morgan is that guard and the log book for your server.",

  realLifeExample:
    "Monitoring Performance: You notice your server feels slow. You look at Morgan's logs and see that the '/search' endpoint is taking 2000ms (2 seconds) to respond. Morgan helped you pinpoint the exact 'Slow' part of your app so you can focus your work on optimizing that specific route.",

  code: `
const express = require('express');
const morgan = require('morgan');
const app = express();

// 1. DEVELOPMENT LOGGING (Colorful and concise)
app.use(morgan('dev'));

// 2. LOGGING TO A FILE (Professional/Production way)
const fs = require('fs');
const path = require('path');
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'), 
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
  res.send('Request Logged!');
});

app.listen(3000);
  `,

  commonMistake: [
    "Using 'dev' format in production (it's too verbose and doesn't provide enough detail for long-term audits).",
    "Not rotating log files (log files can grow to Gigabytes and fill up your server disk).",
    "Putting Morgan AFTER routes: Logs will only show up if the route reaches the end of the file, which is wrong.",
    "Logging sensitive data like passwords (make sure your log format is clean).",
  ],

  interviewSummary: [
    "Morgan is used for HTTP request logging in Node.js.",
    "It provides several built-in formats like 'dev', 'combined', and 'tiny'.",
    "It can log to either the console or to file-streams.",
    "Logging is crucial for debugging, auditing, and performance monitoring.",
  ],
};
