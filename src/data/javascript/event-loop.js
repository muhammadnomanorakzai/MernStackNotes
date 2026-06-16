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
    "The Event Loop is the core mechanism in JavaScript that allows asynchronous code to work in a single-threaded environment. It continuously monitors the Call Stack, Microtask Queue, and Callback Queue, and decides when each piece of code should execute.",

  simpleExplanation:
    "JavaScript runs on a single thread, which means it can execute only one task at a time.\n\nBut real applications need async behavior like API calls, timers, and user events.\n\nThe Event Loop solves this problem by moving slow operations outside JavaScript (Web APIs) and bringing their results back later through queues.\n\nIt makes JavaScript non-blocking and keeps applications responsive.\n\nTwo important queues exist:\n- Microtask Queue (Promises)\n- Callback Queue (setTimeout, events)\n\nMicrotasks always run first before normal callbacks.",

  romanUrduRevision:
    "JavaScript single thread hota hai, yani ek waqt mein sirf ek kaam karta hai.\n\nEvent Loop async kaam ko handle karta hai.\n\nPromise pehle execute hota hai (microtask), aur setTimeout baad mein (callback queue).",

  why: "Without the Event Loop, JavaScript would freeze whenever it performs slow operations like network requests or timers.\n\nThe Event Loop allows JavaScript to remain fast and responsive by:\n- Offloading heavy work to Web APIs\n- Managing execution order efficiently\n- Prioritizing important tasks like Promises\n- Preventing UI blocking in browsers",

  how: [
    "Step 1 - JavaScript executes synchronous code in Call Stack",
    "Step 2 - Async tasks (setTimeout, fetch, events) go to Web APIs",
    "Step 3 - Web APIs handle these tasks outside JS engine",
    "Step 4 - When completed, callbacks move to queues",
    "Step 5 - Promise callbacks go to Microtask Queue",
    "Step 6 - setTimeout and events go to Callback Queue",
    "Step 7 - Event Loop checks if Call Stack is empty",
    "Step 8 - Microtask Queue is fully executed first",
    "Step 9 - Then one task from Callback Queue is executed",
    "Step 10 - Cycle repeats continuously",
  ],

  diagram: `
flowchart TD
  A[JavaScript Code Execution] --> B[Call Stack]

  B --> C{Async Task Found?}
  C -->|Yes| D[Web APIs]

  D --> E[Promise → Microtask Queue]
  D --> F[setTimeout/Event → Callback Queue]

  E --> G[Microtask Queue Priority]
  F --> H[Callback Queue]

  I[Event Loop] --> J{Call Stack Empty?}

  J -->|Yes| K[Drain Microtask Queue First]
  K --> L[Execute Callback Queue Task]

  L --> B
`,

  realLifeExample:
    "Imagine a hospital emergency system.\n\nDoctors (Call Stack) can only treat one patient at a time.\n\nMinor tasks go to nurses (Web APIs) for processing.\n\nCritical cases (Promises) are treated first when doctor is free.\n\nNormal cases (setTimeout) are handled afterward.\n\nThis ensures important tasks are prioritized without stopping the system.",

  analogy:
    "The Event Loop is like a restaurant kitchen.\n\n- Chef = Call Stack (works on one dish at a time)\n- Kitchen staff = Web APIs (handle timers, requests)\n- VIP counter = Microtask Queue (Promises)\n- Normal counter = Callback Queue (setTimeout)\n\nChef always finishes VIP orders first before normal orders.",

  code: `
// =========================
// BASIC EVENT LOOP ORDER
// =========================

console.log("1 Start");

setTimeout(() => {
  console.log("4 setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("3 Promise");
});

console.log("2 End");

// Output:
// 1 Start
// 2 End
// 3 Promise
// 4 setTimeout

// =========================
// MICROTASK PRIORITY
// =========================

Promise.resolve().then(() => {
  console.log("A");
  Promise.resolve().then(() => {
    console.log("B");
  });
});

setTimeout(() => {
  console.log("C");
}, 0);

// Output:
// A
// B
// C

// =========================
// EXECUTION FLOW MODEL
// =========================

// Call Stack executes sync code first
// Web APIs handle async tasks
// Microtask Queue runs BEFORE Callback Queue
// Event Loop keeps checking continuously
  `,

  commonMistakes: [
    "Thinking setTimeout runs immediately with 0ms delay",
    "Assuming Promises and setTimeout have same priority",
    "Confusing Call Stack with Event Loop",
    "Not understanding Microtask Queue priority",
    "Thinking JavaScript is multi-threaded",
    "Ignoring async behavior in interview questions",
    "Misunderstanding execution order in real apps",
  ],

  interviewQA: [
    {
      q: "What is the Event Loop in JavaScript?",
      a: "It is a mechanism that allows JavaScript to handle asynchronous operations by coordinating the Call Stack and task queues, ensuring non-blocking execution.",
    },
    {
      q: "What is the difference between Microtask and Callback Queue?",
      a: "Microtask Queue (Promises) has higher priority and runs before the Callback Queue (setTimeout, events).",
    },
    {
      q: "Why does setTimeout not run immediately?",
      a: "Because it is placed in the Callback Queue and only executes after the Call Stack is empty and Microtasks are completed.",
    },
    {
      q: "What executes first: Promise or setTimeout?",
      a: "Promise (Microtask Queue) executes first because it has higher priority than setTimeout.",
    },
    {
      q: "Is JavaScript synchronous or asynchronous?",
      a: "JavaScript is synchronous and single-threaded. Asynchronous behavior is handled by Web APIs and the Event Loop.",
    },
  ],

  realWorldUsage: [
    "API request handling in frontend apps",
    "UI responsiveness in browsers",
    "Node.js async operations",
    "Event handling (click, input, scroll)",
    "Timers and scheduling tasks",
    "Promise-based workflows",
    "Real-time applications (chat, notifications)",
  ],

  interviewSummary: [
    "Event Loop manages async execution in JavaScript",
    "Call Stack runs synchronous code",
    "Web APIs handle async operations",
    "Microtasks (Promises) run before callbacks",
    "setTimeout goes to Callback Queue",
    "JavaScript is single-threaded but non-blocking",
    "Execution order is critical in interviews",
  ],
};
