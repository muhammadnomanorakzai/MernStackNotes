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
    "The JavaScript Interview Master Sheet is a complete rapid-fire revision guide covering every topic a JavaScript interviewer can ask — from beginner fundamentals like var and hoisting, to intermediate topics like closures and promises, to senior-level topics like memory management, design patterns, and implementing built-in methods from scratch. Every answer is written to be delivered confidently in under 30 seconds.",

  simpleExplanation:
    "This sheet is your final revision tool before any JavaScript interview. Every other topic in your notes goes deep into one concept. This sheet gives you the short, confident answer for each concept that an interviewer expects to hear in the first 10 minutes. Think of it as the summary of everything you have already learned — organized by difficulty level so you know exactly where to focus your last few hours before the interview.",

  romanUrduRevision:
    "Yeh sheet interview se pehle last revision ke liye hay. Baaki saray notes deep explanation ke liye the — yeh sheet fast answers ke liye hay. Ek question padho, answer chupao, khud bolke batao, phir compare karo. Jo miss ho jaye usse repeat karo. Interview mein pehle 15-20 rapid fire questions hote hain — agar yeh sheet confident nahi tu deep questions tak pohonchne ka chance hi nahi milta.",

  why: "Every JavaScript interview starts the same way. The interviewer asks 10 to 20 quick questions to test your breadth — do you know the basics? Can you explain closures? What is the Event Loop? If you stumble on these, the interview moves into easier territory and you never get the chance to show your advanced knowledge. This sheet prepares you for that first phase so you can answer every basic and intermediate question confidently and fast, which signals to the interviewer that you are ready for the harder technical discussion.",

  how: [
    "Step 1 — Read one question out loud, then immediately cover the answer.",
    "Step 2 — Say your answer out loud from memory — speaking is more effective than reading silently.",
    "Step 3 — Uncover the answer and honestly compare what you said to what is written.",
    "Step 4 — If you missed anything important, mark that question and repeat it three more times.",
    "Step 5 — Do the Beginner section first, then Intermediate, then Senior.",
    "Step 6 — On the day before the interview, go through only the questions you marked as weak.",
    "Step 7 — Time yourself — each answer should feel comfortable in under 30 seconds.",
  ],

  diagram: `
flowchart TD
  A[JavaScript Interview Master Sheet] --> B[Beginner Level]
  A --> C[Intermediate Level]
  A --> D[Senior Level]

  B --> B1[var let const hoisting]
  B --> B2[null vs undefined]
  B --> B3[== vs ===]
  B --> B4[data types typeof]
  B --> B5[scope and this keyword]

  C --> C1[closures and lexical scope]
  C --> C2[promises async await event loop]
  C --> C3[prototype and inheritance]
  C --> C4[call apply bind]
  C --> C5[array methods map filter reduce]
  C --> C6[destructuring spread rest]
  C --> C7[shallow vs deep copy]

  D --> D1[memoization and currying]
  D --> D2[garbage collection memory leaks]
  D --> D3[debounce and throttle]
  D --> D4[design patterns module singleton observer]
  D --> D5[implement from scratch - map bind Promise]
  D --> D6[Web Workers and performance]
  D --> D7[generators and iterators]
  `,

  analogy:
    "Think of this sheet as your cricket practice net session the day before a match. You have already studied the techniques — how to drive, how to hook, how to defend. This session is not for learning new shots. It is for making every shot feel automatic so when the pressure is on in the real match, your hands move before your brain even thinks. This sheet does the same thing for JavaScript interview answers — it makes them automatic.",

  realLifeExample:
    "Think of a job interview at a top tech company like Google or Amazon. In the first 10 minutes, the interviewer asks 15 quick questions to see if you know the basics. If you use this master sheet, you can answer all 15 questions perfectly without even thinking, which gives you more time for the harder coding problems later.",

  code: `
// ─── 1. Memoization + Closure + Currying combined ────────────────────────────
// Senior level — shows you understand all three at once

function createMemoizedMultiplier() {
  const cache = new Map(); // closure — cache lives across all calls

  return function multiply(a) {
    return function (b) {
      const key = a + "," + b;
      if (cache.has(key)) return cache.get(key); // return from cache

      const result = a * b;
      cache.set(key, result); // save for next time
      return result;
    };
  };
}

const memoMultiply = createMemoizedMultiplier();
const double = memoMultiply(2);
console.log(double(5));  // 10 — computed fresh
console.log(double(5));  // 10 — from cache, no re-computation
console.log(double(10)); // 20 — computed fresh


// ─── 2. Implement Array.prototype.map from scratch ────────────────────────────
// Senior level — frequently asked: "can you implement map yourself?"

Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

console.log([1, 2, 3].myMap(x => x * 2)); // [2, 4, 6]


// ─── 3. Implement Function.prototype.bind from scratch ───────────────────────
// Senior level — tests deep understanding of this and closures

Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...laterArgs) {
    return fn.apply(context, [...args, ...laterArgs]);
  };
};

function greet(greeting, punctuation) {
  return greeting + ", " + this.name + punctuation;
}
const greetNoman = greet.myBind({ name: "Noman" }, "Hello");
console.log(greetNoman("!")); // Hello, Noman!


// ─── 4. Debounce implementation ───────────────────────────────────────────────
// Asked in almost every senior frontend interview

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);              // cancel previous timer
    timer = setTimeout(() => {
      fn.apply(this, args);           // run only after user stops
    }, delay);
  };
}

const handleSearch = debounce((query) => {
  console.log("Searching for:", query);
}, 500);

// User types fast — only the last call fires after 500ms pause
handleSearch("n");
handleSearch("no");
handleSearch("nom");
handleSearch("noman"); // only this one actually runs


// ─── 5. Throttle implementation ──────────────────────────────────────────────
// Throttle = run at most once per interval (scroll, resize events)

function throttle(fn, limit) {
  let lastRun = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      fn.apply(this, args);
    }
  };
}

const handleScroll = throttle(() => {
  console.log("Scroll event handled");
}, 200); // fires at most once every 200ms


// ─── 6. Implement a basic Promise from scratch ────────────────────────────────
// Deep senior level — rarely asked but extremely impressive if you know it

class MyPromise {
  constructor(executor) {
    this.state    = "pending";
    this.value    = undefined;
    this.handlers = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = value;
      this.handlers.forEach(h => h(value));
    };

    executor(resolve);
  }

  then(onFulfilled) {
    if (this.state === "fulfilled") {
      onFulfilled(this.value);
    } else {
      this.handlers.push(onFulfilled);
    }
    return this;
  }
}

new MyPromise((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
}).then(val => console.log(val)); // Done! after 1 second


// ─── 7. Event Loop order — classic interview question ─────────────────────────

console.log("1 - Start");

setTimeout(() => console.log("4 - setTimeout"), 0);

Promise.resolve()
  .then(() => console.log("3 - Promise.then"));

console.log("2 - End");

// Output order: 1, 2, 3, 4
// Why: synchronous first, then microtasks (Promise), then macrotasks (setTimeout)
  `,

  interviewQA: [
    // ── BEGINNER LEVEL ──────────────────────────────────────────────────────

    {
      q: "What is JavaScript and is it single-threaded?",
      a: "JavaScript is a dynamically typed, interpreted scripting language that runs in the browser and on Node.js. It is single-threaded, meaning it has one Call Stack and can only do one thing at a time. Async behavior is handled by Web APIs, the Event Loop, and task queues — not by multiple threads.",
    },
    {
      q: "What are the data types in JavaScript?",
      a: "JavaScript has 8 data types. Primitives: string, number, bigint, boolean, undefined, null, and symbol. Non-primitive: object. Arrays and functions are special kinds of objects. Primitives are stored by value, objects are stored by reference.",
    },
    {
      q: "What is the difference between == and ===?",
      a: "== performs type coercion before comparing, so '5' == 5 is true. === compares both value and type without any coercion, so '5' === 5 is false. Always prefer === to avoid unexpected coercion bugs.",
    },
    {
      q: "What is the difference between null and undefined?",
      a: "undefined means a variable has been declared but no value has been assigned — JavaScript sets it automatically. null is an intentional empty value assigned by the developer. typeof undefined is 'undefined', but typeof null is 'object' due to a historical bug in JavaScript.",
    },
    {
      q: "What is the difference between var, let, and const?",
      a: "var is function-scoped, hoisted and initialized as undefined, and can be re-declared. let and const are block-scoped, hoisted but in the Temporal Dead Zone until their declaration, and cannot be re-declared. const cannot be reassigned, but the properties of a const object can still be mutated.",
    },
    {
      q: "What is hoisting?",
      a: "Hoisting is JavaScript's behavior of processing declarations before executing code. Function declarations are fully hoisted — you can call them before they appear. var is hoisted and initialized as undefined. let and const are hoisted but sit in the Temporal Dead Zone, so accessing them before their declaration throws a ReferenceError.",
    },
    {
      q: "What is the Temporal Dead Zone?",
      a: "The TDZ is the period between when a let or const variable is hoisted and when its declaration line is actually reached during execution. Any access to the variable in this zone throws a ReferenceError. It exists to catch mistakes where developers use a variable before they have defined it.",
    },
    {
      q: "What is scope in JavaScript?",
      a: "Scope is the area of code where a variable is accessible. JavaScript has global scope, function scope, and block scope. var respects function scope. let and const respect block scope. Inner functions can access outer scope variables through the scope chain — this is the basis of closures.",
    },
    {
      q: "What is typeof and what are its quirks?",
      a: "typeof returns a string describing the type of a value. typeof null returns 'object' which is a bug. typeof function returns 'function' even though functions are objects. typeof undeclaredVariable returns 'undefined' instead of throwing an error, which can hide bugs.",
    },
    {
      q: "What is type coercion in JavaScript?",
      a: "Type coercion is JavaScript automatically converting one type to another during operations. Adding a number to a string gives a string. Using == triggers coercion. Coercion can cause confusing results like 0 == false being true or '' == false being true. Use === and explicit conversions to avoid surprises.",
    },

    // ── INTERMEDIATE LEVEL ───────────────────────────────────────────────────

    {
      q: "What is a closure? Give a practical use case.",
      a: "A closure is a function that remembers and can access variables from its outer scope even after that outer function has finished executing. Practical uses: private state in module patterns, factory functions that remember configuration, memoization that remembers cached results, and event handlers that remember data from the time they were created.",
    },
    {
      q: "Explain the Event Loop in JavaScript.",
      a: "JavaScript runs on one thread with a Call Stack. When async operations finish, their callbacks go into queues. The Event Loop continuously checks if the Call Stack is empty. When it is, it first drains the entire Microtask Queue — Promise callbacks go here. Then it picks one task from the Macrotask Queue — setTimeout and setInterval go here. This is why Promise.then always runs before setTimeout even with 0ms delay.",
    },
    {
      q: "What is a Promise and what are its three states?",
      a: "A Promise represents the eventual result of an async operation. It starts in pending state. When the operation succeeds it moves to fulfilled and the .then handler runs. When it fails it moves to rejected and the .catch handler runs. Once a Promise is fulfilled or rejected it is settled and can never change state again.",
    },
    {
      q: "What is the difference between async/await and Promises?",
      a: "async/await is syntax built on top of Promises — it does not replace them. async/await makes sequential async code look synchronous and lets you use try/catch for error handling. Use Promise.all when you have multiple independent async operations that can run in parallel. Use async/await when operations must happen in sequence or when readability matters.",
    },
    {
      q: "What is Promise.all and when does it fail?",
      a: "Promise.all takes an array of Promises and returns a single Promise that resolves when all of them resolve, giving you an array of all results. If even one Promise rejects, Promise.all immediately rejects with that error — the other Promises are ignored. Use Promise.allSettled if you want to wait for all of them regardless of success or failure.",
    },
    {
      q: "Explain prototypal inheritance.",
      a: "Every JavaScript object has a hidden [[Prototype]] link pointing to another object. When you access a property and it is not found on the object itself, JavaScript walks up this prototype chain until it finds the property or reaches null at the top. Classes in ES6 use this same prototype system under the hood — they are syntactic sugar, not a different inheritance model.",
    },
    {
      q: "What is the difference between call, apply, and bind?",
      a: "All three let you manually set the 'this' value for a function. call invokes the function immediately and passes arguments one by one. apply invokes the function immediately and passes arguments as an array. bind does not invoke the function — it returns a new function with 'this' and optionally some arguments permanently fixed.",
    },
    {
      q: "What are arrow functions and when should you NOT use them?",
      a: "Arrow functions are concise functions that inherit 'this' from their surrounding lexical scope — they do not have their own 'this'. Do not use them as object methods because 'this' will not refer to the object. Do not use them as constructors — they cannot be called with new. Do not use them as DOM event handlers when you need 'this' to refer to the element. Do not use them as generator functions.",
    },
    {
      q: "What is the difference between map, filter, and reduce?",
      a: "map transforms every element and returns a new array of the same length. filter keeps only elements that pass a condition and returns a shorter or equal length array. reduce accumulates all elements into a single value — a number, string, object, or array — by running a callback that carries a running accumulator. All three return a new array or value without mutating the original.",
    },
    {
      q: "What is destructuring in JavaScript?",
      a: "Destructuring is syntax that lets you unpack values from arrays or properties from objects into individual variables in one line. Array destructuring uses position: const [a, b] = [1, 2]. Object destructuring uses property names: const { name, age } = user. You can set default values and rename variables during destructuring.",
    },
    {
      q: "What is the spread operator and rest parameter?",
      a: "They both use ... but in opposite directions. Spread expands an iterable into individual elements — useful for copying arrays, merging objects, or passing array items as function arguments. Rest collects multiple individual arguments into a single array — used in function parameters to accept any number of arguments.",
    },
    {
      q: "What is the difference between shallow copy and deep copy?",
      a: "A shallow copy duplicates the top-level properties of an object, but nested objects still share the same reference. Changing a nested value in the copy also changes the original. A deep copy creates a completely independent copy at every level. Use structuredClone() for deep copies in modern environments, or JSON.parse(JSON.stringify()) for simple objects with no functions or special types.",
    },
    {
      q: "What is event delegation?",
      a: "Event delegation is the pattern of attaching one event listener to a parent element instead of individual listeners on each child. When a child is clicked, the event bubbles up to the parent listener. You then check event.target to identify which child was clicked. This is more memory-efficient and automatically handles dynamically added children.",
    },
    {
      q: "What is the difference between event bubbling and capturing?",
      a: "When an event fires, it first goes down from the root to the target element — this is capturing phase. Then it fires on the target. Then it bubbles back up from the target to the root — this is bubbling phase. By default, event listeners use the bubbling phase. Pass true as the third argument to addEventListener to use the capturing phase instead.",
    },
    {
      q: "What does 'this' refer to in JavaScript?",
      a: "The value of 'this' depends entirely on how a function is called, not where it is written. In a regular function called as a method, 'this' is the object before the dot. In a standalone function call, 'this' is undefined in strict mode or the global object in non-strict mode. Arrow functions do not have their own 'this' — they inherit it from the enclosing scope. call, apply, and bind can override 'this' manually.",
    },

    // ── SENIOR LEVEL ────────────────────────────────────────────────────────

    {
      q: "What is memoization and when should you use it?",
      a: "Memoization is an optimization technique that caches the return value of a function based on its input arguments. On repeated calls with the same arguments, the cached result is returned immediately without re-running the function. Use it for expensive pure functions — functions with no side effects that always return the same output for the same input. Do not use it for impure functions or functions whose results depend on time or external state.",
    },
    {
      q: "What is currying?",
      a: "Currying transforms a function that takes multiple arguments into a sequence of functions each taking one argument. Instead of add(2, 3) you write add(2)(3). It enables partial application — you can call the first function with one argument and get back a specialized function. This is useful for creating reusable function factories and for composition in functional programming.",
    },
    {
      q: "What is the difference between debounce and throttle?",
      a: "Both limit how often a function runs. Debounce waits until a user stops triggering the event for a set time, then runs the function once — useful for search input where you wait until the user stops typing. Throttle guarantees the function runs at most once per time interval regardless of how many times the event fires — useful for scroll and resize events where you want regular updates but not on every single pixel.",
    },
    {
      q: "How does garbage collection work in JavaScript?",
      a: "JavaScript uses automatic memory management with a Mark-and-Sweep algorithm. The engine starts from root references like global variables and marks every object it can reach by following all reference chains. Any object that cannot be reached is considered garbage and its memory is freed. Memory leaks happen when you accidentally keep references to objects you no longer need — common causes are forgotten event listeners, closures holding large data, and global variables.",
    },
    {
      q: "What are common causes of memory leaks in JavaScript?",
      a: "The four most common causes are: event listeners that are added but never removed when a component is destroyed, closures that accidentally hold references to large objects or DOM nodes, global variables that accumulate data over time, and detached DOM nodes that are removed from the page but still referenced in JavaScript variables. In React, the most common cause is async operations that try to update state after a component has unmounted.",
    },
    {
      q: "What is a generator function?",
      a: "A generator function uses the function* syntax and can pause its own execution using yield. Each time you call .next() on the generator, it runs until the next yield and returns that value. This makes generators useful for creating lazy sequences, implementing custom iterators, handling async flows, and processing large data sets one item at a time without loading everything into memory.",
    },
    {
      q: "What is the difference between microtasks and macrotasks?",
      a: "Microtasks have higher priority than macrotasks. Promise .then and .catch callbacks, queueMicrotask, and MutationObserver callbacks are microtasks. setTimeout, setInterval, and I/O callbacks are macrotasks. After each macrotask, the Event Loop completely drains the entire Microtask Queue before picking the next macrotask. This means if microtasks keep adding more microtasks, macrotasks can be starved indefinitely.",
    },
    {
      q: "What is the Module pattern and why is it useful?",
      a: "The Module pattern uses closures to create private state and expose only a public API. You create a function or IIFE that holds private variables and returns an object with only the methods you want to expose. This prevents outside code from directly accessing or corrupting internal state. ES6 modules with import and export give you this same benefit at the file level, which is why the pattern is less commonly written manually today.",
    },
    {
      q: "What is the Observer pattern?",
      a: "The Observer pattern defines a one-to-many relationship where one subject object maintains a list of dependent observers. When the subject's state changes, it automatically notifies all observers. This is the foundation of event systems, DOM event listeners, and state management libraries. In JavaScript, EventEmitter in Node.js and the browser's addEventListener system are built on this pattern.",
    },
    {
      q: "Can you implement Array.prototype.map from scratch?",
      a: "Yes. Create a new empty array. Loop through the original array using a for loop with this.length. For each index, call the callback with the current element, index, and the original array. Push the return value into the result array. Return the result array at the end. The key insight is that map never mutates the original and always returns a new array of the same length.",
    },
    {
      q: "What is WeakMap and WeakSet and when would you use them?",
      a: "WeakMap and WeakSet hold weak references to their keys or values, meaning the garbage collector can free those objects even if they are still in the WeakMap or WeakSet. This prevents memory leaks when you want to associate extra data with DOM nodes or objects without preventing them from being garbage collected. WeakMap is commonly used to store private data for class instances and to cache computed values tied to object lifetimes.",
    },
    {
      q: "What is the difference between synchronous and asynchronous code?",
      a: "Synchronous code runs line by line and blocks execution — each line waits for the previous one to complete. Asynchronous code starts an operation and moves on immediately without waiting for the result. When the operation finishes, a callback, Promise, or async/await resumes the work. In a browser, synchronous code that takes too long freezes the entire UI because JavaScript is single-threaded.",
    },
    {
      q: "What is structural sharing in JavaScript?",
      a: "Structural sharing is an optimization used by immutable data libraries where unchanged parts of a data structure are reused by reference instead of copied. When you update one part of a large nested object, only the changed nodes are new — everything else points to the original. This makes immutable updates memory-efficient. Libraries like Immer and Immutable.js use this internally.",
    },
  ],

  interviewSummary:
    "JavaScript is single-threaded with async handled by the Event Loop, Web APIs, and task queues. var is function-scoped and hoisted as undefined. let and const are block-scoped with a TDZ. === always preferred over ==. Closures remember outer scope after the function returns — basis for private state, factories, and memoization. The Event Loop drains all microtasks before each macrotask — Promise.then always before setTimeout. Prototypal inheritance uses [[Prototype]] chain lookup. call and apply invoke immediately with custom this — bind returns a new function. Arrow functions have lexical this and cannot be constructors. map transforms, filter selects, reduce accumulates — none mutate the original. Debounce fires after user stops — throttle fires at most once per interval. Garbage collection uses Mark-and-Sweep — leaks happen from forgotten listeners, closures, and detached DOM nodes. Currying splits multi-argument functions into chains. Generators pause with yield and resume with next(). WeakMap and WeakSet hold weak references that allow garbage collection. Always implement map, bind, debounce, throttle, and a basic Promise if asked — these are the most common senior-level implementation questions.",
};
