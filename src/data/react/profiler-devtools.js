export const profilerDevTools = {
  id: "profiler-devtools",
  title: "React Profiler & DevTools",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "Profiler",
    "DevTools",
    "Performance",
    "Flamegraph",
    "Ranked Chart",
    "Optimization",
    "Profiling",
  ],

  definition:
    "The React Profiler is a built-in tool (and browser extension) that measures how often a React application renders and what the 'cost' of those renders is. It helps identify parts of the application that are slow or re-rendering unnecessarily by providing visual charts and timing data.",

  simpleExplanation:
    "Imagine your car is making a weird noise. Instead of just guessing, you take it to a mechanic who plugs in a computer to see exactly which part is failing. The React Profiler is that computer for your app. It shows you exactly which component took 50ms to load and why it decided to update.",

  romanUrduRevision:
    "React Profiler ka kaam hai app ki performance measure karna. Yeh batata hai ke kaunsa component kitni baar render hua aur kitna time liya. React DevTools extension mein 'Profiler' tab hota hai jisme 'Flamegraph' aur 'Ranked Chart' se bottlenecks identify kiye jate hain.",

  why: "You cannot fix what you cannot measure. Without the Profiler, developers often guess where the performance issues are, leading to over-optimization of parts that don't matter. The Profiler gives you hard data on exactly which component is causing the lag.",

  how: [
    "Step 1 - Install the 'React Developer Tools' browser extension.",
    "Step 2 - Open the 'Profiler' tab in Chrome/Firefox DevTools.",
    "Step 3 - Click the 'Record' button and interact with your app.",
    "Step 4 - Stop recording to see the 'Flamegraph' (time-based) and 'Ranked' (cost-based) charts.",
    "Step 5 - Look for 'yellow' items (hot/slow) and check the 'Why did this render?' section in the sidebar.",
  ],

  diagram: `
flowchart TD
    A[Start Recording] --> B[Perform User Action\ne.g., Typing, Clicking]
    B --> C[Stop Recording]
    C --> D[Review Flamegraph]
    D --> E{Identify Bottleneck}
    E -->|Slow Render| F[Check logic / useMemo]
    E -->|Frequent Re-render| G[Check Props / React.memo]
  `,

  analogy:
    "It's like a stopwatch for an Olympic runner. We aren't just checking IF they finished the race; we are checking exactly how many seconds every single step took. If the runner (App) is slow, the Profiler tells us if it's because of their shoes (Props) or their technique (Component Logic).",

  realLifeExample:
    "If your search bar feels slow while typing, you record a few keystrokes in the Profiler. You might find that every keystroke is causing the entire 'Footer' and 'Sidebar' to re-render. Now you know exactly where to apply React.memo.",

  code: `
// You can also use the <Profiler> component in code
import { Profiler } from 'react';

function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  // Aggregate or log render timings
  console.log({ id, phase, actualDuration });
}

function App() {
  return (
    <Profiler id="Sidebar" onRender={onRender}>
      <Sidebar />
    </Profiler>
  );
}
  `,

  commonMistakes: [
    "Profiling in 'Development' mode only (React is slower in development; always test performance in a 'Production' build).",
    "Ignoring the 'Ranked' chart (Flamegraph is good for structure, but Ranked is best for finding the absolute slowest components).",
    "Not clearing the recording before a specific test (too much data makes it hard to read).",
    "Focusing on renders that take < 1ms (don't waste time optimizing things that are already fast).",
  ],

  interviewSummary: [
    "The Profiler measures the cost of rendering individual components.",
    "The 'Flamegraph' view shows the state of the tree at a specific commit.",
    "The 'Ranked' view orders components by how long they took to render.",
    "DevTools can explain why a component rendered (e.g., 'Props changed: [user]').",
  ],
};
