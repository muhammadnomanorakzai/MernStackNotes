export const expressAsyncWrapper = {
  id: "express-async-wrapper",
  title: "Async Wrapper Utility — Eliminating Try/Catch Boilerplate",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Async", "Error Handling", "Utility", "Clean Code", "Wrapper", "DRY"],

  definition:
    "An Async Wrapper (also called 'catchAsync') is a higher-order function that wraps an async Express route handler. It automatically catches any rejected promises or thrown errors and passes them to the 'next(err)' function, eliminating the need to write 'try/catch' blocks in every single route handler.",

  simpleExplanation:
    "Without this wrapper, every single async route needs its own 'try { ... } catch(err) { next(err) }' block. This is like having a 'Personal Safety Net' for each acrobat in a circus. The 'Async Wrapper' is like a single, massive, shared safety net under the ENTIRE performance. If any acrobat falls, the universal net catches them and passes them safely to the backstage crew (the error handler), without each performer needing their own personal net.",

  romanUrduRevision:
    "Agar aap har route mein 'try/catch' likhein, yeh code repeat hota rehta hai (DRY principle violate hota hai). 'catchAsync' ek utility function hai jo ek async function ko wrap kar leta hai. Jab bhi us async function mein koi error aata hai ya promise reject hota hai, yeh wrapper us error ko automatically 'next(err)' par forward kar deta hai. Isse aapka route code bohot clean ho jata hai aur sirf 'Happy Path' logic rehta hai.",

  why: "DRY (Don't Repeat Yourself) and Separation of Concerns. In a real app with 50 routes, that's 50 try/catch blocks. Each one is boilerplate safety code that clutters your business logic. The catchAsync utility separates the 'What to do' (route logic) from the 'How to handle failure' (error handler), leading to routes that are shorter, much more readable, and far less error-prone.",

  how: [
    "Step 1 - Create 'utils/catchAsync.js'.",
    "Step 2 - Write a function that accepts a function 'fn' as a parameter.",
    "Step 3 - Return a new function '(req, res, next)' that calls 'fn(req, res, next).catch(next)'.",
    "Step 4 - Wrap your async route handler with it: 'const getUsers = catchAsync(async (req, res) => { ... });'.",
    "Step 5 - If any await inside throws, .catch(next) passes it to the central error handler automatically.",
  ],

  diagram: `
flowchart LR
    A[catchAsync wrapper] --> B[Async Route fn]
    B -- "Throws / Rejects" --> C[.catch(next)]
    C --> D[Central Error Handler]
    B -- "Success" --> E[res.json called]
    style A fill:#3498db,color:white
    style D fill:#e74c3c,color:white
  `,

  analogy:
    "A 'Spell Checker' for a text editor is a great analogy. You just type normally (write your route logic) and the spell checker silently watches in the background. If you make a mistake (throw an error), the editor highlights it and tells you. You don't have to manually check every word — the tool does it for you transparently.",

  realLifeExample:
    "Full MERN Backend: Instead of repetitive error handling code, all your async route files look clean and readable — just the core logic. The single catchAsync function handles the safety for all 50+ endpoints, and all errors consistently flow to your global error handler.",

  code: `
// --- utils/catchAsync.js ---
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // .catch(next) is the KEY!
  };
};

module.exports = catchAsync;


// --- routes/userRoutes.js (CLEAN) ---
const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');

// No try/catch needed anywhere!
const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find(); // If this throws, catchAsync handles it
  res.status(200).json({ success: true, data: users });
});

const createUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
});

// --- WITHOUT catchAsync (messy, repeated pattern) ---
const getAllUsersMessy = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err); // Same boilerplate every single time
  }
};
  `,

  commonMistake: [
    "Not exporting 'catchAsync' correctly (it must be a factory function, not called immediately).",
    "Forgetting that 'catchAsync' requires a centralized error handler to be set up — otherwise the caught error has nowhere to go.",
    "Wrapping synchronous (non-async) functions — while it works, it's unnecessary overhead.",
    "Writing '.catch(err => next(err))' instead of the shorthand '.catch(next)' (both work, but the shorthand is cleaner).",
  ],

  interviewSummary: [
    "catchAsync is a higher-order function (HOF) that wraps async route handlers.",
    "It uses Promise's .catch() to automatically forward errors to next().",
    "It eliminates boilerplate try/catch code, keeping routes clean and readable.",
    "It depends on a global error handler to be meaningful.",
  ],
};
