export const iteratorsGenerators = {
  id: "iterators-generators",
  title: "Iterators & Generators",
  category: "JavaScript",
  difficulty: "Advanced",
  tags: [
    "iterator",
    "generator",
    "Symbol.iterator",
    "yield",
    "lazy evaluation",
    "for...of",
    "function*",
    "infinite sequence",
  ],

  definition:
    "Iterators are objects that define a standard way to traverse data structures using a next() method that returns { value, done }. Generators are special functions (function*) that can pause execution using yield and resume later, producing values lazily instead of all at once.",

  simpleExplanation:
    "In JavaScript, not all data is consumed in the same way.\n\nSometimes you want to loop through values one by one instead of creating a full array in memory.\n\nIterators give you a standard way to step through values using next().\n\nGenerators make this even easier by letting you write a function that can pause and resume execution using yield.\n\nThis is called lazy evaluation — values are generated only when needed, not all at once.\n\nThis is extremely useful for large datasets, infinite sequences, and performance optimization.",

  romanUrduRevision:
    "Iterator ek aisa object hota hai jo next() function ke zariye values ko ek ek karke return karta hai.\n\nGenerator ek special function hota hai jo yield ke through ruk sakta hai aur baad mein resume ho sakta hai.\n\nIs se values lazy way mein generate hoti hain, yani jab zarurat ho tab hi.",

  why: "Iterators and generators exist to give developers fine control over how data is produced and consumed.\n\nInstead of loading large arrays into memory, you can generate values step-by-step.\n\nThis improves performance, reduces memory usage, and allows infinite or dynamic sequences that would otherwise be impossible with normal arrays.",

  how: [
    "Step 1 - An iterable object implements Symbol.iterator method",
    "Step 2 - Symbol.iterator returns an iterator object",
    "Step 3 - Iterator has a next() method returning { value, done }",
    "Step 4 - for...of automatically uses this iterator behind the scenes",
    "Step 5 - Generator functions are defined using function* syntax",
    "Step 6 - Calling a generator returns a generator object (not executed fully)",
    "Step 7 - yield pauses execution and returns a value",
    "Step 8 - next() resumes execution from last yield position",
    "Step 9 - Execution continues until done: true",
  ],

  diagram: `
sequenceDiagram
  participant Caller
  participant Generator

  Caller->>Generator: next()
  Generator-->>Caller: value: 1, done: false

  Caller->>Generator: next()
  Generator-->>Caller: value: 2, done: false

  Caller->>Generator: next()
  Generator-->>Caller: value: 3, done: false

  Caller->>Generator: next()
  Generator-->>Caller: done: true
`,

  realLifeExample:
    "Imagine a food delivery kitchen.\n\nInstead of preparing all orders at once and storing them, the kitchen prepares one order at a time when the delivery rider arrives.\n\nIterators work the same way — values are delivered one by one when requested instead of preparing everything in advance.",

  analogy:
    "A generator is like watching a web series.\n\nYou don’t watch all episodes at once.\nYou watch one episode, stop, and later continue from where you left off.\n\nyield is the pause button, and next() is the play button.",

  code: `
// =========================
// BASIC GENERATOR
// =========================

function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numbers();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// =========================
// USING for...of (auto iteration)
// =========================

for (const num of numbers()) {
  console.log(num);
}

// =========================
// INFINITE GENERATOR (LAZY EVALUATION)
// =========================

function* naturals() {
  let n = 1;

  while (true) {
    yield n++;
  }
}

const infinite = naturals();

console.log(infinite.next().value);
console.log(infinite.next().value);
console.log(infinite.next().value);

// =========================
// CUSTOM ITERATOR USING Symbol.iterator
// =========================

const range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    let current = this.from;

    return {
      next: () => {
        if (current <= this.to) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

for (const value of range) {
  console.log(value);
}
  `,

  commonMistakes: [
    "Thinking generator executes fully when called",
    "Forgetting that next() controls execution step-by-step",
    "Confusing iterator and iterable concepts",
    "Using infinite generators without limits",
    "Not understanding that for...of uses Symbol.iterator internally",
    "Expecting generator to behave like normal function",
    "Returning instead of yield inside generator logic",
  ],

  interviewQA: [
    {
      q: "What is an iterator in JavaScript?",
      a: "An iterator is an object that implements a next() method returning { value, done }, used to traverse a sequence of values step by step.",
    },
    {
      q: "What is a generator function?",
      a: "A generator is a special function defined with function* that can pause execution using yield and resume later using next().",
    },
    {
      q: "What is lazy evaluation?",
      a: "Lazy evaluation means values are generated only when needed instead of being computed all at once, improving performance and memory usage.",
    },
    {
      q: "How does for...of work internally?",
      a: "for...of uses the Symbol.iterator method of an object to get an iterator and repeatedly calls next() until done is true.",
    },
    {
      q: "Difference between iterator and generator?",
      a: "An iterator is a manual object with next(), while a generator is a function that automatically creates an iterator using yield syntax.",
    },
  ],

  realWorldUsage: [
    "Streaming large datasets",
    "Pagination handling (API results)",
    "Infinite sequences (IDs, counters)",
    "Custom data structures iteration",
    "React lazy rendering patterns",
    "File reading streams concept",
    "Game loops and simulations",
    "Performance optimized data processing",
  ],

  interviewSummary: [
    "Iterators provide step-by-step traversal using next().",
    "Generators simplify iterator creation using function*.",
    "yield pauses execution and resumes later.",
    "Lazy evaluation improves performance and memory usage.",
    "for...of uses Symbol.iterator internally.",
    "Generators can create infinite sequences.",
    "Core concept for advanced JavaScript control flow.",
  ],
};
