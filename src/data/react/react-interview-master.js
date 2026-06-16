export const reactInterviewMaster = {
  id: "react-interview-master",
  title: "React Interview Master Sheet",
  category: "React",
  difficulty: "Advanced",
  tags: [
    "Interview",
    "Cheat Sheet",
    "QA",
    "Rapid Fire",
    "Senior Level",
    "Fundamentals",
    "Advanced",
  ],

  definition:
    "The React Interview Master Sheet is a high-density collection of the most frequently asked React interview questions. It covers everything from basic component lifecycles to advanced architectural patterns, optimized for rapid review and deep conceptual understanding.",

  simpleExplanation:
    "This is your 'Ultimate Cheat Sheet'. It condenses hundreds of hours of React learning into short, punchy answers that interviewers love to hear. It's not just about memorizing; it's about learning how to explain complex React concepts in a way that makes you sound like a confident professional.",

  romanUrduRevision:
    "Yeh React interview ki taiyari ke liye best resource hai. Isme basic se lekar advanced level tak ke sawalat aur unke concise jawab diye gaye hain. Hooks, Virtual DOM, State management, aur Performance optimization jaise topics ko cover kiya gaya hai taake aap interview mein confident rahen.",

  why: "Interviews are often stressful, and even senior developers can forget basic definitions under pressure. Having a master list of clear, professional answers helps you articulate your thoughts, demonstrate your expertise, and stand out as a candidate who knows the 'Whys' as well as the 'Hows'.",

  how: [
    "Step 1 - Review the 'Fundamental 5' (Component vs Element, Props vs State, Keys, Hooks, Virtual DOM).",
    "Step 2 - Understand 'State Management' (Context vs Redux vs Zustand).",
    "Step 3 - Practice explaining 'Performance Optimization' (Memoization, Lazy Loading, Concurrent Features).",
    "Step 4 - Master 'Side Effects' (useEffect cleanup, API patterns, race conditions).",
    "Step 5 - Use the 'STAR' method to answer behavioral React questions (Situation, Task, Action, Result).",
  ],

  diagram: `
graph LR
    A[Interview Candidate] --> B[Master Sheet]
    B --> C[Fundamentals]
    B --> D[Hooks & Logic]
    B --> E[Advanced Patterns]
    B --> F[Performance]
    C --> G[Hireable Senior Developer]
    D --> G
    E --> G
    F --> G
    style G fill:#2ecc71,color:white
  `,

  analogy:
    "This master sheet is like a 'GPS for a long road trip'. You know how to drive (code), but the GPS gives you the fastest routes, warns you about traffic jams (common pitfalls), and tells you exactly where the finish line (the job offer) is. It keeps you on track when things get complicated.",

  realLifeExample:
    "If an interviewer asks: 'What is the Virtual DOM?', don't just say 'It's a fast version of the DOM'. Instead, give a professional answer: 'It's a lightweight JavaScript representation of the real DOM. React uses it to calculate the minimum number of changes needed to sync the UI, a process called Reconciliation, which minimizes expensive DOM manipulations.'",

  code: `
// RAPID-FIRE Q&A EXAMPLES

// Q: Difference between useMemo and useCallback?
// A: useMemo returns a memoized VALUE; useCallback returns a memoized FUNCTION.

// Q: What are keys in React?
// A: Keys are unique identifiers used by React during reconciliation to identify 
// which items in a list have changed, been added, or removed.

// Q: What is the 'stale closure' problem in useEffect?
// A: It happens when the effect function captures a value from a previous 
// render because that value was missing from the dependency array.

// Q: Can you explain React.memo?
// A: It's an HOC that prevents re-renders of a functional component 
// if its props haven't changed (shallow comparison).
  `,

  commonMistakes: [
    "Giving answers that are too short (doesn't show depth) or too long (gets boring).",
    "Claiming that the Virtual DOM is 'faster' than the Real DOM (it is not; it just allows React to make FEWER updates).",
    "Not being able to explain the 'Why' behind a tool (e.g., why use Redux when Context exists?).",
    "Forgetting to mention 'React 18' features like Batching or Transitions in modern interviews.",
  ],

  interviewSummary: [
    "Master the core React principles: Composition, Declarative UI, and Unidirectional data flow.",
    "Be ready to explain the reconciliation process and the Diffing algorithm.",
    "Understand the trade-offs of different state management solutions.",
    "Focus on explaining UX improvements (Concurrent React, Suspense) as well as DX (Clean code, Architecture).",
  ],
};
