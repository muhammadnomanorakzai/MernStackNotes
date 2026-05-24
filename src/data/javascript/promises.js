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
    "A Promise is an object that represents the eventual completion or failure of an asynchronous operation. It starts pending and eventually settles as either fulfilled or rejected.",

  why:
    "Promises replaced deeply nested async callbacks with flat chains. They also made error handling more consistent by letting failures flow to one catch block instead of forcing repeated checks at every callback level.",

  how: [
    "Step 1 - A Promise is created with an executor that receives resolve and reject",
    "Step 2 - resolve moves the Promise from pending to fulfilled",
    "Step 3 - reject moves it from pending to rejected",
    "Step 4 - then attaches success handlers and returns a new Promise for chaining",
    "Step 5 - catch handles rejected results and also returns a Promise",
    "Step 6 - finally always runs after settlement and is good for cleanup",
    "Step 7 - Returning a plain value from then passes that value to the next then",
    "Step 8 - Returning another Promise from then makes the chain wait for it",
    "Step 9 - Promise all waits for all, allSettled waits for all results, race settles on first, and any resolves on first success",
  ],

  diagram: `
flowchart TD
  A[new Promise] --> B[PENDING]
  B --> C[resolve]
  B --> D[reject]
  C --> E[FULFILLED]
  D --> F[REJECTED]
  E --> G[then runs]
  F --> H[catch runs]
  E --> I[finally runs]
  F --> I
  `,

  analogy:
    "A Promise is like an order ticket at a restaurant. You do not have the food yet, but you do have a reliable placeholder for the future result. If the meal is completed, the success path runs. If the kitchen fails, the error path runs. Either way, the cleanup step still happens at the end.",

  code: `
const ticket = new Promise((resolve, reject) => {
  const ok = true;
  ok ? resolve("ready") : reject(new Error("failed"));
});

getUser()
  .then((user) => getPosts(user.id))
  .then((posts) => getComments(posts[0].id))
  .then((comments) => console.log(comments))
  .catch((err) => console.error("Centralized error:", err))
  .finally(() => console.log("Always runs"));

Promise.all([api1(), api2(), api3()]).then(console.log);
Promise.allSettled([ok1(), bad1(), ok2()]).then(console.log);
Promise.race([realFetch(), timeoutAfter5Seconds()]).then(console.log);
Promise.any([cdn1(), cdn2(), cdn3()]).then(console.log);

function promisifyRead(id) {
  return new Promise((resolve, reject) => {
    readUserData(id, (err, data) => (err ? reject(err) : resolve(data)));
  });
}
  `,

  interviewQA: [
    {
      q: "What are the three states of a Promise?",
      a: "A Promise can be pending, fulfilled, or rejected. Once it leaves pending and settles as fulfilled or rejected, that state never changes again.",
    },
    {
      q: "What is the difference between Promise.all and Promise.allSettled?",
      a: "Promise.all resolves only if every Promise fulfills, and it rejects immediately if any one fails. Promise.allSettled waits for every Promise to finish and always gives a status report for each result.",
    },
    {
      q: "How does Promise chaining work?",
      a: "Each then returns a new Promise. If a handler returns a plain value, the next then receives it directly. If it returns another Promise, the chain pauses until that Promise settles.",
    },
    {
      q: "Can a Promise be cancelled?",
      a: "Native Promises themselves are not cancellable once created. You can cancel the underlying operation, such as a fetch request, with tools like AbortController.",
    },
    {
      q: "What is the difference between Promise.race and Promise.any?",
      a: "Promise.race settles as soon as the first Promise settles, whether that result is success or failure. Promise.any ignores failures and resolves on the first successful Promise, rejecting only if they all fail.",
    },
  ],
};
