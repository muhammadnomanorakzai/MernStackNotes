export const expressValidator = {
  id: "express-validator",
  title: "express-validator — Validation Middleware",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Validation", "express-validator", "Middleware", "Express", "Sanitization", "Error Handling"],

  definition:
    "express-validator is a set of express.js middlewares that wraps validator.js, a library of validator and sanitizer functions. It allows you to declare validation rules directly inside your route definitions, making it highly integrated with the Express request-response cycle.",

  simpleExplanation:
    "Think of express-validator as a 'Checklist' that every request must pass. Instead of writing long 'if-else' statements inside your code to check if an email is valid, you just add a small badge to your route that says: 'Check Email'. The middleware does the check for you and prepares a 'Report' (validationResult). If the report shows errors, you can stop the request before it reaches your logic.",

  romanUrduRevision:
    "express-validator Express apps ke liye ek specialized library hai. Iska sab se bara faida yeh hai ke aap route ke andar hi validation rules likh saktay hain. Yeh sirf data 'validate' nahi karta balkay 'sanitize' bhi karta hai (maslan extra spaces khatam karna ya HTML tags ko remove karna). Professional apps mein ise isliye pasand kiya jata hai kyunki yeh code ko readable banata hai aur multi-layered checks provide karta hai.",

  why: "Readability and Sanitization. express-validator is famous for its 'Declarative' style—you just list the rules. It also includes 'Sanitizers' which actually CHANGE the data for the better. For example, it can turn '  noman@gmail.com  ' into 'noman@gmail.com' automatically. This prevents bugs caused by accidental whitespace or hidden characters in user input.",

  how: [
    "Step 1 - Install: 'npm install express-validator'.",
    "Step 2 - Import 'body', 'query', 'param', and 'validationResult'.",
    "Step 3 - Add rules as an array of middleware inside your route: '[ body(\"email\").isEmail(), ... ]'.",
    "Step 4 - Inside your controller, check the 'validationResult(req)'.",
    "Step 5 - If errors exist, return them; otherwise, proceed with the clean data.",
  ],

  diagram: `
flowchart LR
    A[Request] --> B[body('email').isEmail()]
    B --> C[body('password').isLength(5)]
    C --> D[Controller: validationResult]
    D -- "Has Errors?" --> E{Yes / No}
    E -- "Yes" --> F[res.status 400]
    E -- "No" --> G[Save to DB]
    style B fill:#3498db,color:white
    style C fill:#3498db,color:white
    style F fill:#e74c3c,color:white
  `,

  analogy:
    "Imagine a 'Customs Officer' at the border. Instead of just checking your Passport (Authentication), they have a list of specific items to check (Validation). Is your bag too heavy? (Length check). Are you carrying banned items? (Sanitization). If any item on the checklist fails, they don't even let you talk to the main Immigration Officer (The Controller).",

  realLifeExample:
    "Comment Section: A user tries to post a comment. You use express-validator to: 1. Check that the comment is not empty. 2. Trim extra spaces from the start and end. 3. Escape HTML characters to prevent XSS. This ensures that every comment saved in your database is clean, well-formatted, and safe.",

  code: `
const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();

app.post('/api/user', [
  // 1. DECLARATIVE RULES
  body('email').isEmail().withMessage('Enter a valid email address').normalizeEmail(),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars'),
  body('username').trim().notEmpty().withMessage('Username is required')
], (req, res) => {
  
  // 2. CHECK FOR ERRORS
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // 3. PROCEED WITH CLEAN DATA
  const { email, username } = req.body;
  res.send(\`User \${username} created with email \${email}\`);
});

app.listen(3000);
  `,

  commonMistake: [
    "Defining rules but forgetting to check 'validationResult(req)' in the controller (the request will proceed even with errors!).",
    "Not providing '.withMessage()', which defaults to generic errors like 'Invalid Value' (bad UX).",
    "Confusing 'isEmail()' (Validation) with 'normalizeEmail()' (Sanitization). One checks, the other changes.",
    "Not using 'trim()' on strings, which allows users to bypass 'notEmpty()' by just typing spaces.",
  ],

  interviewSummary: [
    "express-validator is middleware-based and wraps validator.js.",
    "Validation happens in the route definition; results are checked in the controller.",
    "Sanitization is the process of cleaning/transforming input data (e.g., trim, escape, lower-case).",
    "It is the standard choice for traditional Express/JavaScript projects.",
  ],
};
