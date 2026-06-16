export const functionTypes = {
  id: "function-types",
  title: "Function Types in JavaScript",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: [
    "function declaration",
    "function expression",
    "arrow function",
    "IIFE",
    "callback",
    "higher order function",
    "first class functions",
    "lexical this",
  ],

  definition:
    "Functions are one of the most important building blocks in JavaScript. JavaScript provides multiple ways to create and use functions, including Function Declarations, Function Expressions, Arrow Functions, and IIFEs. Functions can also be passed around like values, making concepts such as Callbacks and Higher-Order Functions possible.",

  simpleExplanation:
    "A function is a reusable block of code designed to perform a specific task. Instead of writing the same logic repeatedly, developers place that logic inside a function and call it whenever needed.\n\nJavaScript treats functions differently from many programming languages because functions are 'First-Class Citizens'. This means functions can be stored in variables, passed as arguments, returned from other functions, and even created dynamically.\n\nOver time, JavaScript introduced different function styles to solve different problems. Function Declarations are simple and hoisted. Function Expressions allow functions to be stored in variables. Arrow Functions provide shorter syntax and lexical this binding. IIFEs execute immediately and create private scope.\n\nUnderstanding these function types is essential because modern frameworks such as React, Next.js, Express.js, and Node.js rely heavily on them.",

  romanUrduRevision:
    "JavaScript mein function ek reusable code block hota hai jo baar baar use kiya ja sakta hai.\nDeclaration hoisted hoti hai, Expression variable mein store hoti hai, Arrow lexical this use karti hai aur IIFE foran execute ho jati hai.",

  why: "Each function type has different behavior regarding hoisting, this binding, constructors, scope creation, and execution timing. Choosing the wrong function type can lead to bugs, memory issues, or unexpected behavior in production applications.",

  how: [
    "Step 1 - Create a Function Declaration when you need a reusable function that can be called before its definition",
    "Step 2 - Use Function Expressions when storing functions inside variables",
    "Step 3 - Use Arrow Functions for short callbacks and lexical this behavior",
    "Step 4 - Use IIFEs for one-time execution and private scope",
    "Step 5 - Pass functions as arguments to create Callbacks",
    "Step 6 - Create Higher-Order Functions by accepting or returning functions",
    "Step 7 - Leverage First-Class Function behavior to build reusable and flexible code",
  ],

  diagram: `
flowchart TD

  A[JavaScript Function Types]

  A --> B[Function Declaration]
  A --> C[Function Expression]
  A --> D[Arrow Function]
  A --> E[IIFE]
  A --> F[Callback]
  A --> G[Higher Order Function]

  B --> B1[Hoisted]
  B --> B2[Can Use Before Definition]

  C --> C1[Stored in Variable]
  C --> C2[Not Fully Hoisted]

  D --> D1[Short Syntax]
  D --> D2[Lexical This]
  D --> D3[No Constructor]

  E --> E1[Runs Immediately]
  E --> E2[Private Scope]

  F --> F1[Passed as Argument]

  G --> G1[Accepts Function]
  G --> G2[Returns Function]
  `,

  realLifeExample:
    "Imagine a restaurant. A Function Declaration is like a permanent chef who is available from the moment the restaurant opens. A Function Expression is a chef hired later through a contract. An Arrow Function is a helper chef who always follows the head chef's instructions and identity. An IIFE is a temporary worker hired for a single task and then immediately dismissed. A Callback is the phone number you leave so the restaurant can call you when your order is ready.",

  analogy:
    "Think of functions as workers inside a company. Some workers are permanent employees (Declarations), some are contractors (Expressions), some always follow their manager's identity (Arrow Functions), some are hired for one-time tasks (IIFEs), and some are emergency contacts that can be called later (Callbacks).",

  code: `
// ====================================
// FUNCTION DECLARATION
// ====================================

sayHello();

function sayHello() {
  console.log("Hello");
}

// Works because declarations are hoisted



// ====================================
// FUNCTION EXPRESSION
// ====================================

const greet = function () {
  console.log("Hi");
};

greet();

// Stored inside a variable



// ====================================
// ARROW FUNCTION
// ====================================

const add = (a, b) => {
  return a + b;
};

console.log(add(2, 3));

// Short version

const multiply = (a, b) => a * b;



// ====================================
// IIFE
// ====================================

(function () {
  console.log("Runs immediately");
})();

// Executes once and creates private scope



// ====================================
// CALLBACK FUNCTION
// ====================================

function processUser(callback) {
  callback();
}

processUser(() => {
  console.log("User processed");
});



// ====================================
// HIGHER ORDER FUNCTION
// ====================================

function execute(fn) {
  fn();
}

execute(() => {
  console.log("Higher Order Function");
});



// ====================================
// FIRST CLASS FUNCTIONS
// ====================================

function sayHi() {
  console.log("Hi");
}

const myFunction = sayHi;

myFunction();



// ====================================
// RETURNING FUNCTIONS
// ====================================

function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);

console.log(double(5));

// 10
`,

  functionComparison: {
    declaration: {
      hoisted: true,
      hasOwnThis: true,
      constructor: true,
      bestFor: "Reusable functions",
    },

    expression: {
      hoisted: false,
      hasOwnThis: true,
      constructor: true,
      bestFor: "Variable-based functions",
    },

    arrow: {
      hoisted: false,
      hasOwnThis: false,
      constructor: false,
      bestFor: "Callbacks and React code",
    },

    iife: {
      hoisted: false,
      hasOwnThis: true,
      constructor: false,
      bestFor: "One-time execution",
    },
  },

  commonMistakes: [
    "Using Arrow Functions as object methods when this is needed.",
    "Trying to use Arrow Functions with the new keyword.",
    "Calling Function Expressions before assignment.",
    "Confusing Callbacks with Higher-Order Functions.",
    "Assuming all functions behave the same with this.",
    "Using Arrow Functions where arguments object is required.",
  ],

  interviewQA: [
    {
      q: "What is the difference between Function Declaration and Function Expression?",
      a: "Function Declarations are fully hoisted and can be called before their definition. Function Expressions are assigned to variables and cannot be safely called before assignment.",
    },

    {
      q: "What is an Arrow Function?",
      a: "An Arrow Function is a shorter way to write functions. It does not create its own this, arguments, super, or new.target and instead inherits them from the surrounding scope.",
    },

    {
      q: "Why do Arrow Functions not have their own this?",
      a: "Arrow Functions use lexical this, meaning they automatically inherit this from the surrounding scope where they were created.",
    },

    {
      q: "Can Arrow Functions be constructors?",
      a: "No. Arrow Functions cannot be used with the new keyword because they do not have a prototype and do not create their own this.",
    },

    {
      q: "What is an IIFE?",
      a: "An Immediately Invoked Function Expression is a function that executes immediately after being created.",
    },

    {
      q: "What is a Callback Function?",
      a: "A Callback is a function passed into another function so it can be executed later when needed.",
    },

    {
      q: "What is a Higher-Order Function?",
      a: "A Higher-Order Function is a function that accepts another function as an argument or returns a function.",
    },

    {
      q: "Why are functions called First-Class Citizens in JavaScript?",
      a: "Because functions can be stored in variables, passed as arguments, returned from functions, and treated like any other value.",
    },

    {
      q: "Name some Higher-Order Functions in JavaScript.",
      a: "map(), filter(), reduce(), forEach(), find(), and sort() are common Higher-Order Functions.",
    },
  ],

  realWorldUsage: [
    "React event handlers",
    "Array methods like map and filter",
    "Express middleware",
    "Promise callbacks",
    "API request handling",
    "Custom hooks in React",
    "Authentication middleware",
    "Reusable utility functions",
  ],

  interviewSummary: [
    "Functions are First-Class Citizens in JavaScript.",
    "Function Declarations are hoisted.",
    "Function Expressions are not fully hoisted.",
    "Arrow Functions use lexical this.",
    "Arrow Functions cannot be constructors.",
    "IIFEs execute immediately.",
    "Callbacks are passed into functions.",
    "Higher-Order Functions accept or return functions.",
    "map, filter, and reduce are common Higher-Order Functions.",
  ],
};
