export const customHooks = {
  id: "custom-hooks",
  title: "Custom Hooks",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "custom hooks",
    "useFetch",
    "useLocalStorage",
    "useDebounce",
    "useWindowSize",
    "hook composition",
    "reusability",
    "separation of concerns",
  ],

  definition:
    "A Custom Hook is a JavaScript function whose name starts with 'use' that calls other React hooks. Custom hooks allow you to extract and reuse stateful logic between components without changing the component hierarchy. It's like extracting a utility function, but for logic that uses state or effects.",

  simpleExplanation:
    "Imagine you find yourself writing the same code to fetch data or handle a form in five different components. Instead of copy-pasting, you can wrap that logic into your own custom hook. It's like making your own specialized React tool that fits your specific needs perfectly.",

  romanUrduRevision:
    "Custom Hooks wo functions hain jo 'use' se shuru hotay hain aur unke andar doosray hooks use kiye ja sakte hain.\n\nInka maqsad 'logic reuse' karna hai. Har component jo custom hook use karta hai, uska apna personal state hota hai — wo state share nahi karte, sirf logic share karte hain.",

  why: "Without custom hooks, stateful logic is duplicated across components. Custom hooks let you extract that logic once into a reusable function — creating a clean separation of concerns between UI (the component) and logic (the hook). This leads to smaller, more readable components.",

  how: [
    "Step 1 - Name MUST start with 'use' (e.g., useFetch, useAuth).",
    "Step 2 - You can call any built-in React hooks (useState, useEffect, etc.) inside.",
    "Step 3 - It can accept parameters and return anything (values, arrays, or objects).",
    "Step 4 - Isolated State: Each component using the hook gets its OWN independent state.",
    "Step 5 - Logic Sharing: Custom hooks share LOGIC, not data/state (unlike Context).",
    "Step 6 - Composition: Custom hooks can call other custom hooks as well.",
  ],

  diagram: `
flowchart TD
    subgraph BEFORE: Duplication
    C1["UserList: Fetch Logic"]
    C2["ProductList: Fetch Logic"]
    C3["OrderList: Fetch Logic"]
    end

    subgraph AFTER: reuse
    H["useFetch(url) Hook"]
    L1["UserList: useFetch('/users')"]
    L2["ProductList: useFetch('/products')"]
    L3["OrderList: useFetch('/orders')"]
    end

    L1 --> H
    L2 --> H
    L3 --> H
`,

  analogy:
    "Custom hooks are like kitchen appliance functions. Without them: every time you want toast, you wire up a heating element, set a timer, and check the temperature manually in every recipe. With a custom hook like useToaster(), you just plug it in and it handles the complex details. Each recipe (component) gets its OWN toaster (isolated state) — making toast in one kitchen does not burn the toast in another kitchen.",

  realLifeExample:
    "Think of a 'Newsletter Popup' that should only show up once. You need to check LocalStorage, set a timer, and handle the closing animation. If you want this on the Home page and the Blog page, you create a custom hook called useNewsletter(). Now both pages just call that one hook, and they both get that behavior without you writing the logic twice.",

  code: `
/**
 * REACT HOOKS RULES:
 * 1. Only call hooks at the TOP LEVEL.
 * 2. Only call hooks from REACT FUNCTION COMPONENTS or CUSTOM HOOKS.
 */

import { useState, useEffect, useCallback } from 'react';

// 1. useFetch — The most common custom hook pattern
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
        return res.json();
      })
      .then(data => { setData(data); setLoading(false); })
      .catch(err => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// 2. useLocalStorage — Persisted state
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = useCallback((newValue) => {
    setValue(prev => {
      const val = newValue instanceof Function ? newValue(prev) : newValue;
      localStorage.setItem(key, JSON.stringify(val));
      return val;
    });
  }, [key]);

  return [value, setStoredValue];
}

// 3. useDebounce — Prevent rapid execution
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// 4. useWindowSize — Responsive logic
export function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
`,

  commonMistakes: [
    "Not naming the function starting with 'use', breaking React's hook rules enforcement.",
    "Sharing state globally (Custom hooks share logic, but state is unique to each component instance).",
    "Creating an overly complex 'God Hook' that handles too many unrelated things.",
    "Forgetting dependencies in internal hooks (useEffect, useCallback) inside the custom hook.",
    "Over-extracting simple logic that would be better kept within the component.",
  ],

  interviewQA: [
    {
      q: "What is a custom hook?",
      a: "A custom hook is a JS function that starts with 'use' and can call other hooks. It extracts reusable stateful logic from components so multiple components can use the same logic with isolated state.",
    },
    {
      q: "How does a custom hook differ from a regular utility function?",
      a: "Regular utils cannot call React hooks. Custom hooks can (and usually do) call hooks like useState or useEffect to manage React-specific features.",
    },
    {
      q: "Do components sharing a custom hook share state?",
      a: "No. Each component gets its own independent state copy. Custom hooks share logic only. To share state, you would need Context or a global state manager.",
    },
    {
      q: "What is the naming convention for custom hooks and why?",
      a: "They must start with 'use' (e.g., useForm). This allows React's linters to verify that hook rules are being followed within the function.",
    },
  ],

  realWorldUsage: [
    "Abstracting complex form validation logic",
    "Creating a universal useFetch hook for all API calls",
    "Persisting state to LocalStorage or SessionStorage",
    "Handling browser events like window resize or online/offline status",
    "Managing authentication state across the app",
  ],

  interviewSummary: [
    "Custom hooks extract stateful logic into reusable functions.",
    "They must follow the 'useName' naming convention.",
    "Each component gets a unique, isolated copy of the hook's state.",
    "Helpful for data fetching, form handling, event listeners, and timers.",
    "Enable a cleaner, more modular component architecture.",
  ],
};
