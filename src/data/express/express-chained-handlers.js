export const expressChainedHandlers = {
  id: "express-chained-handlers",
  title: "Chained Route Handlers — app.route()",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Chaining", "app.route", "REST", "Clean Code", "CRUD", "Handlers"],

  definition:
    "Chained route handlers are a way to define multiple HTTP methods for a single route path in a single block of code using 'app.route()'. It helps reduce redundancy, prevents typos in the path, and groups all logic for a specific resource (like a User or Product) in one place.",

  simpleExplanation:
    "Normally, you'd write the same URL multiple times for GET, POST, and DELETE. It's like writing the same address on three different envelopes. 'app.route()' is like a single envelope where you check multiple boxes: 'Deliver this' (GET), 'Return this' (POST), and 'Cancel this' (DELETE). It makes your code look much cleaner and easier to read.",

  romanUrduRevision:
    "Chained route handlers ka matlab ek hi URL ke liye multiple methods (GET, POST, PUT, DELETE) ko ek saath likhna hai. 'app.route('/path')' use kar ke hum code ko redundant hone se bachate hain. Isse typos ke chances kam ho jate hain kyunki aapko path sirf ek dafa likhna parta hai. Senior developers ise 'Resource-based routing' kehte hain.",

  why: "In a professional API, you often have a resource like '/api/users/:id' that supports multiple actions. Writing the same path 4 times is 'WET' (Write Everything Twice) code. 'app.route()' follows the 'DRY' (Don't Repeat Yourself) principle. It also keeps your code organized; looking at one block tells you everything the server can do with that specific URL.",

  how: [
    "Step 1 - Call 'app.route('/your-path')' or 'router.route('/your-path')'.",
    "Step 2 - Chain methods like '.get()', '.post()', '.put()', or '.delete()' directly onto it.",
    "Step 3 - Provide the handler function for each method.",
    "Step 4 - You can even add middleware that only applies to that specific chain using '.all()'.",
  ],

  diagram: `
flowchart LR
    A["app.route('/book/:id')"] --> B[".get()"]
    A --> C[".put()"]
    A --> D[".delete()"]
    B --> E[View Book]
    C --> F[Update Book]
    D --> G[Delete Book]
    style A fill:#2ecc71,color:white
  `,

  analogy:
    "Think of a Coffee Machine. You go to the machine (the Route). The machine allows you to 'Get Coffee' (GET), 'Add Beans' (POST), or 'Clean the machine' (DELETE). You are interacting with the 'Same Machine' in different ways. You don't have three separate machines for three different buttons.",

  realLifeExample:
    "Admin User Management: You have an endpoint '/admin/user/:id'. You want to GET the user's data, PUT an update for their role, and DELETE the user. Using '.route()', you can group all three handlers into one beautiful block of code.",

  code: `
const express = require('express');
const app = express();

// --- CLEAN CHAINED ROUTING ---
app.route('/api/products/:id')
  .all((req, res, next) => {
    // This runs for ALL methods in this chain
    console.log('Accessing product:', req.params.id);
    next();
  })
  .get((req, res) => {
    res.json({ message: \`Viewing product \${req.params.id}\` });
  })
  .put((req, res) => {
    res.json({ message: \`Updating product \${req.params.id}\` });
  })
  .delete((req, res) => {
    res.json({ message: \`Deleting product \${req.params.id}\` });
  });

app.listen(3000);
  `,

  commonMistake: [
    "Forgetting the dot (.) before the method name (e.g., writing 'get()' instead of '.get()').",
    "Putting a semicolon (;) in the middle of the chain, which breaks the connection.",
    "Trying to chain methods that don't exist (only standard HTTP verbs work).",
    "Adding two .get() handlers to the same chain (only the first one will work).",
  ],

  interviewSummary: [
    "app.route() creates a single route handler for multiple HTTP methods.",
    "It helps in creating 'Resource-based' routes.",
    "It makes code DRY (Don't Repeat Yourself) by not repeating path strings.",
    "Middleware can be applied to all methods in the chain using .all().",
  ],
};
