export const jsInterviewMaster = {
  id: "js-interview-master",
  title: "JavaScript Interview Master Sheet",
  category: "JavaScript",
  difficulty: "Advanced",
  tags: [
    "interview",
    "all topics",
    "quick revision",
    "master list",
    "rapid fire",
    "senior level",
    "cheat sheet",
  ],

  definition:
    "The Master Sheet is a curated rapid-fire Q&A covering the most commonly asked JavaScript interview questions from beginner to senior level.",

  why:
    "Interviewers often start with rapid-fire questions to test breadth. This sheet helps you deliver concise, confident answers in under 30 seconds.",

  how: [
    "Read one question",
    "Cover the answer",
    "Answer from memory out loud",
    "Uncover and compare your answer",
    "Repeat missed questions until the explanation feels automatic",
  ],

  diagram: `
flowchart TD
  A[JavaScript Interview Topics] --> B[Asked in most interviews]
  B --> C[var let const hoisting closures event loop promises this]
  A --> D[Asked often]
  D --> E[prototype data types coercion arrows destructuring arrays]
  A --> F[Senior level]
  F --> G[memory patterns FP debounce workers implement from scratch]
  `,

  analogy:
    "This topic is your revision flashcard deck. If you can answer every card clearly without looking, you are ready for the JavaScript portion of the interview.",

  code: `
function createMemoizedMultiplier() {
  const cache = new Map();

  return function multiply(a) {
    return function (b) {
      const key = \`\${a},\${b}\`;
      if (cache.has(key)) return cache.get(key);

      const result = a * b;
      cache.set(key, result);
      return result;
    };
  };
}

const memoMultiply = createMemoizedMultiplier();
const double = memoMultiply(2);
console.log(double(5));  // 10 computed
console.log(double(5));  // 10 from cache
console.log(double(10)); // 20 computed
  `,

  interviewQA: [
    {
      q: "What is JavaScript and is it single-threaded?",
      a: "JavaScript is a dynamically typed, interpreted scripting language. It is single-threaded with one Call Stack, while async behavior comes from Web APIs, the Event Loop, and task queues.",
    },
    {
      q: "What is the difference between == and ===?",
      a: "== performs type coercion before comparing. === compares both type and value without coercion. Prefer === to avoid surprise coercion bugs.",
    },
    {
      q: "What is a closure? Give a practical use case.",
      a: "A closure is a function that remembers variables from its outer scope after that scope has returned. Use it for private state, factory functions, memoization, and module-like encapsulation.",
    },
    {
      q: "Explain the Event Loop.",
      a: "The Event Loop checks when the Call Stack is empty, drains the Microtask Queue first, then runs one macrotask from the Callback Queue. That is why Promise.then runs before setTimeout with 0ms.",
    },
    {
      q: "What is the difference between var, let, and const?",
      a: "var is function-scoped and hoisted as undefined. let and const are block-scoped and have a Temporal Dead Zone. const cannot be reassigned, though object properties can still mutate.",
    },
    {
      q: "What is hoisting?",
      a: "Hoisting is JavaScript's setup phase where declarations are processed before execution. Function declarations are fully hoisted, var is initialized as undefined, and let/const are hoisted but inaccessible in the TDZ.",
    },
    {
      q: "What is the difference between null and undefined?",
      a: "undefined means no value has been assigned by JavaScript. null is an intentional developer-assigned empty value. typeof null is object because of a historical bug.",
    },
    {
      q: "What is a Promise? What are its three states?",
      a: "A Promise represents the eventual result of async work. Its states are pending, fulfilled, and rejected. Once fulfilled or rejected, it is settled and cannot change state.",
    },
    {
      q: "async/await vs Promises - which is better?",
      a: "async/await is syntax over Promises, not a replacement mechanism. Use it for readable sequential flows and try/catch, and use Promise.all for independent parallel operations.",
    },
    {
      q: "Explain prototypal inheritance.",
      a: "Objects have a hidden [[Prototype]] link. If a property is not found on the object, JavaScript walks up that chain until it finds the property or reaches null.",
    },
    {
      q: "What is the difference between call, apply, and bind?",
      a: "call invokes immediately with individual args. apply invokes immediately with an args array. bind returns a new function with this and optional arguments fixed.",
    },
    {
      q: "What are arrow functions? When should you not use them?",
      a: "Arrow functions are concise functions with lexical this, no arguments object, and no constructor behavior. Avoid them for object methods, DOM handlers needing this, constructors, and generators.",
    },
    {
      q: "How does garbage collection work in JavaScript?",
      a: "JavaScript uses automatic garbage collection, mainly Mark-and-Sweep. It marks reachable objects from roots, then frees unreachable objects. Leaks happen when unnecessary references remain reachable.",
    },
    {
      q: "What is memoization and when would you use it?",
      a: "Memoization caches function results by input. Use it for expensive pure functions called repeatedly with the same arguments. Avoid memoizing impure or time-dependent functions.",
    },
    {
      q: "What is the difference between shallow copy and deep copy?",
      a: "A shallow copy duplicates top-level properties but shares nested object references. A deep copy creates independent copies at every level, for example with structuredClone when supported.",
    },
  ],
};
