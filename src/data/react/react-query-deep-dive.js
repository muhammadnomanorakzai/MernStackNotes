export const reactQueryDeepDive = {
  id: "react-query-deep-dive",
  title: "React Query (TanStack Query)",
  category: "React",
  difficulty: "Advanced",
  tags: [
    "React Query",
    "TanStack Query",
    "useQuery",
    "useMutation",
    "Caching",
    "Stale Time",
    "Invalidation",
    "Refetch",
  ],

  definition:
    "React Query (now TanStack Query) is an asynchronous state management library for React. It is specifically designed to handle 'Server State'—data that lives on a server and needs to be fetched, cached, and synchronized with the UI. It replaces the messy useEffect + useState pattern with a robust, declarative API.",

  simpleExplanation:
    "Think of React Query as a 'Super-Powered Cache' for your app's data. Usually, when you change pages and come back, you have to fetch the same data again. React Query remembers the data (Caching). It also checks in the background if the data has changed (Stale-While-Revalidate), and updates the screen automatically. It even handles things like 'Auto-Retry' if your Wi-Fi blips.",

  romanUrduRevision:
    "React Query 'Server State' manage karne ka industry standard tool hai. Yeh caching, background refetching, aur auto-syncing handle karta hai jo useEffect khud nahi kar sakta. Isme 'useQuery' data lene ke liye aur 'useMutation' data change (POST/PUT/DELETE) karne ke liye use hota hai.",

  why: "Handling server data manually involves too much repetitive code for loading, errors, caching, and cache-invalidation. React Query reduces your codebase by up to 40% while providing professional-grade features like 'Optimistic Updates' (making the UI feel instant before the server even responds).",

  how: [
    "Step 1 - Wrap your app in 'QueryClientProvider' and create a 'QueryClient' instance.",
    "Step 2 - Use 'useQuery' with a unique 'queryKey' and an async 'queryFn' to fetch data.",
    "Step 3 - Destructure 'data', 'isLoading', and 'error' directly from the hook.",
    "Step 4 - Use 'useMutation' for sending data to the server (creating/updating items).",
    "Step 5 - Use 'queryClient.invalidateQueries()' to automatically refresh data after a mutation.",
  ],

  diagram: `
flowchart LR
    A[Component Requests Data] --> B{In Cache?}
    B -- "Yes" --> C[Return cached data instantly]
    C --> D[Background Refetch]
    B -- "No" --> E[API Call]
    E --> F[Store in Cache & Return to UI]
    D --> G[Update Cache & Sync UI]
    style B fill:#f9f,stroke:#333
  `,

  analogy:
    "React Query is like a personal assistant who has a great memory. If you ask 'What's the weather?', they tell you instantly because they checked 5 minutes ago (Cache). But while they're telling you, they also quickly double-check their phone to see if it's still correct (Background Refetch). If it changed, they'll tell you 'Actually, it just started raining' (Sync UI).",

  realLifeExample:
    "A Dashboard with many users: If you click on 'User A', go to Settings, and then click back to 'User A', the data appears instantly because of React Query's cache. If another admin deletes a user, React Query can automatically invalidate the list and fetch the new reality without the user ever clicking 'Refresh'.",

  code: `
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 1. FETCHING DATA
function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'], 
    queryFn: () => fetch('/api/users').then(res => res.json())
  });

  if (isLoading) return <p>Loading...</p>;
  return <div>{data.map(user => <div key={user.id}>{user.name}</div>)}</div>;
}

// 2. UPDATING DATA (Mutation)
function AddUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newUserName) => fetch('/api/users', { 
      method: 'POST', body: JSON.stringify({ name: newUserName }) 
    }),
    onSuccess: () => {
      // Invalidate and refetch the 'users' list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return <button onClick={() => mutation.mutate('Zain')}>Add User</button>;
}
  `,

  commonMistakes: [
    "Using unstable query keys (e.g., queryKey: [['users', Math.random()]]) which breaks caching.",
    "Forgetting to wrap the app in the QueryClientProvider.",
    "Not using 'useMutation' for data-changing operations, leading to UI/Server desync.",
    "Ignoring the DevTools, which are essential for debugging the cache and network status.",
  ],

  interviewSummary: [
    "React Query manages server state; Redux/Zustand is better for client (UI) state.",
    "Stale Time determines how long data remains fresh in the cache before a refetch is needed.",
    "Query Invalidation allows you to mark specific data as 'old' so React Query fetches the latest version.",
    "Optimistic updates allow for a zero-latency UI experience during mutations.",
  ],
};
