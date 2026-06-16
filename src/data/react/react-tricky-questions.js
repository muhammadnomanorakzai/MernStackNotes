export const reactTrickyQuestions = {
  id: "react-tricky-questions",
  title: "React Tricky Interview Questions",
  category: "React",
  difficulty: "Advanced",
  tags: [
    "Interviews",
    "Tricky Questions",
    "Closures",
    "Batching",
    "Reconciliation",
    "Lifecycle",
    "Senior Interview",
  ],

  definition:
    "Tricky React questions focus on the low-level behavior of the library, especially how state updates are batched, how closures interact with hooks (stale closures), and how React's reconciliation algorithm works under the hood. These questions separate junior developers from seniors who truly understand the 'Event Loop' and 'React Fiber'.",

  simpleExplanation:
    "Tricky questions are like 'Optical Illusions' for programmers. Code that looks like it should work one way actually works another way because of how React handles updates behind the scenes. For example, updating a variable three times in a row won't actually change the screen three times; React 'batches' them into one single update to stay fast.",

  romanUrduRevision:
    "React ke tricky sawalat aksar 'Stale Closures', 'Batching', aur 'Asynchronous state' par hote hain. Aapko pata hona chahiye ke setState foran value update nahi karta, aur useEffect ke andar purani values kyun nazar aati hain. Senior interviews mein yeh concepts bohot zaroori hain.",

  why: "Interviewers ask these to see if you rely on 'magic' or if you understand the actual engineering. Understanding why a state update seems 'delayed' or why a component re-rendered 5 times instead of 1 is the key to debugging complex, high-pressure production bugs.",

  how: [
    "Step 1 - Study 'Automatic Batching' in React 18 (multiple updates grouped together).",
    "Step 2 - Master the 'Stale Closure' problem in hooks (using old values from a previous render).",
    "Step 3 - Learn the difference between 'Shallow' and 'Deep' comparison in React.memo and useEffect.",
    "Step 4 - Understand why 'keys' should never be Math.random().",
    "Step 5 - Explain how 'Suspense' works with the 'throw promise' mechanism (advanced topic).",
  ],

  diagram: `
flowchart LR
    A[State Update 1] --> D[Batch Queue]
    B[State Update 2] --> D
    C[State Update 3] --> D
    D --> E[Single Render Cycle]
    E --> F[Virtual DOM Diff]
    F --> G[Real DOM Update]
    style D fill:#f1c40f,color:black
  `,

  analogy:
    "Updating state is like sending a text message to a group chat. If you send 5 messages in 1 second, the other person's phone might only buzz once or group them together so it doesn't get annoying. This grouping is 'Batching'. If you try to reply to a message from 2 hours ago without reading the new ones, you are using 'Stale Information' (Stale Closure).",

  realLifeExample:
    "The 'Counter' Problem: If you call 'setCount(count + 1)' three times in a single function, the count only goes up by 1, not 3. Why? Because 'count' stays the same for that entire render cycle. To fix it, you must use the functional updater: 'setCount(prev => prev + 1)'.",

  code: `
// 1. THE TRICKY COUNTER
function TrickyCounter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // Result: Count is 1, not 3.
  };

  const handleCorrect = () => {
    setCount(p => p + 1);
    setCount(p => p + 1);
    setCount(p => p + 1);
    // Result: Count is 3.
  };
}

// 2. THE STALE CLOSURE
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // Will ALWAYS log 0
  }, 1000);
  return () => clearInterval(timer);
}, []); // Empty dependency array captures 'count' when it was 0
  `,

  commonMistakes: [
    "Assuming 'setState' is synchronous (it's not! You can't console.log the new value immediately after setting it).",
    "Forgetting dependencies in hooks, leading to stale closures that cause very quiet, hard-to-find bugs.",
    "Using 'Math.random()' as a key, which forces React to unmount and remount every child on every render.",
    "Not understanding that React 18 batches updates even inside promises and setTimeout (unlike React 17).",
  ],

  interviewSummary: [
    "State updates are asynchronous and batched for performance.",
    "Functional updates (prev => prev + 1) are required when the next state depends on the previous one.",
    "Stale closures occur when a function 'remembers' a variable from an old render cycle.",
    "React 18 introduced 'Automatic Batching' for all events, including async ones.",
  ],
};
