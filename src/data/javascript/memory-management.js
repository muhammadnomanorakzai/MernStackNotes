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
    "JavaScript automatically allocates memory when values are created and frees memory through garbage collection when objects are no longer reachable. Memory leaks happen when unused objects are accidentally kept reachable.",

  why:
    "JavaScript removes the need for manual memory management, but long-running apps can still slow down or crash when references are kept alive by mistake. Understanding reachability helps prevent leaks in SPAs, event-heavy interfaces, and cached data structures.",

  how: [
    "Step 1 - Memory follows the lifecycle allocate, use, then release",
    "Step 2 - Stack memory stores primitives and references for active function calls",
    "Step 3 - Heap memory stores objects and functions with dynamic size",
    "Step 4 - An object is reachable if it can be accessed from roots like globals, active calls, or closures",
    "Step 5 - Mark and Sweep starts from roots and marks all reachable objects",
    "Step 6 - The sweep phase removes unmarked objects because they are unreachable",
    "Step 7 - Leaks happen when listeners, intervals, closures, detached DOM nodes, or globals keep old data reachable",
    "Step 8 - WeakMap and WeakSet hold weak references so keys can still be collected",
  ],

  diagram: `
flowchart TD
  A[Roots global stack closures] --> B[Mark Object A]
  B --> C[Mark Object B]
  C --> D[Mark Object C]
  E[Object D no root path] --> F[Not marked]
  G[Object E no root path] --> H[Not marked]
  F --> I[Sweep deletes garbage]
  H --> I
  J[Event listener closure] --> K[Large data remains reachable]
  K --> L[Memory leak until cleanup]
  `,

  analogy:
    "Garbage collection is like a city inspection team that starts from known occupied buildings and marks every connected address. Anything unmarked is considered abandoned and can be cleared. A memory leak is a forgotten sign of occupancy that makes an empty building look active, so it cannot be reclaimed.",

  code: `
function setupLeak() {
  const bigData = new Array(1000000).fill("data");
  document.getElementById("btn").addEventListener("click", () => {
    console.log(bigData.length); // closure keeps bigData alive
  });
}

function setupSafe() {
  const bigData = new Array(1000000).fill("data");
  const btn = document.getElementById("btn");
  const handler = () => console.log(bigData.length);
  btn.addEventListener("click", handler);
  return () => btn.removeEventListener("click", handler);
}

const id = setInterval(() => console.log("tick"), 1000);
clearInterval(id);

const cache = new WeakMap();
function processUser(userObj) {
  if (cache.has(userObj)) return cache.get(userObj);
  const result = expensiveComputation(userObj);
  cache.set(userObj, result);
  return result;
}
  `,

  interviewQA: [
    {
      q: "What is garbage collection in JavaScript?",
      a: "Garbage collection is automatic memory management. The engine starts from root references, marks reachable objects, and frees memory for objects that cannot be reached anymore.",
    },
    {
      q: "What is a memory leak and how can it happen?",
      a: "A memory leak happens when unused objects remain reachable through accidental references. Common causes include forgotten event listeners, uncleared intervals, closures holding large data, detached DOM nodes, and global arrays that grow forever.",
    },
    {
      q: "What is the difference between WeakMap and Map regarding memory?",
      a: "Map holds strong references to keys, so keys stay alive while the Map exists. WeakMap holds weak references to object keys, so entries disappear automatically when the key object has no other references.",
    },
    {
      q: "What is the Mark and Sweep algorithm?",
      a: "Mark and Sweep starts from roots like globals and the call stack, marks every reachable object, then sweeps away unmarked objects. Unmarked objects are unreachable and safe to free.",
    },
  ],
};
