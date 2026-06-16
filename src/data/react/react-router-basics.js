export const reactRouterBasics = {
  id: "react-router-basics",
  title: "React Router v6 — Core Concepts",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "React Router",
    "v6",
    "BrowserRouter",
    "Routes",
    "Route",
    "Link",
    "useNavigate",
    "Params",
  ],

  definition:
    "React Router is the standard library for routing in React. It enables the creation of 'Single Page Applications' (SPAs) where navigation happens without a full page reload. It synchronizes the UI with the URL, allowing users to move between different views while maintaining application state.",

  simpleExplanation:
    "Think of React Router as a 'Traffic Controller' for your website. In a traditional website, clicking a link asks the server for a whole new page. In React, the Router just hides one component and shows another based on what's in the address bar (the URL). This makes your app feel instant and smooth.",

  romanUrduRevision:
    "React Router app mein navigation handle karta hai baghair page refresh kiye. BrowserRouter poori app ko wrap karta hai, aur Routes/Route batate hain ke kis URL par kaunsa component dikhana hai. Link tag 'a' tag ki jagah use hota hai taake React ki state bani rahe.",

  why: "Without a router, you'd have to manually manage which component to show using complex 'if/else' or 'switch' statements. React Router provides a clean, declarative way to handle navigation, browser history (back/forward buttons), and bookmarking.",

  how: [
    "Step 1 - Install the library: 'npm install react-router-dom'.",
    "Step 2 - Wrap your entire app in '<BrowserRouter>'.",
    "Step 3 - Define your path structure using '<Routes>' and '<Route path='/...' element={<.../>} />'.",
    "Step 4 - Use '<Link to='/...'>' instead of standard '<a>' tags for navigation.",
    "Step 5 - Use the 'useNavigate' hook when you need to redirect users programmatically (like after a login).",
  ],

  diagram: `
flowchart TD
    URL[Browser URL Changes] --> R[Router]
    R -->|Matches| R1[Route path='/']
    R -->|Matches| R2[Route path='/about']
    R1 --> C1[Home Component]
    R2 --> C2[About Component]
    style R fill:#ca4242,color:white
  `,

  analogy:
    "Imagine a huge museum. React Router is like the floor map and the signs on the walls. The museum itself is one building (SPA), but as you walk to different 'wings' (Routes), the exhibits around you change completely. You don't have to leave the museum and come back in to see something new; you just follow the signs (Links).",

  realLifeExample:
    "On Facebook or Twitter, when you click on a profile, the page doesn't go white and reload. The URL just changes (e.g., /profile/john) and the middle section of the screen updates to show John's photos. That's React Router in action.",

  code: `
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
    </div>
  );
}
  `,

  commonMistakes: [
    "Using standard '<a>' tags instead of '<Link>', which triggers a full page reload and loses state.",
    "Forgetting to wrap the app in '<BrowserRouter>', leading to 'useNavigate' errors.",
    "Not including the ':' in dynamic routes (e.g., path='user/id' instead of path='user/:id').",
    "Nesting '<Routes>' inside other components without properly understanding the path hierarchy.",
  ],

  interviewSummary: [
    "React Router enables SPA navigation by intercepting URL changes.",
    "Standard navigation uses the Link component; programmatic navigation uses useNavigate.",
    "Dynamic segments are defined with a colon (:id) and accessed via the useParams hook.",
    "The 'element' prop in v6 replaces the 'component' or 'render' props from older versions.",
  ],
};
