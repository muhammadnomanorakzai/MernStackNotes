export const symbolsWeakmap = {
  id: "symbols-weakmap",
  title: "Symbols, WeakMap & WeakSet",
  category: "JavaScript",
  difficulty: "Advanced",
  tags: [
    "Symbol",
    "unique key",
    "WeakMap",
    "WeakSet",
    "private property",
    "garbage collection",
    "well-known symbols",
    "Symbol.iterator",
  ],

  definition:
    "Symbol is a primitive that creates guaranteed unique values. WeakMap and WeakSet store object references weakly, allowing garbage collection when those objects are no longer referenced elsewhere.",

  simpleExplanation:
    "Symbol ek unique ID ki tarah hai. Do symbols kabhi barabar nahi hote. WeakMap/WeakSet objects ko 'weakly' hold karte hain, taake jab object use na ho raha ho to memory se delete ho jaye.",

  romanUrduRevision:
    "Symbol unique values create karta hai jo collision nahi hone dete. WeakMap memory management ke liye best hai kyunke ye unused objects ko automatically discard hone deta hai.",

  realLifeExample:
    "Imagine a library (WeakMap) that only tracks books currently being read. As soon as a reader (Object) returns all their books and goes home (deleted from memory), the library automatically deletes their tracking record. There's no need for a manual cleanup.",

  why:
    "Symbols avoid property name collisions in shared objects and libraries. WeakMap and WeakSet let you attach metadata or track objects without accidentally keeping them alive forever.",

  how: [
    "Step 1 - Symbol creates a unique primitive value even with the same description",
    "Step 2 - Symbol descriptions are only debug labels",
    "Step 3 - Symbol keys are skipped by Object.keys, for in, and JSON.stringify",
    "Step 4 - Object.getOwnPropertySymbols retrieves symbol keys",
    "Step 5 - Symbol.for uses a global registry and returns the same shared symbol for the same key",
    "Step 6 - Well known symbols customize language behavior such as iteration",
    "Step 7 - WeakMap keys must be objects and are held weakly",
    "Step 8 - WeakSet stores objects weakly and is useful for tracking processed objects",
  ],

  diagram: `
flowchart TD
  A[Symbol id] --> B[Unique value one]
  C[Symbol id] --> D[Unique value two]
  B --> E[Comparison false]
  D --> E
  F[Map key] --> G[Strong reference prevents collection]
  H[WeakMap key] --> I[Weak reference allows collection]
  I --> J[Entry auto removed]
  `,

  analogy:
    "A Symbol is like a unique wristband number at an event. Two people can have the same name, but their wristbands are still different. A WeakMap is like a note attached to an object: when the object is gone, the note disappears with it instead of keeping the object around.",

  code: `
const s1 = Symbol("id");
const s2 = Symbol("id");
console.log(s1 === s2); // false
console.log(typeof s1, s1.description); // symbol id

const KEY = Symbol("privateKey");
const obj = { name: "Ali", [KEY]: "secret value" };
console.log(Object.keys(obj)); // ["name"]
console.log(JSON.stringify(obj)); // {"name":"Ali"}
console.log(obj[KEY]); // secret value

const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return { next: () => current <= last ? { value: current++, done: false } : { done: true } };
  },
};
console.log([...range]);

const privateData = new WeakMap();
class BankAccount {
  constructor(balance) { privateData.set(this, { balance }); }
  deposit(amount) { privateData.get(this).balance += amount; }
  getBalance() { return privateData.get(this).balance; }
}
console.log(Symbol.for("app:role") === Symbol.for("app:role")); // true
  `,

  interviewQA: [
    {
      q: "What is a Symbol and why would you use it?",
      a: "A Symbol is a primitive that creates a guaranteed unique value. Use it for collision-proof object keys, private-like properties, and well-known protocols like Symbol.iterator.",
    },
    {
      q: "What is the difference between WeakMap and Map?",
      a: "Map holds strong references to keys, which can prevent garbage collection. WeakMap keys are weakly referenced object keys, so entries disappear automatically when the key object is no longer reachable elsewhere.",
    },
    {
      q: "Can you iterate over a WeakMap?",
      a: "No. WeakMap and WeakSet are intentionally non-iterable and have no size because garbage collection can remove entries at any time.",
    },
  ],

  commonMistakes: [
    "Thinking Symbol() creates an object (it's a primitive).",
    "Trying to use a string or number as a key in a WeakMap (must be an object).",
    "Iterating over a WeakMap (not possible).",
  ],

  interviewSummary:
    "Symbols provide unique property keys to prevent collisions. WeakMap and WeakSet are key for memory management as they allow objects to be garbage collected when no longer in use.",
};
