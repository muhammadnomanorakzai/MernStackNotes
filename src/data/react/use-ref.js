export const useRefHook = {
  id: "use-ref",
  title: "useRef",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "useRef",
    "DOM reference",
    "mutable ref",
    "no re-render",
    "forwardRef",
    "focus",
    "previous value",
    "timer ref",
  ],

  definition:
    "useRef returns a mutable ref object with a single .current property that persists across renders WITHOUT causing re-renders when changed. It is primarily used for accessing DOM elements directly or storing mutable values that should not trigger the component to re-draw.",

  simpleExplanation:
    "Imagine a notebook on the side of your desk. You can write something in it at any time, and it won't force you to restart your entire work process. Regular state (useState) is like a shared dashboard; whenever you change it, everyone has to stop and look. useRef is for things you want to remember 'quietly'.",

  romanUrduRevision:
    "useRef ek box ki tarah hai jisme aap kuch rakh sakte hain jo renders ke darmiyan 'gayab' nahi hota, lekin isko change karne se component dobara render nahi hota.\n\nZiada tar ye DOM elements (jesay input focus) ya esi values (jesay timer ID) ke liye use hota hai jo UI par asar nahi dalti.",

  why: "Sometimes you need to imperatively interact with the DOM (focus an input, measure an element, trigger an animation) — React's declarative model cannot express this. Other times you need a mutable value that persists across renders but changing it should NOT cause a re-render (timers, previous values, instance variables).",

  how: [
    "Step 1 - const ref = useRef(initialValue) — returns { current: initialValue }.",
    "Step 2 - ref.current is a plain mutable object property — changing it does NOT trigger re-render.",
    "Step 3 - The ref object itself is stable — same object reference across all renders.",
    "Step 4 - DOM ref: attach to JSX element via the ref attribute: <input ref={myRef} />.",
    "Step 5 - After mount: myRef.current points to the actual DOM node.",
    "Step 6 - Before mount or after unmount: myRef.current is null.",
    "Step 7 - Mutable value use: store any value that needs to persist but not trigger re-render.",
  ],

  diagram: `
flowchart LR
    subgraph Use Case 1: DOM Access
    Init1["useRef(null)"] --> Obj1["{ current: null }"]
    Obj1 --> Attachment["input ref={myRef}"]
    Attachment --> Mounted["React sets current = input DOM node"]
    Mounted --> Action["myRef.current.focus() works"]
    end

    subgraph Use Case 2: Mutable Value
    Init2["useRef(0)"] --> Obj2["{ current: 0 }"]
    Obj2 --> Update["ref.current = 5"]
    Update --> NoRender["Value changes silently - NO RE-RENDER"]
    end

    Obj2 -. contrast .-> State["useState(5) -> TRIGGERS RE-RENDER"]
`,

  analogy:
    "useRef is like a sticky note on the side of your monitor. You can read it, change it, scratch it out and rewrite it — and the work on your monitor (the render) is NEVER interrupted. Nobody else in the office is notified when you update the sticky note. useState is like a shared dashboard screen — when you update it, everyone in the office sees the change immediately (re-render triggered).",

  realLifeExample:
    "Think of a login form where you want the cursor to automatically be inside the 'Username' box as soon as the page loads. You can't just tell React 'put the cursor here' easily. You use useRef to 'grab' that specific input box and then tell it to .focus() after the page has finished drawing.",

  code: `
/**
 * REACT HOOKS RULES:
 * 1. Only call hooks at the TOP LEVEL.
 * 2. Only call hooks from REACT FUNCTION COMPONENTS or CUSTOM HOOKS.
 */

import React, { useState, useRef, useEffect } from 'react';

// 1. DOM Reference: Focus input programmatically
function SearchBar() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on mount - cannot do this declaratively
    inputRef.current.focus();
  }, []);

  function handleClear() {
    inputRef.current.value = "";   // Imperatively clear DOM value
    inputRef.current.focus();      // Re-focus
  }

  return (
    <div className="flex gap-2">
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="Type here..." 
        className="border p-2"
      />
      <button onClick={handleClear} className="bg-gray-200 p-2">Clear</button>
    </div>
  );
}

// 2. Mutable instance variable: Timer ID
function Stopwatch() {
  const [time, setTime] = useState(0);
  const timerRef = useRef(null); // Store timer ID without re-renders

  function start() {
    if (timerRef.current) return; // Prevent multiple timers
    timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
  }

  function stop() {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  // Cleanup on unmount
  useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">{time}s</h1>
      <div className="flex justify-center gap-4 mt-2">
        <button onClick={start} className="bg-green-500 text-white px-4 py-2">Start</button>
        <button onClick={stop} className="bg-red-500 text-white px-4 py-2">Stop</button>
      </div>
    </div>
  );
}

// 3. Tracking Previous Value
function PrevValueTracker({ count }) {
  const prevCountRef = useRef();

  useEffect(() => {
    // This runs AFTER the render, so it stores the "current" value
    // for the "next" render to see as "previous".
    prevCountRef.current = count;
  });

  const prevCount = prevCountRef.current;

  return (
    <p>
      Now: {count}, Before: {prevCount !== undefined ? prevCount : 'N/A'}
    </p>
  );
}

// 4. Contrast: useState vs useRef
function Comparison() {
  const [stateVal, setStateVal] = useState(0);
  const refVal = useRef(0);

  console.log("Component Rendered!");

  return (
    <div className="p-4 border">
      <p>State: {stateVal} (UI will update)</p>
      <p>Ref: {refVal.current} (UI will NOT update immediately)</p>

      <button onClick={() => setStateVal(v => v + 1)} className="border p-1 mr-2">
        Change State -> Re-render
      </button>
      <button onClick={() => { refVal.current++; console.log('Ref Value:', refVal.current); }} className="border p-1">
        Change Ref -> No Re-render
      </button>
    </div>
  );
}
`,

  commonMistakes: [
    "Trying to use ref.current during the initial render (it's null until the commit phase).",
    "Expecting the UI to update automatically when you change ref.current (it won't).",
    "Using a ref where you should be using state (if it needs to be seen on screen, use state).",
    "Accessing the DOM in a way that conflicts with React's own DOM management.",
    "Not cleaning up event listeners or timers stored in refs on unmount.",
  ],

  interviewQA: [
    {
      q: "What is useRef and what are its two main use cases?",
      a: "useRef returns a mutable object { current: value } that persists across renders without causing re-renders. (1) DOM refs — direct access to real DOM nodes for focus, scroll, or measurements. (2) Mutable instance variables — store values like timer IDs or previous props that shouldn't trigger re-renders.",
    },
    {
      q: "What is the difference between useRef and useState?",
      a: "Both persist values across renders. The key is reactivity. useState: changing value triggers a re-render. useRef: changing .current does NOT trigger a re-render. Use state for things that change the UI, use refs for things that only affect logic or imperative DOM acts.",
    },
    {
      q: "When would you use useRef over a regular variable inside a component?",
      a: "Regular variables reset on every render. useRef.current persists across renders. Use useRef when you need a value to survive re-renders WITHOUT causing additional re-renders when updated.",
    },
    {
      q: "What happens to ref.current before the component mounts?",
      a: "ref.current is null until after the component mounts and React has inserted the element into the DOM. React sets ref.current to the DOM node during the commit phase, which is why you should only access DOM refs inside useEffect or event handlers.",
    },
  ],

  realWorldUsage: [
    "Focusing an input field on page load",
    "Controlling a video player (play/pause/seek)",
    "Measuring the scroll position or element dimensions",
    "Storing the previous value of a prop or state",
    "Managing intervals and animation frame IDs",
  ],

  interviewSummary: [
    "useRef returns a persistent mutable object with a .current property.",
    "Changing .current DOES NOT trigger a re-render — it is 'invisible' to React's render cycle.",
    "Commonly used to grab DOM elements (focus, scroll, measurements).",
    "Also used as 'instance variables' for values that need to survive re-renders (timers, previous props).",
    "Ref values are available inside useEffect because it runs after the DOM is mounted.",
  ],
};
