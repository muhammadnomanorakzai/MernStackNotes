export const arrayMethods = {
  id: "array-methods",
  title: "Array Methods - map, filter, reduce, find & more",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "map",
    "filter",
    "reduce",
    "find",
    "forEach",
    "some",
    "every",
    "flat",
    "sort",
    "functional programming",
    "immutable",
  ],

  definition:
    "JavaScript arrays provide higher order methods that accept callback functions. The core ones like map, filter, reduce, and find make code more declarative and often replace manual loops.",

  why:
    "Array methods describe what you want instead of spelling out every loop step. That usually makes code shorter, easier to read, safer for React state updates, and easier to chain together.",

  how: [
    "Step 1 - forEach visits each item for side effects and returns undefined",
    "Step 2 - map transforms every element and returns a new array of the same length",
    "Step 3 - filter keeps only elements whose callback returns truthy",
    "Step 4 - reduce combines all elements into one final value",
    "Step 5 - find returns the first matching element and stops early",
    "Step 6 - some checks whether at least one element passes",
    "Step 7 - every checks whether all elements pass",
    "Step 8 - sort mutates the original array and needs a compare function for numbers",
  ],

  diagram: `
flowchart TD
  A[Input users array] --> B[map transforms every item]
  A --> C[filter keeps matching items]
  A --> D[reduce combines to one value]
  A --> E[find stops at first match]
  B --> F[Same length new array]
  C --> G[Fewer items new array]
  D --> H[Single result]
  E --> I[First match or undefined]
  `,

  analogy:
    "Imagine a factory line of products. map repaints every product, filter removes the failed ones, reduce builds a final summary report, and find is a manager who grabs the first matching product and stops walking the line.",

  code: `
const users = [
  { name: "Ali", age: 22, score: 88, active: true },
  { name: "Sara", age: 17, score: 95, active: false },
  { name: "Hamza", age: 25, score: 72, active: true },
  { name: "Zara", age: 19, score: 91, active: true },
];

console.log(users.map((u) => u.name));
console.log(users.filter((u) => u.active && u.age >= 18));
console.log(users.reduce((sum, u) => sum + u.score, 0));
console.log(users.reduce((acc, u) => ((acc[u.active] ??= []).push(u), acc), {}));
console.log(users.find((u) => u.score > 90));
console.log(users.some((u) => u.score > 90), users.every((u) => u.age >= 18));
console.log(users.filter((u) => u.active).map((u) => u.name).sort());
console.log([10, 9, 100].sort(), [10, 9, 100].sort((a, b) => a - b));
  `,

  interviewQA: [
    {
      q: "What is the difference between map and forEach?",
      a: "map returns a new transformed array and is meant for producing output. forEach returns undefined and is used for side effects like logging or mutating something outside the loop.",
    },
    {
      q: "How does reduce work? Give an example.",
      a: "reduce carries an accumulator through the array. Each callback return becomes the accumulator for the next step, so it can build sums, objects, strings, or any other final result.",
    },
    {
      q: "What is the difference between find and filter?",
      a: "find returns the first matching element itself and stops searching. filter returns a new array of all matching elements, even if that result is empty.",
    },
    {
      q: "Does map mutate the original array?",
      a: "No. map returns a new array and leaves the original untouched. Mutation happens with methods like sort, reverse, splice, push, and pop.",
    },
    {
      q: "How would you use these methods in a React component?",
      a: "map is commonly used to render lists of JSX, filter narrows down visible items, and reduce computes derived values like totals or grouped data. Their non mutating style fits React state updates well.",
    },
  ],
};
