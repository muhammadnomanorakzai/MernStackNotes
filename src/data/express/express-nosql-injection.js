export const expressNosqlInjection = {
  id: "express-nosql-injection",
  title: "NoSQL Injection — Prevention & Sanitization",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Security", "NoSQL Injection", "MongoDB", "Mongoose", "Sanitization", "express-mongo-sanitize"],

  definition:
    "NoSQL Injection is a vulnerability where an attacker provides specially crafted input that changes the logic of a database query. In MERN apps (MongoDB), this often involves injecting operators like '$gt' (greater than) into a login or search field to bypass checks without knowing the actual values.",

  simpleExplanation:
    "Imagine a login form where the server asks: 'Is the username \"Noman\" and is the password \"123\"?'. A hacker might send '{\"password\": {\"$gt\": \"\"}}' instead of a string. The server reads this as: 'Is the password GREATER THAN an empty string?'. Since every password is greater than nothing, the database says 'YES', and the hacker is logged in without ever knowing your password! Sanitization stops this by stripping out any '$' or '.' characters from the input.",

  romanUrduRevision:
    "NoSQL Injection tab hoti hai jab hacker query operators (jaise $gt, $ne, $or) ka use kar ke database ko 'be-waquf' banata hai. Maslan login page par password field mein '{$gt: \"\"}' bhej kar wo kisi bhi account mein bina password ke ghus sakta hai. Isse bachne ke liye humein hamesha user input ko 'Sanitize' karna chahiye. Express mein hum 'express-mongo-sanitize' package use karte hain jo saare '$' signs ko remove kar deta hai taake database query ka logic na badle.",

  why: "Integrity and Privacy. MongoDB is powerful because of its operators, but that power can be used against you. NoSQL injection can allow hackers to download your entire user list, change prices in an e-commerce app, or bypass authentication entirely. Because MongoDB queries are just objects, they are much easier to inject than traditional SQL, making this a top priority for MERN developers.",

  how: [
    "Step 1 - Install: 'npm install express-mongo-sanitize'.",
    "Step 2 - Use it as a global middleware: 'app.use(mongoSanitize());'.",
    "Step 3 - It will automatically look at 'req.body', 'req.query', and 'req.params'.",
    "Step 4 - It removes any keys that start with '$' or contain a '.'.",
    "Step 5 - Alternatively, use Zod or Joi to enforce that fields MUST be strings, not objects.",
  ],

  diagram: `
flowchart TD
    A[Hacker Input: {password: {'$gt': ''}}] --> B[Express Server]
    B --> C[mongoSanitize Middleware]
    C -- "Strip '$' keys" --> D[Cleaned Input: {password: {}}]
    D --> E[Query Fails / Safe]
    style C fill:#3498db,color:white
    style E fill:#2ecc71,color:white
  `,

  analogy:
    "Imagine a Voting Machine where you write a name on a piece of paper. A hacker writes: 'COUNT ME 100 TIMES'. If the machine just reads the text as an instruction, it will count the 100 votes. NoSQL injection sanitization is like a 'Sticker Remover'. It sees the instruction and peels it off, leaving only the name. The machine (the Database) then only sees the name and ignores the trick.",

  realLifeExample:
    "Bypassing Login: A common attack on Express/MongoDB apps is sending '{ \"username\": \"admin\", \"password\": { \"$ne\": null } }'. This tells the server to find a user where the username is 'admin' and the password is 'NOT NULL'. Since every admin has a password, the query returns the Admin user and the hacker is granted access. Adding sanitization middleware blocks this completely.",

  code: `
const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const app = express();

app.use(express.json());

// 1. DATA SANITIZATION AGAINST NoSQL INJECTION
app.use(mongoSanitize());

app.post('/login', (req, res) => {
  // If req.body was { password: { "$gt": "" } }
  // mongoSanitize turns it into { password: {} }
  const { username, password } = req.body;
  
  // Now the database query is safe
  User.findOne({ username, password });
  res.send('Checked safely!');
});

app.listen(3000);
  `,

  commonMistake: [
    "Thinking that 'Mongoose' automatically prevents all injection (it helps, but certain query types are still vulnerable if you pass objects directly).",
    "Forgetting to sanitize 'req.query' (hackers can inject via the URL, e.g., '/users?id[$ne]=null').",
    "Not using schema validation (if you tell Zod that 'password' must be a STRING, then the object '{ $gt: \"\" }' will fail before it even reaches the logic).",
    "Allowing users to send raw objects in POST requests without validation.",
  ],

  interviewSummary: [
    "NoSQL Injection uses operators like $gt, $ne, or $where to alter database queries.",
    "The primary defense is input sanitization (stripping operators) and strict schema validation.",
    "The 'express-mongo-sanitize' middleware is the standard tool for Express/MongoDB security.",
    "Injection happens when untrusted input is treated as a command/operator by the database driver.",
  ],
};
