export const scopeChain = {
  id: "scope-chain",
  title: "Scope & Scope Chain",
  category: "JavaScript",
  difficulty: "Beginner",

  tags: [
    "scope",
    "scope chain",
    "lexical scope",
    "global scope",
    "function scope",
    "block scope",
    "shadowing",
    "lexical environment",
    "variable lookup",
  ],

  definition:
    "Scope determines where variables, functions, and objects can be accessed in a program. The Scope Chain is the mechanism JavaScript uses to find variables by searching the current scope first and then moving outward through parent scopes until the variable is found or a ReferenceError is thrown.",

  simpleExplanation:
    "Imagine you create a variable somewhere in your code. JavaScript needs rules that determine where that variable can be accessed. These rules are called Scope.\n\nWhenever JavaScript tries to use a variable, it first checks the current scope. If the variable does not exist there, JavaScript looks in the parent scope. If it still cannot find the variable, it continues moving outward until it reaches the global scope.\n\nThis search process is known as the Scope Chain.\n\nJavaScript uses Lexical Scope, which means scope is determined by where code is written, not where it is called from. This is one of the most important concepts in JavaScript because Closures, Callbacks, React Hooks, and many advanced topics rely on it.",

  romanUrduRevision:
    "Scope batata hai variable kahan access ho sakta hai. Scope Chain variable ko current scope se lekar global scope tak dhoondti hai.\nJavaScript lexical scope use karta hai, yani variable lookup code likhne ki location par depend karta hai, call karne ki location par nahi.",

  why: "Without scope, every variable would become global, making applications difficult to maintain and debug. Scope provides boundaries that prevent accidental data modification, reduce naming conflicts, and improve code organization.",

  theory: `
JavaScript uses Lexical Scoping.

Lexical means 'based on where code is written'.

When JavaScript creates a function, it remembers the scope in which that function was created.

This remembered scope becomes part of the function's Lexical Environment.

Whenever a variable is accessed:

1. JavaScript checks the current scope.
2. If not found, it checks the parent scope.
3. It continues moving upward.
4. Eventually it reaches global scope.
5. If the variable still does not exist, a ReferenceError is thrown.

This upward search path is called the Scope Chain.
`,

  internalWorking: `
Behind the scenes, every scope creates a Lexical Environment.

A Lexical Environment contains:

• Variables
• Function declarations
• Reference to its parent scope

When JavaScript looks up a variable, it follows these parent references until the variable is found.

Current Scope
    ↑
Parent Scope
    ↑
Global Scope

This lookup mechanism is the actual implementation of the Scope Chain.
`,

  how: [
    "Step 1 - JavaScript creates a Global Scope",
    "Step 2 - Functions create their own Function Scope",
    "Step 3 - Blocks create Block Scope for let and const",
    "Step 4 - JavaScript searches the current scope first",
    "Step 5 - If not found, it searches the parent scope",
    "Step 6 - The search continues until global scope",
    "Step 7 - If the variable is still missing, a ReferenceError is thrown",
    "Step 8 - Inner variables can shadow variables from outer scopes",
  ],

  diagram: `
flowchart TD

  A[Global Scope]

  A --> B[Function Scope]

  B --> C[Block Scope]

  C --> D[Variable Lookup Starts Here]

  D --> E[Found? Use Value]

  D --> F[Not Found]

  F --> G[Move To Parent Scope]

  G --> H[Check Function Scope]

  H --> I[Still Not Found]

  I --> J[Check Global Scope]

  J --> K[Found]

  J --> L[ReferenceError]

  B --> M[Variable Shadowing]

  C --> N[Lexical Scope]
`,

  realLifeExample:
    "Imagine you are looking for a book. First, you search your desk. If the book is not there, you check your room. If it is not in your room, you search the entire house. If you still cannot find it, you conclude that the book does not exist in your house. JavaScript follows the same process when searching for variables.",

  analogy:
    "Think of Scope Chain like searching for a contact number. You first check your phone contacts. If it is not there, you ask your family. If they do not know, you ask relatives. If nobody knows, the search fails. JavaScript performs variable lookup in a similar way.",

  code: `
// ====================================
// GLOBAL SCOPE
// ====================================

const company = "OpenAI";

function showCompany() {
  console.log(company);
}

showCompany();

// OpenAI



// ====================================
// FUNCTION SCOPE
// ====================================

function employee() {
  const employeeName = "Ali";

  console.log(employeeName);
}

employee();

// console.log(employeeName);
// ReferenceError



// ====================================
// BLOCK SCOPE
// ====================================

if (true) {
  let age = 25;
  const city = "Karachi";
}

// console.log(age);
// ReferenceError

// console.log(city);
// ReferenceError



// ====================================
// SCOPE CHAIN
// ====================================

const country = "Pakistan";

function outer() {
  const province = "Sindh";

  function inner() {
    const city = "Karachi";

    console.log(country);
    console.log(province);
    console.log(city);
  }

  inner();
}

outer();



// ====================================
// VARIABLE SHADOWING
// ====================================

const color = "Blue";

function paint() {
  const color = "Red";

  console.log(color);
}

paint();

console.log(color);

// Red
// Blue



// ====================================
// LEXICAL SCOPE
// ====================================

const city = "Karachi";

function creator() {
  return function () {
    console.log(city);
  };
}

const fn = creator();

function caller() {
  const city = "Lahore";

  fn();
}

caller();

// Karachi



// ====================================
// ILLEGAL SHADOWING
// ====================================

// let fruit = "Apple";

// {
//   var fruit = "Mango";
// }

// SyntaxError
`,

  scopeTypes: {
    globalScope: "Variables declared outside all functions and blocks.",

    functionScope:
      "Variables declared inside a function. Accessible only within that function.",

    blockScope: "Variables declared using let or const inside curly braces.",

    lexicalScope:
      "Scope determined by where code is written, not where it is called.",
  },

  commonMistakes: [
    "Thinking scope depends on where a function is called.",
    "Confusing lexical scope with dynamic scope.",
    "Assuming var is block scoped.",
    "Accessing block variables outside their block.",
    "Forgetting that inner scopes can access outer scopes.",
    "Misunderstanding variable shadowing.",
    "Creating too many global variables.",
  ],

  interviewQA: [
    {
      q: "What is Scope in JavaScript?",
      a: "Scope determines where variables and functions can be accessed within a program.",
    },

    {
      q: "What is the Scope Chain?",
      a: "The Scope Chain is the process JavaScript uses to find variables by searching the current scope and then moving outward through parent scopes.",
    },

    {
      q: "What is Lexical Scope?",
      a: "Lexical Scope means scope is determined by where code is written, not where it is executed.",
    },

    {
      q: "What are the types of Scope in JavaScript?",
      a: "Global Scope, Function Scope, Block Scope, and Lexical Scope.",
    },

    {
      q: "What is Variable Shadowing?",
      a: "Variable Shadowing occurs when an inner scope declares a variable with the same name as an outer scope variable.",
    },

    {
      q: "Can an outer scope access variables from an inner scope?",
      a: "No. Variable access only works inward to outward, not outward to inward.",
    },

    {
      q: "Why does JavaScript use Lexical Scope?",
      a: "Lexical Scope makes programs predictable because variable access depends on code structure rather than runtime behavior.",
    },

    {
      q: "What happens when JavaScript cannot find a variable?",
      a: "It throws a ReferenceError.",
    },

    {
      q: "What is Illegal Shadowing?",
      a: "Illegal Shadowing occurs when a variable declaration violates JavaScript scoping rules, such as declaring a var variable where a let variable with the same name already exists.",
    },
  ],

  realWorldUsage: [
    "Closures",
    "React Hooks",
    "State management",
    "Module systems",
    "Event handlers",
    "Callbacks",
    "Authentication logic",
    "Large-scale application architecture",
  ],

  interviewSummary: [
    "Scope controls variable accessibility.",
    "JavaScript uses Lexical Scope.",
    "Scope Chain searches outward through parent scopes.",
    "Global, Function, and Block scopes are the main scope types.",
    "Inner scopes can access outer scopes.",
    "Outer scopes cannot access inner scopes.",
    "Variable Shadowing hides outer variables.",
    "Missing variables cause ReferenceError.",
  ],
};
