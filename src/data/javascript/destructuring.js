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
    "Destructuring is ES6 syntax that unpacks array elements or object properties into separate variables. Arrays are unpacked by position, while objects are unpacked by property name.",

  why:
    "Destructuring removes repetitive property access and makes code shorter and clearer. It is used constantly in React for props, useState, custom hooks, and API responses.",

  how: [
    "Step 1 - Object destructuring reads properties by matching key names",
    "Step 2 - You can rename extracted properties to new variable names",
    "Step 3 - Defaults apply only when the incoming value is undefined",
    "Step 4 - Nested patterns let you unpack deeper structures in one step",
    "Step 5 - Object rest gathers remaining properties into a new object",
    "Step 6 - Array destructuring reads by position instead of key",
    "Step 7 - Commas can skip unwanted array positions",
    "Step 8 - Destructuring also works directly in function parameters",
  ],

  diagram: `
flowchart LR
  A[Object or array source] --> B[Destructuring syntax]
  B --> C[Named variables produced]
  D[Object uses property names] --> B
  E[Array uses positions] --> B
  `,

  analogy:
    "Destructuring is like unpacking a suitcase at the hotel. Instead of opening the suitcase every time you need a shirt or passport, you unpack those items once into separate places. Array destructuring is similar, but each storage slot is chosen by position rather than label.",

  code: `
const user = { name: "Ali", age: 25, address: { city: "Karachi", zip: 123 } };
const { name, age } = user;
const { name: userName, role = "student" } = user;
const { address: { city } } = user;
const { name: firstName, ...rest } = user;

const numbers = [10, 20, 30, 40];
const [first, , third] = numbers;
let a = 1;
let b = 2;
[a, b] = [b, a];

function greet({ title = "Stranger", year = 0 } = {}) {
  return title + " " + year;
}
// const [count, setCount] = useState(0) is array destructuring in React
const response = { data: { id: 1 }, status: 200, error: null };
const { data, status, error } = response;
console.log(name, age, userName, role, city, rest, first, third, a, b, greet(), data, status, error);
  `,

  interviewQA: [
    {
      q: "What is destructuring?",
      a: "Destructuring is syntax for unpacking array elements or object properties into separate variables in a single statement. It reduces repetition and makes the structure you need very clear.",
    },
    {
      q: "What is the difference between array and object destructuring?",
      a: "Array destructuring is position based, so the first variable gets index zero and so on. Object destructuring is name based, so the variable matches a property key unless you rename it.",
    },
    {
      q: "How do you provide a default value in destructuring?",
      a: "You place an equals sign inside the pattern, for example const name equals Anonymous. That default is used only when the incoming value is undefined, not when it is null or another falsy value.",
    },
    {
      q: "How is destructuring used in React?",
      a: "React uses it everywhere. useState returns an array that is immediately destructured, and component props are often destructured directly in the function parameter list for cleaner code.",
    },
  ],
};
