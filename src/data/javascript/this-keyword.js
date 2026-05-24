export const thisKeyword = {
  id: "this-keyword",
  title: "The this Keyword",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "this",
    "context",
    "bind",
    "call",
    "apply",
    "arrow function",
    "strict mode",
    "lost this",
    "implicit binding",
  ],

  definition:
    "this refers to the object currently executing a function. Its value depends on how the function is called, not where the function was written, except for arrow functions which inherit this from their surrounding scope.",

  why:
    "this lets object methods refer to their own data without hard-coding the object variable name. That makes methods reusable, supports object-oriented patterns, and enables flexible call-time binding in JavaScript.",

  how: [
    "Step 1 - With new, this becomes the newly created object",
    "Step 2 - With call apply or bind, this is explicitly set",
    "Step 3 - With obj method, this is the object before the dot",
    "Step 4 - With a standalone function call, this is global or undefined in strict mode",
    "Step 5 - Arrow functions do not create their own this",
    "Step 6 - Extracting a method can lose its original object context",
  ],

  diagram: `
flowchart TD
  A[How is function called] --> B[new Fn]
  A --> C[obj method]
  A --> D[standalone fn]
  A --> E[call apply bind]
  A --> F[arrow function]
  B --> B1[this is new object]
  C --> C1[this is obj]
  D --> D1[this is global or undefined]
  E --> E1[this is explicit object]
  F --> F1[this is inherited]
  A --> G[lost this when method extracted]
  G --> H[fix with bind or arrow wrapper]
  `,

  analogy:
    "The word this is like saying I in a conversation. Who I refers to depends on who is speaking at that moment. call, apply, and bind let you decide who gets to speak. Arrow functions are like quotes from a transcript, where the speaker identity stays locked to whoever originally said the words.",

  code: `
"use strict";
const user = {
  name: "Ali",
  greet() { console.log(this.name); }
};
user.greet(); // Ali

const lost = user.greet;
// lost(); // this is undefined in strict mode

const fixed = user.greet.bind(user);
fixed(); // Ali

function intro(city) { console.log(this.name, city); }
intro.call({ name: "Sara" }, "Karachi");
intro.apply({ name: "Ayesha" }, ["Lahore"]);

const bound = intro.bind({ name: "Zara" });
bound("Islamabad");
  `,

  interviewQA: [
    {
      q: "What does this refer to in JavaScript?",
      a: "this refers to the object currently executing the function. Its value depends on the way the function is called, such as a method call, constructor call, explicit binding, or standalone call.",
    },
    {
      q: "What is the difference between call apply and bind?",
      a: "call and apply both invoke the function immediately while setting this explicitly. bind does not call the function right away; it returns a new function with this permanently fixed for later use.",
    },
    {
      q: "How does this behave in an arrow function vs a regular function?",
      a: "Regular functions get their own this from the call site. Arrow functions do not create a new this, so they inherit it from the surrounding lexical scope where they were defined.",
    },
    {
      q: "What is the lost this problem and how do you fix it?",
      a: "Lost this happens when a method is detached from its object and then called as a standalone function. You can fix it with bind, by wrapping the call in an arrow function, or by calling it through the object again.",
    },
    {
      q: "What is this in strict mode?",
      a: "In strict mode, a standalone regular function call gives this as undefined instead of the global object. That makes accidental misuse easier to catch during debugging.",
    },
  ],
};
