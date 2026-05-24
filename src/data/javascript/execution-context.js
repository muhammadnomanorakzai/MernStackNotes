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
    "An execution context is the environment where JavaScript code is evaluated and run. The call stack is the last in first out stack that keeps track of all active execution contexts while the program runs.",

  why:
    "Execution context explains how hoisting, this, scope chains, and recursion all work behind the scenes. It also explains why stack overflow errors happen when too many function calls pile up.",

  how: [
    "Step 1 - The global execution context is created first",
    "Step 2 - Every function call creates a new function execution context",
    "Step 3 - Each context has a creation phase and an execution phase",
    "Step 4 - A new context is pushed onto the call stack when the function is called",
    "Step 5 - When the function returns, that context is popped from the stack",
    "Step 6 - Execution continues in the context below it",
    "Step 7 - Infinite recursion keeps pushing frames until stack overflow happens",
  ],

  diagram: `
flowchart TD
  A[GEC at bottom] --> B[main called]
  B --> C[main FEC pushed]
  C --> D[greet called]
  D --> E[greet FEC pushed]
  E --> F[getName called]
  F --> G[getName FEC pushed top]
  G --> H[getName returns popped]
  H --> I[greet returns popped]
  I --> J[Back to GEC]
  A --> K[Stack overflow means endless growth]
  `,

  analogy:
    "The call stack is like a stack of cafeteria trays. Every time a function is called, a new tray goes on top. The kitchen can only work with the tray at the top, and when that tray is finished it gets removed so the next one underneath can continue. If you keep stacking trays forever, the whole pile eventually crashes.",

  code: `
function getName() {
  // Stack: [GEC, main, greet, getName]
  return "Ali";
}
function greet() {
  // Stack: [GEC, main, greet]
  return "Hello " + getName();
}
function main() {
  // Stack: [GEC, main]
  console.log(greet());
}
// Stack: [GEC]
main();

// function crash() { crash(); } // RangeError stack overflow
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120
  `,

  interviewQA: [
    {
      q: "What is an execution context?",
      a: "An execution context is the environment in which JavaScript code runs. It includes local variables, the scope chain, the this binding, and the code that is currently being executed.",
    },
    {
      q: "What is the call stack?",
      a: "The call stack is a last in first out structure that tracks all active execution contexts. Each function call pushes a new context on top, and each return pops that context off.",
    },
    {
      q: "What happens when a function is called?",
      a: "JavaScript creates a new function execution context, performs a creation phase to set up variables and this, then runs the function body during the execution phase. That new context is pushed onto the call stack until the function returns.",
    },
    {
      q: "What causes a stack overflow error?",
      a: "A stack overflow happens when function calls keep piling onto the call stack until memory is exhausted. The most common reason is recursion without a proper base case to stop further calls.",
    },
  ],
};
