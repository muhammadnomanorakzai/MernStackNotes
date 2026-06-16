export const asyncAwait = {
  id: "async-await",
  title: "Async / Await",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "async",
    "await",
    "try catch",
    "async function",
    "sequential",
    "parallel",
    "ES2017",
    "syntactic sugar",
    "Promise",
  ],

  definition:
    "async/await is syntactic sugar over Promises that allows asynchronous code to be written in a synchronous looking style. An async function always returns a Promise, and await pauses only that function until the Promise settles.",

  simpleExplanation:
    "JavaScript normally handles async work using Promises and then/catch chains. Async/await is a cleaner way to write the same logic.\n\nWhen you mark a function as async, it automatically returns a Promise.\nInside it, await pauses execution of that function until the Promise finishes.\n\nImportant: JavaScript engine does NOT stop. Only that async function pauses.\nThis makes async code easier to read, debug, and maintain like normal step-by-step code.",

  romanUrduRevision:
    "async/await Promise ka easy version hai jo code ko synchronous jaisa bana deta hai.\nawait sirf us function ko roکتا hai, poori JavaScript nahi.",

  why: "Async/await was introduced to solve readability and debugging problems in Promise chains. It makes asynchronous flows look like synchronous steps, which reduces complexity and improves maintainability in real-world applications like APIs, databases, and UI rendering.",

  how: [
    "Step 1 - async keyword marks a function that always returns a Promise",
    "Step 2 - await can only be used inside async functions",
    "Step 3 - await pauses execution until Promise resolves or rejects",
    "Step 4 - resolved value is returned directly like normal variable",
    "Step 5 - rejected Promise behaves like a thrown error",
    "Step 6 - try/catch is used to handle async errors cleanly",
    "Step 7 - multiple awaits run sequentially by default",
    "Step 8 - independent tasks should use Promise.all for parallel execution",
    "Step 9 - forgetting await returns a Promise instead of actual data",
  ],

  diagram: `
sequenceDiagram
  participant Caller
  participant AsyncFunction
  participant API

  Caller->>AsyncFunction: call async function
  AsyncFunction->>API: await request 1
  API-->>AsyncFunction: response 1
  AsyncFunction->>API: await request 2
  API-->>AsyncFunction: response 2
  AsyncFunction-->>Caller: final result
  `,

  analogy:
    "Async/await is like a chef following a recipe step by step. The chef waits for rice to cook before moving to the next step. But other chefs in the kitchen keep working on their own tasks. If two ingredients are independent, they can be prepared in parallel instead of waiting one by one.",

  realLifeExample:
    "Imagine a weather app. You first need to get the user's GPS location (async), then use that location to fetch the weather data (async), and finally update the screen. Async/await lets you write this as 3 simple lines of code instead of a messy 'callback hell'.",

  code: `
// Promise chain (old style)
getUser()
  .then(user => getPosts(user.id))
  .then(posts => console.log(posts))
  .catch(err => console.log(err));


// Async/Await (modern style)
async function loadData() {
  try {
    const user = await getUser();
    const posts = await getPosts(user.id);
    return posts;
  } catch (err) {
    console.log("Error:", err.message);
  }
}


// Parallel execution (important optimization)
async function loadBoth() {
  const [user, posts] = await Promise.all([
    getUser(),
    getPosts()
  ]);

  return { user, posts };
}


// Common mistake
async function test() {
  const data = getUser(); // ❌ missing await
  console.log(data); // Promise object, not real data
}
  `,

  commonMistakes: [
    "Forgetting await and working with Promise instead of value",
    "Using sequential await when parallel execution is possible",
    "Not using try/catch for error handling",
    "Thinking async/await blocks entire JavaScript engine",
    "Overusing await inside loops instead of batching with Promise.all",
  ],

  interviewQA: [
    {
      q: "What is async/await in JavaScript?",
      a: "Async/await is a modern syntax over Promises that makes asynchronous code look synchronous while still running non-blocking in the background.",
    },
    {
      q: "Does await block JavaScript execution?",
      a: "No. It only pauses the async function where it is used. The rest of JavaScript continues running normally.",
    },
    {
      q: "What happens if you forget await?",
      a: "You receive a Promise object instead of resolved data, which often causes bugs when treated like real value.",
    },
    {
      q: "How do you handle errors in async/await?",
      a: "Use try/catch blocks. If a Promise rejects, it behaves like a thrown exception.",
    },
    {
      q: "When should you use Promise.all with async/await?",
      a: "When multiple async tasks are independent and can run in parallel to improve performance.",
    },
  ],

  interviewSummary:
    "Async/await simplifies Promise-based asynchronous code into readable step-by-step logic. It does not block JavaScript, only pauses the function. Proper use of try/catch and Promise.all is essential for writing production-grade async code.",
};
