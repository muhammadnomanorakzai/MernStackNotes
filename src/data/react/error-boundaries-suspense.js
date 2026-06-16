export const errorBoundariesSuspense = {
  id: "error-boundaries-suspense",
  title: "Error Boundaries & Suspense Patterns",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "Error Boundary",
    "Suspense",
    "Stability",
    "UX",
    "Static Methods",
    "getDerivedStateFromError",
    "componentDidCatch",
  ],

  definition:
    "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole app. Suspense is a component that lets you declaratively 'wait' for anything (like data fetching or code-splitting) to wrap up, providing a loading state in the meantime.",

  simpleExplanation:
    "Think of an Error Boundary as a 'Safety Net' for your application. In standard JavaScript, a single error can break your entire page. In React, an Error Boundary catches that error so only the broken part shows a 'Sorry!' message, while the rest of the app keeps working. Suspense is like a 'Loading Screen' that automatically appears whenever React is busy getting data.",

  romanUrduRevision:
    "Error boundaries app ko crash hone se bachate hain. Agar kisi child component mein error aata hai, toh yeh use catch kar ke fallback UI dikhate hain. Suspense code-splitting aur async data ke liye use hota hai taake jab tak data nahi aata, tab tak loading spinner dikhaya ja sake. Dono patterns se app ki stability barhti hai.",

  why: "Users hate it when an entire website goes white because of one small bug. Using Error Boundaries ensures your app is resilient and professional. Suspense simplifies the handling of asynchronous loading states, making your code much more readable and your UI more predictable.",

  how: [
    "Step 1 - Create an Error Boundary class component (it must be a class as functional components don't support static getDerivedStateFromError yet).",
    "Step 2 - Implement 'static getDerivedStateFromError' to update state when an error occurs.",
    "Step 3 - Implement 'componentDidCatch' to log error information to services like Sentry.",
    "Step 4 - Wrap specific parts of your app (like the Sidebar or Main Section) with your Error Boundary.",
    "Step 5 - Use '<Suspense fallback={<Spinner />}>' around lazy components or data-fetching hooks.",
  ],

  diagram: `
flowchart TD
    A[Component Tree] --> B{Error Occurs?}
    B -- No --> C[Render Normally]
    B -- Yes --> D[Error Boundary Catches]
    D --> E[Log Error to Service]
    D --> F[Show Fallback UI]
    C --> G{Data Loading?}
    G -- Yes --> H[Suspense shows Fallback]
    G -- No --> I[Show Real Content]
    style D fill:#e74c3c,color:white
    style H fill:#3498db,color:white
  `,

  analogy:
    "An Error Boundary is like a 'Circuit Breaker' in your house. If one light bulb (component) short-circuits, only that room stays dark—the rest of your house doesn't lose power. Suspense is like a 'Wait List' at a restaurant. Instead of standing in a crowded lobby, they give you a buzzer (Fallback UI) that lets you know when your table (Data) is ready.",

  realLifeExample:
    "On a Social Media dashboard, the 'Add Friends' widget might fail because the server is down. Without an Error Boundary, your whole profile, messages, and feed would disappear. With an Error Boundary, only the 'Add Friends' box shows an 'Oops!' error while everything else works perfectly.",

  code: `
// 1. ERROR BOUNDARY (Class Component)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }
}

// 2. USAGE WITH SUSPENSE
function App() {
  return (
    <ErrorBoundary>
      <header>My Awesome App</header>
      <Suspense fallback={<LoadingSpinner />}>
        <HeavyContent />
      </Suspense>
    </ErrorBoundary>
  );
}
  `,

  commonMistakes: [
    "Using Error Boundaries to catch errors in event handlers (they only catch errors during rendering/lifecycles).",
    "Not providing a 'Reset' button in the fallback UI, forcing the user to refresh the whole page.",
    "Wrapping the entire app in one single Error Boundary (causes the whole app to disappear on any small error).",
    "Forgetting to implement both 'getDerivedStateFromError' and 'componentDidCatch' for full coverage.",
  ],

  interviewSummary: [
    "Error Boundaries only catch errors in children, not in themselves.",
    "They must be Class components (as of React 18).",
    "Suspense enables a declarative loading state for async work.",
    "Error Boundaries do not catch errors in: event handlers, async code (timers/API), or server side rendering.",
  ],
};
