export const closures = {
  id: "closures",
  title: "Closures",
  category: "JavaScript",
  difficulty: "Intermediate",

  tags: [
    "closures",
    "lexical environment",
    "scope chain",
    "private variables",
    "factory functions",
    "encapsulation",
    "memory management",
    "callback",
    "react",
  ],

  definition:
    "A Closure is created when a function remembers and continues to access variables from its outer lexical scope even after the outer function has finished executing. The inner function keeps a reference to the variables it uses, allowing them to remain available in memory.",

  simpleExplanation:
    "Normally, local variables inside a function disappear when the function finishes execution. However, if an inner function still needs those variables, JavaScript keeps them alive.\n\nThis behavior is called a Closure.\n\nA closure allows a function to 'remember' variables from the environment where it was created. Even if the outer function has already returned and its execution context has been removed from the call stack, the inner function can still access those variables.\n\nClosures are one of the most powerful features in JavaScript because they make private variables, factory functions, callbacks, memoization, React Hooks, and module patterns possible.",

  romanUrduRevision:
    "Closure tab banta hai jab inner function outer function ke variables ko yaad rakhta hai, chahe outer function execute hokar khatam bhi ho jaye.\nClosure private state create karta hai aur React Hooks aur callbacks ke peeche bhi yahi concept kaam karta hai.",

  why: "Without closures, functions would lose access to their local variables as soon as execution completed. Closures make it possible to preserve state, create private data, build reusable factories, and manage asynchronous behavior.",

  theory: `
A Closure is not something you manually create.

Whenever:

1. A function is defined inside another function.
2. The inner function uses variables from the outer function.
3. The inner function survives beyond the outer function's execution.

JavaScript automatically creates a Closure.

The closure stores references to the variables that the inner function needs.

Those variables remain available even after the parent function has finished executing.
`,

  internalWorking: `
Behind the scenes:

1. JavaScript creates an Execution Context.
2. A Lexical Environment is created.
3. Variables are stored inside that environment.
4. The inner function keeps references to required variables.
5. The outer function returns.
6. Normally the outer scope would be garbage collected.
7. Because the inner function still references those variables, JavaScript keeps them alive.

This preserved environment is called a Closure.
`,

  how: [
    "Step 1 - Create an outer function",
    "Step 2 - Declare variables inside the outer function",
    "Step 3 - Create an inner function",
    "Step 4 - Access outer variables inside the inner function",
    "Step 5 - Return the inner function",
    "Step 6 - Outer function finishes execution",
    "Step 7 - JavaScript preserves required variables in memory",
    "Step 8 - The returned function continues using those variables later",
  ],

  diagram: `
flowchart TD

  A[Outer Function Called]

  A --> B[count variable created]

  B --> C[Inner Function Created]

  C --> D[Inner Uses count]

  D --> E[Outer Function Returns]

  E --> F[Execution Context Removed]

  F --> G[Closure Keeps Reference]

  G --> H[count stays alive]

  H --> I[Inner Function Called Later]

  I --> J[count updates correctly]

  J --> K[Closure]
  `,

  realLifeExample:
    "Imagine a teacher writes important notes inside a notebook and gives the notebook to a student. Even after the teacher leaves the classroom, the student still has access to the notes. The notebook behaves like a closure because it preserves information that would otherwise be gone.",

  analogy:
    "Think of a Closure like a backpack. When a function leaves its original environment, it carries a backpack containing the variables it needs. Later, regardless of where the function is executed, it can open the backpack and use those saved values.",

  code: `
// ====================================
// BASIC CLOSURE
// ====================================

function makeCounter() {

  let count = 0;

  return function () {
    count++;
    return count;
  };

}

const counter = makeCounter();

console.log(counter());
console.log(counter());
console.log(counter());

// 1
// 2
// 3



// ====================================
// MULTIPLE INDEPENDENT CLOSURES
// ====================================

const a = makeCounter();
const b = makeCounter();

console.log(a());
// 1

console.log(a());
// 2

console.log(b());
// 1



// ====================================
// FACTORY FUNCTION
// ====================================

function createMultiplier(multiplier) {

  return function(number) {
    return number * multiplier;
  };

}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));
// 10

console.log(triple(5));
// 15



// ====================================
// PRIVATE VARIABLES
// ====================================

function createBankAccount() {

  let balance = 1000;

  return {

    deposit(amount) {
      balance += amount;
    },

    getBalance() {
      return balance;
    }

  };

}

const account = createBankAccount();

account.deposit(500);

console.log(account.getBalance());

// 1500

// console.log(account.balance);
// undefined



// ====================================
// CALLBACK CLOSURE
// ====================================

function delayedMessage(message) {

  setTimeout(() => {
    console.log(message);
  }, 1000);

}

delayedMessage("Hello");

// message survives because of closure



// ====================================
// LOOP INTERVIEW QUESTION
// ====================================

for (var i = 0; i < 3; i++) {

  setTimeout(() => {
    console.log("var:", i);
  }, 0);

}

// 3
// 3
// 3



for (let j = 0; j < 3; j++) {

  setTimeout(() => {
    console.log("let:", j);
  }, 0);

}

// 0
// 1
// 2
`,

  closureLifecycle: {
    creation:
      "Inner function captures references to variables from the outer scope.",

    preservation:
      "JavaScript keeps those variables alive after outer execution ends.",

    usage: "Returned functions continue accessing preserved variables.",

    cleanup: "Variables are removed when no closure references remain.",
  },

  commonMistakes: [
    "Thinking closures store copies of variables.",
    "Forgetting closures store references, not values.",
    "Creating unnecessary closures inside loops.",
    "Accidentally causing memory leaks.",
    "Misunderstanding the var loop interview question.",
    "Confusing scope with closure.",
    "Assuming closures only work with returned functions.",
  ],

  interviewQA: [
    {
      q: "What is a Closure in JavaScript?",
      a: "A Closure is a function that remembers variables from its lexical scope even after the outer function has finished execution.",
    },

    {
      q: "Why are Closures useful?",
      a: "Closures allow private state, data encapsulation, factory functions, callbacks, memoization, and asynchronous programming.",
    },

    {
      q: "What is the difference between Scope and Closure?",
      a: "Scope determines where variables are accessible. Closure preserves variables from a scope even after execution has completed.",
    },

    {
      q: "Why are variables not garbage collected?",
      a: "Because the inner function still holds references to them through the closure.",
    },

    {
      q: "Can Closures cause memory leaks?",
      a: "Yes. If closures keep references to large objects, event listeners, or timers that are no longer needed, memory cannot be freed.",
    },

    {
      q: "What is data encapsulation using Closures?",
      a: "Closures allow variables to remain private while exposing controlled methods to access or modify them.",
    },

    {
      q: "How are Closures used in React?",
      a: "React Hooks, event handlers, state updates, and callback functions all rely heavily on closures.",
    },

    {
      q: "What is the famous var loop closure problem?",
      a: "All callbacks share the same var variable, so they access its final value after the loop finishes.",
    },
  ],

  realWorldUsage: [
    "React Hooks",
    "Event Handlers",
    "Custom Hooks",
    "Memoization",
    "Authentication Systems",
    "Factory Functions",
    "Module Pattern",
    "Private Variables",
    "State Management",
    "Async Programming",
  ],

  interviewSummary: [
    "Closures remember outer variables.",
    "Closures preserve lexical environments.",
    "Closures store references, not copies.",
    "Closures create private state.",
    "Closures power React Hooks.",
    "Closures are heavily used in callbacks.",
    "Closures can cause memory leaks if misused.",
    "Scope decides access, Closure preserves access.",
  ],
};
