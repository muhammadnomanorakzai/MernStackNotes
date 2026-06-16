export const memoryManagement = {
  id: "memory-management",
  title: "Memory Management & Garbage Collection",
  category: "JavaScript",
  difficulty: "Advanced",
  tags: [
    "garbage collection",
    "memory leak",
    "heap",
    "stack",
    "mark and sweep",
    "WeakRef",
    "WeakMap",
    "reachability",
  ],

  definition:
    "JavaScript automatically manages memory by allocating it when values are created and freeing it through garbage collection when those values become unreachable. Memory leaks occur when unused data is still accidentally referenced and cannot be collected.",

  simpleExplanation:
    "JavaScript handles memory automatically, so developers do not manually allocate or free memory.\n\nWhen you create variables, objects, or functions, memory is allocated. When they are no longer needed, garbage collection removes them.\n\nThe key idea is reachability — if something can still be accessed from a root reference (like global scope, active functions, or closures), it stays in memory.\n\nProblems happen when unused data is still reachable due to mistakes like event listeners, intervals, or closures.",

  romanUrduRevision:
    "JavaScript memory ko automatically manage karta hai.\nJo cheez reachable hoti hai woh memory mein rehti hai, warna garbage collector remove kar deta hai.",

  why: "Even though JavaScript has automatic garbage collection, real-world applications can still suffer from memory leaks.\nLong-running apps like SPAs, dashboards, and real-time systems can slowly consume more memory if references are not cleaned properly.\nUnderstanding memory helps prevent crashes, slow performance, and browser freezes.",

  how: [
    "Step 1 - Memory lifecycle: allocate → use → release",
    "Step 2 - Stack stores function calls and primitive references",
    "Step 3 - Heap stores objects, arrays, and functions",
    "Step 4 - Reachability is determined from root references (global, stack, closures)",
    "Step 5 - Mark phase identifies all reachable objects",
    "Step 6 - Sweep phase removes unreachable objects from heap",
    "Step 7 - Closures, event listeners, and timers can unintentionally keep objects alive",
    "Step 8 - WeakMap and WeakSet allow garbage collection by holding weak references",
  ],

  diagram: `
flowchart TD
  A[Root References Global Stack Closures] --> B[Mark Reachable Objects]
  B --> C[Object A reachable]
  B --> D[Object B reachable]
  E[Unreachable Object C] --> F[Not marked]
  F --> G[Sweep removes object]
  H[Event Listener Closure] --> I[Hidden reference keeps data alive]
  I --> J[Memory Leak]
  `,

  analogy:
    "Garbage collection is like a cleaning team in a building.\nThey start from occupied rooms and mark all connected rooms as active.\nAnything not connected to an active room is assumed abandoned and gets removed.\nA memory leak is like a fake occupied sign that keeps an empty room from being cleaned.",

  realLifeExample:
    "Imagine you are building a real-time stock market dashboard. You are listening for price updates every second. If you don't 'remove the listener' when the user closes the dashboard, the data keeps updating in the background forever. This 'invisible room' stays occupied in memory, and eventually, the browser crashes. Adding an 'unmount' cleanup is like the cleaning team finally clearing out that room.",

  code: `
// Memory leak example (bad practice)
function setupLeak() {
  const bigData = new Array(1000000).fill("data");

  document.getElementById("btn").addEventListener("click", () => {
    console.log(bigData.length); // closure keeps bigData alive forever
  });
}


// Safe cleanup pattern
function setupSafe() {
  const bigData = new Array(1000000).fill("data");
  const btn = document.getElementById("btn");

  function handler() {
    console.log(bigData.length);
  }

  btn.addEventListener("click", handler);

  return () => {
    btn.removeEventListener("click", handler);
  };
}


// Timer cleanup (important in real apps)
const id = setInterval(() => {
  console.log("running...");
}, 1000);

clearInterval(id);


// WeakMap example (prevents memory leaks)
const cache = new WeakMap();

function processUser(user) {
  if (cache.has(user)) return cache.get(user);

  const result = expensiveComputation(user);
  cache.set(user, result);

  return result;
}
  `,

  commonMistakes: [
    "Forgetting to remove event listeners",
    "Not clearing intervals or timeouts",
    "Closures holding large unused data",
    "Using global variables unnecessarily",
    "Keeping references to detached DOM nodes",
    "Using Map instead of WeakMap for object caching",
  ],

  interviewQA: [
    {
      q: "What is garbage collection in JavaScript?",
      a: "Garbage collection is an automatic process where JavaScript removes memory of objects that are no longer reachable from root references like global scope, stack, or closures.",
    },
    {
      q: "What is a memory leak?",
      a: "A memory leak happens when unused data is still referenced in memory, preventing garbage collection and causing memory usage to grow over time.",
    },
    {
      q: "What is the difference between heap and stack?",
      a: "Stack stores execution context and primitive references, while heap stores objects and dynamic data structures that are referenced from the stack.",
    },
    {
      q: "How does Mark and Sweep work?",
      a: "It starts from root references, marks all reachable objects, and then removes everything that is not marked during the sweep phase.",
    },
    {
      q: "Why is WeakMap useful?",
      a: "WeakMap allows object keys to be garbage collected automatically when no other references exist, helping prevent memory leaks in caches.",
    },
  ],

  interviewSummary:
    "JavaScript memory is automatically managed using garbage collection. The engine uses reachability rules and Mark and Sweep algorithm to free unused memory. However, developers must still prevent memory leaks caused by closures, event listeners, and global references.",
};
