export const executionContext = {
  id: "execution-context",
  title: "Execution Context & Call Stack",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "execution context",
    "call stack",
    "global context",
    "function context",
    "creation phase",
    "execution phase",
    "stack overflow",
  ],

  definition:
    "An execution context is the environment in which JavaScript code is executed and evaluated. It contains all the information needed to run code, such as variables, functions, scope, and the value of 'this'. The call stack is a LIFO (Last In First Out) data structure that keeps track of all active execution contexts.",

  simpleExplanation:
    "When JavaScript runs any code, it does not execute everything randomly. Instead, it creates a special environment called an execution context.\n\nThink of it like a workspace where JavaScript keeps track of variables, functions, and the current state of code execution.\n\nEvery time a function is called, JavaScript creates a new execution context for that function and puts it on top of something called the call stack.\n\nWhen the function finishes, that context is removed from the stack, and control goes back to the previous one.\n\nThis is how JavaScript manages step-by-step execution of code.",

  romanUrduRevision:
    "Execution context ek aisa environment hota hai jahan JavaScript code execute hota hai.\n\nJab bhi function call hota hai, naya execution context call stack par add ho jata hai aur jab function complete hota hai to remove ho jata hai.",

  why: "Execution context helps JavaScript manage code execution properly. It explains how variables are stored, how functions are called, how scope works, and how the 'this' keyword is determined. Without execution context, JavaScript would not be able to handle multiple function calls or nested function execution.",

  how: [
    "Step 1 - JavaScript creates a Global Execution Context when the program starts",
    "Step 2 - Each function call creates a new Function Execution Context",
    "Step 3 - Each execution context has a Creation Phase (memory setup)",
    "Step 4 - Then Execution Phase starts where code is executed line by line",
    "Step 5 - Each new context is pushed onto the Call Stack",
    "Step 6 - When function completes, its context is popped from the stack",
    "Step 7 - Execution continues in the previous context",
    "Step 8 - Infinite function calls can cause Stack Overflow error",
  ],

  diagram: `
flowchart TD
  A[Global Execution Context]

  A --> B[main() called]
  B --> C[main Execution Context pushed]
  C --> D[greet() called]
  D --> E[greet Execution Context pushed]
  E --> F[getName() called]
  F --> G[getName Execution Context pushed TOP]

  G --> H[getName completes - POP]
  H --> I[greet completes - POP]
  I --> J[Back to main context]
  J --> K[Back to Global Context]

  A --> L[Call Stack works LIFO]
  L --> M[Last In First Out]
  M --> N[Stack Overflow if unlimited calls]
  `,

  realLifeExample:
    "Imagine a chef working in a kitchen. The chef can only focus on one dish at a time. Every new order is placed on top of a stack of orders. The chef always works on the top order first. When a dish is completed, it is removed from the stack and the chef moves to the next one. This is exactly how the JavaScript call stack works.",

  analogy:
    "The call stack is like a stack of books. You can only add a new book on top, and you can only remove the top book first. JavaScript behaves the same way with function calls.",

  code: `
function getName() {
  return "Ali";
}

function greet() {
  return "Hello " + getName();
}

function main() {
  console.log(greet());
}

main();

// Stack Flow:
// Global → main → greet → getName → return back step by step


// Stack Overflow Example (Danger)
function crash() {
  crash(); // infinite recursion
}

// factorial example (safe recursion)
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
  `,

  commonMistakes: [
    "Thinking JavaScript executes all functions at the same time",
    "Confusing execution context with call stack",
    "Forgetting that each function call creates a new execution context",
    "Not understanding why stack overflow happens in recursion",
    "Assuming variables are shared between function calls automatically",
    "Ignoring the importance of base case in recursion",
  ],

  interviewQA: [
    {
      q: "What is an execution context in JavaScript?",
      a: "An execution context is the environment where JavaScript code is executed. It contains variables, functions, scope, and the value of this for that execution.",
    },
    {
      q: "What is the call stack?",
      a: "The call stack is a LIFO data structure that keeps track of all execution contexts currently running in JavaScript.",
    },
    {
      q: "What are the phases of execution context?",
      a: "There are two phases: Creation Phase (memory allocation and hoisting) and Execution Phase (code runs line by line).",
    },
    {
      q: "What causes stack overflow?",
      a: "Stack overflow happens when too many function calls are added to the call stack, usually due to infinite recursion without a base case.",
    },
    {
      q: "Why is execution context important?",
      a: "It explains how JavaScript handles scope, hoisting, this keyword, and function execution behind the scenes.",
    },
  ],

  realWorldUsage: [
    "Function execution and program flow",
    "Understanding recursion",
    "Debugging call stack errors",
    "Scope and variable behavior",
    "Memory management in JavaScript engine",
    "Framework execution flow (React, Node.js)",
    "Async function execution understanding",
  ],

  interviewSummary: [
    "Execution context is the environment where code runs.",
    "Each function creates a new execution context.",
    "Call stack follows LIFO (Last In First Out).",
    "Creation phase and execution phase exist in every context.",
    "Stack overflow happens due to infinite recursion.",
    "Global context is created first.",
    "Execution context explains scope, hoisting, and this behavior.",
  ],
};
