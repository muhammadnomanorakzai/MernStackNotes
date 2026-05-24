export const dataTypes = {
  id: "data-types",
  title: "Data Types in JavaScript",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: [
    "primitives",
    "typeof",
    "null",
    "undefined",
    "string",
    "number",
    "boolean",
    "object",
    "symbol",
    "bigint",
  ],

  definition:
    "JavaScript has 8 data types: 7 primitive types and 1 non-primitive type called Object. Primitives store a direct value, while objects store a reference to a memory location.",

  why: "Every program works with data. Data types tell JavaScript how to store a value in memory, which operations are allowed, and how comparisons behave. Without knowing types, you cannot predict how your code will behave.",

  how: [
    "Step 1 - JavaScript reads your value like hello, 42, true, null, or undefined",
    "Step 2 - It assigns a type automatically because JavaScript is dynamically typed",
    "Step 3 - Primitive values are stored directly in the stack",
    "Step 4 - Object values live in the heap and the stack stores only a reference",
    "Step 5 - The typeof operator returns the type as a lowercase string",
    "Step 6 - typeof null returns object because of a famous 1995 JavaScript bug",
    "Step 7 - Copying a primitive creates an independent value",
    "Step 8 - Copying an object shares the same reference so both variables see changes",
  ],

  diagram: `
flowchart TD
  A[JavaScript Data Types] --> B[Primitive 7 types]
  A --> C[Non Primitive]
  B --> D[String]
  B --> E[Number]
  B --> F[BigInt]
  B --> G[Boolean]
  B --> H[Undefined]
  B --> I[Null]
  B --> J[Symbol]
  C --> K[Object]
  K --> L[Array]
  K --> M[Function]
  K --> N[Date]
  K --> O[RegExp]
  A --> P[typeof null object Famous 1995 Bug]
  A --> Q[Primitive stored by VALUE]
  A --> R[Object stored by REFERENCE]
  `,

  analogy:
    "Primitives are like writing a phone number directly on a sticky note because you own the value itself. Objects are like writing check the address book page 7 because you only hold a reference. If two people copy the same phone number onto separate notes, changing one note does not affect the other. But if both notes point to page 7 and someone edits page 7, both people see the change.",

  code: `
// typeof for the main JavaScript value categories
console.log(typeof "hello"); // string
console.log(typeof 42); // number
console.log(typeof 10n); // bigint
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof null); // object <- famous 1995 bug
console.log(typeof Symbol("id")); // symbol
console.log(typeof { name: "Ali" }); // object

let a = 10;
let b = a;
b = 20;
console.log(a, b); // 10 20 -> primitives copy by value

const user1 = { name: "Sara" };
const user2 = user1;
user2.name = "Ayesha";
console.log(user1.name); // Ayesha -> same object reference
  `,

  interviewQA: [
    {
      q: "What is the difference between primitive and non primitive reference types?",
      a: "Primitives store the actual value directly. Non-primitives like objects store a reference to a memory location. Primitives are immutable and compared by value, while objects are mutable and compared by reference.",
    },
    {
      q: "Why does typeof null return object?",
      a: `It is a bug from JavaScript's original 1995 implementation. null used a type tag that matched objects in the early engine, and it was never fixed because changing it would break old code.
      “Intentionally empty” ka simple Roman Urdu mein matlab hai:

“Jaan boojh kar khaali rakhna”
ya
“Khud se empty set karna”

null tab use hota hai jab developer khud kehta hai:

“Is variable mein abhi koi value nahi hai.”
      `,
    },
    {
      q: "What is the difference between null and undefined?",
      a: "undefined means a variable exists but has not been assigned a value yet. null is an intentional assignment that means no value. typeof undefined is undefined, while typeof null is object.",
    },
    {
      q: "What does pass by value vs pass by reference mean?",
      a: `Primitives are passed by value, so a fresh copy is used and the original stays unchanged. Objects are passed by reference, so multiple variables can point to the same object and see the same mutations.
      
      Pass By Value (JavaScript Mein)

JavaScript mein jab primitive values (number, string, boolean) use hoti hain, to unki copy pass hoti hai.

Agar doosri variable ko change karo, to original variable affect nahi hota.

Real Life Example

Socho:

Tumhare paas ek original photo hai
Tum uski photocopy dost ko dete ho

Ab agar dost:

photocopy par kuch likh de
ya usay phaar de

to:

tumhari original photo safe rahegi

Kyuki uske paas sirf COPY thi.

Yahi hota hai:

Pass By Value


Pass By Reference (JavaScript Mein)

JavaScript mein objects aur arrays ka behavior different hota hai.

Yahan actual cheez copy nahi hoti.

Sirf us cheez ka address/reference share hota hai.

Real Life Example

Socho:

Ek hi ghar hai
Tum aur tumhara dost dono ke paas us ghar ki location hai

Agar dost:

ghar ka color red kar de

to:

tum jab ghar dekho ge to red hi nazar ayega

Kyuki:

ghar same tha
dono usi same ghar ko access kar rahe thay

Yahi hota hai:

Pass By Reference

Sabse Easy Difference
Pass By Value

Copy milti hai

Example:
Photocopy of document

Pass By Reference

“Same cheez share hoti hai”

Example:
Same house with same address

One Golden Line
Pass By Value

Change copy → original safe

Pass By Reference

Change shared object → sab ko effect
      
      `,
    },
  ],
};
