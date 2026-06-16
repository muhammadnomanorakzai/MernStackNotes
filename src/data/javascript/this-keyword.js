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
    "The 'this' keyword is a special JavaScript keyword that refers to the object that is currently calling or executing a function. Unlike normal variables, the value of 'this' is determined when a function is called, not when it is created.",

  simpleExplanation:
    "The 'this' keyword is one of the most important and commonly misunderstood concepts in JavaScript. Many beginners think that 'this' always refers to the object where a function is written, but JavaScript does not work that way.\n\nWhenever a function runs, JavaScript checks how that function was called and assigns a value to 'this'. If a method is called through an object, 'this' usually refers to that object. If a function is called independently, 'this' may become undefined in strict mode.\n\nJavaScript also allows developers to manually control the value of 'this' using call(), apply(), and bind(). Arrow functions behave differently because they do not create their own 'this'. Instead, they inherit it from their surrounding scope.\n\nUnderstanding 'this' is essential for working with objects, classes, event handlers, React applications, and modern JavaScript frameworks. Many real-world bugs occur because developers lose the original value of 'this' when passing methods as callbacks.",

  romanUrduRevision:
    "this us object ko refer karta hai jo function ko call kar raha hota hai. Iski value function likhnay ki jagah par nahi balkay function call honay ke tareeqay par depend karti hai.\n\nYaad rakho: JavaScript mein 'this' ko samajhnay ka sab se asaan rule hai ke dekho function kis tarah call hua hai, na ke kahan likha gaya hai.",

  why: "The 'this' keyword allows methods to access the data of the object that is using them without hard-coding object names. This makes code more reusable, flexible, and easier to maintain. It is also a fundamental part of object-oriented programming in JavaScript.",

  how: [
    "Step 1 - JavaScript encounters a function call",
    "Step 2 - It checks how the function was invoked",
    "Step 3 - If called with new, this becomes the newly created object",
    "Step 4 - If called as an object method, this refers to that object",
    "Step 5 - If called using call(), apply(), or bind(), this becomes the explicitly provided object",
    "Step 6 - If called as a standalone function, this becomes undefined in strict mode",
    "Step 7 - Arrow functions do not create their own this value",
    "Step 8 - Arrow functions inherit this from their parent scope",
    "Step 9 - Extracting methods from objects can cause the lost this problem",
  ],

  diagram: `
flowchart TD
  A[Function Call]

  A --> B[new Person()]
  A --> C[user.greet()]
  A --> D[greet()]
  A --> E[call apply bind]
  A --> F[Arrow Function]

  B --> B1[this = New Object]
  C --> C1[this = user]
  D --> D1[this = undefined in strict mode]
  E --> E1[this = Explicit Object]
  F --> F1[this = Parent Scope]

  C --> G[Method Extracted]
  G --> H[Lost this Problem]
  H --> I[Fix with bind or arrow function]
  `,

  realLifeExample:
    "Imagine a company where multiple employees use the same attendance machine. Whenever an employee scans their card, the machine displays information about that specific employee. The machine's code remains the same, but the displayed information changes depending on who used it. Similarly, the 'this' keyword changes depending on which object calls the function.",

  analogy:
    "Think of 'this' as the word 'I' in a conversation. If Ali says 'I am a developer', then 'I' refers to Ali. If Sara says the same sentence, then 'I' refers to Sara. The sentence stays the same, but the meaning changes depending on who is speaking. The 'this' keyword works in exactly the same way.",

  code: `
"use strict";

const user = {
  name: "Ali",

  greet() {
    console.log(this.name);
  }
};

user.greet();
// Ali

const lost = user.greet;

// lost();
// Error because this becomes undefined

const fixed = user.greet.bind(user);

fixed();
// Ali

function introduce(city) {
  console.log(this.name, city);
}

introduce.call(
  { name: "Sara" },
  "Karachi"
);

introduce.apply(
  { name: "Ayesha" },
  ["Lahore"]
);

const boundFunction =
  introduce.bind({
    name: "Zara"
  });

boundFunction("Islamabad");

// Arrow Function Example

const person = {
  name: "Ahmed",

  regularFunction() {
    console.log(this.name);
  },

  arrowFunction: () => {
    console.log(this.name);
  }
};

person.regularFunction();
// Ahmed

person.arrowFunction();
// undefined (inherits parent scope this)
  `,

  commonMistakes: [
    "Assuming this always refers to the object where the function is written",
    "Forgetting that this depends on how the function is called",
    "Losing this when passing object methods as callbacks",
    "Expecting arrow functions to create their own this",
    "Using regular functions inside callbacks without understanding context",
    "Confusing global this with object this",
    "Not using bind when passing methods to timers or event handlers",
    "Assuming extracted methods keep their original object reference",
  ],

  interviewQA: [
    {
      q: "What is the this keyword in JavaScript?",
      a: "The this keyword refers to the object responsible for calling a function. Its value is determined at runtime based on how the function is invoked.",
    },

    {
      q: "Does this depend on where a function is written?",
      a: "No. The value of this depends on how the function is called, not where it is defined.",
    },

    {
      q: "What is this inside an object method?",
      a: "Inside an object method, this usually refers to the object that called the method.",
    },

    {
      q: "What is this inside a standalone function in strict mode?",
      a: "It becomes undefined.",
    },

    {
      q: "What is the difference between call(), apply(), and bind()?",
      a: "call() and apply() execute the function immediately while setting this. bind() returns a new function with a permanently fixed this value.",
    },

    {
      q: "Why are arrow functions different?",
      a: "Arrow functions do not create their own this value. They inherit this from the surrounding lexical scope.",
    },

    {
      q: "What is the lost this problem?",
      a: "It occurs when a method is detached from its object and called separately, causing it to lose its original object context.",
    },

    {
      q: "How can you fix the lost this problem?",
      a: "You can use bind(), an arrow function wrapper, or call the method through the original object.",
    },
  ],

  realWorldUsage: [
    "Object methods",
    "JavaScript classes",
    "Constructor functions",
    "DOM event handlers",
    "React class components",
    "Reusable utility methods",
    "Function borrowing with call and apply",
    "Binding callbacks before passing them to other functions",
    "Frameworks and libraries that depend on execution context",
  ],

  interviewSummary: [
    "The value of this depends on how a function is called.",
    "Object methods usually receive their object as this.",
    "Standalone functions get undefined in strict mode.",
    "call(), apply(), and bind() can explicitly set this.",
    "Arrow functions do not create their own this.",
    "Arrow functions inherit this from their parent scope.",
    "Losing object context causes the lost this problem.",
    "this is one of the most frequently asked JavaScript interview topics.",
  ],
};
