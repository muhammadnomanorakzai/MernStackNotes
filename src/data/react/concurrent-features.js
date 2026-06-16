export const concurrentFeatures = {
  id: "concurrent-features",
  title: "Concurrent Features (useTransition, useDeferredValue)",
  category: "React",
  difficulty: "Advanced",
  tags: [
    "Concurrent React",
    "useTransition",
    "useDeferredValue",
    "Performance",
    "Non-blocking",
    "Interruptible",
    "v18",
  ],

  definition:
    "Concurrent features in React (v18+) allow the UI to remain responsive while rendering heavy updates. They enable React to prioritize urgent tasks (like typing in an input) while splitting or delaying expensive, non-urgent tasks (like filtering a massive list) until the main thread is free.",

  simpleExplanation:
    "Imagine you're trying to talk to someone while also doing a difficult math problem. Usually, you'd stop talking to finish the math (Blocking). Concurrent React lets you keep talking in small bursts while doing the math in the background. If the person asks a new question, you stop the math immediately to answer (Priority). it makes the app feel 'buttery smooth' even during heavy work.",

  romanUrduRevision:
    "React 18 ke concurrent features app ko 'hang' hone se bachate hain. Urgent updates (typing) ko priority milti hai, aur heavy updates (list filtering) background mein hoti hain. 'useTransition' se hum specify karte hain ke yeh update slow ho sakti hai, aur 'useDeferredValue' se hum piece of data ko 'low priority' bana sakte hain.",

  why: "In standard React, a single heavy update 'blocks' the browser—the user can't type or click until the render finishes. Concurrent features make rendering interruptible. This results in a highly responsive user experience where the UI never freezes.",

  how: [
    "Step 1 - Use 'useTransition' to mark an update as a transition (returns 'isPending' and 'startTransition').",
    "Step 2 - Wrap the expensive state update inside 'startTransition(() => { ... })'.",
    "Step 3 - Use the 'isPending' flag to show a loading indicator or dim the UI during the background work.",
    "Step 4 - Use 'useDeferredValue' when you have a piece of data (like a search query) that triggers an expensive re-render.",
    "Step 5 - Pass the 'deferredValue' to the child component so it updates with lower priority.",
  ],

  diagram: `
flowchart TD
    A[User Types: 'A'] --> B{Standard React}
    B --> C[Block UI]
    C --> D[Render 5000 items]
    D --> E[Unblock UI]
    
    A --> F{Concurrent React}
    F --> G[Priority: Show 'A' instantly]
    G --> H[Low Priority: Render items in background]
    H -->|User types 'B'| I[Interrupt Render]
    I --> J[Redo for 'AB']
    style F fill:#9b59b6,color:white
  `,

  analogy:
    "It's like a chef in a restaurant. If they are making a complex multi-course meal (Heavy Render) and a waiter comes in with a quick 'Glass of Water' order (Urgent Input), a standard chef finishes the meal first while the customer waits. A Concurrent Chef pauses the meal for 5 seconds to pour the water and then goes back to the meal.",

  realLifeExample:
    "A Search Input with live filtering: As the user types fast, the input box stays perfectly responsive. The list below might look slightly 'old' for a few milliseconds, but it never freezes the cursor. This provides a premium, high-performance feel to the search experience.",

  code: `
import { useState, useTransition, useDeferredValue } from 'react';

// 1. Using useTransition
function SearchList() {
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    // High Priority: Update input field
    const value = e.target.value;
    
    // Low Priority: Update filtered list
    startTransition(() => {
      setFilter(value);
    });
  };

  return (
    <div style={{ opacity: isPending ? 0.5 : 1 }}>
      <input onChange={handleChange} />
      {isPending && <p>Updating List...</p>}
      <HeavyList filter={filter} />
    </div>
  );
}

// 2. Using useDeferredValue
function Results({ query }) {
  // Wait until the main thread is free to update this value
  const deferredQuery = useDeferredValue(query);
  return <HeavyList filter={deferredQuery} />;
}
  `,

  commonMistakes: [
    "Wrapping every single state update in 'startTransition' (only use it for heavy, non-urgent updates).",
    "Using 'useTransition' together with 'useDeferredValue' for the same piece of state (usually you only need one).",
    "Forgetting to provide feedback to the user (like the 'isPending' spinner) which can make the app look broken.",
    "Assuming concurrent features magically make slow code fast (they just make the slowness less noticeable).",
  ],

  interviewSummary: [
    "useTransition is used for state updates; useDeferredValue is used for values.",
    "Transitions are 'interruptible'—they will be stopped if a more urgent update occurs.",
    "IsPending allows you to track whether the transition is still happening in the background.",
    "Concurrent features are part of the 'Time Slicing' mechanism in React 18.",
  ],
};
