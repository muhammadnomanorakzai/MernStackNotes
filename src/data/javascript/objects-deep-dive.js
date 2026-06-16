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
    "A JavaScript object is a non-primitive data type that stores data in key-value pairs and is stored in the heap memory. Objects are reference types, which means variables do not hold the actual object but a reference to it. Because of this, copying and mutation behavior becomes very important in real applications.",

  simpleExplanation:
    "Objects in JavaScript are used to store structured data like user info, settings, or API responses.\n\nUnlike primitive values (like numbers or strings), objects are stored in memory by reference. This means if two variables point to the same object, changing one will also affect the other.\n\nObjects can also contain nested objects, methods, and special configurations like property descriptors. Because of this flexibility, objects are powerful but also a common source of bugs when developers accidentally mutate shared data or misunderstand copying behavior.",

  romanUrduRevision:
    "JavaScript objects key-value pairs hotay hain jo heap memory mein store hotay hain.\n\nImportant baat yeh hai ke object reference type hota hai, is liye ek variable change karo to dusra bhi affect ho sakta hai agar dono same object ko point kar rahe hon.",

  why: "Objects are one of the most important data structures in JavaScript. However, most real-world bugs come from misunderstanding how objects are stored and copied. Developers often accidentally mutate shared objects, misunderstand shallow vs deep copy, or assume Object.freeze protects nested data when it only works on the top level.",

  how: [
    "Step 1 - Objects are created using literals, constructors, or classes",
    "Step 2 - Variables store a reference, not the actual object",
    "Step 3 - Dot notation accesses fixed properties, bracket notation supports dynamic keys",
    "Step 4 - Each property has descriptors like writable, enumerable, configurable",
    "Step 5 - Object.freeze makes top-level properties immutable (shallow freeze)",
    "Step 6 - Object.seal allows modification but prevents adding/removing keys",
    "Step 7 - Spread operator and Object.assign create shallow copies",
    "Step 8 - structuredClone creates deep copies for independent nested data",
    "Step 9 - Nested objects still share reference in shallow copy",
  ],

  diagram: `
flowchart TD
  A[Object in JS]

  A --> B[Stack Reference]
  B --> C[Heap Object]

  C --> D[Nested Object in Heap]

  A --> E[Shallow Copy]
  E --> F[New top-level object]
  E --> G[Shared nested reference]

  A --> H[Deep Copy]
  H --> I[Completely new object tree]

  G --> J[Mutation affects original]
  I --> K[No shared mutation]

  C --> L[Property Descriptors]
  L --> M[writable enumerable configurable]
  `,

  realLifeExample:
    "Imagine a Google Form response sheet. Each response is an object.\nIf two people accidentally reference the same sheet, changing one response will change the other.\nBut if each response is independently copied (deep copy), then updates remain isolated and safe.",

  analogy:
    "A shallow copy is like photocopying a document that still references the same original images folder. If you change an image in the folder, both copies are affected.\nA deep copy is like duplicating both the document and all its images into a completely new folder, so changes do not affect the original.",

  code: `
const user = { name: "Ali", address: { city: "Karachi" } };

// Reference copy
const ref = user;
ref.name = "Sara";
console.log(user.name); // Sara (same reference)

// Shallow copy
const shallow = { ...user };
shallow.address.city = "Lahore";
console.log(user.address.city); // Lahore (nested shared)

// Deep copy
const deep = structuredClone(user);
deep.address.city = "Islamabad";
console.log(user.address.city, deep.address.city);

// Object.freeze (shallow protection)
const frozen = Object.freeze({ score: 10 });
// frozen.score = 20; // fails in strict mode

// Object.entries transformation
const obj = { x: 1, y: 2 };
const doubled = Object.fromEntries(
  Object.entries(obj).map(([k, v]) => [k, v * 2])
);
console.log(doubled);

// Property access types
const key = "name";
console.log(user[key]);
console.log("name" in user);
console.log(user.hasOwnProperty("name"));
  `,

  commonMistakes: [
    "Assuming objects are copied by value instead of reference",
    "Thinking spread operator creates a deep copy",
    "Forgetting nested objects are still shared in shallow copy",
    "Assuming Object.freeze also freezes nested objects",
    "Using in operator without understanding prototype chain",
    "Mutating shared state in applications unintentionally",
    "Not using structuredClone or deep copy when needed",
  ],

  interviewQA: [
    {
      q: "What is an object in JavaScript?",
      a: "An object is a reference data type that stores data in key-value pairs and is stored in heap memory. Variables store references to the object, not the actual object.",
    },
    {
      q: "What is the difference between shallow copy and deep copy?",
      a: "A shallow copy copies only the first level of an object, so nested objects are still shared. A deep copy duplicates all levels, making the copy fully independent.",
    },
    {
      q: "Does spread operator create a deep copy?",
      a: "No, spread operator creates only a shallow copy. Nested objects are still shared by reference.",
    },
    {
      q: "What does Object.freeze do?",
      a: "It makes an object immutable at the top level by preventing adding, deleting, or modifying properties, but it does not freeze nested objects.",
    },
    {
      q: "What is the difference between in and hasOwnProperty?",
      a: "The in operator checks both own and inherited properties, while hasOwnProperty checks only the object's own properties.",
    },
  ],

  realWorldUsage: [
    "API response handling",
    "State management in React and frontend apps",
    "Configuration objects in applications",
    "Data transformation using Object.entries",
    "Immutable data patterns in modern JavaScript",
    "Form data handling",
    "Database-like structured data in frontend apps",
  ],

  interviewSummary: [
    "Objects are reference types stored in heap memory.",
    "Variables store references, not actual objects.",
    "Shallow copy shares nested references.",
    "Deep copy creates independent object structures.",
    "Spread operator is shallow copy only.",
    "Object.freeze is also shallow.",
    "Objects are core to real-world JavaScript applications.",
  ],
};
