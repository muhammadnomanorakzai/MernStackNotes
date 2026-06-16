export const contextReducerPattern = {
  id: "context-reducer-pattern",
  title: "Context API + useReducer Pattern",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "Context",
    "useReducer",
    "global state",
    "dispatch",
    "lightweight Redux",
    "provider pattern",
    "no extra library",
  ],

  definition:
    "The Context + useReducer pattern is a built-in React architecture that combines the dependency injection capabilities of Context API with the state management logic of useReducer. It provides a structured, Redux-like flow (actions, dispatch, reducer) without requiring any external libraries.",

  simpleExplanation:
    "Imagine you want a simplified version of Redux that comes directly with React. Instead of passing state through every level of components (prop drilling), you wrap your app in a 'Provider'. You use a 'Reducer' to handle complex logic, and components simply 'Dispatch' actions to update the state. It's clean, organized, and doesn't increase your bundle size.",

  romanUrduRevision:
    "Agar aapko Redux jaisa structured state chahiye magar extra library nahi dalni, toh Context + useReducer best hai. Context data ko transfer karta hai aur useReducer saari conditions (logic) handle karta hai. Chote aur medium apps ke liye yeh perfect solution hai.",

  why: "For apps where props are being drilled more than 3-4 levels deep, or where state logic is complex (many related variables), this pattern offers a centralized 'source of truth'. It keeps components lean by moving logic into a single reducer function.",

  how: [
    "Step 1 - Create two Contexts: one for State and one for Dispatch (prevents unnecessary re-renders).",
    "Step 2 - Define an initial state and a Reducer function with various action types.",
    "Step 3 - Create a Provider component that wraps 'useReducer' and provides state/dispatch values.",
    "Step 4 - Create custom hooks (e.g., useAppState, useAppDispatch) for easy consumption.",
    "Step 5 - Wrap the parent component (usually App.jsx) with your Provider.",
  ],

  diagram: `
flowchart TD
    A[Component] -->|dispatch action| B(AppDispatchContext)
    B --> C[Reducer Function]
    C -->|updates| D[State]
    D --> E(AppStateContext)
    E -->|triggers re-render| A
    style B fill:#f9f,stroke:#333
    style E fill:#bbf,stroke:#333
  `,

  analogy:
    "Think of this like a company's suggestion system. The 'Suggestion Box' is the DispatchContext—anyone can drop a note (action) inside. The 'Manager' is the Reducer—they read the notes and decide how to update the 'Company Notice Board' (StateContext). Employees (components) only check the board when it actually changes, and they don't get interrupted while someone is just dropping a note in the box.",

  realLifeExample:
    "A Shopping Cart system: When you click 'Add to Cart', you dispatch an action. The reducer adds the item and calculates the total price. The Context ensures the 'Cart Icon' in the header and the 'Checkout Page' both see the updated list instantly.",

  code: `
// 1. Setup Logic (AppContext.js)
import { createContext, useContext, useReducer } from "react";

const StateCtx = createContext();
const DispatchCtx = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': return { ...state, user: action.payload };
    case 'LOGOUT': return { ...state, user: null };
    default: return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { user: null });
  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>
        {children}
      </DispatchCtx.Provider>
    </StateCtx.Provider>
  );
};

// 2. Custom Hooks (Consumer side)
export const useAppState = () => useContext(StateCtx);
export const useAppDispatch = () => useContext(DispatchCtx);

// 3. Usage inside Component
function Login() {
  const dispatch = useAppDispatch();
  return <button onClick={() => dispatch({ type: 'LOGIN', payload: 'Ali' })}>Login</button>;
}
  `,

  commonMistakes: [
    "Putting both state and dispatch in a single context (causes re-renders for every dispatcher).",
    "Using Context for high-frequency updates like text inputs (performance hit).",
    "Not using custom hooks, leading to repetitive 'useContext' calls in every file.",
    "Forgetting to wrap the app in the Provider, causing 'undefined' context errors.",
  ],

  interviewSummary: [
    "Context + useReducer is a native alternative to Redux for smaller apps.",
    "Use separate contexts for state and dispatch to optimize performance.",
    "Reducers must be pure functions with no side effects.",
    "Context is for dependency injection; useReducer is for state transition logic.",
  ],
};
