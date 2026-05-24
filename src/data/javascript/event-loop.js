export const eventLoop = {
  id: "event-loop",
  title: "The Event Loop",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "event loop",
    "call stack",
    "web APIs",
    "callback queue",
    "microtask queue",
    "setTimeout",
    "Promise",
    "non-blocking",
    "single thread",
  ],

  definition:
    "The Event Loop is JavaScript's mechanism for handling asynchronous operations in a single-threaded environment. It watches the Call Stack and the task queues, then moves work back to the stack when JavaScript is ready to run it.",

  why:
    "JavaScript can only run one piece of code at a time on its main thread. Without the Event Loop, slow work like timers or network requests would freeze the page. The Event Loop keeps the UI responsive by letting browsers do slow work outside the engine and deliver callbacks later.",

  how: [
    "Step 1 - Synchronous JavaScript runs in the Call Stack from top to bottom",
    "Step 2 - Async APIs like setTimeout, fetch, and DOM events are handed to browser Web APIs",
    "Step 3 - Web APIs do the waiting or background work outside the JavaScript engine",
    "Step 4 - When the work finishes, callbacks are queued as either microtasks or callback queue tasks",
    "Step 5 - The Event Loop checks whether the Call Stack is empty",
    "Step 6 - If empty, it drains the entire Microtask Queue first",
    "Step 7 - Only after microtasks finish does it take one task from the Callback Queue",
    "Step 8 - That task is pushed onto the Call Stack and executed",
    "Step 9 - This cycle repeats forever, which is the Event Loop in action",
  ],

  diagram: `
flowchart TD
  A[JS code] --> B[Call Stack]
  B --> C[Async operation found]
  C --> D[Web APIs]
  D --> E[Promise callback]
  D --> F[Timer or event callback]
  E --> G[Microtask Queue]
  F --> H[Callback Queue]
  I[Event Loop] --> J[Call Stack empty]
  J --> K[Drain Microtask Queue first]
  K --> L[Take one from Callback Queue]
  L --> B
  L --> J
  `,

  analogy:
    "Picture a busy restaurant kitchen. The head chef is the Call Stack and can only work on one dish at a time. When something needs the oven or a timer, that work moves out of the chef's hands to the kitchen equipment. When it finishes, the completed task returns to one of two pickup counters. The chef always clears the VIP counter first, which is why Promise callbacks run before setTimeout callbacks.",

  code: `
console.log("1 - Start");
setTimeout(() => console.log("4 - setTimeout"), 0);
Promise.resolve().then(() => console.log("3 - Promise microtask"));
console.log("2 - End");
// Output:
// 1 - Start
// 2 - End
// 3 - Promise microtask
// 4 - setTimeout

Promise.resolve().then(() => {
  console.log("A");
  Promise.resolve().then(() => console.log("B"));
});
setTimeout(() => console.log("C"), 0);
// Output:
// A
// B
// C

// Stack and queue idea:
// Start: Stack [global], Microtasks [], Callbacks []
// After Promise.then: Microtasks [promise callback]
// After setTimeout: Callbacks [timer callback]
// Stack empties -> drain microtasks -> then run one callback
  `,

  interviewQA: [
    {
      q: "What is the Event Loop?",
      a: "The Event Loop is JavaScript's mechanism for running asynchronous code without blocking the main thread. It waits for the Call Stack to become empty, drains microtasks first, then processes queued callback tasks one by one.",
    },
    {
      q: "What is the difference between the Microtask Queue and the Callback Queue?",
      a: "Microtasks, such as Promise handlers, have higher priority and the queue is drained completely before the Event Loop touches the Callback Queue. The Callback Queue contains tasks like setTimeout and DOM events and runs after microtasks finish.",
    },
    {
      q: "Why does setTimeout with zero delay not run immediately?",
      a: "setTimeout never runs synchronously. Even with zero delay, its callback waits until current synchronous code finishes, the Call Stack becomes empty, and all queued microtasks have been processed first.",
    },
    {
      q: "Is JavaScript truly asynchronous?",
      a: "JavaScript itself is synchronous and single threaded. The asynchronous behavior comes from browser or Node.js APIs working outside the engine, while the Event Loop coordinates when their callbacks are allowed back onto the stack.",
    },
  ],
};
