export const jsTrickyOutputs = {
  id: "js-tricky-outputs",
  title: "Tricky Output Questions",
  category: "JavaScript",
  difficulty: "Advanced",
  tags: [
    "output questions",
    "interview",
    "coercion",
    "hoisting",
    "event loop",
    "closures",
    "tricky",
    "this",
    "NaN",
    "typeof",
  ],

  definition:
    "Tricky output questions are JavaScript code snippets where the interviewer asks you to predict what will print on the console. These questions test whether you truly understand how JavaScript works under the hood — how it handles hoisting, type coercion, closures, the Event Loop, and 'this' binding. The goal is not just giving the correct answer, but explaining step by step why the JavaScript engine produces that output.",

  simpleExplanation:
    "Almost every JavaScript interview includes 3 to 5 questions that start with 'what does this code print?'. These look simple on the surface but they hide traps — a var inside a loop, a Promise next to a setTimeout, a function detached from its object. If you just memorize the answers, you will fail the follow-up question which is always 'why?'. This section trains you to trace code like the JavaScript engine does — step by step, in the right order, with the right rules.",

  romanUrduRevision:
    "Output questions mein JavaScript engine ki tarah sochna payta hay. Pehle synchronous code run hota hay. Phir microtasks drain hote hain — Promise.then yahan ata hay. Phir ek macrotask run hota hay — setTimeout yahan ata hay. var function-scoped hay isliye loop mein sab callbacks same i share karte hain. let har iteration mein naya binding banata hay. Coercion mein + string se milta hay tu string banta hay, - hamesha number banta hay. this ka value depend karta hay function kaise call kiya — method call mein object milta hay, detached call mein undefined milta hay strict mode mein.",

  why: "Interviewers use these questions as a fast filter. In the first 10 minutes, they want to know — does this developer actually understand JavaScript execution, or did they just read tutorials? A developer who can trace an output question and explain each step shows they understand hoisting, scope, closures, async queues, and type coercion all at once. These are the exact skills needed to debug real production bugs where the code 'should have worked' but did not.",

  how: [
    "Step 1 — Before running anything mentally, identify all var and function declarations. Hoist them to the top of their scope first.",
    "Step 2 — Run all synchronous code from top to bottom on the Call Stack. Do not jump to async callbacks yet.",
    "Step 3 — When you see setTimeout or setInterval, note that the callback goes to the Macrotask Queue — it will run last.",
    "Step 4 — When you see Promise.resolve().then or await, note that the callback goes to the Microtask Queue — it runs before any macrotask.",
    "Step 5 — After all synchronous code finishes, drain the entire Microtask Queue completely before touching any macrotask.",
    "Step 6 — Then run one macrotask. After it finishes, drain microtasks again. Repeat.",
    "Step 7 — For coercion: + with any string gives a string. -, *, / always convert to numbers. Boolean context converts everything — only 0, '', null, undefined, NaN, false are falsy.",
    "Step 8 — For 'this': if a function is called as obj.method(), this is obj. If the function is assigned to a variable and called alone, this is undefined in strict mode.",
    "Step 9 — For closures in loops: var creates one shared variable for all iterations. let creates a brand new binding for every single iteration.",
    "Step 10 — NaN is the only value in JavaScript that is not equal to itself. Always use Number.isNaN() for reliable NaN checking.",
  ],

  diagram: `
flowchart TD
  A[JavaScript code starts running] --> B[HOISTING PHASE]
  B --> B1[Function declarations fully hoisted]
  B --> B2[var variables hoisted as undefined]
  B --> B3[let and const in TDZ - not accessible yet]

  B3 --> C[SYNCHRONOUS EXECUTION]
  C --> C1[Run code line by line on Call Stack]
  C1 --> C2[setTimeout callback goes to Macrotask Queue]
  C1 --> C3[Promise.then callback goes to Microtask Queue]
  C1 --> C4[Synchronous console.log runs immediately]

  C4 --> D[Call Stack is now empty]
  D --> E[DRAIN ALL MICROTASKS FIRST]
  E --> E1[Run Promise.then callbacks one by one]
  E1 --> E2[If new microtasks added, run those too]
  E2 --> F[Microtask Queue is empty]

  F --> G[RUN ONE MACROTASK]
  G --> G1[Run setTimeout callback]
  G1 --> H[Drain microtasks again]
  H --> I[Run next macrotask]
  I --> H
  `,

  analogy:
    "Tracing output questions is like being a crime scene detective. You do not guess what happened — you follow the evidence in order. First you check what was prepared before the scene started — that is hoisting. Then you follow the timeline of events in order — that is synchronous execution. Then you check the priority queue — microtasks are urgent witnesses who speak before the regular ones. Macrotasks are regular witnesses who wait their turn. Type coercion is like a translator who automatically converts what someone said — sometimes the translation surprises you. Your job as the detective is to follow every rule precisely and never assume.",

  realLifeExample:
    "Imagine you are fixing a bug where a button click seems to do nothing. You look at the code and see a setTimeout and a Promise. Without knowing the 'output logic', you might think the timeout runs first. But in reality, the Promise (microtask) always wins. Knowing these tricky outputs helps you find the bug in seconds instead of hours.",

  code: `
// ─── QUESTION 1: Event Loop Order ────────────────────────────────────────────
// Rule: sync first → microtasks → macrotasks

console.log("start");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("end");

// Output: start → end → promise → timeout
// Why: "start" and "end" are sync — run immediately on Call Stack.
//      Promise.then is a microtask — runs after sync, before setTimeout.
//      setTimeout is a macrotask — runs last, even with 0ms delay.


// ─── QUESTION 2: var in Loop — Classic Trap ──────────────────────────────────
// Rule: var is function-scoped — all iterations share ONE variable

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}

// Output: 3, 3, 3
// Why: var creates ONE i for the whole function.
//      By the time timers fire (100ms later), the loop is done and i = 3.
//      All 3 callbacks read the same i which is now 3.


// ─── QUESTION 3: let in Loop — The Fix ───────────────────────────────────────
// Rule: let creates a NEW binding for EVERY iteration

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}

// Output: 0, 1, 2
// Why: let creates a separate j for each iteration.
//      Each callback closes over its own private j — 0, 1, and 2.


// ─── QUESTION 4: typeof Surprises ────────────────────────────────────────────

console.log(typeof null);          // "object"   — historical JS bug
console.log(typeof []);            // "object"   — arrays are objects
console.log(typeof NaN);           // "number"   — NaN is still the number type
console.log(typeof function(){}); // "function" — functions get a special result
console.log(typeof undefined);     // "undefined"
console.log(typeof Symbol());      // "symbol"
console.log(typeof 42n);           // "bigint"


// ─── QUESTION 5: NaN Comparison ──────────────────────────────────────────────

console.log(NaN === NaN);          // false — NaN is the ONLY value not equal to itself
console.log(isNaN("hello"));       // true  — global isNaN coerces "hello" to NaN first
console.log(Number.isNaN("hello")); // false — Number.isNaN checks WITHOUT coercion
console.log(Number.isNaN(NaN));    // true  — this is the correct way to check for NaN


// ─── QUESTION 6: Hoisting — Function Declaration vs Expression ────────────────

console.log(typeof foo); // "function" — fully hoisted, callable before its definition
console.log(typeof bar); // "undefined" — var is hoisted but value is not assigned yet

function foo() {}        // function declaration — fully hoisted
var bar = function () {}; // function expression — only var is hoisted, not the function


// ─── QUESTION 7: Lost this Context ───────────────────────────────────────────

const obj = {
  value: 42,
  getValue() {
    return this.value;
  }
};

const fn = obj.getValue; // detached — no longer connected to obj

console.log(obj.getValue()); // 42       — this is obj because called as obj.method()
console.log(fn());           // undefined — this is undefined in strict mode
                             //             (or window.value in sloppy mode, also undefined)

// Fix with bind:
const boundFn = obj.getValue.bind(obj);
console.log(boundFn()); // 42


// ─── QUESTION 8: Type Coercion with + - * / ──────────────────────────────────

console.log(1 + "2");    // "12"  — + sees a string, converts 1 to "1", concatenates
console.log("3" - 1);   // 2     — - always converts to number
console.log(true + true); // 2   — true becomes 1
console.log([] + []);    // ""   — [] becomes "", "" + "" = ""
console.log([] + {});    // "[object Object]"  — [] is "", {} is "[object Object]"
console.log({} + []);    // "[object Object]"  — same result, different order


// ─── QUESTION 9: Loose Equality Traps ────────────────────────────────────────

console.log(null == undefined);  // true  — special rule: only equal to each other
console.log(null == 0);          // false — null only equals undefined with ==
console.log(0 == false);         // true  — false becomes 0
console.log("" == false);        // true  — both become 0
console.log([] == false);        // true  — [] becomes "" becomes 0, false becomes 0
console.log([] == ![]);          // true  — ![] is false, then [] == false → true


// ─── QUESTION 10: Closure Private State ──────────────────────────────────────

function makeCounter() {
  let count = 0; // private — not on the returned object
  return {
    increment: () => ++count,
    value:     () => count,
  };
}

const counter = makeCounter();
counter.increment();
counter.increment();
console.log(counter.value()); // 2       — closure remembers count
console.log(counter.count);   // undefined — count is not a property on the object


// ─── QUESTION 11: Async/Await Execution Order ────────────────────────────────

async function fetchData() {
  console.log("inside async");       // sync — runs immediately
  await Promise.resolve();
  console.log("after await");        // microtask — runs after current sync code
}

console.log("before call");
fetchData();
console.log("after call");

// Output: before call → inside async → after call → after await
// Why: fetchData() starts running synchronously until the first await.
//      await pauses the function and schedules the rest as a microtask.
//      "after call" runs sync, then microtask queue drains and "after await" runs.


// ─── QUESTION 12: Chained Promises Execution Order ───────────────────────────

Promise.resolve()
  .then(() => { console.log("then 1"); return "A"; })
  .then(() => { console.log("then 2"); });

Promise.resolve()
  .then(() => { console.log("then 3"); });

// Output: then 1 → then 3 → then 2
// Why: Both first .then() calls are queued as microtasks at the same time.
//      "then 1" and "then 3" run first (both were in queue together).
//      Only after "then 1" resolves does "then 2" get added to the queue.


// ─── QUESTION 13: arguments vs rest in Arrow Functions ───────────────────────

function regular() {
  console.log(arguments[0]); // works — regular functions have arguments object
}

const arrow = () => {
  console.log(arguments[0]); // ReferenceError — arrow functions have no arguments
};

const withRest = (...args) => {
  console.log(args[0]); // works — rest parameter is the modern replacement
};

regular(1);   // 1
withRest(1);  // 1


// ─── QUESTION 14: Object Reference vs Value ──────────────────────────────────

const a = { name: "Noman" };
const b = a;              // b points to the SAME object in memory, not a copy
b.name = "Ali";

console.log(a.name); // "Ali" — both a and b reference the same object

const c = { name: "Noman" };
const d = { ...c };   // spread creates a shallow copy — NEW object
d.name = "Sara";

console.log(c.name); // "Noman" — c is unaffected, d is a different object


// ─── QUESTION 15: IIFE and Scope Isolation ───────────────────────────────────

var x = 10;

(function () {
  var x = 20;        // this x is function-scoped — different from outer x
  console.log(x);    // 20
})();

console.log(x);      // 10 — outer x is untouched
  `,

  ommonMistakes: [
    {
      mistake:
        "Assuming setTimeout with 0ms runs immediately after the current line",
      explanation:
        "setTimeout with 0ms does NOT run right away. It goes to the Macrotask Queue and waits until the entire synchronous code AND all microtasks have finished. Even with 0ms delay, it always runs after Promise.then callbacks.",
      wrong: `
console.log("a");
setTimeout(() => console.log("b"), 0);
console.log("c");
// Many beginners expect: a → b → c`,
      right: `
// Actual output: a → c → b
// setTimeout is always last — after all sync code and microtasks`,
    },
    {
      mistake: "Using var in loops with async callbacks expecting 0, 1, 2",
      explanation:
        "var is function-scoped, not block-scoped. When you use var in a for loop, there is only ONE variable shared by all iterations. By the time the setTimeout callbacks run, the loop has already finished and the variable holds the final value.",
      wrong: `
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Expected: 0, 1, 2
// Actual:   3, 3, 3`,
      right: `
// Fix 1: use let instead of var
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}

// Fix 2: use closure with IIFE
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100); // 0, 1, 2
  })(i);
}`,
    },
    {
      mistake: "Using == instead of === and being surprised by coercion",
      explanation:
        "Loose equality == performs type coercion before comparing. This leads to results that feel wrong — null equals undefined, 0 equals false, an empty array equals false. Always use === unless you have a specific reason for loose comparison.",
      wrong: `
console.log(0 == false);   // true  — unexpected
console.log("" == false);  // true  — unexpected
console.log([] == false);  // true  — very unexpected
console.log(null == 0);    // false — inconsistent`,
      right: `
console.log(0 === false);  // false — correct, different types
console.log("" === false); // false — correct
console.log([] === false); // false — correct
// Use === everywhere — be explicit about types`,
    },
    {
      mistake:
        "Calling a method through a detached reference and expecting 'this' to work",
      explanation:
        "When you copy a method to a new variable and call it, the connection to the original object is lost. 'this' inside the method will be undefined in strict mode. The value of 'this' is determined by how the function is called, not where it was defined.",
      wrong: `
const user = {
  name: "Noman",
  greet() { return "Hello " + this.name; }
};
const greet = user.greet;
console.log(greet()); // "Hello undefined" — this is not user anymore`,
      right: `
// Fix 1: bind explicitly
const greet = user.greet.bind(user);
console.log(greet()); // "Hello Noman"

// Fix 2: use arrow function in object (for simple cases)
// Fix 3: call with .call(user) each time`,
    },
  ],

  interviewQA: [
    {
      q: "What does this output and why?\nconsole.log('start'); setTimeout(() => console.log('timeout'), 0); Promise.resolve().then(() => console.log('promise')); console.log('end');",
      a: "Output: start → end → promise → timeout. JavaScript runs all synchronous code first, so 'start' and 'end' print immediately. Promise.then is a microtask — it goes into the Microtask Queue and runs after all sync code but before any macrotask. setTimeout is a macrotask — it always runs last, even with 0ms delay.",
    },
    {
      q: "What does this output and why?\nfor (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }",
      a: "Output: 3, 3, 3. var is function-scoped, so there is only ONE variable i shared across all three iterations. By the time the setTimeout callbacks fire 100ms later, the loop has already finished and i has become 3. All three callbacks read the same i which is 3.",
    },
    {
      q: "What does this output and why?\nfor (let i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }",
      a: "Output: 0, 1, 2. let is block-scoped and creates a brand new i binding for every single loop iteration. Each setTimeout callback closes over its own private copy of i — the first callback has i = 0, the second has i = 1, and the third has i = 2.",
    },
    {
      q: "What does typeof return for null, arrays, NaN, and functions?",
      a: "typeof null returns 'object' — this is a historical JavaScript bug from 1995 that was never fixed to avoid breaking old code. typeof [] returns 'object' because arrays are objects. typeof NaN returns 'number' because NaN is the result of a failed number operation and still belongs to the number type. typeof function(){} returns 'function' which is a special case — technically functions are objects but they get their own typeof result.",
    },
    {
      q: "Why is NaN === NaN false? How do you correctly check for NaN?",
      a: "NaN is the only value in JavaScript that is not equal to itself — this is defined in the IEEE 754 floating point standard. So NaN === NaN is always false. The global isNaN() function is unreliable because it coerces its argument first — isNaN('hello') returns true because 'hello' gets coerced to NaN. The correct way is Number.isNaN() which checks without any coercion and only returns true for actual NaN values.",
    },
    {
      q: "What is the difference between how function declarations and function expressions are hoisted?",
      a: "Function declarations are fully hoisted — the entire function body is available before any code runs, so you can call them before their line in the file. Function expressions assigned to var are only partially hoisted — the var variable is hoisted and set to undefined, but the function value is not assigned until that line executes. Calling a var function expression before its line throws a TypeError because you are trying to call undefined.",
    },
    {
      q: "What does this output?\nconst fn = obj.getValue; console.log(obj.getValue()); console.log(fn());",
      a: "obj.getValue() returns the correct value because 'this' is obj — the function was called as a method on the object. fn() returns undefined or throws because when you assign a method to a variable and call it without an object, the connection to obj is lost. In strict mode, 'this' becomes undefined inside fn, so this.value is undefined. Fix it with fn = obj.getValue.bind(obj).",
    },
    {
      q: "What does this output?\nconsole.log(1 + '2'); console.log('3' - 1); console.log([] + []);",
      a: "1 + '2' gives '12' — the + operator sees a string operand and converts the number 1 to '1', then concatenates. '3' - 1 gives 2 — the - operator has no string behavior and converts '3' to the number 3, then subtracts. [] + [] gives '' — each array converts to an empty string, then empty string plus empty string is empty string.",
    },
    {
      q: "What does this output and why?\nconsole.log(null == undefined); console.log([] == false); console.log(null == 0);",
      a: "null == undefined is true — this is a special rule in JavaScript's loose equality spec where null only loosely equals undefined and nothing else. [] == false is true — false converts to 0, [] converts to '' which converts to 0, so 0 == 0 is true. null == 0 is false — despite what you might expect, null does not coerce to 0 in loose equality. null only loosely equals undefined.",
    },
    {
      q: "Why is counter.count undefined in the makeCounter example?",
      a: "The count variable lives inside makeCounter's function scope. It is a local variable, not a property on the returned object. The returned object has two methods — increment and value — that can access count through closure because they were created inside the same scope. But count is never attached to the object with 'this.count' or similar, so accessing counter.count from outside returns undefined. This is the classic closure-based private state pattern.",
    },
    {
      q: "What does this output?\nasync function fetchData() { console.log('inside'); await Promise.resolve(); console.log('after await'); } console.log('before'); fetchData(); console.log('after call');",
      a: "Output: before → inside → after call → after await. 'before' is sync. fetchData() starts and 'inside' prints immediately — async functions run synchronously until the first await. The await pauses fetchData and schedules 'after await' as a microtask. Control returns to the caller and 'after call' prints synchronously. Then the Call Stack empties, microtasks drain, and 'after await' finally prints.",
    },
    {
      q: "What does this output?\nPromise.resolve().then(() => { console.log('A'); return 'x'; }).then(() => console.log('B')); Promise.resolve().then(() => console.log('C'));",
      a: "Output: A → C → B. When the code runs, both first .then() handlers — A and C — are added to the Microtask Queue at the same time. The queue drains in order: A runs first, then C runs. Only after A's .then() resolves does B get added to the queue. So B runs last. This shows that chained .then() calls do not all queue up at once — each one waits for the previous to resolve.",
    },
    {
      q: "What is the difference between these two?\nconst a = { x: 1 }; const b = a; vs const c = { ...a };",
      a: "const b = a does not create a copy. Both a and b point to the exact same object in memory. Changing b.x also changes a.x because they are the same object. const c = { ...a } creates a new object with the same top-level properties. Changing c.x does not affect a because c is a separate object. This is called a shallow copy — it works for flat objects but nested objects would still be shared.",
    },
  ],

  interviewSummary:
    "For output questions, always follow this order: hoisting first, then synchronous execution, then microtasks, then macrotasks. var in loops shares one variable — all async callbacks see the final value. let in loops creates a new binding per iteration — each callback gets its own value. typeof null is 'object' — a historical bug. typeof NaN is 'number'. NaN is the only value not equal to itself — use Number.isNaN() not ===. The + operator concatenates when a string is involved, but -, *, / always convert to numbers. null == undefined is true, but null == 0 is false — null only loosely equals undefined. 'this' depends on how a function is called — method call gives the object, detached call gives undefined in strict mode. Promise.then is a microtask and runs before any setTimeout even with 0ms. Closures create private state when variables are in function scope and not attached to the returned object.",
};
