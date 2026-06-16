export const functionalProgramming = {
  id: "functional-programming",
  title: "Functional Programming Concepts",
  category: "JavaScript",
  difficulty: "Advanced",
  tags: [
    "pure function",
    "immutability",
    "side effects",
    "higher order function",
    "function composition",
    "currying",
    "memoization",
    "FP",
  ],

  definition:
    "Functional Programming is a style where functions are treated as first-class values, pure functions are preferred, data is updated immutably, and behavior is built by composing small transformations.",

  simpleExplanation:
    "Functional Programming (FP) is about writing 'pure' code. Instead of changing variables directly, you create new copies with the changes. Think of it like a factory line where each station does one specific job and passes the product to the next. It makes your code very predictable because the same input will ALWAYS produce the same output.",

  romanUrduRevision:
    "Functional programming mein hum code ko 'pure functions' aur 'immutability' ke asoolon par likhte hain.\nPure function hamesha same input par same output deta hai.\nHum objects ko modify nahi karte, balkay unki copies banate hain (spread operator) taake purani state mehfooz rahay.",

  realLifeExample:
    "Think of an 'Undo' button in a painting app. If you use Functional Programming, you don't just change the current picture; you save a list of every version of the picture (immutability). To undo, you just go back to the previous version in the list. This is much easier than trying to 'reverse' a complex change.",

  why:
    "Functional code is easier to test and reason about because outputs depend mainly on inputs. React leans heavily on these ideas through immutable state updates, pure rendering, hooks, array methods, and derived values.",

  how: [
    "Step 1 - Pure functions return the same output for the same input",
    "Step 2 - Side effects are interactions with the outside world and should be isolated",
    "Step 3 - Immutability means creating new data instead of changing existing data",
    "Step 4 - Higher order functions accept or return other functions",
    "Step 5 - Composition combines small functions into a pipeline",
    "Step 6 - Currying turns multi-argument functions into chains of one-argument functions",
    "Step 7 - Memoization caches expensive function results for repeated inputs",
  ],

  diagram: `
flowchart TD
  A[Functional Programming] --> B[Pure Functions]
  A --> C[Immutability]
  A --> D[Higher Order Functions]
  A --> E[Composition]
  A --> F[Currying]
  A --> G[Memoization]
  E --> H[data validate sanitize format result]
  F --> I[generic function becomes specialized function]
  `,

  analogy:
    "A pure function is like a vending machine that always gives the same snack for the same button. Immutability is like creating a revised document instead of erasing the original. Currying is like filling an order form one field at a time, and memoization is writing down an expensive answer so the next repeat question is instant.",

  code: `
let total = 0;
function addToTotal(n) { total += n; return total; } // impure
function add(a, b) { return a + b; } // pure

const original = [1, 2, 3];
const updated = [...original, 4];
const user = { name: "Ali", age: 25 };
const updatedUser = { ...user, age: 26 };

const pipe = (...fns) => (x) => fns.reduce((v, fn) => fn(v), x);
const processName = pipe(
  (name) => name.trim(),
  (name) => name.toLowerCase(),
  (name) => name.replace(/\\s+/g, "-"),
);
console.log(processName("  Ali Hassan  "));

const multiply = (a) => (b) => a * b;
const double = multiply(2);

function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
  `,

  interviewQA: [
    {
      q: "What is a pure function?",
      a: "A pure function always returns the same output for the same input and has no side effects. It does not mutate external state, touch the DOM, call APIs, or depend on changing outside values.",
    },
    {
      q: "What is the difference between imperative and functional programming?",
      a: "Imperative programming describes step-by-step mutation and control flow. Functional programming describes transformations of data through pure functions, composition, and immutable updates.",
    },
    {
      q: "What is currying?",
      a: "Currying transforms a multi-argument function into a chain of single-argument functions. It enables partial application, where you pre-fill some arguments to create specialized reusable functions.",
    },
    {
      q: "What is memoization and when would you use it?",
      a: "Memoization caches function results by input. Use it for expensive calculations called repeatedly with the same arguments, recursive algorithms, or React derived values where recalculation would be wasteful.",
    },
  ],

  commonMistakes: [
    "Mutating an array or object directly inside a map or reduce function.",
    "Thinking that .concat() or .slice() mutates the original array (they return copies).",
    "Writing functions that depend on global variables (making them impure).",
    "Over-using recursion in JavaScript without proper tail-call optimization knowledge.",
  ],

  interviewSummary:
    "Functional Programming promotes pure functions, immutability, and declarative code. It is the heart of React's architecture (State, Props, and Hooks). Mastering FP means mastering predictability, testability, and scalability in modern web development.",
};
