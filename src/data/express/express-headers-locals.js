export const expressHeadersLocals = {
  id: "express-headers-locals",
  title: "res.set(), res.get() & res.locals — Advanced Metadata",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Headers", "res.locals", "Middleware Data", "Metadata", "res.set", "res.get"],

  definition:
    "'res.set()' and 'res.get()' are methods used to interact with HTTP response headers. 'res.locals' is an object that contains response local variables scoped to the current request, and therefore it is the recommended way to pass data between various middleware and routes.",

  simpleExplanation:
    "Imagine'res.set()' is like writing 'Special Instructions' on the outside of a package (the response). You tell the carrier: 'Keep this cold' (Cache-Control) or 'Only John can open this' (CORS). 'res.locals' is like a 'Handwritten Note' inside the package that different workers (Middleware) add to as it moves through the terminal. Worker 1 adds the customer's name, Worker 2 verifies their age, and finally, the Delivery Person (Route Handler) reads the note to finish the job.",

  romanUrduRevision:
    "res.set() se hum response ke headers manually set karte hain (maslan caching ya security ke liye). res.get() headers check karne ke liye hota hai. Lekin sab se important 'res.locals' hai. Yeh ek temporay object hota hai jo sirf ek request ke liye zinda rehta hai. Iska faida yeh hai ke aap middleware mein data find kar ke 'res.locals.user = user' kar dein, toh wo data pure pipeline mein available hoga baghair request object ko ganda kiye.",

  why: "Clean architecture. Directly attaching data to the 'req' object is common, but 'res.locals' is the officially supported way to store request-scoped variables. It ensures that your data stays synchronized and is easily accessible in your view engine (like EJS) or the final route handler. Setting custom headers is also crucial for performance (caching) and security.",

  how: [
    "Step 1 - Use 'res.set(header, value)' to set individual or multiple headers.",
    "Step 2 - Use 'res.locals.myVar = data' inside a middleware to store info.",
    "Step 3 - Retrieve the data in any downstream middleware or route: 'const data = res.locals.myVar;'.",
    "Step 4 - Use 'res.get(header)' if you need to inspect a header you've already set.",
    "Step 5 - Remember that 'res.locals' is cleared automatically as soon as the response is sent.",
  ],

  diagram: `
flowchart LR
    A[Middleware 1] -- "res.locals.isAuth = true" --> B[Middleware 2]
    B -- "res.locals.role = 'admin'" --> C[Route Handler]
    C -- "Check res.locals" --> D[Final Logic]
    C -- "res.set('X-Rate', 'high')" --> E[Client Response]
    style B fill:#3498db,color:white
    style D fill:#2ecc71,color:white
  `,

  analogy:
    "Think of 'res.locals' as a 'Clipboard' that travels with a patient in a hospital. Every doctor (Middleware) writes their findings on the clipboard. By the time the patient reaches the surgeon (Route Handler), the surgeon just looks at the clipboard to know everything, instead of asking the patient (the Request) 10 times.",

  realLifeExample:
    "Authentication & Templates: You have a middleware that verifies a JWT token. Once verified, it puts the user's data in 'res.locals.currentUser = user;'. Now, every route and even your HTML templates have access to the 'currentUser' without you having to manually pass it in every 'res.render' or 'res.json' call.",

  code: `
const express = require('express');
const app = express();

// 1. Passing data between middleware
app.use((req, res, next) => {
  res.locals.startTime = Date.now();
  res.locals.user = { id: 101, name: 'Noman' };
  next();
});

// 2. Setting advanced headers
app.get('/api/secret', (req, res) => {
  // Set custom security and cache headers
  res.set({
    'Content-Type': 'application/json',
    'X-Custom-Header': 'Antigravity-Server',
    'Cache-Control': 'no-store'
  });

  const duration = Date.now() - res.locals.startTime;
  res.json({
    user: res.locals.user,
    processedIn: \`\${duration}ms\`
  });
});

app.listen(3000);
  `,

  commonMistake: [
    "Confusing 'req.headers' (what the client sent) with 'res.set' (what the server is sending).",
    "Trying to access 'res.locals' in a DIFFERENT request (it only lasts for ONE request-response cycle).",
    "Not calling 'res.set()' BEFORE 'res.json()' or 'res.send()' (headers must be set before the body is sent).",
    "Using 'res.locals' for sensitive passwords (data in locals might accidentally be rendered in templates).",
  ],

  interviewSummary: [
    "res.set() sets HTTP response headers.",
    "res.locals is the standard object for passing request-scoped data through middleware.",
    "Data in res.locals is automatically available to template engines.",
    "Using res.locals is preferred over modifying the req object directly.",
  ],
};
