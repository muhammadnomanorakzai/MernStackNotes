export const expressRouteOrder = {
  id: "express-route-order",
  title: "Route Order — Specific Before Wildcard",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Route Order", "Execution", "Precedence", "Middleware Chain", "Best Practices"],

  definition:
    "Route order is the sequence in which Express matches incoming requests against defined routes. In Express, routes are executed in the exact order they are defined in the code (Top-to-Bottom). Once a request is successfully matched and a response is sent, the search stops.",

  simpleExplanation:
    "Think of a list of 'Rules' on a wall. When a request comes in, Express starts reading from the top. If Rule #1 matches, it runs it. If Rule #1 doesn't match, it moves to Rule #2. The most important thing to remember is: 'Be Specific First'. If you have a general rule at the top, it might 'steal' the request from more specific rules below it.",

  romanUrduRevision:
    "Express mein routes ka 'order' bohot maayney rakhta hai kyunki server code ko upar se neeche (top to bottom) read karta hai. Hamesha 'Specific' routes (jaise /users/me) ko 'General' ya 'Wildcard' routes (jaise /users/:id) se pehle likhna chahiye. Agar aapne generic route pehle likh diya, toh niche wale specific routes kabhi chalenge hi nahi.",

  why: "Mistakes in route order are a very common cause of 'Ghost Bugs' where a route seems correct but won't run. For example, if you place 'app.get('/:id')' above 'app.get('/new')', the string 'new' will be seen by Express as an 'id', and you will never see your 'new' page. Understanding order is essential for a debugging and architecture.",

  how: [
    "Step 1 - List all your static/fixed routes first (e.g., /about, /contact).",
    "Step 2 - List your specific dynamic routes next (e.g., /users/profile).",
    "Step 3 - List your generic dynamic routes (e.g., /users/:id).",
    "Step 4 - List your wildcard/catch-all routes at the very bottom (e.g., app.all('*')).",
    "Step 5 - Use 'next()' if you want a match to continue even after it is found (uncommon for routes).",
  ],

  diagram: `
flowchart TD
    A[Request: /users/profile] --> B{"app.get('/:id')?"}
    B -- "If this is first..." --> C["Match found! ID = 'profile'"]
    B -- "If it's lower down..." --> D{"app.get('/users/profile')?"}
    D -- "MATCH!" --> E[Show Profile Page]
    C --> F[Logic Fails or Wrong View Shown]
    style B fill:#e74c3c,color:white
    style D fill:#2ecc71,color:white
  `,

  analogy:
    "Imagine a series of Filters in a water pipe. The first filter has small holes, and the second has large holes. If you put the large-hole filter first, all the dirt (requests) passes through it easily, and the small-hole filter (specific route) never gets to do its job. You must put the most restrictive filter first.",

  realLifeExample:
    "An Admin System: You have '/admin/me' (my profile) and '/admin/:id' (specific user profile). If you put '/admin/:id' first, Express will think 'me' is just another user ID, and it will try to find a user named 'me' in your database. This will cause an error or show the wrong info.",

  code: `
const express = require('express');
const app = express();

// --- WRONG ORDER (Buggy) ---
/*
app.get('/users/:id', (req, res) => res.send('User Page'));
app.get('/users/me', (req, res) => res.send('My Profile')); 
// 'me' will be caught by :id, and 'My Profile' will NEVER run
*/

// --- CORRECT ORDER (Specific First) ---
app.get('/users/me', (req, res) => {
  res.send('Welcome, this is your profile.');
});

app.get('/users/:id', (req, res) => {
  res.send(\`Viewing data for user \${req.params.id}\`);
});

// --- CATCH-ALL (Last) ---
app.all('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(3000);
  `,

  commonMistake: [
    "Putting static routes (like /login) below dynamic routes (like /:slug).",
    "Forgetting that middleware order also follows this top-to-bottom rule.",
    "Not using 'return' or 'next()' logically when you have overlapping route logic.",
    "Defining error-handling middleware at the top (it must be at the very bottom).",
  ],

  interviewSummary: [
    "Express routes are matched in the order they are defined.",
    "Place more specific routes before generic or parameterized ones.",
    "Ordering applies to both route handlers and middleware.",
    "Static paths should always come before dynamic path parameters.",
  ],
};
