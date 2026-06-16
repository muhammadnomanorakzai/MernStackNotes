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
    "Array methods in JavaScript are built-in higher-order functions that operate on arrays using callback functions. They are used to transform, filter, search, and aggregate data in a declarative and functional programming style instead of using manual loops.",

  simpleExplanation:
    "JavaScript arrays come with powerful built-in methods that replace traditional loops.\n\nEach method has a specific responsibility and behaves differently:\n\n- map → transforms every element and returns a new array\n- filter → selects only elements that match a condition\n- reduce → converts all elements into a single value\n- find → returns the first matching element\n- forEach → runs code for each element (no return)\n- some → checks if at least one item passes a condition\n- every → checks if all items pass a condition\n- sort → arranges elements (mutates original array)\n- flat → removes nested array levels\n\nThese methods are heavily used in real-world applications like React, backend APIs, and data processing because they make code readable, predictable, and functional.",

  romanUrduRevision:
    "Array methods JavaScript mein built-in functions hotay hain jo arrays ko process karte hain.\n\nLoop likhnay ki jagah hum map, filter, reduce, find jaisay methods use karte hain.\n\nYeh code ko simple, readable aur professional bana dete hain.",

  why: "Array methods exist to make data processing easier, safer, and more readable. Instead of writing complex loops, developers can describe what they want in a clean way.\n\nThey also reduce bugs caused by manual iteration and mutation. In modern frameworks like React, immutability and clean transformations are extremely important, and array methods support this perfectly.",

  how: [
    "Step 1 - JavaScript arrays provide built-in higher order functions",
    "Step 2 - Each method receives a callback function",
    "Step 3 - Callback runs for each element based on method behavior",
    "Step 4 - Some methods return new arrays (map, filter)",
    "Step 5 - Some return single value (reduce, find)",
    "Step 6 - Some return boolean (some, every)",
    "Step 7 - Some mutate original array (sort, reverse)",
    "Step 8 - All methods simplify looping logic into declarative style",
  ],

  diagram: `
flowchart TD
  A[Array Input]

  A --> B[map → transform each item → new array]
  A --> C[filter → condition check → smaller array]
  A --> D[reduce → combine all → single value]
  A --> E[find → first match → single item]
  A --> F[forEach → side effects only]
  A --> G[some → at least one true]
  A --> H[every → all must be true]
  A --> I[sort → reorder original array]
  A --> J[flat → remove nesting]
`,

  realLifeExample:
    "Imagine a school student database system.\n\n- map → convert students into their names list\n- filter → select only students who passed exams\n- reduce → calculate total marks of class\n- find → search one specific student\n- some → check if any student failed\n- every → check if all students passed\n- sort → arrange students by marks\n\nEach method solves a real-world data problem efficiently.",

  analogy:
    "Think of an array as a classroom.\n\nmap is like a teacher updating every student's report card.\nfilter is removing students who failed.\nreduce is calculating total class score.\nfind is the teacher searching for one specific student.\nsome is checking if at least one student is absent.\nevery is checking if all students submitted homework.",

  code: `
const users = [
  { name: "Ali", age: 22, score: 88, active: true },
  { name: "Sara", age: 17, score: 95, active: false },
  { name: "Hamza", age: 25, score: 72, active: true },
  { name: "Zara", age: 19, score: 91, active: true },
];

// =========================
// map → transform each element
// =========================
const names = users.map((user) => user.name);
console.log(names);

// =========================
// filter → select matching elements
// =========================
const activeAdults = users.filter(
  (user) => user.active && user.age >= 18
);
console.log(activeAdults);

// =========================
// reduce → combine into single value
// =========================
const totalScore = users.reduce((sum, user) => {
  return sum + user.score;
}, 0);
console.log(totalScore);

// reduce → grouping example
const grouped = users.reduce((acc, user) => {
  (acc[user.active] ??= []).push(user);
  return acc;
}, {});
console.log(grouped);

// =========================
// find → first matching element
// =========================
const topStudent = users.find((user) => user.score > 90);
console.log(topStudent);

// =========================
// some → at least one match
// =========================
console.log(users.some((user) => user.score > 90));

// =========================
// every → all must match
// =========================
console.log(users.every((user) => user.age >= 18));

// =========================
// forEach → side effects only
// =========================
users.forEach((user) => console.log(user.name));

// =========================
// sort → MUTATES original array
// =========================
console.log([10, 9, 100].sort());
console.log([10, 9, 100].sort((a, b) => a - b));

// =========================
// flat → remove nesting
// =========================
console.log([1, [2, [3, 4]]].flat(2));
  `,

  commonMistakes: [
    "Thinking map modifies the original array",
    "Forgetting to return value inside reduce",
    "Assuming filter returns a single value",
    "Confusing find with filter",
    "Using sort without compare function for numbers",
    "Mutating state directly instead of using immutable methods",
    "Not understanding that forEach returns undefined",
  ],

  interviewQA: [
    {
      q: "What is map in JavaScript arrays?",
      a: "map is used to transform each element of an array and returns a new array with the same length.",
    },
    {
      q: "How does filter work?",
      a: "filter returns a new array containing only elements that satisfy a given condition.",
    },
    {
      q: "What is reduce used for?",
      a: "reduce is used to convert an array into a single value by applying a function to each element.",
    },
    {
      q: "Difference between find and filter?",
      a: "find returns the first matching element, while filter returns all matching elements.",
    },
    {
      q: "Does sort mutate array?",
      a: "Yes, sort changes the original array in place.",
    },
    {
      q: "Why are array methods important in React?",
      a: "They help maintain immutability and make UI rendering predictable using methods like map and filter.",
    },
  ],

  realWorldUsage: [
    "Rendering UI lists in React using map",
    "Filtering API responses before displaying data",
    "Calculating totals using reduce",
    "Searching records using find",
    "Validating data using some and every",
    "Transforming backend responses",
    "Data aggregation in dashboards",
    "Sorting and organizing UI data",
  ],

  interviewSummary: [
    "map → transforms data",
    "filter → selects data",
    "reduce → combines data into one value",
    "find → returns first match",
    "forEach → side effects only",
    "some → at least one true",
    "every → all must be true",
    "sort → mutates original array",
    "array methods are core to modern JavaScript",
  ],
};
