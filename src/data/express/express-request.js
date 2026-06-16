export const expressRequest = {
  id: "express-request",
  title: "The Request Object (req)",
  category: "Express",
  difficulty: "Beginner",
  tags: ["Request", "req", "req.body", "req.params", "req.query", "req.headers"],

  definition:
    "The 'req' object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on. In Express documentation, the object is conventionally referred to as 'req' (and the HTTP response is 'res').",

  simpleExplanation:
    "The 'req' object is like a 'Form' that a customer (Client) fills out and sends to you. It contains all the information you need to fulfill their request: What product do they want (Params)? What is their address (Headers)? What message did they write (Body)? It's the primary way your server receives data from the outside world.",

  romanUrduRevision:
    "Request object (req) mein wo saari information hoti hai jo client server ko bhejta hai. Maslan, URL se data lene ke liye 'req.params' aur 'req.query' use hota hai, headers dekhne ke liye 'req.headers', aur form ya JSON data ke liye 'req.body'. Yeh server ka 'Input' source hai.",

  why: "To build a dynamic API, you need to know exactly what the user wants. Whether they are searching for a product, logging in with a password, or updating their profile, all that data arrives inside the 'req' object. Mastering its properties is essential for handling user input securely and correctly.",

  how: [
    "Step 1 - Access 'req.params' for dynamic URL parts (e.g., /user/:id).",
    "Step 2 - Access 'req.query' for URL search parameters (e.g., /search?q=apple).",
    "Step 3 - Access 'req.body' for data sent in the request body (requires middleware like 'express.json()').",
    "Step 4 - Access 'req.headers' for metadata like 'Authorization' or 'Content-Type'.",
    "Step 5 - Access 'req.cookies' for browser cookies (requires 'cookie-parser' middleware).",
  ],

  diagram: `
flowchart LR
    A[Client Request] --> B[req Object]
    B --> C[req.params\n:id]
    B --> D[req.query\n?key=val]
    B --> E[req.body\nJSON/Form]
    B --> F[req.headers\nAuth/Agent]
    B --> G[req.cookies]
    style B fill:#f39c12,color:white
  `,

  analogy:
    "Imagine you are a waiter. A customer hands you an 'Order Slip' (the req object). The slip tells you which table they are at (headers), what dish they want (params), if they want extra salt (query), and even a special note they wrote on the back (body). You use this slip to tell the kitchen (your logic) what to cook.",

  realLifeExample:
    "Login Page: When a user types their username and password and clicks 'Login', that data is sent to the server. You access it using 'req.body.username' and 'req.body.password'. If the URL is 'myapp.com/reset-password/12345', then '12345' is accessed via 'req.params.token'.",

  code: `
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.post('/user/:id', (req, res) => {
  // 1. Params (from URL path)
  const userId = req.params.id; 

  // 2. Query (from URL ?search=...)
  const filter = req.query.sort; 

  // 3. Body (from JSON payload)
  const { name, email } = req.body; 

  // 4. Headers (metadata)
  const token = req.headers.authorization;

  console.log({ userId, filter, name, email, token });
  res.send('Data received!');
});

app.listen(3000);
  `,

  commonMistake: [
    "Trying to read 'req.body' without adding 'express.json()' middleware first (it will be undefined).",
    "Confusing 'req.params' (part of the path) with 'req.query' (after the ? symbol).",
    "Accessing headers using the wrong casing (Express automatically lowercases them for you).",
    "Assuming 'req.body' exists for GET requests (GET requests usually don't have bodies).",
  ],

  interviewSummary: [
    "The req object contains all incoming data from the client.",
    "req.params is for named segment parameters (URL paths).",
    "req.query is for query string parameters (after ?).",
    "req.body handles POST/PUT data but requires parsing middleware.",
  ],
};
