export const virtualDom = {
  id: "virtual-dom",
  title: "Virtual DOM",
  category: "React",
  difficulty: "Intermediate",
  tags: ["react", "performance", "rendering", "reconciliation"],
  lastRevised: null,
  mastery: 0,

  definition:
    "The Virtual DOM is a lightweight JavaScript object representation of the real browser DOM. React uses it to calculate the minimum number of changes needed before updating the actual screen.",

  why:
    "Directly manipulating the real DOM is slow because any change triggers reflow and repaint in the browser. The Virtual DOM allows React to batch and minimize DOM operations — making UI updates dramatically faster.",

  how: [
    "React maintains a Virtual DOM — a JS object tree mirroring the real DOM",
    "When state or props change, React creates a NEW Virtual DOM tree",
    "React compares new tree vs old tree — this is called Diffing",
    "The algorithm finds the exact nodes that changed (reconciliation)",
    "React updates ONLY those specific nodes in the real DOM",
    "Browser repaints only the changed parts — not the full page",
  ],

  diagram: `
sequenceDiagram
  participant Dev as Your Code
  participant VD as Virtual DOM
  participant Diff as Diff Algorithm
  participant RD as Real DOM
  participant Browser as Browser Screen

  Dev->>VD: State changes → new VDOM tree created
  VD->>Diff: Compare old VDOM vs new VDOM
  Diff->>Diff: Find exact differences (reconciliation)
  Diff->>RD: Apply ONLY changed nodes
  RD->>Browser: Browser repaints changed parts only
  `,

  analogy:
    "Imagine you have a large printed document (the real DOM). Every time you want to change one word, you reprint the entire document — that is slow and wasteful. Instead, React keeps a digital draft (Virtual DOM). It edits the draft, compares it to the last version, finds only the changed words, and then applies just those corrections to the printed copy. Much faster.",

  code: `
// You write this JSX (React code)
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter</h1>           {/* Never changes */}
      <p>Count: {count}</p>      {/* Only this node updates */}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// When button is clicked:
// 1. New Virtual DOM created
// 2. Compared with previous Virtual DOM
// 3. Only <p>Count: {count}</p> is different
// 4. React updates ONLY that <p> in the real DOM
// 5. <h1> and <button> are NOT touched
  `,

  interviewQA: [
    {
      q: "What is the Virtual DOM?",
      a: "A lightweight in-memory JavaScript representation of the real DOM. React uses it to calculate minimal updates before touching the actual browser DOM.",
    },
    {
      q: "What is the difference between Virtual DOM and Real DOM?",
      a: "Real DOM changes trigger expensive browser reflows and repaints. Virtual DOM is just a JS object — manipulating it is cheap. React calculates changes in VDOM first, then applies only the diff to the Real DOM.",
    },
    {
      q: "What is reconciliation?",
      a: "Reconciliation is React's process of comparing the old and new Virtual DOM trees to determine the minimum set of changes needed to update the real DOM.",
    },
    {
      q: "Does React always use the Virtual DOM?",
      a: "React DOM (web) uses Virtual DOM. React Native uses a similar diffing concept but targets native components, not DOM nodes.",
    },
  ],
};
