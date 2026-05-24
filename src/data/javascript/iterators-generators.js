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
    "An iterator is an object with a next method that returns value and done pairs. A generator is a special function that can pause with yield and resume later, producing values lazily one by one.",

  why:
    "Iterators and generators make lazy evaluation possible. Instead of building huge arrays up front, code can produce values only when needed, which saves memory and enables elegant infinite sequences and custom iteration behavior.",

  how: [
    "Step 1 - An iterable provides a Symbol.iterator method",
    "Step 2 - That method returns an iterator object with next",
    "Step 3 - Each next call returns a value and done pair",
    "Step 4 - for of keeps calling next until done becomes true",
    "Step 5 - A generator function is declared with function star syntax",
    "Step 6 - Calling a generator returns a generator object without running the whole body",
    "Step 7 - yield pauses execution and hands a value back to the caller",
    "Step 8 - The next next call resumes from the paused point",
  ],

  diagram: `
sequenceDiagram
  participant Caller
  participant Generator
  Caller->>Generator: next()
  Generator-->>Caller: value 1 done false
  Caller->>Generator: next()
  Generator-->>Caller: value 2 done false
  Caller->>Generator: next()
  Generator-->>Caller: done true
  `,

  analogy:
    "A generator is like a book with a bookmark. You read until a bookmark point, close the book, and later continue from exactly that page. A normal function is like reading the whole book in one sitting with no pause points.",

  code: `
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}
const gen = numbers();
console.log(gen.next(), gen.next(), gen.next(), gen.next());

for (const n of numbers()) console.log(n);

function* naturals() { let n = 1; while (true) yield n++; }
const infinite = naturals();
console.log(infinite.next().value, infinite.next().value, infinite.next().value, infinite.next().value, infinite.next().value);

const range = {
  from: 1, to: 3,
  [Symbol.iterator]() {
    let current = this.from;
    return { next: () => ({ value: current, done: current++ > this.to }) };
  },
};
for (const value of range) console.log(value);
  `,

  interviewQA: [
    {
      q: "What is a generator function?",
      a: "A generator function uses function star syntax and returns a generator object. Each call to next runs the function until the next yield, returns that value, and pauses execution for later resumption.",
    },
    {
      q: "What is lazy evaluation and why is it useful?",
      a: "Lazy evaluation means values are produced only when requested instead of all at once. That saves memory, makes huge or infinite sequences practical, and fits stream like workflows very well.",
    },
    {
      q: "How are generators related to async await?",
      a: "Both rely on the same pause and resume idea. Generators pause at yield, while async functions pause at await and resume when the promise settles, giving similar control flow in a friendlier syntax.",
    },
  ],
};
