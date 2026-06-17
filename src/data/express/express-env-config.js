export const expressEnvConfig = {
  id: "express-env-config",
  title: "Environment Configuration — Dotenv & NODE_ENV",
  category: "Express",
  difficulty: "Intermediate",
  tags: [
    "dotenv",
    "NODE_ENV",
    "Config",
    "Environment Variables",
    "Best Practices",
    "Security",
  ],

  definition:
    "Environment configuration is the process of managing application settings (like database URLs, secret keys, and port numbers) differently based on where the app is running (Development, Testing, or Production). In Express, this is standardly handled using 'dotenv' files and the 'process.env.NODE_ENV' variable.",

  simpleExplanation:
    "Imagine your app has 'Work Mode' and 'Home Mode'. At home, you use your home keys; at work, you use your office keys. If you accidentally take your home keys to the office, nothing works. Environment variables are these 'keys'. We keep them in a hidden file (.env) so that we don't hardcode sensitive passwords into the code, and 'NODE_ENV' tells the app which set of keys to use right now.",

  romanUrduRevision:
    "Environment variables sensitive data (jaise Database URLs aur API keys) ko code se alag rakhne ke liye use hoti hain. '.env' file mein secrets rakhte hain aur 'process.env' se access karte hain. 'NODE_ENV' batata hai ke app production mein chal rahi hai ya development mein, taake hum settings ko accordingly change kar sakein.",

  realLifeExample:
    "Development vs Production DB: On your laptop, you connect to 'localhost:27017' for MongoDB. But on the live website, you must connect to 'mongodb+srv://...'. Instead of changing the code every time you deploy, you just set a 'MONGO_URI' variable in your environment, and Express reads it automatically.",

  why: "Security and Portability. You should NEVER commit secrets (passwords) to GitHub. Using a '.env' file keeps secrets out of your source code. Also, it allows the exact same code to run on any server just by changing the environment variables, making deployments much easier.",

  how: [
    "Step 1 - Install 'dotenv'.",
    "Step 2 - Create a '.env' file in the root directory (and add it to .gitignore!).",
    "Step 3 - Add 'require(\"dotenv\").config()' at the very TOP of your entry file (server.js).",
    "Step 4 - Access variables using 'process.env.VARIABLE_NAME'.",
    "Step 5 - Set 'NODE_ENV' in your start scripts (e.g., 'NODE_ENV=production node server.js').",
  ],

  diagram: `
graph TD
    ENV_File[".env File (Hidden)"] -- "loads into" --> ProcessEnv["process.env"]
    Shell["bash / pm2 / docker"] -- "sets NODE_ENV" --> ProcessEnv
    ProcessEnv -- "Port/DB/Secrets" --> ExpressApp["Express Application"]
    ExpressApp -- "If prod: hide errors" --> Client
    ExpressApp -- "If dev: show stack trace" --> Developer
  `,

  analogy:
    "It's like a 'Dressing Room'. The actor (your code) stays the same, but the costume (Environment Variables) changes depending on whether they are performing a 'Comedy' (Development) or a 'Drama' (Production). The script remains unchanged.",

  code: `
// server.js
// 1. MUST BE THE VERY FIRST LINE
require('dotenv').config(); 

const express = require('express');
const app = express();

// 2. Use environment variables
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;

// 3. Logic based on NODE_ENV
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  console.log('--- RUNNING IN PRODUCTION MODE ---');
  // Enable strict security, compression, etc.
} else {
  console.log('--- RUNNING IN DEVELOPMENT MODE ---');
  // Enable verbose logging, show full error stacks
}

app.listen(port, () => {
  console.log(\`Server started on port \${port}\`);
});`,

  commonMistake: [
    "Committing the '.env' file to GitHub/Git. (ALWAYS add '.env' to your '.gitignore' file).",
    "Not providing default values (e.g., 'process.env.PORT || 3000'). If the variable is missing, the app might crash.",
    "Loading 'dotenv' too late. If you import a database module that uses variables BEFORE 'dotenv.config()', the database connection will fail.",
    "Using 'development' settings in production (like showing detailed error messages to users), which can leak sensitive database paths or internal logic.",
  ],

  interviewSummary:
    "Environment variables are essential for security and configuration management. 'dotenv' is the tool to load them from a file, and 'NODE_ENV' is the industry-standard variable to determine the app's current execution context (dev, prod, test).",

  interviewQA: [
    {
      q: "Where should you store environment variables in a production server (like Heroku or AWS)?",
      a: "In production, you don't use '.env' files. You set them directly in the platform's Dashboard (Config Vars) or via the CLI so they are injected directly into the process memory.",
    },
    {
      q: "Can you change 'process.env' variables at runtime?",
      a: "Technically yes, but it is a bad practice. Environment variables should be 'Immutable' (read-only) once the process starts to avoid unpredictable behavior.",
    },
  ],
};
