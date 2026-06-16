export const reactRouterAdvanced = {
  id: "react-router-advanced",
  title: "React Router v6 — Advanced Concepts",
  category: "React",
  difficulty: "Advanced",
  tags: [
    "Nested Routes",
    "Outlet",
    "Protected Routes",
    "useSearchParams",
    "URL state",
    "Layouts",
    "Auth",
  ],

  definition:
    "Advanced routing in React includes handling complex UI layouts via Nested Routes, securing your application with Protected Routes, and managing the URL as a state container using Query Parameters (useSearchParams). These patterns are essential for building secure, scalable, and professional web applications.",

  simpleExplanation:
    "Think of advanced routing as 'pro-level' navigation. Nested Routes allow you to change only a small part of a page (like a dashboard sidebar), Protected Routes act like a 'Bouncer' who only lets logged-in users enter certain pages, and useSearchParams lets you save things like search filters directly in the browser's address bar.",

  romanUrduRevision:
    "Nested routes tab use hote hain jab aapko ek page ke andar doosra page dikhana ho (Outlet use kar ke). Protected routes 'Auth' check karte hain aur unauthorized users ko redirect karte hain. useSearchParams query parameters handle karta hai jo filters aur searching ke liye best hai.",

  why: "Modern apps are rarely just a list of flat pages. They need shared layouts (Header/Footer), permissions roles (Admin vs User), and the ability to share deep links with specific filters applied. Mastering these concepts prevents messy code and creates a better user experience.",

  how: [
    "Step 1 - Use '<Outlet />' inside a parent component to render nested child routes.",
    "Step 2 - Wrap sensitive routes in a custom 'ProtectedRoute' component that checks authentication.",
    "Step 3 - Use 'useSearchParams' to read and update query parameters (e.g., ?search=phone).",
    "Step 4 - Leverage 'useLocation' to track exactly where the user is currently.",
    "Step 5 - Define a 'Catch-all' route with path='*' to handle 404 - Not Found pages.",
  ],

  diagram: `
flowchart TD
    A[Layout Component] --> B[Sidebar]
    A --> C[Outlet]
    C -->|URL: /dashboard/settings| D[Settings View]
    C -->|URL: /dashboard/stats| E[Stats View]
    subgraph "Nested Routing"
    A
    C
    end
  `,

  analogy:
    "Nested Routes are like a TV show. The 'Show Title' and 'Main Menu' stay at the top (Parent Layout), but each 'Episode' you select changes the main screen (Outlet). Protected Routes are like a VIP room at a club—you can walk around the lobby, but the guards (Protected Component) check your ID before letting you through the door.",

  realLifeExample:
    "In Gmail, the sidebar (Inbox, Sent, Drafts) stays constant, but the email list in the middle changes based on what you click. That's a Nested Layout. When you try to access your Gmail 'Settings' without being logged in, it pushes you back to the login page—that's a Protected Route.",

  code: `
// 1. NESTED ROUTES & OUTLET
function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="main-content">
        <Outlet /> {/* Child routes render here */}
      </div>
    </div>
  );
}

// 2. PROTECTED ROUTES
const ProtectedRoute = ({ user, children }) => {
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// 3. SEARCH PARAMS (Query Strings)
function SearchProducts() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q');

  return (
    <input 
      value={query || ''} 
      onChange={(e) => setParams({ q: e.target.value })} 
    />
  );
}
  `,

  commonMistakes: [
    "Forgetting the '<Outlet />' in the parent layout, causing child routes to never appear.",
    "Not using 'replace' in '<Navigate />', which messes up the browser's back button history.",
    "Over-using search parameters for sensitive data (URL params are public and visible in history).",
    "Nesting routes too deep (more than 3 levels), which makes the application hard to maintain.",
  ],

  interviewSummary: [
    "The Outlet component is a placeholder where nested child routes are rendered.",
    "Protected routes are implemented via a higher-order component or a wrapper component.",
    "useSearchParams behaves similarly to useState but synchronizes values with the browser URL.",
    "Nested routes help keep UI layouts consistent and reduce code duplication.",
  ],
};
