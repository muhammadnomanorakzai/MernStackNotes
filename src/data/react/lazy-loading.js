export const lazyLoading = {
  id: "lazy-loading",
  title: "Code Splitting & Lazy Loading",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "React.lazy",
    "Suspense",
    "Code Splitting",
    "Performance",
    "Bundle Size",
    "Dynamic Import",
  ],

  definition:
    "Code splitting is a technique that breaks down your application into smaller chunks, which are then loaded on demand (Lazy Loading). Instead of downloading the entire app at once, React only downloads the code needed for the current screen, significantly reducing the initial load time.",

  simpleExplanation:
    "Imagine you're moving into a new house. Instead of trying to carry all your furniture, clothes, and appliances in one single giant box, you move them room by room. You only bring the kitchen stuff when you're ready to cook. In React, 'React.lazy' lets you load components only when the user actually visits those pages.",

  romanUrduRevision:
    "Lazy loading se hum app ke bundle size ko chota karte hain. Poori app ek saath download nahi hoti, balki sirf wahi part download hota hai jiski zaroorat hai. 'React.lazy' dynamic import ke liye use hota hai aur 'Suspense' loading indicator (spinner) dikhane ke liye zaroori hai.",

  why: "Large JavaScript bundles mean slow first-page loads, especially on mobile or slow networks. Code splitting improves 'Time to Interactive' (TTI) by prioritizing essential code and delay-loading secondary features like settings or admin dashboards.",

  how: [
    "Step 1 - Replace static imports with 'const MyComponent = React.lazy(() => import('./MyComponent'))'.",
    "Step 2 - Wrap the lazy-loaded component in a '<Suspense>' component.",
    "Step 3 - Provide a 'fallback' prop to Suspense (e.g., a spinner or loading text).",
    "Step 4 - If using a Router, wrap your '<Routes>' in Suspense to split code by page/route.",
    "Step 5 - Use 'ErrorBoundary' around Suspense to handle network failures during chunk loading.",
  ],

  diagram: `
flowchart TD
    A[Initial Request] --> B[Main Bundle Downloaded\nSmall & Fast]
    B --> C[Render Home Page]
    C --> D{User Clicks Profile}
    D --> E[Download Profile Chunk\nOn Demand]
    E --> F[Render Profile Page]
    style B fill:#3498db,color:white
    style E fill:#f39c12,color:white
  `,

  analogy:
    "It's like a restaurant menu. Instead of bringing every single dish to your table the moment you sit down (Traditional Bundling), the waiter only brings the specific dish you ordered (Lazy Loading). This keeps the table clean and ensures the food is fresh when you're ready to eat it.",

  realLifeExample:
    "In a multi-page app, the 'Admin Dashboard' might be 1MB of code. Regular users never see it. By lazy loading the Admin route, regular users save 1MB of data usage and the app loads much faster for them.",

  code: `
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Dynamic Imports
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      {/* 2. Suspense wrapper with fallback UI */}
      <Suspense fallback={<div>Loading Page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
  `,

  commonMistakes: [
    "Forgetting to wrap lazy components in '<Suspense>' (causes the app to crash).",
    "Lazy loading very small components (the network overhead of a new request can be more than the load time).",
    "Not handling loading errors when a dynamic chunk fails to download (e.g., user loses internet).",
    "Deeply nesting Suspense components without a clear loading strategy.",
  ],

  interviewSummary: [
    "Code splitting is primarily achieved via dynamic 'import()' statements.",
    "React.lazy allows you to render a dynamic import as a regular component.",
    "Suspense is a required wrapper that handles the loading state of lazy components.",
    "Route-based splitting is the most common and effective form of code splitting.",
  ],
};
