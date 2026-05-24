export const scopeChain = {
  id: "scope-chain",
  title: "Scope & Scope Chain",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: [
    "scope",
    "lexical scope",
    "scope chain",
    "global scope",
    "block scope",
    "function scope",
    "variable shadowing",
  ],

  definition:
    "Scope defines where a variable can be accessed in code. The scope chain is the path JavaScript follows when it looks for a variable name, starting from the current scope and moving outward to global scope.",

  why:
    "Without scope, every variable would be global and any function could accidentally change data from somewhere else. Scope creates boundaries, prevents name collisions, and makes programs easier to reason about.",

  how: [
    "Step 1 - Global scope contains variables declared outside functions",
    "Step 2 - Function scope contains variables declared inside a function",
    "Step 3 - Block scope contains let and const variables inside braces",
    "Step 4 - Scope is lexical, so it depends on where code is written",
    "Step 5 - JavaScript looks in the current scope first for a name",
    "Step 6 - If not found, it walks outward to the parent scope",
    "Step 7 - If still not found at global scope, it throws a ReferenceError",
    "Step 8 - An inner variable with the same name shadows the outer one",
  ],

  diagram: `
flowchart TD
  A[Global Scope] --> B[Function Scope]
  B --> C[Block Scope]
  C --> D[Lookup moves outward]
  C --> E[Inner can read outer]
  A --> F[Outer cannot read inner]
  B --> G[Inner name can shadow outer]
  `,

  analogy:
    "Imagine a closet inside a bedroom inside a house. If you are standing in the closet and need a pen, you check the closet first, then the bedroom, then the house. That search path is the scope chain. But if you are standing in the house, you cannot magically reach into the closet from outside. If both the closet and the bedroom have a pen, the closet pen is the one you find first.",

  code: `
const globalVar = "global";
function outer() {
  const funcVar = "function";
  if (true) {
    const blockVar = "block";
    console.log(globalVar, funcVar, blockVar);
  }
  console.log(globalVar, funcVar);
}
outer();
// console.log(funcVar); // ReferenceError

const color = "blue";
function paint() {
  const color = "red";
  console.log(color); // red shadows blue
}
paint();
console.log(color); // blue

const city = "Karachi";
function creator() { return () => console.log(city); }
const fn = creator();
function caller() { const city = "Lahore"; fn(); }
caller(); // Karachi because scope is lexical
  `,

  interviewQA: [
    {
      q: "What is scope in JavaScript?",
      a: "Scope determines where a variable is accessible. JavaScript has global scope, function scope, and block scope, and those boundaries decide where a name can be read or changed.",
    },
    {
      q: "What is the scope chain?",
      a: "When JavaScript looks up a variable, it starts in the current scope and then moves outward through each enclosing scope until it reaches global scope. That outward lookup path is called the scope chain.",
    },
    {
      q: "What is variable shadowing?",
      a: "Variable shadowing happens when an inner scope declares a variable with the same name as an outer one. Inside that inner scope, the local name hides the outer variable of the same name.",
    },
  ],
};
