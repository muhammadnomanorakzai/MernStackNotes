export const expressRouteGrouping = {
  id: "express-route-grouping",
  title: "Route Grouping & Prefixing — /api/v1",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Routing", "API Versioning", "Grouping", "Prefix", "Scalability"],

  definition:
    "Route grouping is the practice of organizing related endpoints under a common URL prefix. Prefixing is the method of applying a 'base path' (like /api/v1) to a router or set of routes. This ensures a clean, predictable URL structure and allows for easier API versioning.",

  simpleExplanation:
    "Route grouping is like 'Department Labeling'. Instead of having a thousand stray files, you say: 'Everything starting with /users belongs to the User Department' and 'Everything starting with /api/v1 is our first version of the system'. This makes your URLs look professional and organized, just like a real company's folder structure.",

  romanUrduRevision:
    "Route grouping aur prefixing app ko scalable banane ke liye bohot zaroori hain. Isse hum related routes ko ek khas path ke neeche jama kar dete hain (e.g., /api/v1/auth, /api/v1/users). Prefixing ka sab se bada faida yeh hai ke aap asani se API ke naye versions bana sakte hain baghair purane code ko disturb kiye.",

  why: "Imagine you want to update your API but don't want to break the mobile app for users who haven't updated yet. By using prefixes like '/v1' and '/v2', you can run both versions at the same time. It also makes your URL structure 'Semantically' correct, meaning the URL clearly describes what the data is (e.g., /admin/settings vs /user/settings).",

  how: [
    "Step 1 - Group related routes into an express.Router module.",
    "Step 2 - In the main file, use 'app.use('/prefix', routerInstance)'.",
    "Step 3 - You can nest routers by mounting one router on another (e.g., apiRouter uses v1Router).",
    "Step 4 - Use variables for prefixes to easily change versions globally.",
    "Step 5 - Keep the routes inside the router relative (e.g., use '/' instead of '/users' if prefix is '/users').",
  ],

  diagram: `
flowchart LR
    A[main.js] --> B[app.use /api]
    B --> C[apiRouter.js]
    C --> D[apiRouter.use /v1]
    C --> E[apiRouter.use /v2]
    D --> F[v1 Controller]
    E --> G[v2 Controller]
    style B fill:#f1c40f,color:black
    style D fill:#3498db,color:white
    style E fill:#e67e22,color:white
  `,

  analogy:
    "Think of a Shopping Mall. The 'Mall' is your app. The different floors are your prefixes. Ground Floor (/v1) has the old shops. First Floor (/v2) has the new, modern shops. Both floors have a 'Restroom' and a 'Food Court'. When a user enters the mall, the prefix (Floor Number) tells them whether they are in the old or new environment.",

  realLifeExample:
    "A Production API: You visit 'api.twitter.com/1.1/statuses/user_timeline.json'. Here, '/1.1' is the version prefix. This allows Twitter engineers to build version 2.0 while keeping 1.1 running for millions of third-party apps that haven't migrated yet.",

  code: `
const express = require('express');
const app = express();

// --- Version 1 Router ---
const v1Router = express.Router();
v1Router.get('/status', (req, res) => res.json({ version: 1, up: true }));

// --- Version 2 Router ---
const v2Router = express.Router();
v2Router.get('/status', (req, res) => res.json({ version: 2, up: true, message: "New Features!" }));

// --- Grouping Everything under /api ---
const apiRouter = express.Router();
apiRouter.use('/v1', v1Router);
apiRouter.use('/v2', v2Router);

// --- Finally Mount to App ---
app.use('/api', apiRouter);

// URLs result in:
// GET localhost:3000/api/v1/status
// GET localhost:3000/api/v2/status

app.listen(3000);
  `,

  commonMistake: [
    "Repeating the prefix inside the router (e.g., and endpoint '/api/v1/users' in a router that is already mounted at '/api/v1').",
    "Confusing the order of mounting (mounting a generic '/api' after a specific '/api/v1').",
    "Not using prefixes for large data sets, leading to 'URL Collision' where two different features want the same URL path.",
    "Forgetting that middleware added to the 'apiRouter' also applies to both 'v1' and 'v2'.",
  ],

  interviewSummary: [
    "Route grouping organizes your API into logical domains.",
    "Prefixing enables versioning (v1, v2) and feature isolation.",
    "Router nesting is a powerful pattern for complex applications.",
    "Paths inside a router become relative to the mounting point.",
  ],
};
