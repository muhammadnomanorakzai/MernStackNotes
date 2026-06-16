export const errorHandling = {
  id: "error-handling",
  title: "Error Handling - try / catch / finally",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "try",
    "catch",
    "finally",
    "throw",
    "Error object",
    "custom error",
    "async errors",
    "graceful degradation",
  ],

  definition:
    "Error handling in JavaScript is a mechanism used to detect runtime failures and prevent application crashes. It uses try, catch, and finally blocks to handle unexpected errors, and throw to manually generate errors when something goes wrong in the program.",

  simpleExplanation:
    "In real applications, errors are unavoidable.\n\nSometimes JSON parsing fails, API calls fail, or user input is invalid.\n\nJavaScript provides a structured way to handle these problems using try, catch, and finally.\n\n- try → contains risky code that may fail\n- catch → handles the error if something goes wrong\n- finally → always runs (success or failure)\n\nInstead of crashing the whole application, JavaScript allows you to gracefully handle the problem and continue running the app.",

  romanUrduRevision:
    "JavaScript mein errors ko handle karne ke liye try, catch aur finally use hota hai.\n\nAgar code fail ho jaye to catch us error ko handle karta hai aur app crash nahi hota.\n\nfinally hamesha run hota hai chahe error aaye ya na aaye.",

  why: "Without error handling, a single mistake can crash the entire application.\n\nIn real-world apps like e-commerce, banking, or dashboards, this is unacceptable.\n\nError handling allows developers to:\n- Prevent crashes\n- Show user-friendly messages\n- Retry failed operations\n- Clean up resources (like loading states or connections)\n- Debug issues effectively using error objects",

  how: [
    "Step 1 - Put risky code inside try block",
    "Step 2 - JavaScript executes code line by line inside try",
    "Step 3 - If an error occurs, execution immediately jumps to catch",
    "Step 4 - catch receives an Error object with message, name, and stack",
    "Step 5 - You can log, recover, or rethrow errors inside catch",
    "Step 6 - finally block runs no matter what (error or success)",
    "Step 7 - throw is used to manually create or trigger errors",
    "Step 8 - async/await uses try/catch for promise-based error handling",
    "Step 9 - custom errors help identify specific business logic failures",
  ],

  diagram: `
flowchart TD
  A[Start Execution]

  A --> B[try block runs]
  B --> C{Error occurs?}

  C -->|No| D[Continue execution]
  C -->|Yes| E[Jump to catch block]

  E --> F[Handle or log error]
  D --> G[finally runs]
  F --> G

  G --> H[Program continues safely]
`,

  realLifeExample:
    "Imagine you are booking a ticket online.\n\n- If payment API fails → catch handles the error and shows 'Payment failed'\n- If everything works → try completes successfully\n- Finally → loading spinner is removed no matter what\n\nThis ensures user experience is smooth even when backend fails.",

  analogy:
    "try/catch/finally is like cooking in a kitchen.\n\n- try → you are cooking a dish\n- catch → if something burns or fails, you fix the mistake\n- finally → you clean the kitchen no matter what happened\n\nEven if food fails, cleaning still happens.",

  code: `
// =========================
// BASIC ERROR HANDLING
// =========================

let loading = true;

try {
  JSON.parse("{ invalid json }"); // risky code
} catch (error) {
  console.log("Error Name:", error.name);
  console.log("Message:", error.message);
} finally {
  loading = false;
  console.log("Loading stopped");
}

// =========================
// MANUAL ERROR THROWING
// =========================

try {
  throw new Error("Something went wrong manually");
} catch (error) {
  console.log(error.message);
}

// =========================
// CUSTOM ERROR CLASS
// =========================

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

try {
  throw new ValidationError("Email is required", "email");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation issue:", error.field);
  } else {
    throw error; // rethrow unknown errors
  }
}

// =========================
// ASYNC ERROR HANDLING
// =========================

async function fetchUser() {
  try {
    throw new Error("API failed");
  } catch (error) {
    console.log("Handled async error:", error.message);
  }
}

fetchUser();
  `,

  commonMistakes: [
    "Ignoring try/catch in async code",
    "Throwing strings instead of Error objects",
    "Using empty catch blocks (hiding errors)",
    "Forgetting finally runs even after return",
    "Not handling rejected promises properly",
    "Overusing try/catch instead of proper validation",
    "Not rethrowing unknown errors in catch",
  ],

  interviewQA: [
    {
      q: "What is try catch used for?",
      a: "It is used to handle runtime errors so that the application does not crash and can recover gracefully.",
    },
    {
      q: "What is the role of finally?",
      a: "finally always executes after try and catch, regardless of success or failure, and is used for cleanup tasks.",
    },
    {
      q: "How does throw work in JavaScript?",
      a: "throw is used to manually create an error and stop normal execution flow until it is caught.",
    },
    {
      q: "Can async functions use try catch?",
      a: "Yes, async/await errors behave like synchronous errors and can be handled using try/catch.",
    },
    {
      q: "Why should we use Error objects instead of strings?",
      a: "Error objects provide stack traces and structured debugging information which strings do not.",
    },
  ],

  realWorldUsage: [
    "API request error handling",
    "Form validation in frontend applications",
    "Database error handling in backend systems",
    "Payment processing error recovery",
    "File handling and parsing safety",
    "Authentication and authorization checks",
    "Logging and monitoring systems",
  ],

  interviewSummary: [
    "try contains risky code",
    "catch handles errors safely",
    "finally always runs",
    "throw creates custom errors",
    "Error objects provide debugging details",
    "Async code uses try/catch with await",
    "Essential for production-ready applications",
  ],
};
