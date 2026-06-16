export const expressRouterMiddleware = {
  id: "express-router-middleware",
  title: "Router-level Middleware — Specific Logic",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Middleware", "Router", "express.Router", "Scoped Middleware", "Logic"],

  definition:
    "Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of 'express.Router()'. This allows you to apply middleware logic specifically to a set of related routes rather than the entire application.",

  simpleExplanation:
    "Application-level middleware is like a security guard at the building's main entrance (the app). Router-level middleware is like a separate security guard at the door of a specific department (the router). For example, you might want to log every request to your site (Global), but only check for an admin password when someone tries to open the 'Admin Panel' (Router-level).",

  romanUrduRevision:
    "Router-level middleware sirf un routes par chalta hai jo us specific router instance ka hissa hote hain. Yeh 'router.use()' ke zariye register hota hai. Iska sab se bada faida yeh hai ke aap pure server par load dale baghair sirf 'Auth' ya 'Validation' logic ko un routes tak mahdood (limited) rakh sakte hain jahan unki zaroorat hai.",

  why: "Efficiency and security. By using router-level middleware, you ensure that expensive or sensitive operations (like database lookups or token verification) are only performed for the routes that actually need them. It also makes your code more modular, as a router becomes a self-contained unit with its own logic and security.",

  how: [
    "Step 1 - Create a router instance: 'const router = express.Router();'.",
    "Step 2 - Apply middleware to that instance: 'router.use(myMiddleware);'.",
    "Step 3 - Define routes on that router: 'router.get('/', ...);'.",
    "Step 4 - The middleware will only run for requests that match this router.",
    "Step 5 - You can also apply multiple middleware functions in a sequence to a single 'router.use()'.",
  ],

  diagram: `
flowchart TD
    A[Request] --> B{Matches /api/v1?}
    B -- No --> C[Main App Logic]
    B -- Yes --> D[Router Instance]
    D --> E[Router Middleware 1\nValidate API Key]
    E --> F[Router Middleware 2\nRate Limit]
    F --> G[Route Handler]
    style D fill:#f39c12,color:white
    style E fill:#3498db,color:white
  `,

  analogy:
    "Imagine a gym. Everyone who enters the front door (the App) gets a 'Hello' (Global Middleware). But only the people who go to the 'Weight Room' (Specific Router) have to show their 'Premium Membership Card' (Router-level Middleware). The people going to the 'Yoga Room' don't have to show that card.",

  realLifeExample:
    "An Admin Dashboard: You have a main website and an admin panel. You want anyone to be able to see the website, but only admins to see the dashboard. You put all admin routes in an 'adminRouter' and add a 'checkAdmin' middleware to that router using 'adminRouter.use(checkAdmin)'. Now, every single admin route is automatically protected.",

  code: `
const express = require('express');
const app = express();
const adminRouter = express.Router();

// 1. ROUTER-LEVEL MIDDLEWARE
// This ONLY runs for routes inside adminRouter
adminRouter.use((req, res, next) => {
  console.log('Admin Access attempt at:', Date.now());
  const isAdmin = req.headers['x-admin-key'] === 'secret123';
  
  if (isAdmin) {
    next();
  } else {
    res.status(403).send('Forbidden: Admins Only');
  }
});

// 2. ROUTES in Admin Router
adminRouter.get('/stats', (req, res) => res.send('Sensitive Admin Stats'));
adminRouter.get('/users', (req, res) => res.send('Manage All Users'));

// 3. MOUNT the router
app.use('/admin', adminRouter);

// Standard Public Route (Middleware does NOT run here)
app.get('/', (req, res) => res.send('Public Homepage'));

app.listen(3000);
  `,

  commonMistake: [
    "Thinking 'router.use()' applies to the whole app (it only applies to routes defined on that router).",
    "Defining router-level middleware AFTER defining routes on that same router (order still matters!).",
    "Forgetting to mount the router to the main app (if the router isn't mounted, the middleware never runs).",
    "Not calling 'next()' in the router middleware, which stops all routes on that router from working.",
  ],

  interviewSummary: [
    "Router-level middleware is scoped to a specific express.Router instance.",
    "It helps isolate logic like authentication or input validation to specific features.",
    "It works identically to application-level middleware but uses 'router.use()' instead of 'app.use()'.",
    "It enhances modularity and code separation.",
  ],
};
