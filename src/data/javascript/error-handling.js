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
    "JavaScript error handling uses try, catch, and finally blocks to detect runtime failures and recover without crashing the whole app. You can also throw your own Error objects when invalid situations are detected.",

  why:
    "Unhandled errors break user flows and can leave apps in inconsistent states. Good error handling lets you show friendly messages, retry work, clean up resources, and keep the rest of the application alive.",

  how: [
    "Step 1 - Put risky code inside a try block",
    "Step 2 - If an error is thrown, execution jumps to catch immediately",
    "Step 3 - The catch block receives the error object with fields like name and message",
    "Step 4 - finally always runs after try and catch for cleanup work",
    "Step 5 - throw creates custom errors and should usually use Error objects",
    "Step 6 - Built in error types include TypeError, ReferenceError, SyntaxError, and RangeError",
    "Step 7 - Async await uses normal try catch around awaited promises",
    "Step 8 - You can rethrow unexpected errors after checking their type",
  ],

  diagram: `
flowchart TD
  A[Code runs in try] --> B{Error thrown}
  B -->|Yes| C[Jump to catch]
  C --> D[Handle error]
  B -->|No| E[Try completes]
  D --> F[finally always runs]
  E --> F
  C --> G[Unhandled errors can crash app]
  `,

  analogy:
    "try and catch are like a trapeze act with a safety net. The performer attempts the risky move in the try block. If they fall, the catch block stops the whole show from ending in disaster. The cleanup crew in finally still comes out afterward no matter what happened.",

  code: `
let loading = true;
try {
  JSON.parse("{ bad json }");
} catch (error) {
  console.log(error.name, error.message);
} finally {
  loading = false;
}

try {
  throw new Error("Something went wrong");
} catch (error) {
  console.log(error.name, error.message, Boolean(error.stack));
}

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

async function loadUser() {
  try { throw new ValidationError("Email required", "email"); }
  catch (error) { if (!(error instanceof ValidationError)) throw error; }
}
  `,

  interviewQA: [
    {
      q: "What is the purpose of try catch finally?",
      a: "try contains risky code, catch handles thrown errors, and finally runs regardless of success or failure. Together they let applications recover gracefully and still perform cleanup.",
    },
    {
      q: "What is the difference between throw new Error and throw a string?",
      a: "Throwing an Error object gives you structured fields like name, message, and stack, which are much better for debugging. Throwing a string loses that useful metadata and is considered poor practice.",
    },
    {
      q: "Does try catch work with async await?",
      a: "Yes. When an awaited promise rejects, it behaves like a thrown error inside the async function, so the surrounding catch block can handle it normally.",
    },
    {
      q: "When would you create a custom Error class?",
      a: "Create one when you want domain specific error types like validation or authentication failures. That lets callers check instanceof and respond differently based on the exact error class.",
    },
  ],
};
