export const performanceChecklist = {
  id: "performance-checklist",
  title: "Performance Checklist & Anti-patterns",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "Checklist",
    "Best Practices",
    "Anti-patterns",
    "Optimization",
    "Senior Level",
    "Common Mistakes",
  ],

  definition:
    "A React-specific collection of proven best practices and 'anti-patterns' (bad habits). This guide serves as a senior-level mental model for building high-performance applications from day one, rather than fixing them later.",

  simpleExplanation:
    "Think of this as a 'Pro-Tips' sheet. In React, there are ways to write code that work but are secretly making your app slow. Here, we list the 'Dos' (best practices) and the 'Don'ts' (anti-patterns) so you can write clean, professional code that is built for speed.",

  romanUrduRevision:
    "Performance checklist senior devs ka secret weapon hai. Isme likha hai ke kab 'index' ko key nahi banana chahiye, kyun props drilling se bachna chahiye, aur kyun 'useCallback' her jagah use karna ghalat hai. Is list se aap app ko fast aur bug-free rakh sakte hain.",

  why: "Many performance issues are caused by invisible mistakes, like recreating functions on every render or putting too much data in global state. Following a checklist ensures consistency across a team and prevents easy-to-fix bottlenecks from reaching production.",

  how: [
    "Step 1 - Keep state as local as possible. Don't lift state unless multiple unrelated components need it.",
    "Step 2 - Always use stable, unique 'key' props for lists (never use 'index' if items can change/reorder).",
    "Step 3 - Avoid anonymous functions inside JSX props (e.g., onClick={() => ...}) which recreate on every render.",
    "Step 4 - Profile the app using React DevTools before starting any optimization work.",
    "Step 5 - Use 'React.lazy' for route-based code splitting to keep the main bundle small.",
  ],

  diagram: `
flowchart TD
    A[Is App Slow?] --> B{Initial Checklist}
    B -- "Huge Bundle?" --> C[React.lazy / Code Splitting]
    B -- "Flickering / Slow List?" --> D[Virtualization]
    B -- "Laggy Input?" --> E[useTransition / useDeferredValue]
    B -- "Excessive Re-renders?" --> F[React.memo / useMemo]
    B -- "Giant Global State?" --> G[State Colocation]
  `,

  analogy:
    "It's like a pre-flight checklist for a pilot. You don't try to fix the plane while you're in the air. You check the fuel, the engines, and the controls BEFORE you take off. This checklist helps you 'take off' with a performant app right from the start.",

  realLifeExample:
    "Using 'index' as a key: If you have a list of tasks and you delete the first one, React will think all the other tasks have changed because their indexes shifted. This causes the entire list to re-render. Using a unique 'task.id' as the key fixes this instantly.",

  code: `
// ❌ ANTI-PATTERN: Inline anonymous functions
function BadComponent() {
  return <Button onClick={() => console.log("Clicked")} />;
}

// ✅ BEST PRACTICE: Stable function references
function GoodComponent() {
  const handleClick = useCallback(() => {
    console.log("Clicked");
  }, []);
  return <Button onClick={handleClick} />;
}

// ❌ ANTI-PATTERN: Using index as key for dynamic lists
{items.map((item, index) => <li key={index}>{item.text}</li>)}

// ✅ BEST PRACTICE: Using unique IDs
{items.map((item) => <li key={item.id}>{item.text}</li>)}
  `,

  commonMistakes: [
    "Premature optimization: Over-using useMemo/useCallback before naming a performance problem.",
    "Ignoring the browser's console warnings about unique keys in lists.",
    "Not using 'production' builds for measuring real performance.",
    "Keeping too much transient state (like text input) in a global Redux/Zustand store.",
  ],

  interviewSummary: [
    "State Colocation: Keep state as close to where it is used as possible.",
    "Keys should be unique and stable across renders to help React's reconciliation.",
    "Avoid deep component trees where updates at the top trigger massive tree re-renders.",
    "Performance is a balance between rendering cost and the cost of the 'checks' (like memoization).",
  ],
};
