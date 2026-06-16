export const expressBuiltInMiddleware = {
  id: "express-built-in-middleware",
  title: "Built-in Middleware — json & urlencoded",
  category: "Express",
  difficulty: "Beginner",
  tags: ["express.json", "express.urlencoded", "Body Parser", "Parsing", "Built-in"],

  definition:
    "Built-in middleware functions are included with Express (since v4.16.0) to handle common tasks. The most essential ones are 'express.json()', which parses incoming requests with JSON payloads, and 'express.urlencoded()', which parses incoming requests with URL-encoded payloads (standard HTML forms).",

  simpleExplanation:
    "Modern websites send data in two main ways: through a 'JSON Object' (like React does) or through a 'Standard Form' (like older websites do). By default, Express can't read either. These two built-in tools are like 'Translators'. They take the weird data stream from the client and turn it into a nice JavaScript object that you can easily read using 'req.body'.",

  romanUrduRevision:
    "Express ke built-in middleware mein 'express.json()' aur 'express.urlencoded()' sab se zaroori hain. 'express.json()' JSON data ke liye hota hai aur 'express.urlencoded()' HTML forms ke liye. Inhe use kiye baghair aap 'req.body' access nahi kar sakte. In dono ko hamesha routes se pehle 'app.use()' mein register karna chahiye.",

  why: "In the past, you had to install a separate library called 'body-parser'. Now, Express includes these directly for simplicity. Since almost every modern app receives data from a user, having these built-in translators makes development faster and ensures your server can handle different types of data formats out of the box.",

  how: [
    "Step 1 - Add 'app.use(express.json())' at the top of your app to support JSON APIs.",
    "Step 2 - Add 'app.use(express.urlencoded({ extended: true }))' to support standard form submissions.",
    "Step 3 - Place these BEFORE any route that needs to access 'req.body'.",
    "Step 4 - Use 'extended: true' in urlencoded to allow nested objects in your form data.",
  ],

  diagram: `
flowchart LR
    A[Client Payload] --> B{Middleware}
    B -- "JSON Content-Type" --> C[express.json]
    B -- "Form Content-Type" --> D[express.urlencoded]
    C --> E[Populate req.body]
    D --> E
    E --> F[Route Handler]
    style C fill:#f1c40f,color:black
    style D fill:#f1c40f,color:black
  `,

  analogy:
    "Think of a bank that receives deposits in many currencies (JSON, Form Data, XML). The bank doesn't just throw the money in a pile. They have 'Machines' at the front door that automatically count the JSON and the Form Data and put them into a neat envelope (req.body) for the manager. 'express.json' is one of those counting machines.",

  realLifeExample:
    "When a user signs up on your site using a React form, it usually sends a JSON object like '{ \"email\": \"user@test.com\" }'. 'express.json()' catches this, converts it into a real JS object, and lets you access 'req.body.email' so you can save it to your database.",

  code: `
const express = require('express');
const app = express();

// 1. Support JSON-encoded bodies (Standard for modern apps)
app.use(express.json());

// 2. Support URL-encoded bodies (Standard for HTML forms)
// extended: true allows for rich objects and arrays to be encoded
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  // Now req.body is accessible!
  console.log(req.body);
  res.json({ status: 'Data received', yourData: req.body });
});

app.listen(3000);
  `,

  commonMistake: [
    "Missing 'express.json()', resulting in 'req.body' being undefined.",
    "Putting the middleware after the POST route definition (it must be before).",
    "Sending JSON from the frontend but using 'express.urlencoded()' on the server (they must match).",
    "Not using 'extended: true' in urlencoded, which can cause issues with complex form structures.",
  ],

  interviewSummary: [
    "express.json() and express.urlencoded() are built-in body parsers.",
    "They are added as global middleware using app.use().",
    "They populate the req.body property with the parsed data.",
    "extended: true in urlencoded uses the 'qs' library, allowing nested objects.",
  ],
};
