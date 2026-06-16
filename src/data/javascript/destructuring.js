export const destructuring = {
  id: "destructuring",
  title: "Destructuring - Array & Object",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "destructuring",
    "array destructuring",
    "object destructuring",
    "default values",
    "renaming",
    "nested",
    "rest",
    "function params",
  ],

  definition:
    "Destructuring is an ES6 feature that allows you to extract values from arrays or properties from objects into separate variables using a clean and readable syntax. Instead of accessing values repeatedly using indexes or keys, you unpack them in one step.",

  simpleExplanation:
    "Destructuring is a shortcut for extracting values from arrays or objects.\n\nNormally you would write user.name or user.age again and again, but with destructuring you can pull those values out once and use them directly.\n\nArray destructuring works by position (index order), while object destructuring works by matching property names.\n\nIt is heavily used in React, APIs, and modern JavaScript because it reduces repetitive code and makes data handling cleaner and more readable.",

  romanUrduRevision:
    "Destructuring ka matlab hai array ya object ke andar se values ko direct variables mein nikal lena.\n\nObject mein name match hota hai aur array mein position (index) match hota hai.\n\nIs se code short aur clean ho jata hai.",

  why: "Destructuring exists to make data extraction simple, readable, and less repetitive. In real applications, data often comes in nested objects (like API responses). Without destructuring, code becomes long and harder to maintain. With destructuring, developers can quickly extract only what they need.",

  how: [
    "Step 1 - JavaScript evaluates the right-hand side value (array or object)",
    "Step 2 - Object destructuring matches property names",
    "Step 3 - Array destructuring assigns values based on index position",
    "Step 4 - You can rename variables using colon syntax in objects",
    "Step 5 - Default values are used when value is undefined",
    "Step 6 - Nested destructuring extracts deep values in one step",
    "Step 7 - Rest operator collects remaining properties or elements",
    "Step 8 - Destructuring also works in function parameters",
    "Step 9 - React and API responses heavily rely on destructuring",
  ],

  diagram: `
flowchart TD
  A[Source Data]

  A --> B[Object Destructuring]
  A --> C[Array Destructuring]

  B --> B1[Match by key name]
  B1 --> B2[Variables created]

  C --> C1[Match by index position]
  C1 --> C2[Variables created]

  B2 --> D[Renaming / Default / Rest]
  C2 --> D
`,

  realLifeExample:
    "Imagine receiving a large API response from a server.\n\nInstead of writing response.data.user.name every time, you destructure it once and directly use name.\n\nThis makes code cleaner and easier to read, especially in large applications like dashboards or React apps.",

  analogy:
    "Destructuring is like unpacking a delivery box.\n\nInstead of opening the box every time you need something, you take items out once and place them in separate drawers.\n\nArray destructuring is like taking items in order from a line of boxes.\nObject destructuring is like taking labeled items from a box.",

  code: `
// =========================
// OBJECT DESTRUCTURING
// =========================

const user = {
  name: "Ali",
  age: 25,
  address: {
    city: "Karachi",
    zip: 123
  }
};

// basic destructuring
const { name, age } = user;

// renaming variables
const { name: userName, age: userAge } = user;

// default values
const { role = "student" } = user;

// nested destructuring
const { address: { city } } = user;

// rest operator
const { name: firstName, ...rest } = user;

console.log(firstName, rest, city);

// =========================
// ARRAY DESTRUCTURING
// =========================

const numbers = [10, 20, 30, 40];

// position based extraction
const [first, second, third] = numbers;

// skipping values
const [a, , c] = numbers;

// swapping variables
let x = 1;
let y = 2;
[x, y] = [y, x];

console.log(x, y);

// =========================
// FUNCTION PARAMETER DESTRUCTURING
// =========================

function greet({ title = "Guest", year = 2026 }) {
  return title + " " + year;
}

console.log(greet({ title: "Developer" }));

// =========================
// REAL API RESPONSE
// =========================

const response = {
  data: { id: 1, name: "Ali" },
  status: 200,
  error: null
};

const { data, status, error } = response;

console.log(data, status, error);
  `,

  commonMistakes: [
    "Confusing array index order with object key matching",
    "Trying to destructure undefined or null values",
    "Forgetting default values only work for undefined",
    "Using wrong property names in object destructuring",
    "Assuming destructuring creates a deep copy",
    "Over-destructuring nested objects making code hard to read",
    "Forgetting parentheses in some destructuring assignments",
  ],

  interviewQA: [
    {
      q: "What is destructuring in JavaScript?",
      a: "Destructuring is a syntax that allows unpacking values from arrays or objects into individual variables.",
    },
    {
      q: "What is the difference between array and object destructuring?",
      a: "Array destructuring is position-based, while object destructuring is name-based.",
    },
    {
      q: "Can you rename variables in object destructuring?",
      a: "Yes, you can use colon syntax like const { name: userName } = obj.",
    },
    {
      q: "What happens if a property does not exist?",
      a: "The value becomes undefined unless a default value is provided.",
    },
    {
      q: "Where is destructuring used in real applications?",
      a: "It is widely used in React props, API responses, state management, and function parameters.",
    },
  ],

  realWorldUsage: [
    "React props destructuring",
    "useState and useEffect hooks",
    "API response handling",
    "Node.js request data processing",
    "Configuration objects",
    "Function parameter handling",
    "Data transformation pipelines",
  ],

  interviewSummary: [
    "Destructuring extracts values from arrays and objects.",
    "Object uses key names, array uses index positions.",
    "Supports renaming, defaults, and nested extraction.",
    "Rest operator collects remaining values.",
    "Very common in React and APIs.",
    "Makes code cleaner and more readable.",
  ],
};
