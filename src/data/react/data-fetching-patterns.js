export const dataFetchingPatterns = {
  id: "data-fetching-patterns",
  title: "Data Fetching Patterns",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "API",
    "fetch",
    "useEffect",
    "axios",
    "loading states",
    "error handling",
    "race conditions",
    "cleanup",
  ],

  definition:
    "Data fetching in React refers to the process of retrieving data from an external API or server to display it in the UI. While simple to start, it involves managing complex states like 'loading', 'error', and 'success', as well as handling asynchronous edge cases like race conditions and memory leaks.",

  simpleExplanation:
    "Data fetching is like 'Ordering Food' from a server. You send a request (Order), wait for the food to be ready (Loading), and finally receive your meal (Data). Sometimes the kitchen is closed or the order gets lost (Error). In React, we need to handle all these scenarios so the user isn't stuck looking at a blank white screen.",

  romanUrduRevision:
    "React mein data fetch karne ke liye standard tareeqa fetch ya axios hai. useEffect ke andar API call hoti hai jab component mount hota hai. Senior devs hamesha loading aur error states maintain karte hain aur race conditions se bachne ke liye cleanup functions ka sawal interviews mein pucha jata hai.",

  why: "Modern web apps depend entirely on dynamic data. Fetching data correctly ensures your app is responsive, provides clear feedback to the user when things go wrong, and avoids common bugs like data showing up for a page that the user has already left.",

  how: [
    "Step 1 - Define state variables for 'data', 'loading', and 'error'.",
    "Step 2 - Use the 'useEffect' hook to trigger the fetch call on component mount.",
    "Step 3 - Use 'fetch' or 'axios' inside an 'async' function inside the effect.",
    "Step 4 - Update states based on the API response (success or failure).",
    "Step 5 - Implement a cleanup function (via 'AbortController') to prevent updating state on unmounted components.",
  ],

  diagram: `
flowchart TD
    A[Component Mounts] --> B[useEffect Triggered]
    B --> C[Set Loading: True]
    C --> D[API Call Sent]
    D -->|Success| E[Set Data & Set Loading: False]
    D -->|Failure| F[Set Error & Set Loading: False]
    E --> G[Render Data]
    F --> H[Render Error Message]
  `,

  analogy:
    "Imagine calling a customer service line. First, you're put on hold with music (Loading State). Eventually, an agent picks up and gives you the information you need (Success State). If the line goes dead or is busy, you get a 'Try Again' message (Error State). If you hang up before they answer, you don't care about the information anymore (Cleanup/Abort Controller).",

  realLifeExample:
    "A News Website: When the page loads, you see gray 'skeleton' boxes (Loading). Then, headlines and images appear (Data). If your Wi-Fi is off, you see a message saying 'Check your connection' (Error). React handles this logic to keep the UI in sync with the network status.",

  code: `
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Clean up mechanism

    const fetchData = async () => {
      try {
        const res = await fetch('https://api.example.com/users', { signal: controller.signal });
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort(); // Unmount cleanup
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
  `,

  commonMistakes: [
    "Forgetting to handle the error case (UI gets stuck in loading forever).",
    "Triggering API calls on every re-render because you forgot the dependency array [] in useEffect.",
    "Not handling 'race conditions' (e.g., searching twice and the first result arrives after the second).",
    "Attempting to update state on a component that has been unmounted (causes memory leaks).",
  ],

  interviewSummary: [
    "Data fetching should ideally be triggered in useEffect or via specialized libraries like TanStack Query.",
    "Race conditions occur when async responses arrive in the wrong order; handle this with AbortController.",
    "Always separate concerns: keep API logic in a separate service file or custom hook.",
    "Managing 'loading' and 'error' states is mandatory for professional UX.",
  ],
};
