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
    "Arrow functions are a modern ES6 syntax for writing functions in a shorter and cleaner way. They are not just shorthand for regular functions; they behave differently because they do not have their own 'this', 'arguments', or 'new' behavior.",

  simpleExplanation:
    "Arrow functions are a shorter way to write functions in JavaScript.\n\nInstead of writing the 'function' keyword, we use the arrow (=>).\nBut they are special because they do NOT behave like normal functions.\n\nThey do not create their own 'this' and instead use 'this' from the surrounding scope.\nThey are mainly used for small functions, callbacks, and cleaner code writing.",

  romanUrduRevision:
    "Arrow function JavaScript mein function likhnay ka short tareeqa hai jisme function keyword ki jagah => use hota hai.\n\nYeh apna this nahi banata balkay outer scope ka this use karta hai.",

  why: "Arrow functions were introduced to make JavaScript code shorter, cleaner, and easier to read. They also solve a common problem with 'this' by using lexical scoping, which avoids manual binding in callbacks and event handlers.",

  how: [
    "Step 1 - Arrow function syntax uses => instead of function keyword",
    "Step 2 - If there is only one expression, return happens automatically (implicit return)",
    "Step 3 - If you use curly braces, you must write return manually",
    "Step 4 - Arrow functions inherit 'this' from their surrounding scope",
    "Step 5 - Arrow functions do not have their own arguments object",
    "Step 6 - For arguments, use rest parameters (...args)",
    "Step 7 - Arrow functions cannot be used with 'new' keyword",
  ],

  diagram: `
flowchart LR
  A[Function Types]

  A --> B[Regular Function]
  A --> C[Arrow Function]

  B --> B1[Own this]
  B --> B2[Has arguments object]
  B --> B3[Can be constructor]
  B --> B4[Dynamic this]

  C --> C1[Lexical this]
  C --> C2[No arguments object]
  C --> C3[Cannot use new]
  C --> C4[Best for callbacks]

  B & C --> D[Both can take parameters and return values]
  `,

  realLifeExample:
    "Imagine two workers in a company.\nA regular function worker decides their identity based on who assigns them the task.\nAn arrow function worker always carries their home identity with them no matter where they go.\nSo their behavior stays connected to their original environment.",

  analogy:
    "A regular function is like a freelancer who changes behavior depending on the client.\nAn arrow function is like a person who always behaves based on their home environment, no matter where they go.",

  code: `
const addRegular = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => {
  return a + b;
};

const double = x => x * 2;

const getUser = () => ({ name: "Ali", age: 25 });

console.log(double(4), getUser());

// Arrow function with lexical this
const counter = {
  count: 0,

  start() {
    setTimeout(() => {
      this.count++;
      console.log(this.count);
    }, 0);
  }
};

counter.start();

// Rest parameters instead of arguments
const collect = (...args) => args;
console.log(collect(1, 2, 3));

// ❌ Wrong use in object method
const badMethod = {
  name: "Sara",
  greet: () => console.log(this.name)
};

badMethod.greet();
  `,

  commonMistakes: [
    "Using arrow functions for object methods that rely on this",
    "Expecting arrow functions to have their own arguments object",
    "Forgetting that single-line object returns need parentheses",
    "Using arrow functions as constructors with new",
    "Confusing lexical this with dynamic this",
    "Using arrow functions everywhere without understanding limitations",
  ],

  interviewQA: [
    {
      q: "What is an arrow function in JavaScript?",
      a: "An arrow function is a shorter syntax for writing functions introduced in ES6. It behaves differently from regular functions because it does not have its own this, arguments object, or constructor capability.",
    },
    {
      q: "What is lexical this in arrow functions?",
      a: "Lexical this means arrow functions do not create their own this; instead, they inherit it from their surrounding scope.",
    },
    {
      q: "Can arrow functions be used as constructors?",
      a: "No, arrow functions cannot be used with the new keyword because they do not have a constructor property.",
    },
    {
      q: "What is implicit return in arrow functions?",
      a: "Implicit return means if an arrow function has a single expression without braces, it automatically returns that value.",
    },
    {
      q: "Why are arrow functions useful in JavaScript?",
      a: "They make code shorter, cleaner, and solve this binding problems in callbacks and nested functions.",
    },
  ],

  realWorldUsage: [
    "React functional components",
    "Event handlers in modern JavaScript",
    "Array methods like map, filter, reduce",
    "Callbacks in async code",
    "Utility helper functions",
    "Timer functions like setTimeout and setInterval",
    "Functional programming style code",
  ],

  interviewSummary: [
    "Arrow functions are shorter ES6 functions.",
    "They do not have their own this or arguments.",
    "They inherit this from their surrounding scope.",
    "They cannot be used as constructors.",
    "They are best for callbacks and small functions.",
    "Implicit return works for single expressions.",
    "Rest parameters replace arguments object.",
  ],
};
