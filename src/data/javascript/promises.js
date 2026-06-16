export const promises = {
  id: "promises",
  title: "Promises",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "promise",
    "then",
    "catch",
    "finally",
    "Promise.all",
    "Promise.race",
    "Promise.allSettled",
    "Promise.any",
    "microtask",
    "pending",
    "fulfilled",
    "rejected",
  ],

  definition:
    "A Promise is a JavaScript object that represents the eventual result of an asynchronous operation. It acts as a placeholder for a value that will be available in the future, and it can either succeed (fulfilled) or fail (rejected).",

  simpleExplanation:
    "Promises are JavaScript’s way of handling async work in a cleaner and more structured way.\n\nInstead of nesting callbacks, a Promise lets you write code in a straight line using .then() and .catch().\n\nA Promise starts in a pending state.\nLater it either:\n- resolves → success (fulfilled)\n- rejects → failure\n\nThis makes async code easier to read, debug, and maintain.",

  romanUrduRevision:
    "Promise ek future value ka placeholder hota hai.\n\nYe pending se start hota hai aur ya to resolve (success) hota hai ya reject (error).\n\nIs se callback hell solve hota hai aur code clean ho jata hai.",

  why: "Promises were introduced to solve the readability and maintenance problems of callback hell.\n\nThey improve async programming by:\n- Flattening nested callbacks into chains\n- Centralizing error handling in .catch()\n- Making async flow easier to reason about\n- Supporting advanced control patterns like Promise.all and race\n\nIn modern JavaScript, Promises are the foundation of async/await.",

  how: [
    "Step 1 - A Promise is created using new Promise(executor)",
    "Step 2 - Executor receives resolve and reject functions",
    "Step 3 - resolve changes state from pending → fulfilled",
    "Step 4 - reject changes state from pending → rejected",
    "Step 5 - .then() handles successful results and returns a new Promise",
    "Step 6 - .catch() handles errors from any previous step in the chain",
    "Step 7 - .finally() always runs after settlement for cleanup",
    "Step 8 - Returned values in then become input for next then",
    "Step 9 - Returning a Promise pauses chain until it resolves",
    "Step 10 - Promise utilities manage multiple async operations together",
  ],

  diagram: `
flowchart TD
  A[Create Promise] --> B[PENDING]

  B --> C[resolve()]
  B --> D[reject()]

  C --> E[FULFILLED]
  D --> F[REJECTED]

  E --> G[then()]
  F --> H[catch()]

  G --> I[finally()]
  H --> I
`,

  realLifeExample:
    "Imagine ordering food from a restaurant app.\n\nWhen you place an order, you don’t get food immediately.\nInstead, you get a promise that your order will be delivered.\n\n- Pending → order placed\n- Fulfilled → food delivered\n- Rejected → order cancelled or failed\n\nYou then handle success (eat food) or failure (refund or retry).",

  analogy:
    "A Promise is like booking a movie ticket online.\n\nYou don’t have the seat immediately, but you get confirmation that guarantees a future seat.\n\nLater:\n- Success → you get the seat\n- Failure → booking fails\n- Finally → you still leave the system (cleanup happens either way)",

  code: `
// =========================
// BASIC PROMISE
// =========================

const ticket = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Ticket confirmed");
  } else {
    reject(new Error("Booking failed"));
  }
});

ticket
  .then(result => console.log(result))
  .catch(error => console.log(error.message))
  .finally(() => console.log("Process finished"));

// =========================
// PROMISE CHAINING
// =========================

getUser()
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err => console.log("Error:", err))
  .finally(() => console.log("Done"));

// =========================
// PROMISE UTILITIES
// =========================

// ALL → waits for all (fails if one fails)
Promise.all([api1(), api2(), api3()])
  .then(results => console.log(results));

// ALL SETTLED → waits for all results
Promise.allSettled([api1(), api2(), api3()])
  .then(results => console.log(results));

// RACE → first finished wins (success or failure)
Promise.race([fastAPI(), slowAPI()])
  .then(result => console.log(result));

// ANY → first successful result wins
Promise.any([failAPI(), successAPI(), failAPI()])
  .then(result => console.log(result));

// =========================
// CALLBACK → PROMISE CONVERSION
// =========================

function promisifyRead(id) {
  return new Promise((resolve, reject) => {
    readUserData(id, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
  `,

  commonMistakes: [
    "Forgetting that Promises are asynchronous (microtask queue)",
    "Not returning inside .then() causing broken chains",
    "Using nested then instead of flat chaining",
    "Confusing Promise.all with allSettled",
    "Ignoring error handling with catch",
    "Thinking Promise can be cancelled directly",
    "Mixing callbacks and promises incorrectly",
  ],

  interviewQA: [
    {
      q: "What is a Promise in JavaScript?",
      a: "A Promise is an object representing a future value of an asynchronous operation that can either succeed (fulfilled) or fail (rejected).",
    },
    {
      q: "What are the states of a Promise?",
      a: "A Promise has three states: pending, fulfilled, and rejected. Once settled, it cannot change again.",
    },
    {
      q: "What is the difference between then and catch?",
      a: "then handles successful resolution of a Promise, while catch handles any errors or rejections in the chain.",
    },
    {
      q: "What is Promise.all used for?",
      a: "Promise.all runs multiple Promises in parallel and resolves when all succeed, but fails if any one Promise fails.",
    },
    {
      q: "How is Promise used in async/await?",
      a: "Async/await is syntactic sugar over Promises that makes asynchronous code look synchronous while still using Promises under the hood.",
    },
  ],

  realWorldUsage: [
    "API calls in frontend and backend",
    "Database queries in Node.js",
    "File system operations",
    "Authentication flows",
    "Parallel API requests",
    "Loading multiple resources",
    "Error handling pipelines",
  ],

  interviewSummary: [
    "Promise represents future async value",
    "States: pending, fulfilled, rejected",
    "Replaces callback hell",
    "Supports chaining with then/catch/finally",
    "Powerful utilities: all, race, any, allSettled",
    "Foundation of async/await",
    "Uses microtask queue in Event Loop",
  ],
};
