export const useReducerHook = {
  id: "use-reducer",
  title: "useReducer",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "useReducer",
    "reducer",
    "action",
    "dispatch",
    "state machine",
    "useState alternative",
    "complex state",
    "Redux pattern",
  ],

  definition:
    "useReducer is a React Hook for managing complex state logic with a pure reducer function. It accepts a reducer (state, action) => newState and an initial state, returning the current state paired with a dispatch method. You dispatch actions to describe what happened, and the reducer decides how state should change.",

  simpleExplanation:
    "Imagine a bank. You can't just walk into the vault and change your balance. Instead, you fill out a form (action) like 'Deposit $100'. You hand it to the teller (dispatch). The teller follows the bank's rules (reducer) to calculate your new balance. useReducer brings this same organized structure to your component state.",

  romanUrduRevision:
    "Agar state bohot complex ho jaye (jesay aik sath 5 values update ho rahi hon), to useState ke bajaye useReducer behtar hota hai.\n\nIs mein aik 'reducer' function hota hai jo purani state aur 'action' lekar naye state banata hai. Hum directly state change nahi karte, sirf 'dispatch' call karte hain.",

  why: "useState becomes painful when state has multiple sub-values that change together, or when the next state depends on complex logic from the previous state. useReducer centralizes all state logic in one pure function — making it easier to test, debug, and reason about state transitions.",

  how: [
    "Step 1 - Define a reducer function: reducer(state, action) → newState.",
    "Step 2 - The reducer MUST be pure: same inputs equal same output, no side effects.",
    "Step 3 - Initialize: const [state, dispatch] = useReducer(reducer, initialState).",
    "Step 4 - Update: dispatch({ type: 'ACTION_NAME', payload: data }).",
    "Step 5 - React calls the reducer with current state and action to get the new state.",
    "Step 6 - Dispatching does not immediately change state; it schedules a re-render.",
  ],

  diagram: `
flowchart TD
    User["User Interaction (e.g., click)"] --> Dispatch["dispatch({ type: 'ADD_ITEM', payload: item })"]
    Dispatch --> Reducer["Reducer Function: (state, action)"]
    Reducer --> Calculate["Logic: switch(action.type)..."]
    Calculate --> NewState["Returns NEW State Object"]
    NewState --> Render["React Re-renders Component"]
    Render --> UI["UI Updates"]

    subgraph Reducer Pure Logic
    S1["{ items: [], loading: false }"] -- FETCH_START --> S2["{ items: [], loading: true }"]
    S2 -- FETCH_SUCCESS --> S3["{ items: [...data], loading: false }"]
    end
`,

  analogy:
    "useReducer is like a bank system. Your account (state) can only change through official transactions (actions). You submit a transaction form (dispatch) describing what happened: 'deposit $500' or 'withdraw $100'. The bank's transaction processing system (reducer) applies the rules and produces the new balance (new state). You cannot directly reach into the vault (state) and change the number — all changes go through the system. This ensures state transitions are predictable and follow business rules.",

  realLifeExample:
    "Think of a complex 'Shopping Cart'. You can add an item, remove an item, clear the cart, or apply a discount code. instead of having 4 different state variables, you use useReducer. You dispatch an 'ADD_ITEM' action, and the reducer calculates the new total and the new list of items in one clean move.",

  code: `
/**
 * REACT HOOKS RULES:
 * 1. Only call hooks at the TOP LEVEL.
 * 2. Only call hooks from REACT FUNCTION COMPONENTS or CUSTOM HOOKS.
 */

import React, { useReducer, useEffect } from 'react';

// 1. Reducer Function (Pure Logic)
const initialState = { count: 0, step: 1 };

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT": 
      return { ...state, count: state.count + state.step };
    case "DECREMENT": 
      return { ...state, count: state.count - state.step };
    case "SET_STEP":  
      return { ...state, step: action.payload };
    case "RESET":     
      return initialState;
    default: 
      throw new Error(\`Unknown action: \${action.type}\`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div className="p-4 border shadow rounded">
      <p>Count: {state.count} (Step: {state.step})</p>
      <div className="flex gap-2">
        <button className="border p-2" onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
        <button className="border p-2" onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
        <button className="border p-2" onClick={() => dispatch({ type: "SET_STEP", payload: 5 })}>Step 5</button>
        <button className="border p-2" onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      </div>
    </div>
  );
}

// 2. Handling Async State (The fetch pattern)
const dataInitialState = { data: null, loading: false, error: null };

function dataReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":   return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS": return { data: action.payload, loading: false, error: null };
    case "FETCH_ERROR":   return { ...state, loading: false, error: action.payload };
    default: return state;
  }
}

function DataDisplay({ url }) {
  const [state, dispatch] = useReducer(dataReducer, dataInitialState);

  useEffect(() => {
    dispatch({ type: "FETCH_START" });
    fetch(url)
      .then(res => res.json())
      .then(data => dispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch(err => dispatch({ type: "FETCH_ERROR", payload: err.message }));
  }, [url]);

  if (state.loading) return <p>Loading Data...</p>;
  if (state.error)   return <p>Error: {state.error}</p>;
  return <pre>{JSON.stringify(state.data, null, 2)}</pre>;
}
`,

  commonMistakes: [
    "Mutating the 'state' argument inside the reducer function.",
    "Forgetting the 'default' case or not returning state for unhandled actions.",
    "Executing side effects (like data fetching) directly inside the reducer.",
    "Using useReducer for extremely simple state where useState would suffice.",
    "Misunderstanding how dispatch works — it takes an action object, not a direct value.",
  ],

  interviewQA: [
    {
      q: "What is useReducer and when would you use it over useState?",
      a: "useReducer manages state via a pure reducer function. Use it when state has multiple related sub-values, next state depends on complex old state logic, or when logic needs to be tested in isolation.",
    },
    {
      q: "What is a reducer function?",
      a: "A reducer is a pure function (state, action) => newState. It must be side-effect free and never mutate state directly. Conventional patterns use a switch statement on action.type.",
    },
    {
      q: "What is the difference between dispatch and setState?",
      a: "setState directly accepts a new value or updater. dispatch accepts an action object describing what happened. The reducer then determines the HOW of the state change.",
    },
    {
      q: "How does useReducer relate to Redux?",
      a: "useReducer follows the Redux pattern: pure reducers, actions, and dispatch. It can replace Redux for simpler global state when combined with Context.",
    },
  ],

  realWorldUsage: [
    "Managing complex user settings with many toggles",
    "Handling state for data fetching (loading, error, data)",
    "Controlling complex form validations and multi-step processes",
    "Implementing undo/redo functionality in apps",
    "Building advanced game logic within React components",
  ],

  interviewSummary: [
    "useReducer manages state through a pure reducer function that receives the current state and an action, returning the new state.",
    "Best for complex objects, related transitions, and testing logic in isolation.",
    "Indirection via dispatch centralizes state logic and ensures predictable transitions.",
    "Foundation for Redux-like global state management patterns with Context.",
  ],
};
