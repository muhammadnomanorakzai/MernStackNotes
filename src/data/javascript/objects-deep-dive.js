export const objectsDeepDive = {
  id: "objects-deep-dive",
  title: "Objects - Deep Dive",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "objects",
    "shallow copy",
    "deep copy",
    "Object.freeze",
    "Object.keys",
    "Object.entries",
    "property descriptor",
    "structuredClone",
  ],

  definition:
    "A JavaScript object is a collection of key value pairs stored in the heap. Beyond the basics, objects have property descriptors, can be frozen or sealed, and need careful copy handling because they are reference types.",

  why:
    "Many state bugs come from misunderstanding object references. Developers often mutate shared nested objects by accident, confuse shallow and deep copies, or assume Object.freeze protects nested data when it does not.",

  how: [
    "Step 1 - Objects can be created with literals, Object.create, or constructors and classes",
    "Step 2 - Dot notation reads fixed keys while bracket notation reads dynamic keys",
    "Step 3 - Each property has writable, enumerable, and configurable descriptor flags",
    "Step 4 - Object.freeze prevents writes and redefinition on the top level only",
    "Step 5 - Object.seal prevents adding or deleting keys but allows changing existing writable values",
    "Step 6 - Spread and Object.assign create shallow copies so nested objects stay shared",
    "Step 7 - structuredClone creates a deep independent copy for modern plain data structures",
    "Step 8 - Object.keys, Object.values, Object.entries, and Object.fromEntries help transform objects cleanly",
  ],

  diagram: `
flowchart TD
  A[Original object] --> B[Stack holds reference]
  B --> C[Heap object with nested address]
  C --> D[Heap nested city object]
  A --> E[Shallow copy]
  E --> F[Top level copied]
  E --> G[Nested object still shared]
  A --> H[Deep copy]
  H --> I[All levels independent]
  G --> J[Mutating nested affects both]
  `,

  analogy:
    "A shallow copy is like photocopying a page that contains a note saying see folder A. The page is duplicated, but both copies still point to the same folder. A deep copy duplicates the page and also creates a brand new folder A, so future changes stay isolated.",

  code: `
const a = { name: "Ali", address: { city: "Karachi" } };
const b = a;
a.name = "Sara";
console.log(b.name); // Sara same reference

const shallow = { ...a };
shallow.address.city = "Lahore";
console.log(a.address.city); // Lahore nested object shared

const deep = structuredClone(a);
deep.address.city = "Islamabad";
console.log(a.address.city, deep.address.city); // Lahore Islamabad

const frozen = Object.freeze({ score: 10 });
// frozen.score = 20; // fails, throws in strict mode

const doubled = Object.fromEntries(
  Object.entries({ x: 1, y: 2 }).map(([k, v]) => [k, v * 2]),
);
console.log(doubled); // { x: 2, y: 4 }

const key = "name";
console.log(a[key], "toString" in a, a.hasOwnProperty("name"));
  `,

  interviewQA: [
    {
      q: "What is the difference between shallow copy and deep copy?",
      a: "A shallow copy clones only the first level of an object, so nested objects are still shared references. A deep copy duplicates every level so changes in the copy do not affect the original.",
    },
    {
      q: "What does Object.freeze do?",
      a: "Object.freeze makes top level properties non writable and non configurable, so you cannot add, delete, or reassign them. It is shallow, which means nested objects can still be mutated unless they are frozen too.",
    },
    {
      q: "What is the difference between dot notation and bracket notation?",
      a: "Dot notation is used when the property name is known and valid as an identifier. Bracket notation is used for dynamic keys, special characters, or numeric keys because it evaluates the expression inside the brackets first.",
    },
    {
      q: "How do you check if a key exists in an object?",
      a: "The in operator checks both own and inherited properties across the prototype chain. hasOwnProperty checks only the object's own properties, so it is stricter when inheritance matters.",
    },
  ],
};
