export const expressErrorTypes = {
  id: "express-error-types",
  title: "Operational vs Programmer Errors",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Error Handling", "Operational", "Programmer Error", "Debugging", "Production", "Crash"],

  definition:
    "In professional Node.js applications, errors are divided into two fundamental categories: **Operational Errors** — predictable problems that arise during normal app operation (e.g., invalid user input, network failure, resource not found) — and **Programmer Errors** — bugs in the code itself (e.g., reading a property of undefined, using wrong variable types, logic flaws).",

  simpleExplanation:
    "Think of it like running a restaurant. An 'Operational Error' is when a customer orders a dish that's sold out (expected, handled by saying 'Sorry, it's not available'). A 'Programmer Error' is when the chef accidentally sets the kitchen on fire (unexpected, NOT handled by just apologizing—you close the kitchen and call for help!). The same distinction applies to your server: operational errors get a clean JSON response; programmer errors should trigger alerts and potentially restart the process.",

  romanUrduRevision:
    "Errors ko samjhne ke liye do category hain. 'Operational Errors' wo hote hain jo aap predict kar sakte hain—jaise user ne invalid data bheja ya koi record database mein mila nahi. Inhe aap AppError class se handle karte hain aur client ko meaningful message bhejte hain. 'Programmer Errors' wo hote hain jo aapke code ki ghalti hai—jaise koi 'undefined' ki property try ki. Yeh unexpected hain aur kabhi kabhi server restart karna par sakta hai. Production mein in dono ko alag treat karna zaruri hai.",

  why: "Safe Recovery vs. Alerting. For operational errors, you just send a response and move on—the server is fine. For programmer errors, the application might be in an unpredictable, corrupted state. The 'safe' action is often to terminate the process and let the process manager (like PM2) restart it fresh. Mixing these two categories leads to either crashing on normal user mistakes OR ignoring serious bugs.",

  how: [
    "Step 1 - Identify errors using the 'isOperational' flag on your AppError class.",
    "Step 2 - In your central error handler, check 'err.isOperational'.",
    "Step 3 - Operational: Send a formatted JSON response (4xx, 5xx).",
    "Step 4 - Programmer: Log the full error (use Winston), send a generic '500 Something went wrong' to the client.",
    "Step 5 - For critical crashes, trigger 'process.exit(1)' after logging so a process manager can restart the server.",
  ],

  diagram: `
flowchart TD
    A[Error Occurs] --> B{isOperational?}
    B -- "Yes" --> C[AppError / Predictable]
    B -- "No" --> D[Bug / Programmer Error]
    C --> E[res.json: Descriptive Error]
    D --> F[Log full stack]
    F --> G[Send generic message to client]
    G --> H[process.exit(1) if critical]
    style C fill:#f39c12,color:white
    style D fill:#e74c3c,color:white
  `,

  analogy:
    "A 'Pilot' faces two types of problems. An operational problem is a storm ahead — they reroute, announce a delay, and land safely (handled). A programmer problem is an engine failure — they don't keep flying and pretend it's fine. They immediately declare an emergency, follow the crash protocol, and land using emergency procedures. The key distinction is: handle vs. escalate.",

  realLifeExample:
    "Authentication API: A user sends an expired token (Operational: 401 Unauthorized — handled cleanly). Meanwhile, a developer accidentally introduces a bug where 'user.profile.name' is accessed when 'profile' is null (Programmer Error: 'Cannot read property name of null'). This would cause an unhandled exception. Without the distinction, both would be treated the same way — which is dangerous.",

  code: `
// --- AppError (Operational) ---
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// --- Central Error Handler ---
const globalErrorHandler = (err, req, res, next) => {
  // 1. OPERATIONAL (our AppErrors)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: 'fail',
      message: err.message
    });
  }

  // 2. PROGRAMMER ERROR (unexpected bug)
  console.error('PROGRAMMER ERROR!', err.stack);
  
  // Send generic message (don't leak details)
  res.status(500).json({
    status: 'error',
    message: 'Internal server error. Please try again later.'
  });
};

module.exports = { AppError, globalErrorHandler };
  `,

  commonMistake: [
    "Treating every Error as an operational error by setting isOperational: true everywhere (this hides real bugs).",
    "Sending detailed stack traces to the client for programmer errors (this is a serious security leak).",
    "Not restarting after a programmer error (the process may be in an inconsistent state and serve corrupt data).",
    "Catching programmer errors in try/catch without re-throwing (the catch block may silently swallow the bug).",
  ],

  interviewSummary: [
    "Operational errors are predictable, trusted errors handled with proper responses.",
    "Programmer errors are bugs — the process should be considered unstable after encountering one.",
    "The isOperational flag distinguishes the two in a custom AppError class.",
    "Production best practice: log programmer errors, send generic response, restart with PM2.",
  ],
};
