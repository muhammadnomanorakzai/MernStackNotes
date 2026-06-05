export const performanceOptimization = {
  id: "performance-optimization",
  title: "JavaScript Performance Optimization",
  category: "JavaScript",
  difficulty: "Advanced",
  tags: [
    "performance",
    "debounce",
    "throttle",
    "lazy loading",
    "memoization",
    "web worker",
    "tree shaking",
    "code splitting",
    "reflow",
    "virtual scroll",
  ],

  definition:
    "JavaScript performance optimization is the practice of making code execute faster, consume less memory, block the browser less, and ship smaller initial payloads.",

  why:
    "Poor JavaScript performance causes slow loads, janky animation, frozen UI, battery drain, and memory growth. Senior developers measure bottlenecks first, then optimize the part that actually hurts users.",

  how: [
    "Use debounce and throttle to reduce expensive call frequency",
    "Memoize expensive pure calculations and stable React references when needed",
    "Lazy-load heavy modules and route chunks with dynamic import",
    "Render only visible rows with virtual scrolling for huge lists",
    "Batch DOM reads before writes to avoid layout thrashing",
    "Move CPU-heavy work to Web Workers so the UI thread stays responsive",
    "Use tree shaking and code splitting to reduce initial JavaScript payload",
    "Prevent unnecessary React re-renders with stable keys and targeted memoization",
  ],

  diagram: `
flowchart TD
  A[Performance problem] --> B[Too much JS on load]
  B --> C[Code splitting]
  B --> D[Tree shaking]
  A --> E[UI freezes]
  E --> F[Web Workers]
  E --> G[Memoization]
  E --> H[Debounce throttle]
  A --> I[Too many DOM updates]
  I --> J[Virtual scrolling]
  I --> K[Batch reads and writes]
  A --> L[Memory grows]
  L --> M[Cleanup listeners intervals]
  `,

  analogy:
    "Lazy loading is carrying only today's textbooks. A Web Worker is an assistant doing heavy filing in the back room. Tree shaking is throwing away unused things before moving house. Virtual scrolling is a window that shows only the visible part of a huge painting.",

  code: `
import React, { Suspense, lazy, useCallback, useState } from "react";

const HeavyChart = lazy(() => import("./HeavyChart"));

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading chart...</div>}>
      <HeavyChart />
    </Suspense>
  );
}

function animate() {
  element.style.left = \`\${x}px\`;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

const worker = new Worker("./heavy-worker.js");
worker.postMessage({ data: hugeDataset });
worker.onmessage = (event) => console.log(event.data.result);

const heights = boxes.map((box) => box.offsetHeight);
boxes.forEach((box, index) => {
  box.style.height = heights[index] + 10 + "px";
});

const ExpensiveList = React.memo(({ items, onItemClick }) =>
  items.map((item) => <Item key={item.id} item={item} onClick={onItemClick} />)
);
  `,

  interviewQA: [
    {
      q: "How would you improve the performance of a slow JavaScript application?",
      a: "Profile first with DevTools or Lighthouse. Then reduce bundle size, lazy-load heavy code, debounce or throttle hot events, memoize expensive pure work, move CPU-heavy tasks to Web Workers, and prevent unnecessary React re-renders.",
    },
    {
      q: "What is the difference between debounce and throttle? When do you use each?",
      a: "Debounce fires once after activity stops, ideal for search input or resize. Throttle limits execution to a consistent rate, ideal for scroll, drag, and mousemove handlers.",
    },
    {
      q: "What is tree shaking?",
      a: "Tree shaking is a bundler optimization that removes unused exported code from the final bundle. It works best with ES Modules because static imports let the bundler know what is actually used.",
    },
    {
      q: "What is a Web Worker and when would you use one?",
      a: "A Web Worker runs JavaScript on a separate background thread. Use it for heavy computation, parsing, compression, sorting, or image processing so the main UI thread stays responsive.",
    },
  ],
};
