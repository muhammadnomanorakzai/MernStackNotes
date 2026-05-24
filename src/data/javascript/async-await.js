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
    "async and await are syntax built on top of Promises that make asynchronous code read like synchronous code. An async function always returns a Promise, and await pauses only that async function until the Promise settles.",

  why:
    "Promise chains are cleaner than callback hell, but async and await make complex async flows easier to read, debug, and write. They also make try and catch error handling feel natural for asynchronous work.",

  how: [
    "Step 1 - Mark a function with async and it will always return a Promise",
    "Step 2 - Use await inside it to pause until a Promise resolves or rejects",
    "Step 3 - When the Promise fulfills, execution resumes with the resolved value",
    "Step 4 - When it rejects, the rejection is thrown like an error",
    "Step 5 - Only the current async function pauses, not the entire engine",
    "Step 6 - Sequential awaits wait one after another and can be slower",
    "Step 7 - Promise all lets independent async tasks run in parallel",
    "Step 8 - Forgetting await leaves you holding a Promise object instead of data",
  ],

  diagram: `
sequenceDiagram
  participant Caller
  participant AsyncFn
  participant API
  Caller->>AsyncFn: fetchUserData()
  AsyncFn->>API: await getUser()
  API-->>AsyncFn: resolved user
  AsyncFn->>API: await getPosts(user id)
  API-->>AsyncFn: resolved posts
  AsyncFn-->>Caller: return user and posts
  `,

  analogy:
    "await is like placing a sticky note in your instructions that says pause here until this step finishes. The worker handling that set of instructions waits, but the rest of the office keeps moving. When two tasks are independent, using Promise.all is like sending both to assistants at the same time instead of waiting for one assistant to finish before starting the next.",

  code: `
// Callback hell
readUser(id, (err, user) => {
  if (err) return handleError(err);
  fetchPosts(user.id, (err, posts) => {
    if (err) return handleError(err);
    fetchComments(posts[0].id, (err, comments) => console.log(comments));
  });
});

// Promise chain
getUser().then((user) => getPosts(user.id)).then(console.log).catch(handleError);

// Async await
async function loadFlow() {
  const user = await getUser();
  const posts = await getPosts(user.id);
  return posts;
}

async function loadData() {
  try {
    const [user, posts] = await Promise.all([getUser(), getPosts()]);
    return { user, posts };
  } catch (err) {
    console.error("Failed:", err.message);
    return null;
  }
}
// const result = fetchData(); // Promise pending if await is forgotten
  `,

  interviewQA: [
    {
      q: "What does async or await do?",
      a: "async and await let Promise-based code read in a top-to-bottom style. async marks a function as Promise-returning, and await pauses that function until the Promise settles and then resumes with the result.",
    },
    {
      q: "What happens if you forget await?",
      a: "The async operation still starts, but your variable receives the Promise object instead of its resolved value. That often causes bugs because later code treats a pending Promise like real data.",
    },
    {
      q: "How do you handle errors in async or await?",
      a: "Wrap awaited operations in try and catch. If an awaited Promise rejects, the rejection is thrown as an error and can be caught just like synchronous exceptions.",
    },
    {
      q: "What is the difference between sequential and parallel execution?",
      a: "Sequential awaits wait for one task to finish before starting the next, which adds their times together. Parallel execution starts independent tasks at once, often with Promise.all, so total time is closer to the slowest single task.",
    },
    {
      q: "Does await block the entire JavaScript engine?",
      a: "No. await pauses only the current async function. Other code, event handlers, timers, and async tasks can continue running while that function is waiting.",
    },
  ],
};
