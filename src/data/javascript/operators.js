export const operators = {
  id: "operators",
  title: "Modern Operators (Spread, Rest, Optional Chaining, Nullish)",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: ["spread", "rest", "optional chaining", "nullish coalescing", "?.", "??", "...", "ES2020"],

  definition:
    "Modern JavaScript operators make code shorter and safer. Spread expands values, rest collects them, optional chaining safely walks nested data, and nullish coalescing provides defaults only for null or undefined.",

  why:
    "Before these operators, developers wrote repetitive copy logic, long nested safety checks, and error-prone default value code. These operators remove boilerplate and prevent common runtime crashes like trying to read properties from undefined.",

  how: [
    "Step 1 - Spread unpacks arrays or objects into individual elements or properties",
    "Step 2 - Spread can copy arrays and merge objects, but only shallowly",
    "Step 3 - Rest gathers leftover arguments or properties into one array or object",
    "Step 4 - Optional chaining safely stops and returns undefined if a link is missing",
    "Step 5 - Optional chaining can also guard method calls without crashing",
    "Step 6 - Nullish coalescing returns a default only for null or undefined",
    "Step 7 - Nullish assignment sets a default only when a variable is truly missing",
  ],

  diagram: `
flowchart TD
  A[Spread] --> B[merge arrays and objects]
  A --> C[unpack array into function args]
  D[Rest] --> E[collect remaining args into array]
  D --> F[collect remaining properties]
  G[Optional Chaining] --> H[check user]
  H --> I[check address]
  I --> J[return city]
  H --> K[missing part return undefined]
  G --> K
  L[Nullish Coalescing] --> M[value 0]
  M --> N[value or default gives default]
  M --> O[value nullish default keeps 0]
  `,

  analogy:
    "Optional chaining is like checking whether each door exists before trying to walk through it. If any door is missing, you stop safely instead of crashing into a wall. Nullish coalescing is a careful safety net that only catches truly missing values like null and undefined. It does not grab valid values like zero, false, or an empty string.",

  code: `
const numbers = [1, 2, 3];
const copy = [...numbers];
const merged = { role: "user", active: true, role: "admin" };
console.log(copy, Math.max(...numbers));

const profile = { name: "Ali", city: "Karachi" };
const extra = { city: "Lahore", age: 21 };
console.log({ ...profile, ...extra }); // later keys win

function collect(first, ...args) {
  console.log(first, args.length, args);
}
collect("start", 10, 20, 30);

const user = { name: "Sara", age: 20, country: "PK" };
const { name, ...rest } = user;
console.log(name, rest);

console.log(user?.address?.city);
console.log(user?.getName?.());

console.log(0 || "default", 0 ?? "default");
console.log("" || "default", "" ?? "default");

let theme = null;
theme ??= "dark";
console.log(theme);
  `,

  interviewQA: [
    {
      q: "What is the difference between spread and rest operators?",
      a: "They use the same three dots but do opposite jobs. Spread expands an array or object outward into individual items or properties, while rest collects remaining items into a single array or object.",
    },
    {
      q: "What does optional chaining do?",
      a: "Optional chaining safely reads nested properties or calls methods on values that might be null or undefined. Instead of throwing a TypeError, it stops early and returns undefined.",
    },
    {
      q: "What is the difference between nullish coalescing and logical or?",
      a: "Logical or falls back on any falsy value, including zero, false, and empty string. Nullish coalescing falls back only when the left side is null or undefined, which makes it safer when zero or empty string are valid values.",
    },
    {
      q: "How do you merge two objects using spread?",
      a: "You can write const merged equals spread object one and spread object two. Properties from the second object overwrite matching keys from the first, and the merge is shallow rather than deep.",
    },
  ],
};
