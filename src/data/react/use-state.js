export const useStateHook = {
  id: "use-state",
  title: "useState — Deep Dive",
  category: "React",
  difficulty: "Beginner",
  tags: [
    "useState",
    "state",
    "re-render",
    "immutability",
    "functional update",
    "batch update",
    "initializer function",
    "stale closure",
  ],

  definition:
    "useState is a React Hook that adds state to functional components. It returns a pair: the current state value and a setter function. Calling the setter triggers a re-render with the new state value. State is preserved between renders — unlike regular variables which reset every render.",

  simpleExplanation:
    "useState is like a memory for your component. In React, functional components are just functions that run from top to bottom. Normally, any variable you create inside them gets wiped out when the function finishes. useState tells React: 'Hey, keep this value safe even when you re-run this component.'",

  romanUrduRevision:
    "useState functional components mein 'yaad_dash' (memory) add karne ke liye use hota hai.\n\nYe humein do cheezein deta hai: ek variable (current value) aur ek function (usko update karne ke liye).\n\nJab bhi setter function call hota hai, React component ko dubara chalata hai (re-render) aur UI update ho jati hai.",

  why: "Regular variables declared inside a component function reset on every render — they have no memory between renders. useState gives components persistent memory. Without it, UI could never respond to user interactions, data loading, or time. It is the fundamental building block of interactivity in React.",

  how: [
    "Step 1 - const [value, setValue] = useState(initialValue) — array destructuring is used to get the state and its setter.",
    "Step 2 - On first render: React initializes state to initialValue.",
    "Step 3 - On subsequent renders: React IGNORES initialValue — uses stored state instead.",
    "Step 4 - Calling setValue(newValue) → React schedules a re-render.",
    "Step 5 - On re-render: component function runs again, useState returns NEW value.",
    "Step 6 - React bails out (no re-render) if new value === old value (Object.is comparison).",
    "Step 7 - State updates are ASYNCHRONOUS — setValue does not immediately change the variable.",
    "Step 8 - Functional update: setValue(prev => prev + 1) — use when new value depends on old value to avoid stale closures.",
    "Step 9 - Batch updates: React 18 batches ALL state updates (even inside async callbacks) for performance.",
    "Step 10 - Initializer function: useState(() => expensive()) — lazy initialization runs ONLY on first render.",
  ],

  diagram: `
flowchart TD
    Start["Component renders for first time"] --> Hook["useState(0)"]
    Hook --> Storage["React creates state slot -> stores 0"]
    Storage --> Return["Returns [0, setter]"]
    Return --> UI["Component renders with count = 0"]

    Click["User clicks button -> setCount(count + 1)"] --> Schedule["React schedules re-render"]
    Schedule --> ReRun["Component function runs again"]
    ReRun --> Fetch["useState(0) returns STORED value (1)"]
    Fetch --> FinalUI["Component renders with count = 1"]

    subgraph Stale closure bug
    direction TB
    Timer["setTimeout captures count = 0"] --> Delay["3 seconds later"]
    Delay --> BadSet["setCount(count + 1) sets to 1 (stale!)"]
    Delay --> GoodSet["setCount(prev => prev + 1) uses LATEST value"]
    end
`,

  analogy:
    "useState is like a whiteboard outside your office door. Every time someone enters the office (component renders), they look at the whiteboard (useState) to know the current value. When you erase and rewrite the whiteboard (setValue), the next person who enters sees the new value. The whiteboard persists between visits — it does not reset every time someone opens the door. Regular variables are like sticky notes inside the office — thrown away every time the office is vacated.",

  realLifeExample:
    "Think of a social media 'Like' button. When you click it, the number increases from 10 to 11. That change needs to be 'remembered' so that even if the app does something else on the screen, that 11 stays there. useState is the memory that keeps that number 11 safe while React re-renders the button.",

  code: `
/**
 * REACT HOOKS RULES:
 * 1. Only call hooks at the TOP LEVEL — never inside loops, conditions, or nested functions.
 * 2. Only call hooks from REACT FUNCTION COMPONENTS or CUSTOM HOOKS — never from regular JS functions.
 * React relies on the ORDER of hook calls being the same every render to track state correctly.
 */

import React, { useState } from 'react';

// 1. Basic counter — state persists between renders
function Counter() {
  const [count, setCount] = useState(0);
  // Regular variable: resets to 0 on every render (no memory)
  let regularVar = 0;

  return (
    <div className="p-4 border rounded">
      <p>State count: {count}</p>
      <p>Regular var: {regularVar} (Always 0 on UI)</p>
      <button 
        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        onClick={() => setCount(count + 1)}
      >
        Increment State
      </button>
      <button 
        className="bg-gray-500 text-white px-2 py-1 rounded"
        onClick={() => { regularVar++; console.log('Regular Var:', regularVar); }}
      >
        Increment Var
      </button>
    </div>
  );
}

// 2. Object state — always spread, never mutate
function UserForm() {
  const [user, setUser] = useState({ name: "", email: "", age: 0 });

  // ❌ WRONG — mutates state directly
  // user.name = "Ali"; setUser(user); // React might not detect change

  // ✅ CORRECT — creates new object
  const updateField = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form className="space-y-2">
      <input 
        className="border p-1"
        placeholder="Name"
        value={user.name} 
        onChange={e => updateField("name", e.target.value)} 
      />
      <input 
        className="border p-1"
        placeholder="Email"
        value={user.email} 
        onChange={e => updateField("email", e.target.value)} 
      />
    </form>
  );
}

// 3. Functional update — fix stale closure bug
function Timer() {
  const [count, setCount] = useState(0);

  function startAsync() {
    // ❌ WRONG — captures count=0 in closure
    setTimeout(() => setCount(count + 1), 3000);

    // ✅ CORRECT — prev always gets the latest value
    setTimeout(() => setCount(prev => prev + 1), 3000);
  }

  return <button onClick={startAsync}>Start (count: {count})</button>;
}

// 4. Lazy initialization — expensive initial value
function ExpensiveComponent() {
  // ✅ CORRECT — runs expensiveCalc() ONLY on first render
  const [data, setData] = useState(() => {
    console.log("Expensive calculation running...");
    return { id: 1, val: "Complex Data" };
  });

  return <div>Data: {data.val}</div>;
}

// 5. Array state — adding and removing items
function TodoList() {
  const [todos, setTodos] = useState([]);
  
  const add    = (text) => setTodos(prev => [...prev, { id: Date.now(), text, done: false }]);
  const remove = (id)   => setTodos(prev => prev.filter(t => t.id !== id));
  const toggle = (id)   => setTodos(prev => prev.map(t => 
    t.id === id ? { ...t, done: !t.done } : t
  ));

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} onClick={() => toggle(todo.id)}>
          {todo.done ? <s>{todo.text}</s> : todo.text}
          <button onClick={() => remove(todo.id)}>x</button>
        </li>
      ))}
    </ul>
  );
}`,

  commonMistakes: [
    "Mutating state directly (e.g., state.push(item)) instead of returning a new copy.",
    "Assuming state updates immediately after calling the setter (it's asynchronous).",
    "Not using functional updates when the new state depends on the old state in async code.",
    "Declaring hooks inside if-statements or loops, breaking React's internal link list.",
    "Missing parentheses in object returns within set state: setObj(prev => ({ ...prev }))",
  ],

  interviewQA: [
    {
      q: "What is useState and how does it work?",
      a: "useState is a React Hook that adds persistent state to functional components. It returns an array of [currentValue, setterFunction]. On first render, state is initialized to the argument. On subsequent renders, React returns the stored state — the initial value is ignored. Calling the setter schedules a re-render with the new value.",
    },
    {
      q: "Why must you never mutate state directly?",
      a: "React uses reference equality (Object.is) to detect state changes. If you mutate an object directly and call setState with the same reference, React sees no change and skips the re-render. Always create new objects/arrays to ensure React correctly detects the update and re-renders.",
    },
    {
      q: "What is a functional update and when do you need it?",
      a: "A functional update passes a function to the setter: setValue(prev => prev + 1). React guarantees prev is always the latest state value — even in async operations or closures. Use it whenever the new state depends on the old state to avoid stale closure bugs.",
    },
    {
      q: "What is state batching in React 18?",
      a: "React 18 automatically batches multiple state updates into a single re-render, even inside setTimeout, fetch callbacks, and native event handlers. This improves performance by reducing unnecessary re-renders.",
    },
    {
      q: "What is lazy initialization in useState?",
      a: "Instead of useState(expensiveCalc()), pass a function: useState(() => expensiveCalc()). React calls it ONLY once — during the initial render. This prevents expensive computations from running on every single render.",
    },
  ],

  realWorldUsage: [
    "Managing form input values",
    "Toggling UI elements (modals, tooltips)",
    "Storing data fetched from an API",
    "Tracking user interactions and clicks",
    "Implementing local counters and timers",
  ],

  interviewSummary: [
    "useState adds persistent local state to functional components.",
    "Returns [value, setter] — destructuring is standard practice.",
    "Setter triggers re-render; React compares new/old values using Object.is.",
    "Always treat state as immutable — spread objects/arrays to update.",
    "Use functional updates (prev => ...) for computed state or inside closures.",
    "Lazy initialization helps with performance for expensive initial values.",
  ],
};
