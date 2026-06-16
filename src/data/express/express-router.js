export const expressRouter = {
  id: "express-router",
  title: "Express Router — Modular Route Files",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["express.Router", "Routing", "Modular", "Clean Code", "File Structure"],

  definition:
    "An 'express.Router' instance is a complete routing and middleware system; for this reason, it is often referred to as a 'mini-app'. It allows you to modularize your routing logic into separate files based on domain or feature, which are then 'mounted' into the main application.",

  simpleExplanation:
    "Imagine you are building a giant library. If you put every book on one long shelf (one main index file), it becomes impossible to find anything. Instead, you create separate rooms for 'Fiction', 'Science', and 'History'. Each room has its own door and shelves. In Express, 'express.Router' is that separate room. You keep all user routes in one file, all product routes in another, and just 'connect' them to the main building.",

  romanUrduRevision:
    "express.Router() app ko organized rakhne ka sab se behtareen tareeqa hai. Isse hum har feature (maslan users, products, orders) ke liye alag file bana sakte hain. Yeh ek 'mini-app' ki tarah kaam karta hai jisme routes define kar ke hum baad mein main app par 'mount' kar dete hain. Isse code scalable aur clean rehta hai.",

  why: "In large production apps, having 500 routes in one 'app.js' file is a nightmare for maintenance and merging. Router allows teams to work on different features (like Payment and Auth) in separate files without stepping on each other's toes. It also makes testing and debugging specific features much faster.",

  how: [
    "Step 1 - Create a new file (e.g., 'userRoutes.js').",
    "Step 2 - Import express and initialize router: 'const router = express.Router();'.",
    "Step 3 - Define routes on 'router' instead of 'app' (e.g., 'router.get(...)').",
    "Step 4 - Export the router: 'module.exports = router;'.",
    "Step 5 - In main 'app.js', import the router and mount it: 'app.use(\"/users\", userRouteFile);'.",
  ],

  diagram: `
flowchart TD
    A[main.js] --> B[app.use /users]
    A --> C[app.use /products]
    B --> D[userRoutes.js]
    C --> E[productRoutes.js]
    D -- GET /profile --> F[Profile Handler]
    D -- POST /login --> G[Login Handler]
    E -- GET /all --> H[All Products]
    style B fill:#3498db,color:white
    style C fill:#3498db,color:white
  `,

  analogy:
    "Think of a company's phone system. The main number (Main App) answers the call and asks who you want to speak with. If you ask for 'Sales', they transfer you to the Sales Department's internal switchboard (Router). The Sales department has its own internal extensions (Sub-routes) that the main receptionist doesn't need to know about.",

  realLifeExample:
    "A Social Media App: You have a 'UserRouter' for registration and profile editing, a 'PostRouter' for creating and liking posts, and a 'CommentRouter' for handling replies. Each router lives in its own file under a '/routes' directory, keeping the codebase professional and structured.",

  code: `
// --- 1. userRoutes.js (The Module) ---
const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  res.send('User Profile Data');
});

router.post('/register', (req, res) => {
  res.send('User successfully registered');
});

module.exports = router;


// --- 2. app.js (The Main Entry) ---
const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');

// Mount the router with a prefix
app.use('/users', userRouter);

// Now the URLs become:
// localhost:3000/users/profile
// localhost:3000/users/register

app.listen(3000);
  `,

  commonMistake: [
    "Defining routes on 'app' inside the module instead of 'router'.",
    "Forgetting to export the router instance at the end of the file.",
    "Duplicate path segments (e.g., writing '/users/profile' in the router file when you've already mounted it on '/users' in the main app).",
    "Not using 'module.exports' correctly (remember: routers are exported as objects).",
  ],

  interviewSummary: [
    "express.Router allows for modular, mountable route handlers.",
    "It acts as a mini-middleware and routing system.",
    "Mounting a router with a path prefix (app.use('/v1', router)) makes versioning APIs easy.",
    "It improves code maintainability and scalability in large projects.",
  ],
};
