export const closures = {
  id: "closures",
  title: "Closures",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "closures",
    "lexical environment",
    "scope",
    "private state",
    "factory function",
    "memory",
    "encapsulation",
  ],

  definition:
    "A closure is a function that remembers and can access variables from its outer parent scope even after the outer function has finished executing and returned. The inner function carries its surrounding lexical environment with it.",

  why:
    "Without closures, every function would lose its surrounding variables the moment it returned. Closures allow private persistent state, which powers data encapsulation, factory functions, memoization, and older module patterns.",

  how: [
    "Step 1 - An inner function is defined inside an outer function",
    "Step 2 - The inner function references variables from the outer scope",
    "Step 3 - The outer function returns the inner function",
    "Step 4 - Normally outer local variables would be garbage collected after return",
    "Step 5 - The inner function still holds a reference to those variables",
    "Step 6 - JavaScript keeps that remembered environment alive in memory",
    "Step 7 - The returned inner function can read and update those variables later",
    "Step 8 - Every new call to the outer function creates a fresh independent closure",
  ],

  diagram: `
flowchart TD
  A[outer called] --> B[count created in memory]
  B --> C[inner defined with count]
  C --> D[outer returns inner]
  D --> E[outer execution ends]
  E --> F[Should count be collected]
  F --> G[inner still holds reference]
  G --> H[count kept alive]
  H --> I[inner called later]
  I --> J[count updates correctly]
  J --> K[This is closure]
  `,

  analogy:
    "Think of a closure like a backpack. When a function leaves its home, it packs the variables it needs into that backpack. Even when the function is called much later in a different place, it can open the backpack and use those saved values. Each new trip creates a different backpack, so separate closures do not share private state unless they close over the same variable.",

  code: `
function makeCounter() {
  let count = 0;
  return function () { count++; return count; };
}
const a = makeCounter();
const b = makeCounter();
console.log(a(), a(), b()); // 1 2 1

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 0); // 3 3 3
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 0); // 0 1 2
}

function makeMultiplier(x) {
  return function (y) { return x * y; };
}
console.log(makeMultiplier(5)(4)); // 20
// Closures can leak memory if they keep large unused objects alive
  `,

  interviewQA: [
    {
      q: "What is a closure?",
      a: "A closure is a function bundled together with its lexical environment. It remembers variables from the scope where it was defined, even after the outer function has already returned.",
    },
    {
      q: "What is a practical use case for closures?",
      a: "Closures are great for private state. A counter returned from makeCounter can update its own hidden count value without exposing that variable directly to outside code.",
    },
    {
      q: "What is the difference between scope and closure?",
      a: "Scope is the rule that determines where variables are accessible while code runs. Closure is the mechanism that preserves an outer scope so an inner function can keep using those variables later.",
    },
    {
      q: "Can closures cause memory leaks?",
      a: "Yes. If a closure keeps references to large objects, intervals, or event listeners that are no longer needed, the garbage collector cannot free that memory. Clean up listeners and timers when they are no longer required.",
    },
  ],
};
