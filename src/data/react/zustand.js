export const zustand = {
  id: "zustand",
  title: "Zustand",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "Zustand",
    "state management",
    "create",
    "store",
    "set",
    "get",
    "slice pattern",
    "no Provider",
    "lightweight",
    "modern",
  ],

  definition:
    "Zustand is a small, fast, and scalable bearbones state-management solution using simplified flux principles. It has a comfy API based on hooks, isn't boilerplatey or opinionated, and solves common issues like the zombie child problem, React concurrency, and context loss between mixed renderers.",

  simpleExplanation:
    "Think of Zustand as the 'modern, cool younger brother' of Redux. It gives you a global store but without the headache of Providers, Actions, and Reducers. You just create a 'hook', put your data and functions in it, and use it anywhere in your app. It's incredibly fast because it only re-renders the specific component that's using the changed data.",

  romanUrduRevision:
    "Zustand modern global state library hai jo Redux se bohot simple aur context se zyada fast hai. Isme aapko 'Provider' se app ko wrap nahi karna parta. Bas ek store banao, usse hook ki tarah use karo, aur logic wahi store ke andar functions mein likh do. Chote se le kar bare apps tak sab ke liye yeh best hai.",

  why: "Redux is often too much work for medium-sized apps, and Context API can cause performance issues because it re-renders everything. Zustand offers the best of both worlds: it's as easy as a hook, but as powerful and performant as a professional store.",

  how: [
    "Step 1 - Install the library (yarn add zustand).",
    "Step 2 - Use the 'create' function to define your state and functions (actions).",
    "Step 3 - Use the 'set' function inside your store to update the state.",
    "Step 4 - Import your custom store hook in any component.",
    "Step 5 - Call the hook and select exactly which data you need to avoid unnecessary re-renders.",
  ],

  diagram: `
flowchart LR
    A[Zustand Store] --> B[Component A]
    A --> C[Component B]
    A --> D[Component C]
    subgraph "No Provider Required"
    A
    end
    style A fill:#433929,color:white,stroke:#eb9d31
  `,

  analogy:
    "Zustand is like a shared Google Doc. Anyone with the link (the hook) can open it and see the info. When someone edits a specific paragraph (part of the state), only the people currently looking at *that specific paragraph* see the change. You don't have to call a meeting (Provider) or fill out a form (Redux Action) to make a change—you just edit the doc.",

  realLifeExample:
    "A Dark Mode Toggle: You store the 'theme' (dark/light) in a Zustand store. The 'ToggleButton' calls 'toggle()' and the 'MainLayout' immediately switches colors. Even better, you can easily save this to localStorage using Zustand's 'persist' middleware so the theme stays the same even after a page refresh.",

  code: `
// 1. Create the store (store.js)
import { create } from 'zustand';

export const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

// 2. Use in Component
function BearCounter() {
  const bears = useStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}
  `,

  commonMistakes: [
    "Selecting the entire state object instead of specific fields (causes extra re-renders).",
    "Thinking you need a Provider to use Zustand (Zustand works independently of the React tree).",
    "Creating multiple stores for data that should be in one place (keep related logic together).",
    "Not using 'persist' middleware when state needs to survive a refresh.",
  ],

  interviewSummary: [
    "Zustand is a hook-based state management library with zero boilerplate.",
    "It uses a selector-based approach to prevent unnecessary component re-renders.",
    "No Provider is needed, making it easier to integrate into existing apps.",
    "It supports middleware for logging, devtools, and persistence out of the box.",
  ],
};
