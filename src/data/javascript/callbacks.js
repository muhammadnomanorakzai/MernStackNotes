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
    "A callback is a function passed into another function so it can be executed later. Callback Hell is the deeply nested structure that appears when many dependent async operations are chained with callbacks.",

  why:
    "Callbacks were JavaScript's original async tool and are still used in events and older Node.js APIs. Understanding their limits explains why Promises and async or await were introduced to improve readability and error handling.",

  how: [
    "Step 1 - One function receives another function as an argument",
    "Step 2 - The outer function does some work, either sync or async",
    "Step 3 - When the work completes, it calls the callback with results",
    "Step 4 - Array methods use synchronous callbacks that run immediately during iteration",
    "Step 5 - Timers and I O APIs use asynchronous callbacks that run later through the Event Loop",
    "Step 6 - Node.js commonly uses error-first callbacks where the first argument is an error",
    "Step 7 - When many async steps depend on previous results, callbacks become deeply nested",
    "Step 8 - That nesting creates callback hell, repeated error handling, and hard-to-read code",
  ],

  diagram: `
flowchart TD
  A[readUser callback] --> B[fetchPosts callback]
  B --> C[fetchComments callback]
  C --> D[fetchLikes callback]
  D --> E[Deep nesting pyramid]
  E --> F[Repeated error handling]
  E --> G[Hard to read and maintain]
  `,

  analogy:
    "Callback Hell is like opening nested boxes where every next instruction is hidden inside the previous one. You cannot jump ahead, and every time something goes wrong you must handle it inside that current box. The deeper the nesting gets, the harder the whole process becomes to manage.",

  code: `
console.log([1, 2, 3].map((x) => x * 2)); // sync callback
setTimeout(() => console.log("done"), 1000); // async callback

function readUserData(id, callback) {
  setTimeout(() => {
    if (!id) return callback(new Error("No ID provided"), null);
    callback(null, { id, name: "Ali" });
  }, 100);
}

readUser(id, (err, user) => {
  if (err) return handleError(err);
  fetchPosts(user.id, (err, posts) => {
    if (err) return handleError(err);
    fetchComments(posts[0].id, (err, comments) => {
      if (err) return handleError(err);
      fetchLikes(comments[0].id, (err, likes) => {
        if (err) return handleError(err);
        console.log(likes); // buried four levels deep
      });
    });
  });
});
// Promises flatten this in the next topic
  `,

  interviewQA: [
    {
      q: "What is a callback function?",
      a: "A callback is a function passed into another function so it can be called when the outer function finishes its work. It can run immediately, like in map, or later, like in setTimeout.",
    },
    {
      q: "What is callback hell and why is it a problem?",
      a: "Callback hell is a deeply nested callback structure created by dependent async steps. It makes code hard to read, repeats error handling at each level, and makes maintenance and debugging much harder.",
    },
    {
      q: "How did Promises solve callback hell?",
      a: "Promises flatten nested callback chains into a readable sequence of then calls. They also centralize failure handling with one catch block instead of repeating error checks in every nested callback.",
    },
  ],
};
