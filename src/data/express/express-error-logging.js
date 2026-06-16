export const expressErrorLogging = {
  id: "express-error-logging",
  title: "Error Logging — Winston & Pino",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Logging", "Winston", "Pino", "Production", "Debugging", "Monitoring", "Files"],

  definition:
    "Professional logging libraries like Winston and Pino replace 'console.log/error' with structured, configurable logging systems. They support multiple transports (console, file, external services), log levels (error, warn, info, debug), and output formats (JSON, human-readable), making production debugging and monitoring dramatically more effective.",

  simpleExplanation:
    "'console.log' is like a 'Post-it Note' on your monitor—useful when you are sitting right there, but lost forever when you walk away. 'Winston' is like a 'CCTV System with Cloud Backup'. It records everything, categorizes by severity (Info, Warning, Error), stores it in files, and can even send critical alerts to Slack or an email when something goes wrong. For production, you can NEVER rely on 'console.log'.",

  romanUrduRevision:
    "Production mein 'console.log' use karna professional nahi hai kyunke yeh logs structured nahi hote, file mein nahi save hote, aur level-based filtering nahi hoti. 'Winston' ek powerful logging library hai jo har error ko timestamp ke saath, level ke saath, aur JSON format mein store karta hai. 'Pino' Winston se bhi tezi se kaam karta hai (bohot low overhead) aur mostly microservices mein use hota hai. Dono ko 'Transports' ke zariye files mein log save karne ki sahulat milti hai.",

  why: "Searchable, Structured, and Durable Logs. When a production bug hits at 3 AM, you need to search logs by date, error level, and user ID. 'console.log' is just a stream of text. Winston and Pino produce structured JSON logs that can be fed into log management tools like Datadog, Papertrail, or Sentry, making root cause analysis something that takes minutes, not hours.",

  how: [
    "Step 1 - Install: 'npm install winston' or 'npm install pino pino-pretty'.",
    "Step 2 - Create a logger utility: 'utils/logger.js'.",
    "Step 3 - Configure log levels and transports (Console for dev, File for prod).",
    "Step 4 - Replace all 'console.error' calls with 'logger.error(...)'.",
    "Step 5 - In your central error handler, use 'logger.error(err)' instead of 'console.error'.",
  ],

  diagram: `
flowchart LR
    A[App Event] --> B[Logger.error / .warn / .info]
    B --> C{Transport}
    C -- "Development" --> D[Console: Colored Output]
    C -- "Production" --> E[File: error.log / combined.log]
    C -- "Cloud" --> F[Datadog / Sentry / Slack]
    style B fill:#3498db,color:white
    style E fill:#2ecc71,color:white
  `,

  analogy:
    "A 'Black Box Flight Recorder' in an airplane. Every single event during the flight is silently recorded. If a crash happens days or weeks later, investigators can extract the black box and know exactly, second by second, what happened. Winston is your application's black box — it records everything, even if no developer is watching.",

  realLifeExample:
    "Production Incident: Your API goes down on a Saturday morning. Because you used Winston with file transports, you open 'logs/error.log', search for Saturday's timestamp, and find: '[ERROR] 2026-01-01T06:30:00Z: MongooseError: Server selection timeout'. You know exactly what happened, what time, and where — without a single user having to explain it to you.",

  code: `
// --- utils/logger.js ---
const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Structured JSON for easy searching
  ),
  transports: [
    // File for errors
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // File for all levels
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// In dev: pretty print to console too
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }));
}

module.exports = logger;


// --- Using in Error Handler ---
const logger = require('./utils/logger');

const globalErrorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
  });
  res.status(err.statusCode || 500).json({ error: err.message });
};
  `,

  commonMistake: [
    "Using 'console.log' and calling it 'logging' (console output is ephemeral and unstructured).",
    "Not creating the 'logs' directory before using File transports (Winston will throw an error).",
    "Setting log level to 'debug' in production (this creates massive log files and hides critical signals in noise).",
    "Logging sensitive data like passwords or JWT tokens (logs are often less secured than your DB — never log credentials).",
  ],

  interviewSummary: [
    "Winston provides configurable log levels, formats, and multiple transports.",
    "Pino is a JSON-first, extremely low-overhead logger, ideal for high-performance services.",
    "Structured JSON logs are superior to plain text for searching and filtering.",
    "Log levels (error, warn, info, debug) allow you to filter signals from noise in production.",
  ],
};
