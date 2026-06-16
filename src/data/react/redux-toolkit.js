export const reduxToolkit = {
  id: "redux-toolkit",
  title: "Redux Toolkit — Core Concepts",
  category: "React",
  difficulty: "Intermediate",
  tags: [
    "Redux",
    "Redux Toolkit",
    "RTK",
    "createSlice",
    "configureStore",
    "useSelector",
    "useDispatch",
    "Immer",
    "slice",
    "reducer",
  ],

  definition:
    "Redux Toolkit (RTK) is the official, opinionated, and modern way to write Redux logic. It was created to solve the three biggest complaints about Redux: the complex store configuration, the excessive boilerplate code, and the need for multiple packages to do anything useful.",

  simpleExplanation:
    "Think of Redux Toolkit as 'Redux with a shortcut.' In the old days, you had to write lines and lines of setup for a simple counter. RTK gives you tools like 'createSlice' that handle almost everything automatically. It even lets you write 'mutating' code (like state.value = 10) which is normally forbidden in React, because it handles the safety check for you behind the scenes.",

  romanUrduRevision:
    "Redux Toolkit modern and easy version hai Purane Redux ka. Pehle bohot zyada boilerplate code likhna parta tha (actions, constants, reducers alag alag). RTK mein 'createSlice' se sab kuch ek jagah hojata hai. Isme Immer library use hoti hai jiski wajah se hum state ko directly update kar sakte hain bina spread operator ke.",

  why: "RTK is the industry standard for large enterprise applications. It provides a strict structure that multiple developers can follow, powerful debugging tools (Redux DevTools), and a centralized store that can handle complex state relationships across hundreds of components.",

  how: [
    "Step 1 - Setup your store using 'configureStore' and register your reducers.",
    "Step 2 - Use 'createSlice' to define your initial state and reducer logic in one place.",
    "Step 3 - Export the generated actions and the reducer from the slice.",
    "Step 4 - Wrap your application in the 'Provider' from 'react-redux'.",
    "Step 5 - Use 'useSelector' to read data and 'useDispatch' to trigger changes (actions).",
  ],

  diagram: `
flowchart TD
    A[Component] -->|dispatch action| B[Store]
    B --> C[Slice Reducer]
    C -->|Immer updates| D[New State]
    D -->|useSelector notifies| A
    style B fill:#764abc,color:white
  `,

  analogy:
    "Redux is like a central bank. Every branch (component) can check their balance (useSelector) and submit a transfer request (dispatch). You can't just walk into the vault and change the numbers yourself (immutable state). You must follow a specific process (actions/reducers) to ensure every transaction is logged and trackable.",

  realLifeExample:
    "A User Profile Dashboard: The user's preferences, notification count, and authentication status live in the Redux store. When the user changes their theme, any component in the app (Sidebar, Header, ProfilePage) immediately updates to match because they are all listening to the same central store.",

  code: `
// 1. Create a Slice (features/counterSlice.js)
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 }, // Immer handles immutability!
    addAmount: (state, action) => { state.value += action.payload }
  }
});

export const { increment, addAmount } = counterSlice.actions;
export default counterSlice.reducer;

// 2. Component Usage
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './counterSlice';

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(increment())}>
      Count is: {count}
    </button>
  );
}
  `,

  commonMistakes: [
    "Trying to use RTK without wrapping the app in a Provider.",
    "Writing side effects (API calls) directly inside the slice reducers (reducers must be pure).",
    "Forgetting that 'state' inside a slice shouldn't be returned (unless you're replacing the whole state).",
    "Over-using Redux for local component state that doesn't need to be shared.",
  ],

  interviewSummary: [
    "Redux Toolkit reduces boilerplate significantly via createSlice.",
    "It uses Immer internally to allow 'mutable-style' updates to state.",
    "configureStore automatically sets up Redux DevTools and Thunk middleware.",
    "useSelector ensures components only re-render if the specific data they need changes.",
  ],
};
