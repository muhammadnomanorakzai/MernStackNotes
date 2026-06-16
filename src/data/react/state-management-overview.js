export const stateManagementOverview = {
  id: "state-management-overview",
  title: "State Management Overview",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "state management",
    "local state",
    "global state",
    "server state",
    "URL state",
    "useState",
    "Context",
    "Redux",
    "Zustand",
    "React Query",
  ],

  definition:
    "State management is the architectural process of deciding where data should live and how it should be updated across a React application. It involves categorizing data into specific types—Local, Global UI, Server, and URL—and selecting the most efficient tool for each to maintain performance and scalability.",

  simpleExplanation:
    "Think of state management as 'organizing your app's memory.' Not every piece of information needs to be shared with every part of the app. By keeping data close to where it's used (Local State) and using specialized tools for things like API data (Server State) or shared settings (Global State), you make your app faster and much easier to debug.",

  romanUrduRevision:
    "State management ka matlab hai yeh decide karna ke data kahan rahega aur kaise update hoga. Har data ko global banane ki zaroorat nahi hoti. Local state, global state, server data, aur URL state ko alag alag tools se manage karna hi senior dev ki nishani hai.",

  why: "Using a single tool for all types of state leads to over-engineered simple apps or under-powered complex ones. Poor state management causes unnecessary re-renders, 'prop drilling' nightmares, and difficulty in syncing UI with server data. Mastering these distinctions is a core senior-level skill.",

  how: [
    "Step 1 - Identify if the state is needed by only one component (Local State).",
    "Step 2 - Determine if multiple unrelated components need the same UI data (Global UI State).",
    "Step 3 - Separate data fetched from APIs that needs caching/syncing (Server State).",
    "Step 4 - Check if the state should be shareable via a link (URL State).",
    "Step 5 - Select the corresponding tool (useState, Redux/Zustand, React Query, or React Router).",
  ],

  diagram: `
flowchart TD
    A[Is it State?] --> B{Who needs it?}
    B -- "Only this component" --> C[useState / useReducer\nLOCAL STATE]
    B -- "Multiple components" --> D{Is it from an API?}
    D -- "Yes" --> E[React Query / RTK Query\nSERVER STATE]
    D -- "No" --> F{Should it be shareable?}
    F -- "Yes" --> G[React Router searchParams\nURL STATE]
    F -- "No" --> H[Zustand / Redux / Context\nGLOBAL UI STATE]
  `,

  analogy:
    "Imagine a large restaurant. A waiter's private notepad is 'Local State' (only they need it). The daily menu board is 'Global UI State' (everyone needs to see it). The kitchen's inventory system is 'Server State' (the source of truth for stock). The table number on the receipt is 'URL State' (a unique reference that helps find exactly where you are). Using Redux for a waiter's notepad is like installing a 2-ton server just to remember one order—it's overkill.",

  realLifeExample:
    "In an E-commerce app: The characters typed in a search box are Local State. The user's login session and theme (dark/light) are Global UI State. The list of products fetched from the database is Server State. The filters applied in the URL (like ?category=shoes&price=100) are URL State.",

  code: `
// 1. LOCAL STATE (Only used here)
function SearchBar() {
  const [query, setQuery] = useState(""); 
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}

// 2. URL STATE (Shareable & Bookmarkable)
function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("cat") || "all";
  // URL: /shop?cat=electronics
}

// 3. SERVER STATE (API data with caching)
function UserProfile() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id)
  });
}

// 4. GLOBAL UI STATE (Shared cross-app)
function App() {
  const { theme } = useThemeStore(); // Zustand/Redux
  return <div className={theme}>...</div>;
}
  `,

  commonMistakes: [
    "Putting every piece of state into Redux/Global store.",
    "Manually managing server data with useEffect and useState.",
    "Prop drilling local state through 5+ components instead of using Context.",
    "Forgetting to sync UI state with the URL for filters and pagination.",
    "Not using a dedicated library for complex server-state challenges like caching.",
  ],

  interviewSummary: [
    "React state is divided into: Local, Global UI, Server, and URL types.",
    "Default to Local State (useState) first; only lift state when truly necessary.",
    "Use React Query/SWR for server data to handle caching and synchronization.",
    "Use URL state (searchParams) for shareable UI states like search/filters.",
    "Redux/Zustand should only be used for truly global UI state (auth, themes).",
  ],
};
