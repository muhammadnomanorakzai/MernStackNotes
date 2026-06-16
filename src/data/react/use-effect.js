export const useEffectHook = {
  id: "use-effect",
  title: "useEffect — Deep Dive",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "useEffect",
    "side effects",
    "dependency array",
    "cleanup",
    "AbortController",
    "infinite loop",
    "StrictMode",
    "synchronization",
  ],

  definition:
    "useEffect is a React Hook that synchronizes a component with an external system — running side effects after React has updated the DOM. Side effects include: API calls, subscriptions, timers, DOM manipulation, and event listeners. useEffect runs AFTER the render is painted to the screen — not during rendering.",

  simpleExplanation:
    "Think of rendering as 'painting' the screen. React's job is to paint efficiently. Side effects are anything that happens 'outside' of painting — like talking to a server or starting a timer. useEffect is a special 'after-paint' lounge where you can safely do these things without slowing down the initial paint.",

  romanUrduRevision:
    "useEffect ka kaam 'side effects' handle karna hai jo pure UI rendering se bahar hotay hain.\n\nMaslan API calls, Event Listeners, ya Timers.\n\nYe render hone ke baad chalta hai. Dependency array ([]) se hum control karte hain ke kab dobara chalna hai. Cleanup function leaks se bachata hai.",

  why: "React's render function must be pure — no side effects during rendering. useEffect provides a safe place to run effects AFTER rendering, ensuring the DOM is updated before effects run. It also provides a cleanup mechanism to prevent memory leaks and unexpected behavior when components unmount.",

  how: [
    "Step 1 - React renders component → updates DOM → THEN runs useEffect.",
    "Step 2 - Dependency array [] controls WHEN the effect runs: None = every render, [] = mount only, [a, b] = when a or b changes.",
    "Step 3 - Cleanup function: return () => { ... } is called before re-running the effect and on unmount.",
    "Step 4 - React 18 StrictMode: In development, React mounts → unmounts → remounts to help find bugs/missing cleanups.",
    "Step 5 - Async pattern: Cannot make useEffect callback async directly; must define/call async fn inside.",
    "Step 6 - Dependency tracking: ESLint warns if you forget variables used inside the effect in the dependency array.",
  ],

  diagram: `
flowchart TD
    subgraph First Render
    R1["Component Renders"] --> D1["DOM Updated"]
    D1 --> E1["useEffect Runs"]
    E1 --> S1["Effect Active"]
    end

    subgraph Dependency Changes
    C["Dep changes"] --> R2["Component Re-renders"]
    R2 --> D2["DOM Updated"]
    D2 --> CL["CLEANUP from previous effect runs"]
    CL --> E2["NEW effect runs"]
    end

    subgraph Unmount
    U["Component Unmounted"] --> CLF["CLEANUP runs one final time"]
    end

    subgraph Dependency Behavior
    direction LR
    NoArr["No array"] --> Every["Every update"]
    EmptyArr["[]"] --> Mount["Mount only"]
    DepArr["[id]"] --> Specific["Mount + id change"]
    end
`,

  analogy:
    "useEffect is like a subscription service manager. After you move into a house (component mounts → render complete), you set up subscriptions: internet, newspaper, Netflix (side effects). Each subscription has a cancellation procedure (cleanup). When you move to a different house (deps change) or move out entirely (unmount): you CANCEL the old subscriptions BEFORE setting up new ones. If you forget to cancel (no cleanup), you keep getting billed (memory leaks).",

  realLifeExample:
    "Imagine a chat application. When you open a chat room, you need to 'connect' to the server to receive messages. When you leave the room, you must 'disconnect' to save battery and data. useEffect handles that connection when the room opens and the disconnection (cleanup) when the room closes.",

  code: `
/**
 * REACT HOOKS RULES:
 * 1. Only call hooks at the TOP LEVEL — never inside loops, conditions, or nested functions.
 * 2. Only call hooks from REACT FUNCTION COMPONENTS or CUSTOM HOOKS — never from regular JS functions.
 */

import React, { useState, useEffect } from 'react';

// 1. Four common patterns
function EffectPatterns({ userId }) {
  const [time, setTime] = useState(0);

  // Pattern A: Runs after EVERY render
  useEffect(() => {
    console.log("I run after every single paint");
  });

  // Pattern B: Runs ONCE on mount
  useEffect(() => {
    console.log("I run only once when component starts");
  }, []);

  // Pattern C: Runs when specific variables change
  useEffect(() => {
    console.log("I run when userId changes:", userId);
  }, [userId]);

  // Pattern D: With Cleanup
  useEffect(() => {
    const id = setInterval(() => setTime(prev => prev+1), 1000);
    return () => {
      console.log("Cleaning up timer...");
      clearInterval(id);
    };
  }, []); // Pairs setInterval with clearInterval

  return <div>Timer: {time}s</div>;
}

// 2. Data Fetching with AbortController (Clean Pattern)
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(\`/api/users/\${userId}\`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return; // Expected when unmounted
        console.error(err);
      });

    return () => controller.abort(); // Cancel fetch if userId changes or unmounts
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  return <div>{user?.name}</div>;
}

// 3. Avoiding Infinite Loops
function FixLoop() {
  const [count, setCount] = useState(0);

  // ❌ BAD: setCount causes re-render -> effect runs -> setCount -> ...
  // useEffect(() => { setCount(count + 1) }, [count])

  // ✅ GOOD: Functional update removes dependency on 'count'
  useEffect(() => {
     const timer = setTimeout(() => {
        setCount(prev => prev + 1);
     }, 1000);
     return () => clearTimeout(timer);
  }, []); // Run once, but timer updates state safely

  return <div>Count: {count}</div>;
}

// 4. Correct Async Pattern
function AsyncEffect() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // ❌ useEffect(async () => ...) is WRONG because it returns a promise
    
    // ✅ Define and call inside
    const load = async () => {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    };

    load();
  }, []);

  return <div>Items: {data.length}</div>;
}
`,

  commonMistakes: [
    "Missing dependency array results in effect running on every render, causing performance issues.",
    "Forgetting the cleanup function (e.g., not clearing setInterval or removing event listeners).",
    "Making the useEffect callback function 'async' (it must return a cleanup fn or undefined).",
    "Creating an infinite loop by updating a state variable that is also in the dependency array.",
    "Not using AbortController for fetch requests, leading to 'state update on unmounted component' warnings.",
  ],

  interviewQA: [
    {
      q: "What is useEffect used for?",
      a: "useEffect is used to synchronize a component with external systems — running side effects after React has rendered and updated the DOM. Common uses: fetching data from APIs, setting up subscriptions, adding DOM event listeners, starting timers, and integrating with third-party libraries.",
    },
    {
      q: "What is the dependency array in useEffect?",
      a: "The second argument to useEffect controls when the effect runs. No array: runs after every render. Empty array []: runs only once after mount. Array with values [a, b]: runs after mount and whenever a or b changes (compared with Object.is).",
    },
    {
      q: "What is the cleanup function and why is it important?",
      a: "The cleanup function is returned from useEffect. React calls it before running the effect again and when the component unmounts. It prevents memory leaks and bugs: cancel fetch requests, clear intervals, and remove event listeners.",
    },
    {
      q: "Why can't you make the useEffect callback async?",
      a: "useEffect's callback must return either a cleanup function or undefined. An async function always returns a Promise — not a cleanup function or undefined. This would silently break cleanup behavior. Fix: define an async function INSIDE the callback.",
    },
    {
      q: "What does React 18 StrictMode do to useEffect?",
      a: "In development mode, React 18 StrictMode intentionally mounts, unmounts, and remounts every component to help find missing cleanup functions. Effects run twice — mount effect, then cleanup, then effect again. This only happens in development.",
    },
  ],

  realWorldUsage: [
    "Fetching data from a REST API or GraphQL endpoint",
    "Subscribing to WebSockets or Firebase real-time updates",
    "Adding global window or document event listeners",
    "Starting and stopping timers (setInterval, setTimeout)",
    "Initializing a third-party library (e.g., Google Maps, Chart.js)",
  ],

  interviewSummary: [
    "useEffect handles side effects after the component renders and DOM updates.",
    "Dependency array controls execution: empty [] for mount, variables [dep] for changes.",
    "Cleanup function is crucial for preventing memory leaks and resource conflicts.",
    "React 18 StrictMode deliberately runs effects twice in dev to catch cleanup bugs.",
    "Always stabilize function dependencies with useCallback or move them inside the effect.",
  ],
};
