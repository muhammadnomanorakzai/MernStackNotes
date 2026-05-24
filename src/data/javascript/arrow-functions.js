export const arrowFunctions = {
  id: "arrow-functions",
  title: "Arrow Functions - Deep Dive",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: [
    "arrow function",
    "this",
    "lexical this",
    "implicit return",
    "no arguments object",
    "ES6",
    "concise syntax",
  ],

  definition:
    "Arrow functions are an ES6 function syntax that uses the arrow symbol. They are not just shorter regular functions, because they do not have their own this or arguments object and cannot be used as constructors.",

  why:
    "Before arrow functions, developers often used bind or saved this into another variable just to keep context inside callbacks. Arrow functions solve that by inheriting this from the surrounding scope.",

  how: [
    "Step 1 - Arrow syntax can be short for small functions",
    "Step 2 - One expression without braces returns implicitly",
    "Step 3 - Braces require an explicit return statement",
    "Step 4 - Object literals must be wrapped in parentheses for implicit return",
    "Step 5 - Arrow functions inherit this from the surrounding scope",
    "Step 6 - Arrow functions have no arguments object so rest params should be used instead",
    "Step 7 - Arrow functions cannot be used with new as constructors",
  ],

  diagram: `
flowchart LR
  A[Regular Function] --> A1[Own this]
  A --> A2[Has arguments]
  A --> A3[Can use new]
  A --> A4[Good for methods]
  B[Arrow Function] --> B1[Inherits this]
  B --> B2[No arguments]
  B --> B3[Cannot use new]
  B --> B4[Good for callbacks]
  C[Both] --> C1[Take params and return values]
  `,

  analogy:
    "A regular function is like an independent contractor who decides their own identity based on who hired them for this specific job. An arrow function is like a family member whose identity stays tied to the home they came from, no matter where they go later.",

  code: `
const addRegular = function (a, b) { return a + b; };
const addArrow = (a, b) => { return a + b; };
const double = x => x * 2;
const getUser = () => ({ name: "Ali", age: 25 });
console.log(double(4), getUser());

const counter = {
  count: 0,
  start() {
    setTimeout(() => { this.count++; console.log(this.count); }, 0);
  }
};
counter.start();

const collect = (...args) => args;
console.log(collect(1, 2, 3));

const badMethod = {
  name: "Sara",
  greet: () => console.log(this.name)
};
badMethod.greet(); // wrong this for object methods
  `,

  interviewQA: [
    {
      q: "What is an arrow function?",
      a: "An arrow function is an ES6 function syntax that uses the arrow symbol and is often shorter to write. It differs from regular functions because it does not get its own this or arguments object and cannot be used with new.",
    },
    {
      q: "What are the differences between arrow functions and regular functions?",
      a: "Regular functions determine this at call time and have an arguments object. Arrow functions inherit this from their surrounding scope, have no arguments object, cannot act as constructors, and are usually best for callbacks and small helpers.",
    },
    {
      q: "When should you not use an arrow function?",
      a: "Avoid arrow functions for object methods when you need this to point at the object, for constructor functions that use new, and for cases where you need the real arguments object or generator behavior.",
    },
    {
      q: "What is implicit return?",
      a: "Implicit return means a single expression after the arrow is returned automatically without writing the return keyword. If you use braces, then you must write return explicitly.",
    },
  ],
};
