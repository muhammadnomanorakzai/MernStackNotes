export const useContextHook = {
  id: "use-context",
  title: "useContext",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "useContext",
    "Context API",
    "Provider",
    "consumer",
    "prop drilling",
    "global state",
    "theme",
    "auth context",
  ],

  definition:
    "useContext is a React Hook that lets any component read a value from the nearest Context Provider above it in the component tree — without prop drilling. It provides a way to share data (like theme or auth status) globally across many components regardless of how deep they are nested.",

  simpleExplanation:
    "Imagine passing a bucket of water down a long line of people just to give it to the person at the end. That's 'prop drilling'. Context is like a water pipe that runs through the whole building; anyone who needs water can just tap into the pipe directly. You don't have to keep passing the bucket.",

  romanUrduRevision:
    "useContext 'prop drilling' ko khatami karta hai. Agar humein ek value (jesay user info ya dark theme) bohot saaray nested components ko deni ho, to hum props ke bajaye Context use karte hain.\n\nProvider value ko broadcast karta hai, aur useContext us se 'subscribe' karta hai.",

  why: "Prop drilling (passing props through 4-5 intermediate components that do not use the data) makes code brittle and hard to maintain. Context solves this by making values available to any descendant component that subscribes. It is perfect for data that is truly 'global' for a section of the app.",

  how: [
    "Step 1 - Create: const MyContext = React.createContext(defaultValue).",
    "Step 2 - Provide: Wrap component tree with <MyContext.Provider value={theValue}>.",
    "Step 3 - ALL descendants can now access theValue regardless of depth.",
    "Step 4 - Consume: const value = useContext(MyContext) in the child component.",
    "Step 5 - React re-renders ALL consumers automatically when the Provider's value changes.",
    "Step 6 - Note: Context is a delivery mechanism, not a state manager itself (usually combined with useState).",
  ],

  diagram: `
flowchart TD
    subgraph Without Context
    App1["App (has theme)"] --> Layout1["Layout"]
    Layout1 --> Sidebar1["Sidebar"]
    Sidebar1 --> NavItem1["NavItem (USES theme)"]
    end

    subgraph With Context
    Provider["ThemeContext.Provider (value={theme})"]
    Provider --> App2["App"]
    App2 --> Layout2["Layout"]
    App2 --> Header["Header (useContext)"]
    Layout2 --> Sidebar2["Sidebar"]
    Sidebar2 --> NavItem2["NavItem (useContext)"]
    end

    NavItem2 -. subscribe .-> Provider
    Header -. subscribe .-> Provider
`,

  analogy:
    "Context is like WiFi in a building. The router (Provider) broadcasts a signal (value) throughout the entire building. Any device (component) in the building can connect to the WiFi (useContext) and access the internet (context value) directly — without needing a physical cable (prop) passed from the router through every wall and room. Devices that do not need WiFi simply ignore it.",

  realLifeExample:
    "Think of 'Dark Mode' on an app. Almost every single component (buttons, text, backgrounds) needs to know if the user wants Dark or Light mode. Instead of passing 'isDarkMode' to every single component manually, you put it in a Context Provider at the top. Now, any button anywhere can just 'ask' the context for the current theme.",

  code: `
/**
 * REACT HOOKS RULES:
 * 1. Only call hooks at the TOP LEVEL.
 * 2. Only call hooks from REACT FUNCTION COMPONENTS or CUSTOM HOOKS.
 */

import React, { createContext, useContext, useState, useMemo } from 'react';

// 1. Defining Auth Context
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login  = (userData) => setUser(userData);
  const logout = () => setUser(null);

  // Best practice: Memoize value to avoid re-rendering consumers 
  // unless relevant data actually changed
  const value = useMemo(() => ({ 
    user, 
    isLoggedIn: !!user, 
    login, 
    logout 
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 2. Custom hook for easier consumption (best practice)
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// 3. Deeply nested child using context
function profileCard() {
  const { user, logout, isLoggedIn } = useAuth(); // Simple and clean!

  if (!isLoggedIn) return <p>Please Log In</p>;

  return (
    <div className="border p-4 shadow-md">
      <h3>Welcome, {user.name}</h3>
      <button onClick={logout} className="text-red-500">Sign Out</button>
    </div>
  );
}

// 4. Wrapping the App
function MyApp() {
  return (
    <AuthProvider>
      <MainLayout>
        <Sidebar>
          <UserProfileMenu /> {/* This can now use useAuth() */}
        </Sidebar>
      </MainLayout>
    </AuthProvider>
  );
}


// --- THEME CONTEXT EXAMPLE ---

const ThemeContext = createContext("light");

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext); // Assume provided above
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current Theme: {theme}
    </button>
  );
}
`,

  commonMistakes: [
    "Not providing a value to the Provider results in consumers using the default value (often undefined).",
    "Wrapping ONLY the consuming component instead of a high-level parent.",
    "Overusing context for state that is local to only one or two components.",
    "Using context for high-frequency updates which can cause performance bottlenecks.",
    "Forgetting to memoize the Provider value object with useMemo.",
  ],

  interviewQA: [
    {
      q: "What is the Context API and why use it?",
      a: "Context provides a way to pass data through the component tree without prop drilling. Create with createContext(), wrap in a Provider, and read with useContext(). Use it for global data many components need, like themes, auth, or language settings.",
    },
    {
      q: "What is the difference between Context and props?",
      a: "Props flow explicitly from parent to direct child. Context flows implicitly to any descendant regardless of depth. Props are best for component-specific data; Context is best for truly shared data.",
    },
    {
      q: "When should you NOT use Context?",
      a: "Avoid it for high-frequency updates (every keystroke) or local state that only 1-2 components need. For complex state with many actions, dedicated libraries like Redux or Zustand might be better.",
    },
    {
      q: "What happens when the Context value changes?",
      a: "When the Provider's value prop changes, ALL components that use that context with useContext will re-render automatically. This is why splitting contexts and memoizing the value object is important.",
    },
  ],

  realWorldUsage: [
    "Authenticated user profile data",
    "Theming systems (light/dark mode)",
    "Localization and language preferences",
    "Feature flags across the application",
    "Form state management for complex multi-step forms",
  ],

  interviewSummary: [
    "useContext subscribes a component to a Context object.",
    "Solves 'prop drilling' by sharing data implicitly across the tree.",
    "When the Provider's value changes, all consuming components re-render.",
    "Best used for 'global' settings like Auth, Theme, or Localization.",
    "Combine with useMemo to optimize performance of the context value object.",
  ],
};
