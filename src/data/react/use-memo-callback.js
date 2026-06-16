export const useMemoCallback = {
  id: "use-memo-callback",
  title: "useMemo & useCallback",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "useMemo",
    "useCallback",
    "memoization",
    "performance",
    "re-render",
    "referential equality",
    "React.memo",
    "optimization",
  ],

  definition:
    "useMemo and useCallback are performance optimization hooks. useMemo memoizes the RESULT of a computation (recalculates only when deps change). useCallback memoizes a FUNCTION REFERENCE itself, ensuring the same function instance is used across renders unless dependencies change.",

  simpleExplanation:
    "Imagine you're solving a complex math problem. useMemo is like writing the answer on a piece of paper so you don't have to solve it again if the numbers haven't changed. useCallback is like giving someone a business card so they have the exact same contact every time, instead of you writing your info on a new scrap of paper every single minute.",

  romanUrduRevision:
    "useMemo calculation ka result save karta hai, jabke useCallback poora function save karta hai.\n\nJab component re-render hota hai to sab kuch dubara banta hai. In hooks se hum React ko kehte hain ke 'agar dependencies nahi badleen, to wahi purani cheez return karo'. Ye performance barhane ke liye use hota hai.",

  why: "React re-runs the entire component function on every render. Expensive computations run again, and all function literals are recreated as new references. This can cause unnecessary work or break optimizations like React.memo. These hooks preserve 'referential equality'.",

  how: [
    "Step 1 - useMemo: const result = useMemo(() => expensiveFn(a), [a]). Caches the return value.",
    "Step 2 - useCallback: const fn = useCallback(() => handler(a), [a]). Caches the function instance.",
    "Step 3 - React compares dependencies using Object.is. If unchanged, it returns the cached version.",
    "Step 4 - usage: useMemo for CPU-heavy tasks or stable object references.",
    "Step 5 - usage: useCallback for functions passed as props to memoized children (React.memo).",
    "Step 6 - Important: Don't over-optimize. Memoization has its own memory/CPU cost.",
  ],

  diagram: `
flowchart TD
    subgraph useMemo Process
    P1["Parent Renders"] --> M["useMemo checks deps"]
    M -- "Deps Same" --> C1["Return CACHED Value"]
    M -- "Deps Different" --> R1["Run Calculation -> Update Cache"]
    end

    subgraph useCallback Process
    P2["Parent Renders"] --> CB["useCallback checks deps"]
    CB -- "Deps Same" --> C2["Return SAME Function Ref"]
    CB -- "Deps Different" --> R2["Create NEW Function Ref"]
    end

    C2 --> Child["Child (React.memo) skips re-render!"]
`,

  analogy:
    "useMemo is like a student who writes complex math solutions on paper. First time: work through the entire calculation (expensive). Write down the answer and keep the paper. Same question next time: check the paper — give the cached answer instantly. Only redo if the numbers change. useCallback is like a business card. Instead of rewriting your contact info every time (new function every render), you hand the same business card (same function reference). The recipient (child component) doesn't need to update their address book (doesn't re-render).",

  realLifeExample:
    "Imagine a massive list of 10,000 products that you need to sort by price. Sorting takes a lot of CPU power. With useMemo, React only re-sorts if the products actually change. If you just change the page background color, React remembers the last sorted list and doesn't waste time sorting it again.",

  code: `
/**
 * REACT HOOKS RULES:
 * 1. Only call hooks at the TOP LEVEL.
 * 2. Only call hooks from REACT FUNCTION COMPONENTS or CUSTOM HOOKS.
 */

import React, { useState, useMemo, useCallback } from 'react';

// 1. useMemo for expensive computation
function HeavyCalculation({ numbers, theme }) {
  // ❌ BAD: Runs on EVERY render, even if only 'theme' changes
  // const total = numbers.reduce((sum, n) => sum + n, 0);

  // ✅ GOOD: Only runs when 'numbers' specifically changes
  const total = useMemo(() => {
    console.log("Calculating total...");
    return numbers.reduce((sum, n) => sum + n, 0);
  }, [numbers]);

  return <div style={{ color: theme === 'dark' ? 'white' : 'black' }}>Total: {total}</div>;
}

// 2. useCallback for stable function references
const MemoizedButton = React.memo(({ onClick, label }) => {
  console.log(\`Rendering Button: \${label}\`);
  return <button onClick={onClick} className="border p-2">{label}</button>;
});

function App() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false);

  // ❌ BAD: New function every render. MemoizedButton WILL re-render!
  // const handleClick = () => setCount(c => c + 1);

  // ✅ GOOD: Same function instance. MemoizedButton SKIPS re-render!
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty deps because it only uses setter

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setOtherState(!otherState)}>Toggle Other State</button>
      
      <MemoizedButton onClick={handleClick} label="Increment" />
    </div>
  );
}

// 3. useMemo for stable Object Reference
function ConfigComponent({ userId }) {
  // ✅ If passed to a memoized child, this prevents unnecessary re-renders
  const config = useMemo(() => ({
    id: userId,
    role: 'admin',
    timestamp: Date.now()
  }), [userId]);

  return <ExpensiveChild config={config} />;
}
`,

  commonMistakes: [
    "Over-optimizing by memoizing simple daily tasks that are cheap to re-run.",
    "Forgetting dependencies, which leads to stale closures and bugs.",
    "Using useCallback without wrapping the child in React.memo (it provides no benefit).",
    "Memoizing a value that is already stable (like a static object outside the component).",
    "Assuming useMemo will definitely preserve the value; React may discard it to free memory.",
  ],

  interviewQA: [
    {
      q: "What is the difference between useMemo and useCallback?",
      a: "useMemo memoizes the RETURN VALUE of a computation. useCallback memoizes the FUNCTION instance itself. useCallback(fn, deps) is just sugar for useMemo(() => fn, deps).",
    },
    {
      q: "When should you use useMemo?",
      a: "Use it for expensive calculations (filtering/sorting 10,000 items) or to maintain referential equality of objects passed as dependencies to other hooks or memoized components.",
    },
    {
      q: "Why does useCallback matter with React.memo?",
      a: "Functions are objects. Re-creating a function in the parent means a new reference. React.memo sees the new reference and re-renders the child. useCallback stops this by providing the same reference.",
    },
    {
      q: "What is referential equality and why does it matter?",
      a: "It checks if two variables point to the same memory location (===). Since objects/arrays/functions are new references every render, we need memoization hooks to keep them stable across renders.",
    },
  ],

  realWorldUsage: [
    "Filtering and sorting large datasets based on user input",
    "Memoizing complex SVG or chart data to prevent re-calculations",
    "Passing stable event handlers to highly optimized list items",
    "Preventing infinite loops in useEffect where an object/function is a dependency",
    "Stabilizing context values to prevent broad re-renders across the tree",
  ],

  interviewSummary: [
    "useMemo caches computed values based on dependencies.",
    "useCallback caches function instances to maintain referential equality.",
    "Referential equality (===) is critical for React.memo and useEffect dependency arrays.",
    "Optimization should be driven by measurements (profiling), not assumptions.",
    "useCallback(fn, deps) is essentially useMemo(() => fn, deps).",
  ],
};
