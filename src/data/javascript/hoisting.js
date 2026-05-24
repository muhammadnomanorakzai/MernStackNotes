export const hoisting = {
  id: "hoisting",
  title: "Hoisting",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: ["hoisting", "var", "function declaration", "TDZ", "execution context", "creation phase"],

  definition:
    "Hoisting is JavaScript's behavior of preparing variable and function declarations before code runs. Only declarations are hoisted to the top of their scope, not the assigned values.",

  why:
    "JavaScript engines process code in stages before executing it. Understanding hoisting explains why function declarations can be called before their line appears, why var gives undefined before assignment, and why let or const can throw a ReferenceError.",

  how: [
    "Step 1 - Before execution, the engine scans the scope during the Creation Phase",
    "Step 2 - Function declarations are fully hoisted and ready to call",
    "Step 3 - var declarations are hoisted and initialized as undefined",
    "Step 4 - let and const are hoisted but remain uninitialized in the Temporal Dead Zone",
    "Step 5 - Function expressions follow variable rules instead of function declaration rules",
    "Step 6 - Class declarations also behave like let and stay unavailable before their line",
    "Step 7 - In the Execution Phase, code runs top to bottom and values get assigned",
  ],

  diagram: `
flowchart TD
  A[Phase 1 Creation Phase] --> B[Function Declarations Fully available in memory]
  A --> C[var variables Available as undefined]
  A --> D[let and const In TDZ ReferenceError if accessed]
  A --> E[Function expressions follow variable rules]
  F[Phase 2 Execution Phase] --> G[Code runs top to bottom]
  G --> H[Values assigned when each line is reached]
  `,

  analogy:
    "Imagine a teacher preparing a classroom before students arrive. She writes every student name on the attendance sheet first, but many grade boxes are still empty. Function declarations are like a fully prepared substitute teacher who can start teaching immediately. var is like a student whose name is on the sheet but whose grade cell is blank. let and const are on a do not disturb list until the teacher officially introduces them.",

  code: `
sayHello(); // works because this is a function declaration
function sayHello() {
  console.log("Hello");
}

console.log(total); // undefined because var is hoisted
var total = 5;

// console.log(price); // ReferenceError in TDZ
let price = 100;

// greet(); // TypeError: greet is not a function
var greet = function () {
  console.log("Hi");
};

if (true) {
  var leaked = "I escaped the block";
}
console.log(leaked); // accessible outside the if block
  `,

  interviewQA: [
    {
      q: "What is hoisting in JavaScript?",
      a: "Hoisting is the behavior where JavaScript prepares variable and function declarations before code executes. That setup happens during the Creation Phase, but assignments still occur later when execution reaches each line.",
    },
    {
      q: "What is the difference between hoisting of var vs let and const?",
      a: "var is hoisted and initialized to undefined, so reading it early does not crash. let and const are also hoisted, but they stay uninitialized in the Temporal Dead Zone, so early access throws a ReferenceError.",
    },
    {
      q: "Are function expressions hoisted?",
      a: "Not like function declarations. A function expression follows the rules of the variable holding it, so only the variable name is hoisted and the function body is not callable until assignment happens.",
    },
    {
      q: "What is the Temporal Dead Zone?",
      a: "The Temporal Dead Zone is the time between scope creation and the line where a let or const declaration is executed. During that time the binding exists, but any access throws a ReferenceError.",
    },
  ],
};
