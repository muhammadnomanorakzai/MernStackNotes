export const hoisting = {
  id: "hoisting",
  title: "Hoisting",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: [
    "hoisting",
    "var",
    "function declaration",
    "TDZ",
    "execution context",
    "creation phase",
  ],

  definition:
    "Hoisting is a JavaScript behavior that occurs before code execution begins. During the Creation Phase, JavaScript scans the current scope and prepares memory for variables, functions, and classes. Because of this preparation, some declarations appear to be available before the line where they are written. Hoisting does not move code; it is simply the result of JavaScript allocating memory before execution starts.",

  why: "JavaScript cannot execute code efficiently without first understanding what variables, functions, and scopes exist. Before running any line of code, the engine creates an Execution Context and registers declarations in memory. This process explains why function declarations can be called before their definition, why var returns undefined before assignment, and why let and const throw a ReferenceError when accessed before initialization.",

  theory: `
Hoisting is one of the most important concepts for understanding how JavaScript executes code. Many developers believe that JavaScript physically moves declarations to the top of a file, but that is not what actually happens.

Before executing code, JavaScript first creates an Execution Context. During this Creation Phase, the engine scans the current scope and allocates memory for declarations. Function declarations are stored completely in memory, var variables are initialized with undefined, and let or const variables are created but remain uninitialized.

After this preparation step, JavaScript enters the Execution Phase and begins running code line by line from top to bottom. Values are assigned only when their declaration line is reached.

Because memory is prepared before execution starts, some declarations appear to be available before their position in the source code. This behavior is known as hoisting.

The most important thing to remember is that hoisting is not about moving code. Hoisting is the result of JavaScript creating memory for declarations before executing the program.
`,

  mentalModel: `
When you hear the word hoisting, do not think:

❌ JavaScript moves code to the top.

Instead think:

✅ JavaScript scans the scope first, allocates memory, and then executes the code.

This mental model explains almost every hoisting interview question.
`,

  how: [
    "Step 1 - Before execution, the engine scans the scope during the Creation Phase",
    "Step 2 - Function declarations are fully hoisted and ready to call",
    "Step 3 - var declarations are hoisted and initialized as undefined",
    "Step 4 - let and const are hoisted but remain uninitialized in the Temporal Dead Zone",
    "Step 5 - Function expressions follow variable rules instead of function declaration rules",
    "Step 6 - Class declarations also behave like let and stay unavailable before their line",
    "Step 7 - In the Execution Phase, code runs top to bottom and values get assigned",
  ],

  diagram: `
flowchart TD
  A[Phase 1 Creation Phase] --> B[Function Declarations Fully available in memory]
  A --> C[var variables Available as undefined]
  A --> D[let and const In TDZ ReferenceError if accessed]
  A --> E[Function expressions follow variable rules]
  F[Phase 2 Execution Phase] --> G[Code runs top to bottom]
  G --> H[Values assigned when each line is reached]
  `,

  analogy: `Hoisting kya hai?
Jab JavaScript code run karta hai, pehle ek baar pura code scan karta hai. Is scanning mein woh saari variable aur function declarations memory mein upar le jaata hai. Iss process ko Hoisting kehte hain.
Var ke saath:
Agar tum var use karo aur variable declare karne se pehle use karo, toh error nahi aayegi — balke undefined milega. Kyunki JavaScript ne declaration upar kar di thi, lekin value assign nahi ki thi.
Let aur Const ke saath:
Yeh bhi hoist hote hain, lekin Temporal Dead Zone (TDZ) mein rehte hain. Matlab agar tum pehle access karo toh ReferenceError aayega. Yeh actually achha hai — silent bugs se bachata hai.
Function Declaration ke saath:
Poori function hoisting hoti hai — matlab tum function ko uske declare karne se pehle call kar sakte ho. Yeh JavaScript ka ek powerful feature hai.
Function Expression aur Arrow Function ke saath:
Yeh hoist nahi hote properly — sirf variable hota hai hoist. Toh pehle call karo toh TypeError aayega.
Asaan tip: Hamesha let aur const use karo, var se door raho. Aur functions ko pehle declare karo, phir call karo — iss tarah code clean aur readable rehta hai. Hoisting samajhna bugs dhundhne mein bahut kaam aata hai! 🚀`,

  code: `
sayHello(); // works because this is a function declaration
function sayHello() {
  console.log("Hello");
}

console.log(total); // undefined because var is hoisted
var total = 5;

// console.log(price); // ReferenceError in TDZ
let price = 100;

// greet(); // TypeError: greet is not a function
var greet = function () {
  console.log("Hi");
};

if (true) {
  var leaked = "I escaped the block";
}
console.log(leaked); // accessible outside the if block
  `,

  interviewQA: [
    {
      q: "What is hoisting in JavaScript?",
      a: "Hoisting is the behavior where JavaScript prepares variable and function declarations before code executes. That setup happens during the Creation Phase, but assignments still occur later when execution reaches each line.",
    },
    {
      q: "What is the difference between hoisting of var vs let and const?",
      a: "var is hoisted and initialized to undefined, so reading it early does not crash. let and const are also hoisted, but they stay uninitialized in the Temporal Dead Zone, so early access throws a ReferenceError.",
    },
    {
      q: "Are function expressions hoisted?",
      a: "Not like function declarations. A function expression follows the rules of the variable holding it, so only the variable name is hoisted and the function body is not callable until assignment happens.",
    },
    {
      q: "What is the Temporal Dead Zone?",
      a: "The Temporal Dead Zone is the time between scope creation and the line where a let or const declaration is executed. During that time the binding exists, but any access throws a ReferenceError.",
    },
    {
      q: "Does JavaScript actually move declarations to the top of the file?",
      a: "No. JavaScript does not physically move code. During the Creation Phase it allocates memory for declarations before execution begins, which creates the behavior known as hoisting.",
    },
  ],
};
