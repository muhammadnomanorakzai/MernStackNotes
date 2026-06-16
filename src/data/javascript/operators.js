export const operators = {
  id: "operators",
  title: "Modern Operators (Spread, Rest, Optional Chaining, Nullish)",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: [
    "spread",
    "rest",
    "optional chaining",
    "nullish coalescing",
    "nullish assignment",
    "?.",
    "??",
    "...",
    "ES2020",
  ],

  definition:
    "Modern JavaScript operators help developers write cleaner, shorter, and safer code. Spread expands values, Rest collects values, Optional Chaining safely accesses nested properties, and Nullish Coalescing provides default values only when a value is truly missing.",

  simpleExplanation:
    "As JavaScript applications became larger, developers frequently faced repetitive tasks such as copying arrays, merging objects, checking deeply nested properties, and setting default values.\n\nBefore modern operators existed, these tasks required a lot of extra code. Developers had to write loops for copying arrays, Object.assign for merging objects, multiple if statements for safety checks, and complicated conditions for defaults.\n\nModern JavaScript introduced several powerful operators that solve these problems elegantly.\n\nThe Spread Operator (...) expands values outwards. The Rest Operator (...) collects values into a single container. Optional Chaining (?.) safely accesses nested properties without crashing. Nullish Coalescing (??) provides default values only when a value is null or undefined.\n\nThese operators are used extensively in React, Next.js, Node.js, API development, state management, and modern JavaScript applications.",

  romanUrduRevision:
    "Spread data ko phailata hai, Rest data ko collect karta hai, Optional Chaining crash se bachati hai aur Nullish Coalescing sirf null ya undefined par default value deti hai.\nInterview mein sab se zyada confusion Spread vs Rest aur || vs ?? par hoti hai.",

  why: "Before these operators, developers wrote repetitive and error-prone code. Modern operators reduce boilerplate, improve readability, and prevent common runtime errors such as trying to access properties on undefined values.",

  how: [
    "Step 1 - Spread (...) expands arrays or objects into individual values",
    "Step 2 - Spread is commonly used for copying and merging data",
    "Step 3 - Rest (...) collects remaining values into a single array or object",
    "Step 4 - Rest is commonly used in function parameters and destructuring",
    "Step 5 - Optional Chaining (?.) safely accesses nested properties",
    "Step 6 - Optional Chaining returns undefined instead of throwing an error",
    "Step 7 - Nullish Coalescing (??) provides a default only when the value is null or undefined",
    "Step 8 - Nullish Assignment (??=) assigns a default value only when necessary",
  ],

  diagram: `
flowchart TD

  A[Modern Operators]

  A --> B[Spread Operator ...]
  B --> C[Copy Arrays]
  B --> D[Merge Arrays]
  B --> E[Merge Objects]
  B --> F[Pass Function Arguments]

  A --> G[Rest Operator ...]
  G --> H[Collect Function Arguments]
  G --> I[Collect Remaining Properties]

  A --> J[Optional Chaining ?.]
  J --> K[Check user]
  K --> L[Check address]
  L --> M[Return city]
  K --> N[Return undefined safely]

  A --> O[Nullish Coalescing ??]
  O --> P[null]
  O --> Q[undefined]
  O --> R[Use Default Value]

  O --> S[0]
  O --> T[false]
  O --> U[Empty String]
  O --> V[Keep Original Value]
  `,

  realLifeExample:
    "Imagine a company office. Spread is like taking documents out of a folder and placing them on a table individually. Rest is like gathering scattered documents and putting them into a folder. Optional Chaining is like checking whether each office room exists before entering it. Nullish Coalescing is like assigning a backup employee only when no employee is assigned at all.",

  analogy:
    "Optional Chaining is like checking whether each door exists before walking through it. If a door is missing, you stop safely instead of crashing into a wall. Nullish Coalescing is a smart backup system that only activates when something is truly missing, not when the value is 0, false, or an empty string.",

  code: `
// ====================================
// SPREAD OPERATOR (...)
// ====================================

const numbers = [1, 2, 3];

const copiedNumbers = [...numbers];

console.log(copiedNumbers);
// [1, 2, 3]

// Merge Arrays

const arr1 = [1, 2];
const arr2 = [3, 4];

const merged = [...arr1, ...arr2];

console.log(merged);
// [1, 2, 3, 4]

// Function Arguments

console.log(Math.max(...numbers));
// 3

// Merge Objects

const user = {
  name: "Ali"
};

const details = {
  age: 21
};

const mergedUser = {
  ...user,
  ...details
};

console.log(mergedUser);

// ====================================
// REST OPERATOR (...)
// ====================================

function collect(first, ...others) {
  console.log(first);
  console.log(others);
}

collect("A", "B", "C", "D");

// A
// ["B", "C", "D"]

// Object Destructuring

const profile = {
  name: "Ali",
  age: 21,
  city: "Karachi"
};

const { name, ...rest } = profile;

console.log(name);
console.log(rest);

// ====================================
// OPTIONAL CHAINING
// ====================================

const person = {
  name: "Sara"
};

console.log(person?.address?.city);
// undefined

// Without Optional Chaining
// person.address.city
// TypeError

// Safe Method Call

person?.save?.();

// ====================================
// NULLISH COALESCING
// ====================================

console.log(null ?? "Default");
// Default

console.log(undefined ?? "Default");
// Default

console.log(0 ?? "Default");
// 0

console.log(false ?? "Default");
// false

console.log("" ?? "Default");
// ""

// ====================================
// LOGICAL OR VS NULLISH
// ====================================

console.log(0 || "Default");
// Default

console.log(0 ?? "Default");
// 0

console.log("" || "Default");
// Default

console.log("" ?? "Default");
// ""

// ====================================
// NULLISH ASSIGNMENT
// ====================================

let theme = null;

theme ??= "dark";

console.log(theme);
// dark
  `,

  commonMistakes: [
    "Thinking Spread creates a deep copy. It only creates a shallow copy.",
    "Confusing Spread and Rest because both use three dots (...).",
    "Using || instead of ?? when 0 or empty string are valid values.",
    "Assuming Optional Chaining returns false. It returns undefined.",
    "Forgetting that nested objects are still shared when using Spread.",
    "Using Optional Chaining on variables that were never declared.",
  ],

  interviewQA: [
    {
      q: "What is the difference between Spread and Rest operators?",
      a: "Both use three dots (...), but Spread expands values while Rest collects values. Spread takes data out, whereas Rest gathers data in.",
    },

    {
      q: "Does Spread create a deep copy?",
      a: "No. Spread creates only a shallow copy. Nested objects and arrays still share references.",
    },

    {
      q: "What is Optional Chaining?",
      a: "Optional Chaining safely accesses nested properties and methods. If a property is missing, it returns undefined instead of throwing a TypeError.",
    },

    {
      q: "What is the difference between || and ?? ?",
      a: "Logical OR (||) treats all falsy values as missing. Nullish Coalescing (??) only treats null and undefined as missing.",
    },

    {
      q: "Why is ?? safer than || for default values?",
      a: "Because values like 0, false, and empty strings are valid values and should not be replaced by defaults.",
    },

    {
      q: "Can Optional Chaining be used with function calls?",
      a: "Yes. Using method?.() safely calls a method only if it exists.",
    },

    {
      q: "When is Spread commonly used in React?",
      a: "Spread is frequently used to update state, copy arrays, merge objects, and pass props.",
    },

    {
      q: "When is Rest commonly used?",
      a: "Rest is commonly used in function parameters, destructuring, utility functions, and reusable components.",
    },
  ],

  interviewSummary: [
    "Spread expands values.",
    "Rest collects values.",
    "Both use three dots (...).",
    "Spread creates only a shallow copy.",
    "Optional Chaining prevents TypeError crashes.",
    "Optional Chaining returns undefined when a path is missing.",
    "Nullish Coalescing only checks for null and undefined.",
    "0, false, and empty strings are preserved by ??.",
    "React projects use Spread and Optional Chaining heavily.",
  ],
};
