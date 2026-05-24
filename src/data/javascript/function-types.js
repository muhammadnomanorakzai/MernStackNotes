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
    "first class functions",
  ],

  definition:
    "JavaScript has several common ways to define functions: function declarations, function expressions, arrow functions, and IIFEs. A callback is any function passed to another function to be called later.",

  why:
    "Each function type behaves differently with hoisting, this binding, and constructors. Picking the wrong one, especially for methods or callbacks, can create subtle bugs that are hard to debug later.",

  how: [
    "Step 1 - Function declarations are fully hoisted and can be called anywhere in their scope",
    "Step 2 - Function expressions are stored in variables and are not ready before assignment",
    "Step 3 - Arrow functions use concise syntax and inherit this from the surrounding scope",
    "Step 4 - IIFEs run immediately and create a private scope",
    "Step 5 - A callback is a function passed to another function",
    "Step 6 - A higher order function accepts a function or returns a function",
  ],

  diagram: `
flowchart TD
  A[JavaScript Function Types] --> B[Function Declaration]
  A --> C[Function Expression]
  A --> D[Arrow Function]
  A --> E[IIFE]
  A --> F[Callback Higher Order]
  B --> B1[Hoisted Yes]
  C --> C1[Hoisted No]
  D --> D1[Own this No]
  E --> E1[Runs immediately]
  F --> F1[Passed as argument]
  `,

  analogy:
    "A function declaration is like a full-time employee hired before the company opens, so they are ready from day one. A function expression is a contractor who can only start after the paperwork is signed. An arrow function is an assistant who always follows the boss and borrows the boss identity for this. An IIFE is a self-destructing note that runs once and disappears. A callback is the phone number you leave behind so someone can contact you later.",

  code: `
sayHi(); // works because declarations are hoisted
function sayHi() { console.log("Hi"); }

// hello(); // ReferenceError or TypeError before assignment
const hello = function () { console.log("Hello"); };

const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

(function () {
  let counter = 1;
  console.log("IIFE", counter);
})();

function runLater(fn) { fn(); }
setTimeout(() => console.log("timeout callback"), 0);
runLater(() => console.log("custom callback"));
  `,

  interviewQA: [
    {
      q: "What is the difference between a function declaration and a function expression?",
      a: "A function declaration is fully hoisted, so it can be called before its line appears. A function expression is stored in a variable and is not callable before that variable is assigned its function value.",
    },
    {
      q: "What is an arrow function and how is it different from a regular function?",
      a: "Arrow functions use the arrow syntax and are more concise. They do not get their own this or arguments object, cannot be used as constructors with new, and are best for callbacks or short helper functions.",
    },
    {
      q: "What is an IIFE and why would you use it?",
      a: "An IIFE is an Immediately Invoked Function Expression that runs as soon as it is defined. It is useful for one-time setup code and for creating private scope without leaking variables into the outer namespace.",
    },
    {
      q: "What is a callback function?",
      a: "A callback is a function passed into another function so it can be called later at the right time. Common examples include setTimeout, array methods like map, and asynchronous handlers like then.",
    },
  ],
};
