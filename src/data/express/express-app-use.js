export const expressAppUse = {
  id: "express-app-use",
  title: "app.use() — Registering Middleware",
  category: "Express",
  difficulty: "Beginner",
  tags: ["app.use", "Middleware", "Global", "Path-specific", "Express.js"],

  definition:
    "The 'app.use()' function is used to mount middleware functions at a specified path. The middleware function is executed when the base of the requested path matches the path defined in 'app.use()'. If no path is specified, it defaults to '/', meaning it runs for every single request to the server.",

  simpleExplanation:
    "Think of 'app.use()' as the 'Registration Desk'. Every time a request comes in, Express checks this desk to see if there are any instructions it should follow for ALL requests (Global) or just for specific ones (Path-specific). It's the most common way to add features like security, logging, and data parsing to your app.",

  romanUrduRevision:
    "app.use() ka kaam middleware ko register karna hai. Agar hum path nahi dete (e.g., app.use(myFunc)), toh wo function har request par chalega. Agar path dete hain (e.g., app.use('/admin', checkAdmin)), toh wo sirf '/admin' se shuru hone wale URLs par chalega. Yeh app ko modular banane ka tareeqa hai.",

  why: "Global middleware ensures consistency. You don't want to manually add a logger or a security header to every single route. Using 'app.use()' at the top of your file ensures that these essential features are applied automatically to every endpoint, making your code cleaner and safer.",

  how: [
    "Step 1 - Define or import a middleware function.",
    "Step 2 - Call 'app.use(middlewareFunction)' for global application.",
    "Step 3 - Call 'app.use('/path', middlewareFunction)' to only run on specific routes.",
    "Step 4 - Call multiple 'app.use()' statements to create a chain (stack) of middleware.",
    "Step 5 - Ensure global middleware is defined BEFORE your routes.",
  ],

  diagram: `
flowchart TD
    A[Request to /admin/users] --> B{app.use Check}
    B -- "app.use(Global)" --> C[Runs for ALL]
    B -- "app.use('/admin', ...)" --> D[Runs for /admin/*]
    B -- "app.use('/shop', ...)" --> E[SKIPPED]
    C --> D
    D --> F[Final Route Handler]
  `,

  analogy:
    "It's like a security checkpoint at an airport. There's a 'Global Check' for everyone (Ticket check). Then, there's a 'Path-specific Check' for people going to International flights (Passport check). Finally, you reach your gate (Route Handler). 'app.use()' is how you set up these checkpoints.",

  realLifeExample:
    "CORS (Cross-Origin Resource Sharing): Usually, browsers block requests from different websites. To fix this, we use 'app.use(cors())'. This adds a 'Global Instructions' to the server to allow requests from specific origins, saving us from writing that logic in every route.",

  code: `
const express = require('express');
const app = express();

// 1. GLOBAL Middleare (No path specified)
// Runs for EVERY request
app.use((req, res, next) => {
  console.log('I run for everything!');
  next();
});

// 2. PATH-SPECIFIC Middleware
// Runs only for paths starting with /api
app.use('/api', (req, res, next) => {
  console.log('I only run for API routes');
  next();
});

app.get('/', (req, res) => res.send('Home'));
app.get('/api/data', (req, res) => res.json({ id: 1 }));
app.get('/shop/items', (req, res) => res.send('Items'));

app.listen(3000);
  `,

  commonMistake: [
    "Placing app.use() below routes (since Express reads top-to-bottom, the middleware might never run if the route sends a response first).",
    "Not understanding that app.use('/user') matches '/user/profile' and '/user/settings' (it matches any path that *starts* with that string).",
    "Forgetting to call 'next()' inside the middleware passed into app.use().",
  ],

  interviewSummary: [
    "app.use() registers middleware for the app.",
    "Without a path, it acts as global middleware.",
    "With a path, it acts as mount-specific middleware.",
    "Order of registration determines order of execution.",
  ],
};
