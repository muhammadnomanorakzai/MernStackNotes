export const expressAppError = {
  id: "express-app-error",
  title: "Custom AppError Class — statusCode, message, isOperational",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Error Handling", "OOP", "AppError", "Custom Error", "Class", "Best Practices"],

  definition:
    "A custom 'AppError' class extends Node.js's built-in 'Error' class to add application-specific properties like 'statusCode' and 'isOperational'. This allows you to differentiate between errors YOU expect and handle (like a 404 or 401) and errors you did NOT expect (like a database crash), enabling your error handler to respond appropriately.",

  simpleExplanation:
    "JavaScript's built-in Error is like a plain 'Alarm Bell'—it just rings. A custom AppError is like a 'Smart Alarm System' that tells you: which room has the problem (statusCode), what the problem is (message), and is this expected or a total surprise (isOperational). Without this, your server would respond with a raw, ugly crash message every time. With it, you control every aspect of how errors look and behave.",

  romanUrduRevision:
    "JavaScript ki default 'Error' class sirf message rakhti hai. Senior developers apni khud ki 'AppError' class banate hain jo 'Error' se extend hoti hai aur usmein 'statusCode' aur 'isOperational' property add karte hain. 'isOperational: true' ka matlab hai ke yeh expected error hai (jaise user ne galat ID dali), aur humein ghrabrana nahi chahiye. 'isOperational: false' ka matlab hai ke kuch bohot bada toot gaya (jaise database connection fail) jo shayad server ko restart karne par majboor kar de.",

  why: "Intelligent Error Management. You cannot respond to 'User Not Found' (404) and 'Database Crashed' (500) the same way. The AppError class provides a clean, object-oriented way to carry all the context your error handler needs: the HTTP status code to send, the user-facing message, and a flag to decide whether to restart the process. It makes your error handling code expressive and fully type-safe.",

  how: [
    "Step 1 - Create a file 'utils/AppError.js'.",
    "Step 2 - Define a class that 'extends Error'.",
    "Step 3 - In the constructor, call 'super(message)' and set 'this.statusCode', 'this.status', and 'this.isOperational'.",
    "Step 4 - Capture the stack trace using 'Error.captureStackTrace(this, this.constructor)'.",
    "Step 5 - Use it everywhere: 'throw new AppError(\"User not found\", 404)'.",
  ],

  diagram: `
flowchart LR
    A[Route] -- "throw new AppError(msg, 404)" --> B[Central Error Handler]
    B --> C{isOperational?}
    C -- "Yes (4xx)" --> D[Send Error to Client]
    C -- "No (5xx crash)" --> E[Log & Notify Team]
    E --> F[Graceful Shutdown if needed]
    style C fill:#3498db,color:white
    style D fill:#f39c12,color:white
    style E fill:#e74c3c,color:white
  `,

  analogy:
    "A hospital has two types of alerts. 'Expected Alerts' are like normal beeper calls—a nurse goes to check on a patient who pressed the button. 'Unexpected Alarms' are like a fire alarm—everyone evacuates and the fire brigade is called. AppError's 'isOperational' flag is exactly this distinction.",

  realLifeExample:
    "MERN Project: You query MongoDB for a product by ID. The ID doesn't exist. You throw 'new AppError(\"Product not found\", 404)'. Your error handler sees 'isOperational: true', knows this is a normal scenario, and returns a clean JSON 404. If MongoDB itself goes down (isOperational: false), your handler can log the crash and optionally restart the process.",

  code: `
// --- utils/AppError.js ---
class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Call parent Error constructor

    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // Cleaner stack trace      
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;


// --- In a Route ---
const AppError = require('./utils/AppError');
const User = require('./models/User');

const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    // Clean, descriptive, operational error
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({ success: true, data: user });
};

// --- In globalErrorHandler.js ---
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (err.isOperational) {
    res.status(err.statusCode).json({ status: err.status, message: err.message });
  } else {
    // Programmer error: send generic message
    console.error('CRITICAL ERROR', err);
    res.status(500).json({ status: 'error', message: 'Something went very wrong!' });
  }
};
  `,

  commonMistake: [
    "Forgetting 'super(message)' in the constructor (the Error message won't be set properly).",
    "Setting 'isOperational' for ALL errors (reserve it for errors YOU intentionally throw; unexpected crashes should not be isOperational).",
    "Not using 'Error.captureStackTrace' (the stack trace will include the AppError class itself, cluttering your logs).",
    "Sending the full stack trace in a production response (use process.env.NODE_ENV to gate this).",
  ],

  interviewSummary: [
    "A custom AppError class extends the native Error to add statusCode and isOperational.",
    "isOperational: true signals an expected, handled error; false signals an unexpected crash.",
    "It makes error handling semantic and consistent across the entire application.",
    "Error.captureStackTrace is used to produce clean, readable stack traces.",
  ],
};
