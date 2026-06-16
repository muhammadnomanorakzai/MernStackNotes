export const truthyFalsy = {
  id: "truthy-falsy",
  title: "Truthy & Falsy Values",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: [
    "truthy",
    "falsy",
    "boolean",
    "conditionals",
    "implicit coercion",
    "double negation",
    "logical operators",
  ],

  definition:
    "In JavaScript, every value has an inherent truthiness. When a value is used inside a condition such as an if statement, JavaScript automatically converts that value into either true or false. Values that become true are called Truthy values, while values that become false are called Falsy values.",

  simpleExplanation:
    "Many programming languages require conditions to contain only true or false values. JavaScript is different because it allows almost any value inside a condition.\n\nWhenever JavaScript encounters a value inside an if statement, while loop, logical operator, or ternary operator, it automatically converts that value into a boolean. This process happens behind the scenes using the Boolean() function.\n\nSome values naturally become false. These are known as Falsy values. Every other value becomes true and is considered Truthy.\n\nUnderstanding Truthy and Falsy values is extremely important because many real-world bugs occur when developers assume that values like 0, an empty string, or null will behave differently inside conditions.\n\nAs a JavaScript developer, you will frequently use Truthy and Falsy checks for authentication, form validation, API responses, optional data handling, and React conditional rendering.",

  romanUrduRevision:
    "JavaScript condition ke andar har value ko automatically true ya false mein convert karta hai.\nSirf 8 values falsy hain, baqi sari values truthy hoti hain chahe empty array ya empty object hi kyu na ho.",

  why: "JavaScript was designed to be flexible and allow developers to write concise conditions. Instead of forcing you to manually compare every value, JavaScript automatically evaluates truthiness. Understanding these rules helps you write cleaner code and avoid unexpected behavior in production applications.",

  how: [
    "Step 1 - JavaScript encounters a value inside a condition",
    "Step 2 - It automatically applies Boolean() conversion",
    "Step 3 - If the value is one of the eight falsy values, the condition becomes false",
    "Step 4 - Every other value becomes true",
    "Step 5 - Logical operators (&& and ||) rely heavily on truthy and falsy behavior",
    "Step 6 - Double negation (!!) converts any value into a real boolean",
    "Step 7 - React and Node.js applications frequently use truthy and falsy checks",
  ],

  diagram: `
flowchart TD
  A[JavaScript Condition]
  A --> B[Boolean Conversion]

  B --> C[Falsy Values]
  B --> D[Truthy Values]

  C --> E[Condition Returns False]
  D --> F[Condition Returns True]

  C --> G[false]
  C --> H[0]
  C --> I[-0]
  C --> J[0n]
  C --> K[""]
  C --> L[null]
  C --> M[undefined]
  C --> N[NaN]

  D --> O["hello"]
  D --> P["0"]
  D --> Q[[]]
  D --> R[{}]
  D --> S[Infinity]
  D --> T[-1]
  `,

  realLifeExample:
    "Imagine a security guard checking entry tickets at a stadium. The guard has a list of only eight invalid tickets. Anyone holding one of those invalid tickets is denied entry. Every other ticket is accepted without question. JavaScript behaves in a similar way. It only treats eight specific values as false, while everything else is considered true.",

  diagram: `
flowchart TD
  A[JS runs Boolean value in every if condition]
  A --> B[FALSY false 0 negative zero 0n empty string null undefined NaN]
  A --> C[TRUTHY string zero empty array empty object negative one Infinity false string new Date]
  B --> D[Condition acts false]
  C --> E[Condition acts true]
  `,

  analogy:
    "Think of JavaScript as a nightclub bouncer with a very small blacklist. Only eight guests are on the blacklist, and they are not allowed into the if statement. Everyone else gets inside, including unusual guests like empty arrays, empty objects, and the string '0'.",

  code: `
// All Falsy Values

console.log(Boolean(false));      // false
console.log(Boolean(0));          // false
console.log(Boolean(-0));         // false
console.log(Boolean(0n));         // false
console.log(Boolean(""));         // false
console.log(Boolean(null));       // false
console.log(Boolean(undefined));  // false
console.log(Boolean(NaN));        // false

// Truthy Values

console.log(Boolean("0"));        // true
console.log(Boolean("false"));    // true
console.log(Boolean([]));         // true
console.log(Boolean({}));         // true
console.log(Boolean(-1));         // true
console.log(Boolean(Infinity));   // true

// Using Conditions

if ("hello") {
  console.log("Runs because string is truthy");
}

if ([]) {
  console.log("Runs because array is truthy");
}

// Double Negation

console.log(!!"hello"); // true
console.log(!!0);       // false
console.log(!![]);      // true
console.log(!!null);    // false

// Logical OR

const username = "";
const displayName = username || "Anonymous";
console.log(displayName);

// Logical AND

const user = {
  login() {
    console.log("User logged in");
  }
};

user && user.login();

// React Example

// items.length && <List />
// If items.length is 0, React renders 0
// Better:
// items.length > 0 && <List />
  `,

  falsyValues: ["false", "0", "-0", "0n", '""', "null", "undefined", "NaN"],

  truthyExamples: [
    '"hello"',
    '"0"',
    "[]",
    "{}",
    "-1",
    "1",
    "true",
    "Infinity",
    "new Date()",
  ],

  commonMistakes: [
    "Assuming an empty array [] is falsy",
    "Assuming an empty object {} is falsy",
    "Using if(array) instead of checking array.length",
    "Using if(object) instead of checking object properties",
    "Forgetting that the string '0' is truthy",
    "Forgetting that the string 'false' is truthy",
    "Using logical OR (||) when nullish coalescing (??) is more appropriate",
  ],

  interviewQA: [
    {
      q: "What are Truthy and Falsy values in JavaScript?",
      a: "Truthy values become true when converted to a boolean, while falsy values become false when converted to a boolean.",
    },

    {
      q: "How many falsy values exist in JavaScript?",
      a: "There are exactly eight falsy values: false, 0, -0, 0n, empty string, null, undefined, and NaN.",
    },

    {
      q: "Is an empty array truthy or falsy?",
      a: "An empty array is truthy because arrays are objects and objects are always truthy in JavaScript.",
    },

    {
      q: "Is an empty object truthy or falsy?",
      a: "An empty object is truthy because it still exists in memory as an object reference.",
    },

    {
      q: "What does !!value do?",
      a: "Double negation converts any value into its actual boolean equivalent. It is commonly used to determine the truthiness of a value.",
    },

    {
      q: "What is the difference between Boolean(value) and !!value?",
      a: "Both produce the same result. Boolean(value) is more explicit, while !!value is shorter and commonly used by JavaScript developers.",
    },

    {
      q: "Why can the string 'false' still be truthy?",
      a: "Because any non-empty string is truthy regardless of its content.",
    },

    {
      q: "Why is the string '0' truthy?",
      a: "Because JavaScript only checks whether the string is empty or not. Any non-empty string is truthy.",
    },

    {
      q: "Why is Truthy/Falsy important in React?",
      a: "React commonly uses conditional rendering with && and || operators. Understanding truthiness prevents rendering bugs and unexpected UI behavior.",
    },
  ],

  interviewSummary: [
    "Every value in JavaScript is either truthy or falsy.",
    "There are exactly 8 falsy values.",
    "Empty arrays and empty objects are truthy.",
    "The strings '0' and 'false' are truthy.",
    "Boolean(value) and !!value convert values to booleans.",
    "Truthy/Falsy behavior powers if statements, loops, &&, ||, and React rendering.",
    "Many JavaScript interview questions are based on Truthy and Falsy concepts.",
  ],
};
