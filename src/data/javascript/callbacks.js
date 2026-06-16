export const callbacks = {
  id: "callbacks",
  title: "Callbacks & Callback Hell",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "callback",
    "callback hell",
    "pyramid of doom",
    "async",
    "error-first callback",
    "Node.js pattern",
  ],

  definition:
    "A callback is a function passed as an argument to another function, which is executed later when a task completes or an event occurs. Callback Hell is a situation where multiple asynchronous callbacks are deeply nested, making code hard to read, maintain, and debug.",

  simpleExplanation:
    "JavaScript uses callbacks to handle asynchronous work.\n\nInstead of waiting for a task to finish (like API calls or timers), we pass a function that runs later when the task is complete.\n\nThis works fine for small cases.\n\nBut when multiple async tasks depend on each other, callbacks start nesting inside each other.\n\nThis creates a pyramid-like structure called Callback Hell, which becomes very hard to manage and read.\n\nThat is why Promises and async/await were introduced.",

  romanUrduRevision:
    "Callback ek function hota hai jo dusre function ko pass kiya jata hai aur baad mein run hota hai.\n\nJab callbacks bohat zyada nested ho jayein to usko callback hell kehte hain.\n\nIs se code samajhna mushkil ho jata hai.",

  why: "Callbacks were the original way JavaScript handled asynchronous operations.\n\nThey are still used in many places like event handlers and older Node.js APIs.\n\nHowever, as applications grow, callbacks become hard to manage because:\n- Deep nesting creates unreadable code\n- Error handling is repeated at every level\n- Debugging becomes difficult\n- Flow of logic is not linear\n\nUnderstanding callbacks is important because Promises and async/await are built to solve these problems.",

  how: [
    "Step 1 - A function receives another function as an argument",
    "Step 2 - The outer function performs synchronous or asynchronous work",
    "Step 3 - Once work is completed, it calls the callback function",
    "Step 4 - In synchronous cases, callback runs immediately (e.g. map)",
    "Step 5 - In async cases, callback runs later via Event Loop (e.g. setTimeout, API calls)",
    "Step 6 - Node.js often uses error-first callbacks (err, data)",
    "Step 7 - Each async step may depend on the previous result",
    "Step 8 - Nesting callbacks inside callbacks creates Callback Hell",
    "Step 9 - Deep nesting makes code hard to read and maintain",
  ],

  diagram: `
flowchart TD
  A[Start Async Flow] --> B[readUser callback]
  B --> C[fetchPosts callback]
  C --> D[fetchComments callback]
  D --> E[fetchLikes callback]

  E --> F[Pyramid of Nesting]
  F --> G[Repeated error handling]
  F --> H[Hard to read flow]
  F --> I[Debugging difficulty]
`,

  realLifeExample:
    "Imagine ordering food in a restaurant.\n\nYou first order food, then wait.\nAfter food arrives, you order drinks.\nAfter drinks, you order dessert.\n\nEach step depends on the previous one.\nIf every step is written inside the previous step’s callback, the logic becomes deeply nested and confusing.\n\nThat is exactly what Callback Hell looks like in code.",

  analogy:
    "Callback Hell is like a set of nested Russian dolls.\n\nEach doll opens to reveal another instruction inside.\nYou cannot see the full picture at once, only the next step hidden inside.\n\nThe deeper you go, the harder it becomes to understand what is happening overall.",

  code: `
// =========================
// BASIC CALLBACK EXAMPLES
// =========================

console.log([1, 2, 3].map(x => x * 2)); // sync callback

setTimeout(() => {
  console.log("Executed after 1 second");
}, 1000);

// =========================
// ERROR-FIRST CALLBACK PATTERN
// =========================

function readUserData(id, callback) {
  setTimeout(() => {
    if (!id) {
      return callback(new Error("No ID provided"), null);
    }

    callback(null, { id, name: "Ali" });
  }, 100);
}

// =========================
// CALLBACK HELL EXAMPLE
// =========================

readUserData(1, (err, user) => {
  if (err) return console.log(err.message);

  fetchPosts(user.id, (err, posts) => {
    if (err) return console.log(err.message);

    fetchComments(posts[0].id, (err, comments) => {
      if (err) return console.log(err.message);

      fetchLikes(comments[0].id, (err, likes) => {
        if (err) return console.log(err.message);

        console.log("Final Likes:", likes);
      });
    });
  });
});

// This becomes unreadable as nesting increases
// Promises and async/await solve this structure
  `,

  commonMistakes: [
    "Assuming callbacks always run immediately",
    "Forgetting error handling in error-first callbacks",
    "Deep nesting without modularizing functions",
    "Not understanding async flow timing",
    "Mixing sync and async callbacks incorrectly",
    "Repeating same error checks at every level",
    "Not using Promises or async/await when available",
  ],

  interviewQA: [
    {
      q: "What is a callback in JavaScript?",
      a: "A callback is a function passed into another function that gets executed later, either immediately (sync) or after some async operation completes.",
    },
    {
      q: "What is Callback Hell?",
      a: "Callback Hell is a situation where multiple asynchronous callbacks are deeply nested, making code hard to read and maintain.",
    },
    {
      q: "Why is Callback Hell a problem?",
      a: "It makes code unreadable, hard to debug, and leads to repeated error handling and poor structure.",
    },
    {
      q: "How do Promises improve callbacks?",
      a: "Promises flatten nested callbacks into a chain using .then() and centralize error handling using .catch(), making code more readable.",
    },
    {
      q: "Where are callbacks still used today?",
      a: "They are used in event listeners, array methods, and some Node.js APIs, although Promises and async/await are more common now.",
    },
  ],

  realWorldUsage: [
    "Event handling (click, input, scroll)",
    "Array methods like map, filter, reduce",
    "Node.js filesystem and server APIs",
    "Timers like setTimeout and setInterval",
    "Legacy asynchronous APIs",
    "Custom async workflows",
    "UI interaction handlers",
  ],

  interviewSummary: [
    "Callbacks are functions passed to other functions",
    "They can run sync or async",
    "Async callbacks run via Event Loop",
    "Callback Hell is deeply nested callbacks",
    "Hard to maintain and debug",
    "Promised replaced most callback chains",
    "Still used in many core JS APIs",
  ],
};
