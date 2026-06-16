export const expressAuthMiddleware = {
  id: "express-auth-middleware",
  title: "Authentication Middleware — Protecting Common Routes",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Middleware", "Authentication", "Protected Routes", "JWT", "Security", "Reusable"],

  definition:
    "Authentication Middleware is a reusable function that intercepts requests to protected endpoints. Its primary job is to extract the credential (usually a JWT), verify its validity, and then either allow the request to proceed to the route handler or block it with a 401 Unauthorized status.",

  simpleExplanation:
    "Think of this middleware as the 'VIP Entrance Staff'. Instead of every single room in the club having its own security guard checking IDs, you have ONE staff member standing right before the hallways leading to the VIP rooms. If you have the right pass, they let you through. If not, they tell you to go back. This keeps all your rooms (routes) secure without you having to write the security code again and again.",

  romanUrduRevision:
    "Auth middleware ek aesa function hai jo hum baar baar use karte hain routes ko 'Protect' karne ke liye. Jab hamare paas bohot saare private pages hon (jaise Profile, Settings, Dashboard), toh hum har page mein login check karne ki bajaye ek generic 'verifyToken' middleware bana lete hain. Agar token sahi hai toh 'next()' call hoga, warna wahin se error mil jayega. Yeh 'DRY' (Don't Repeat Yourself) principle ki behtareen misal hai.",

  why: "Centralization. Security code is sensitive; if you copy-paste it into 20 different routes and then find a bug, you have to fix it in 20 places. By putting it in a middleware, you fix it once and it updates everywhere. It also keeps your route handlers clean, focusing ONLY on data logic, while the middleware handles the 'Passport Check'.",

  how: [
    "Step 1 - Create a middleware function '(req, res, next)'.",
    "Step 2 - Extract the token from the 'Authorization' header or 'Cookies'.",
    "Step 3 - Verify the token using your library (e.g., jwt.verify).",
    "Step 4 - If success, attach the user info to 'req.user' and call 'next()'.",
    "Step 5 - If failure, return a 401 or 403 response directly.",
  ],

  diagram: `
flowchart LR
    A[Request to /api/settings] --> B[Auth Middleware]
    B -- "Token Valid" --> C[req.user = decoded]
    C -- "next()" --> D[Settings Handler]
    B -- "Token Invalid" --> E[res.status 401]
    D --> F[Success Response]
    style B fill:#3498db,color:white
    style E fill:#e74c3c,color:white
  `,

  analogy:
    "Imagine a building with many floors. To even get into the elevator (the Router), you have to tap your 'Employee Card' (the Middleware). If the light turns green, the elevator takes you to your floor. If the light turns red, you stay in the lobby. You don't need a separate lock on every single desk because you've already secured the access point.",

  realLifeExample:
    "A Dashboard API: You have complex routes like '/api/stats', '/api/users', and '/api/settings'. Instead of checking for a token in all three files, you simply write 'router.use(verifyToken)' at the top of your router. Now, all three routes are automatically protected with the same high-security logic.",

  code: `
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// --- THE REUSABLE MIDDLEWARE ---
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access Denied: No Token Provided' 
    });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified; // Attach user data for the next function
    next(); // Permisson granted!
  } catch (err) {
    res.status(403).json({ 
      success: false, 
      message: 'Invalid or Expired Token' 
    });
  }
};

// --- USING IT ---

// Single Route protection
app.get('/api/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

// Grouped Route protection
const adminRouter = express.Router();
adminRouter.use(verifyToken); // Protects EVERYTHING in this router
adminRouter.get('/logs', (req, res) => res.send('Sensitive Logs'));

app.use('/admin', adminRouter);

app.listen(3000);
  `,

  commonMistake: [
    "Forgetting to call 'next()' after a successful verification (the request will hang).",
    "Not handling the case where 'req.headers.authorization' is completely missing.",
    "Using 'res.send' but NOT using 'return', which might lead to multiple responses being sent.",
    "Not providing a descriptive error (always tell the user WHY they were rejected: No token vs Invalid token).",
  ],

  interviewSummary: [
    "Authentication middleware verifies credentials before allowing access to a route.",
    "It typically attaches decoded user information to the request object (req.user).",
    "It ensures the 'DRY' principle by centralizing security logic.",
    "Ordered execution is key: auth middleware must run before the business logic handler.",
  ],
};
