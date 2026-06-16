export const reactMemo = {
  id: "react-memo",
  title: "React.memo — Skip Unnecessary Re-renders",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "React.memo",
    "Optimization",
    "Memoization",
    "Re-renders",
    "Higher Order Component",
    "Props comparison",
  ],

  definition:
    "React.memo is a Higher Order Component (HOC) that optimizes performance by preventing a functional component from re-rendering if its props haven't changed. It performs a shallow comparison of props and caches the rendered result, reusing it when possible.",

  simpleExplanation:
    "Normally, when a parent component updates, all its children update too—even if their data didn't change. It's like re-printing a whole book just because you changed one sentence on page 5. React.memo tells React: 'Hey, if my props are exactly the same as last time, don't waste time re-rendering me. Just show the same result again.'",

  romanUrduRevision:
    "React.memo ek optimization tool hai jo component ko faltu re-renders se bachata hai. Agar child component ke props same hain, toh parent ke update hone par bhi child update nahi hoga. Yeh 'shallow comparison' karta hai props ki. Performance barhane ke liye yeh bohot zaroori hai.",

  why: "In large applications, small re-renders can add up and make the UI feel laggy. React.memo is essential for heavy components (like lists or charts) that receive specific, stable props but live inside parents that update frequently.",

  how: [
    "Step 1 - Wrap your component export with 'React.memo(MyComponent)'.",
    "Step 2 - Ensure props passed to the component are stable (use 'useCallback' for functions and 'useMemo' for objects).",
    "Step 3 - By default, it uses shallow comparison (props1 === props2).",
    "Step 4 - If needed, provide a custom comparison function as a second argument: 'React.memo(Component, arePropsEqual)'.",
    "Step 5 - Only use it where re-renders are actually expensive; it has a small memory cost for caching.",
  ],

  diagram: `
flowchart TD
    A[Parent Updates] --> B{Is Child wrapped in memo?}
    B -- No --> C[Child Re-renders]
    B -- Yes --> D{Have Props Changed?}
    D -- Yes --> C
    D -- No --> E[Skip Re-render / Use Cache]
    style B fill:#3498db,color:white
    style E fill:#2ecc71,color:white
  `,

  analogy:
    "Imagine a professional painter (Component). The client (Parent) checks in every hour. Usually, the painter re-paints the whole wall even if nothing changed. React.memo is like an assistant who tells the client: 'The wall looks exactly the same as 1 hour ago, no need to pay the painter to do it again.' We save time and effort.",

  realLifeExample:
    "A User Profile Card in a feed: While the user scrolls through the 'Latest News' (Parent), the 'User Progress Card' at the top doesn't change. Wrapping it in React.memo ensures it doesn't re-calculate its UI every time a new news item is loaded into the feed.",

  code: `
import React, { useState } from 'react';

// 1. A heavy component wrapped in memo
const ListComponent = React.memo(({ items }) => {
  console.log("Rendering ListComponent...");
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.text}</li>)}
    </ul>
  );
});

// 2. Parent component
function App() {
  const [count, setCount] = useState(0);
  const [items] = useState([{ id: 1, text: 'Stable Item' }]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>Re-render Parent</button>
      
      {/* 
        Even though 'count' changes, ListComponent 
        will NOT re-render because 'items' prop is stable.
      */}
      <ListComponent items={items} />
    </div>
  );
}
  `,

  commonMistakes: [
    "Wrapping every single component in memo (caching cost can exceed re-render cost for small components).",
    "Forgetting that non-primitive props (objects/functions) need 'useMemo' or 'useCallback' to stay stable.",
    "Using it when props change on every render anyway (renders redundant the memo check).",
    "Thinking it prevents state updates from within the component (memo only watches props).",
  ],

  interviewSummary: [
    "React.memo is a High Order Component for memoizing functional components.",
    "It implements a shallow comparison of props by default.",
    "It helps optimize performance by bailing out of re-renders when inputs haven't changed.",
    "To handle objects or functions effectively with memo, pair it with useCallback and useMemo.",
  ],
};
