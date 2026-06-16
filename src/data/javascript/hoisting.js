export const hoisting = {
  id: "hoisting",
  title: "Hoisting",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: [
    "hoisting",
    "execution context",
    "creation phase",
    "execution phase",
    "TDZ",
    "var",
    "let",
    "const",
    "function declaration",
    "function expression",
  ],

  definition:
    "Hoisting is a JavaScript behavior where declarations are processed before code execution begins. During the Creation Phase of an Execution Context, JavaScript allocates memory for variables, functions, and classes. Because of this preparation step, some declarations appear to be available before the line where they are written.",

  simpleExplanation:
    "Hoisting is one of the most misunderstood concepts in JavaScript. Many developers think JavaScript physically moves variables and functions to the top of the file, but that is not what actually happens.\n\nBefore JavaScript executes any code, it first creates an Execution Context. During this process, JavaScript scans the current scope and prepares memory for declarations.\n\nFunction declarations are stored completely in memory, making them available immediately. Variables declared with var are also stored in memory and initialized with undefined. Variables declared with let and const are created as bindings but remain uninitialized until their declaration line executes.\n\nAfter memory preparation is complete, JavaScript enters the Execution Phase and runs code line by line. This behavior creates the illusion that declarations were moved to the top, which is why the concept is called Hoisting.\n\nUnderstanding Hoisting is important because it explains why some code works before its declaration while other code throws errors.",

  romanUrduRevision:
    "Hoisting ka matlab code ko upar move karna nahi hota. JavaScript pehle memory create karti hai phir code execute karti hai.\nFunction declarations fully available hoti hain, var undefined deta hai, aur let/const TDZ mein rehte hain.",

  why: "Before JavaScript can execute code, it must understand which variables, functions, and scopes exist. The engine performs a preparation step called the Creation Phase. Without this phase, JavaScript would not know what identifiers are available during execution.",

  theory: `
JavaScript executes code in two major phases:

1. Creation Phase
2. Execution Phase

During the Creation Phase:

• Memory is allocated for variables
• Function declarations are stored completely
• var variables are initialized with undefined
• let and const bindings are created but remain uninitialized
• Class declarations are registered but remain unavailable

After this setup is complete, JavaScript enters the Execution Phase.

During the Execution Phase:

• Code runs line by line
• Variables receive actual values
• Functions are called
• Expressions are evaluated

Hoisting is simply the visible result of the Creation Phase.
`,

  mentalModel: `
Never think:

❌ JavaScript moves code to the top.

Always think:

✅ JavaScript scans the scope first.
✅ Memory is allocated.
✅ Then code executes.

This mental model explains almost every hoisting question asked in interviews.
`,

  how: [
    "Step 1 - JavaScript creates an Execution Context",
    "Step 2 - The Creation Phase scans all declarations",
    "Step 3 - Function declarations are fully stored in memory",
    "Step 4 - var variables are initialized with undefined",
    "Step 5 - let and const are created but remain in the Temporal Dead Zone",
    "Step 6 - Class declarations behave similarly to let and const",
    "Step 7 - JavaScript enters the Execution Phase",
    "Step 8 - Code runs line by line and values are assigned",
  ],

  diagram: `
flowchart TD

  A[JavaScript Starts]

  A --> B[Creation Phase]

  B --> C[Function Declarations Stored Completely]

  B --> D[var Created]
  D --> E[Initialized as undefined]

  B --> F[let Created]
  F --> G[Temporal Dead Zone]

  B --> H[const Created]
  H --> I[Temporal Dead Zone]

  B --> J[Class Declaration]
  J --> K[Temporal Dead Zone]

  B --> L[Execution Phase]

  L --> M[Code Runs Top To Bottom]

  M --> N[Values Assigned]
  M --> O[Functions Execute]
`,

  realLifeExample:
    "Imagine a school preparing for the first day of classes. Before students enter the classroom, the school administration creates attendance sheets, assigns classrooms, and registers teacher information. When classes actually begin, all required information is already prepared. JavaScript works in a similar way. Before executing code, it prepares memory for variables and functions.",

  analogy:
    "Think of JavaScript as organizing a conference. Before the event starts, organizers prepare name tags, room assignments, schedules, and speaker lists. Only after preparation is complete does the event begin. Hoisting is this preparation stage happening before execution.",

  code: `
// ====================================
// FUNCTION DECLARATION
// ====================================

sayHello();

function sayHello() {
  console.log("Hello");
}

// Works because function declarations
// are fully stored during Creation Phase



// ====================================
// VAR HOISTING
// ====================================

console.log(total);

// undefined

var total = 100;

console.log(total);

// 100



// ====================================
// LET AND CONST
// ====================================

// console.log(price);

// ReferenceError

let price = 50;



// console.log(API_URL);

// ReferenceError

const API_URL = "example.com";



// ====================================
// FUNCTION EXPRESSION
// ====================================

// greet();

// TypeError

var greet = function () {
  console.log("Hi");
};



// ====================================
// ARROW FUNCTION
// ====================================

// add(2, 3);

// TypeError

const add = (a, b) => a + b;



// ====================================
// CLASS HOISTING
// ====================================

// const user = new User();

// ReferenceError

class User {
  constructor(name) {
    this.name = name;
  }
}
`,

  commonMistakes: [
    "Thinking JavaScript physically moves code.",
    "Assuming let and const are not hoisted.",
    "Confusing undefined with ReferenceError.",
    "Calling Function Expressions before assignment.",
    "Calling Arrow Functions before initialization.",
    "Forgetting that classes also have a TDZ.",
    "Using var and expecting block scope.",
  ],

  interviewQA: [
    {
      q: "What is Hoisting in JavaScript?",
      a: "Hoisting is the behavior where JavaScript prepares declarations during the Creation Phase before code execution begins.",
    },

    {
      q: "Does JavaScript move code to the top?",
      a: "No. JavaScript does not physically move code. It allocates memory for declarations before execution starts.",
    },

    {
      q: "What is the difference between var and let hoisting?",
      a: "var is hoisted and initialized as undefined. let is hoisted but remains uninitialized inside the Temporal Dead Zone.",
    },

    {
      q: "What is the Temporal Dead Zone (TDZ)?",
      a: "The TDZ is the period between scope creation and variable initialization where accessing a let or const variable throws a ReferenceError.",
    },

    {
      q: "Are let and const hoisted?",
      a: "Yes. They are hoisted, but they are not initialized immediately.",
    },

    {
      q: "Why does var return undefined?",
      a: "Because var is automatically initialized with undefined during the Creation Phase.",
    },

    {
      q: "Why can function declarations be called before they are defined?",
      a: "Because the entire function is stored in memory during the Creation Phase.",
    },

    {
      q: "Are function expressions hoisted?",
      a: "Only the variable declaration is hoisted. The function value becomes available after assignment.",
    },

    {
      q: "Are classes hoisted?",
      a: "Yes, but like let and const they remain in a Temporal Dead Zone until their declaration executes.",
    },

    {
      q: "What are the two phases of JavaScript execution?",
      a: "Creation Phase and Execution Phase.",
    },
  ],

  realWorldUsage: [
    "Understanding TDZ errors",
    "Debugging ReferenceError issues",
    "Interview questions",
    "Execution Context understanding",
    "Function declaration behavior",
    "Class initialization debugging",
  ],

  interviewSummary: [
    "Hoisting happens during the Creation Phase.",
    "JavaScript does not move code.",
    "Function declarations are fully hoisted.",
    "var becomes undefined.",
    "let and const enter the TDZ.",
    "Classes also have a TDZ.",
    "Function expressions follow variable rules.",
    "Execution Context is the foundation of hoisting.",
  ],
};
