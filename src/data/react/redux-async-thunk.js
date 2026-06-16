export const reduxAsyncThunk = {
  id: "redux-async-thunk",
  title: "Redux Toolkit — Async with createAsyncThunk",
  category: "React",
  difficulty: "Advanced",
  tags: [
    "createAsyncThunk",
    "extraReducers",
    "builder",
    "pending",
    "fulfilled",
    "rejected",
    "async Redux",
    "RTK",
    "thunk",
  ],

  definition:
    "createAsyncThunk is a function that accepts a Redux action type string and a callback function that should return a promise. It automatically generates and dispatches action creators that correspond to the lifecycle of the promise (pending, fulfilled, and rejected).",

  simpleExplanation:
    "Normally, Redux can only handle synchronous data—it doesn't understand 'waiting' for an API. 'Thunks' are the middleman. When you start an API call, the Thunk tells Redux 'I'm starting' (pending). When data arrives, it says 'I'm done' (fulfilled). If it fails, it says 'There was an error' (rejected). You then use these statuses to show spinners or error messages in your UI.",

  romanUrduRevision:
    "Redux reducers hamesha synchronous hote hain, wo API ka wait nahi kar sakte. createAsyncThunk isi liye use hota hai. Yeh automatic 3 states generate karta hai: Pending (loading start), Fulfilled (data mil gaya), aur Rejected (error aa gaya). In states ko hum 'extraReducers' mein handle karte hain.",

  why: "In real-world apps, most global state comes from a server. Managing loading spinners and error states manually for every single API call is exhausting and error-prone. createAsyncThunk standardizes this process across your entire application.",

  how: [
    "Step 1 - Use 'createAsyncThunk' to define your async logic (e.g., fetch API).",
    "Step 2 - In your slice, add an 'extraReducers' field.",
    "Step 3 - Use the 'builder.addCase' syntax to handle the pending, fulfilled, and rejected types.",
    "Step 4 - Update your state based on which case is triggered (e.g., set loading true on pending).",
    "Step 5 - Dispatch the thunk action from your component just like a regular action.",
  ],

  diagram: `
sequenceDiagram
    participant C as Component
    participant T as Thunk
    participant S as Store
    participant A as API Server

    C->>T: dispatch(fetchUsers())
    T->>S: Dispatch "pending"
    S-->>C: Update loading: true
    T->>A: API Request
    A-->>T: API Response (Data)
    T->>S: Dispatch "fulfilled" (payload)
    S-->>C: Update state with data
  `,

  analogy:
    "Imagine you order a burger at a restaurant. The waiter taking the order and giving you a buzzer is the 'Pending' phase. The kitchen (API) making the burger is the async process. When the buzzer goes off and you get your burger, that's 'Fulfilled.' If the waiter comes back and says they ran out of meat, that's 'Rejected.' The buzzers and status updates are managed by the Thunk.",

  realLifeExample:
    "Fetching a User List: You dispatch 'fetchUsers'. Immediately, 'pending' triggers and your UI shows a skeleton/spinner. If the network is slow or down, 'rejected' triggers and you show a 'Try Again' button. If successful, 'fulfilled' triggers and the user list renders normally.",

  code: `
// 1. Define Thunk (userSlice.js)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://api.example.com/users');
    return response.json();
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: { data: [], status: 'idle' },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.status = 'loading' })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => { state.status = 'failed' });
  }
});
  `,

  commonMistakes: [
    "Handling thunks in regular 'reducers' instead of 'extraReducers'.",
    "Not handling the 'rejected' case, leading to infinite loading spinners if the API fails.",
    "Trying to use 'await' inside a regular slice reducer (reducers must be sync).",
    "Not returning the promise/data from the thunk function.",
  ],

  interviewSummary: [
    "createAsyncThunk handles the lifecycle of async requests (pending, fulfilled, rejected).",
    "extraReducers is where actions outside the slice (like thunks) are handled.",
    "Thunks allow Redux to strictly separate application logic from side effects.",
    "The builder pattern in extraReducers is the modern standard for handling thunks.",
  ],
};
