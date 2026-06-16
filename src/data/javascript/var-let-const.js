export const varLetConst = {
  id: "var-let-const",
  title: "var vs let vs const",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: [
    "variables",
    "var",
    "let",
    "const",
    "scope",
    "hoisting",
    "block-scope",
    "function-scope",
    "TDZ",
  ],

  definition:
    "var, let, and const are three ways to declare variables in JavaScript. They differ in scope, hoisting behavior, and whether reassignment or redeclaration is allowed.",

  simpleExplanation:
    "Variables values store karne ke liye containers hain. var purana tareeqa hai jo bug-prone hai. let aur const modern containers hain jo zyaada safe hain. const un values ke liye use karen jo change nahi honi, baaqi ke liye let use karen.",

  romanUrduRevision:
    "var function-scoped hai aur hoisted hota hai undefined ke saath. let aur const block-scoped hain aur unhein declare karne se pehle access nahi kiya ja sakta (TDZ).",

  realLifeExample:
    "Think of a bank account. Your 'Account Number' should be 'const' because it never changes. Your 'Balance' should be 'let' because it updates every time you spend money. Using 'var' is like writing with chalk on a shared board—anyone can accidentally overwrite your notes.",

  why:
    "var caused serious bugs because it leaks outside block scope and is too easy to redeclare. ES6 introduced let and const to give developers predictable block-scoped variables, and const also communicates that a binding should not be reassigned.",

  how: [
    "Step 1 - var is function scoped, hoisted as undefined, and can be redeclared",
    "Step 2 - let is block scoped and lives only inside the nearest braces",
    "Step 3 - const is also block scoped and must be assigned immediately",
    "Step 4 - let and const are hoisted but stay in the Temporal Dead Zone before declaration",
    "Step 5 - const prevents rebinding but does not freeze object contents",
    "Step 6 - Block scope means the variable exists only inside that block",
    "Step 7 - var ignores block boundaries and can leak through loops or if blocks",
  ],

  diagram: `
flowchart LR
  A[var] --> A1[Function Scope]
  A --> A2[undefined]
  A --> A3[YES Redeclare]
  A --> A4[YES Reassign]
  A --> A5[Never legacy]
  B[let] --> B1[Block Scope]
  B --> B2[TDZ Error]
  B --> B3[NO Redeclare]
  B --> B4[YES Reassign]
  B --> B5[Use when value changes]
  C[const] --> C1[Block Scope]
  C --> C2[TDZ Error]
  C --> C3[NO Redeclare]
  C --> C4[NO Reassign]
  C --> C5[Default choice]
  `,

  analogy:
    "var is like a whiteboard in the school hallway where everyone from every classroom can see and overwrite the message. let is a whiteboard inside one classroom, so only that room uses it. const is a whiteboard with permanent marker, so you cannot replace the board with a new one. But if the board contains a list, you can still add or change list items because the board itself stayed the same.",

  code: `
// var leaks outside a loop block
for (var i = 0; i < 1; i++) {}
console.log(i); // 1

// let stays inside the loop block
for (let j = 0; j < 1; j++) {}
// console.log(j); // ReferenceError

const user = { name: "Ali" };
user.name = "Sara";
console.log(user.name); // Sara -> mutation is allowed

// const answer = 42;
// answer = 99; // TypeError: cannot reassign a const

// console.log(score); // ReferenceError in TDZ
let score = 10;
  `,

  interviewQA: [
    {
      q: "What is the difference between var let and const?",
      a: "var is function scoped and hoisted as undefined, which often causes bugs. let is block scoped and lives in the Temporal Dead Zone before declaration. const is block scoped too, but it also cannot be reassigned. In modern JavaScript, use const by default and let when reassignment is needed.",
    },
    {
      q: "What is the Temporal Dead Zone?",
      a: "The Temporal Dead Zone is the time between scope creation and the declaration line of a let or const variable. During that period the variable exists, but accessing it throws a ReferenceError.",
    },
    {
      q: "Can you change a const variable?",
      a: "You cannot reassign a const binding to point somewhere else. But if the const holds an object or array, you can still change its internal properties or items because const protects the binding, not deep immutability.",
    },
    {
      q: "Why should you avoid var in modern JavaScript?",
      a: "var is function scoped instead of block scoped, so it leaks out of loops and conditionals unexpectedly. It is also hoisted as undefined, which can hide bugs. let and const are more predictable and communicate intent clearly.",
    },
  ],

  commonMistakes: [
    "Using var in loops (accidental global leakage).",
    "Trying to reassign a const variable.",
    "Accessing let/const before declaration (TDZ error).",
  ],

  interviewSummary:
    "Modern JS standard: use const by default, let for reassignment, and avoid var entirely. Understanding block scope vs function scope is critical for JS developers.",
};
