export const expressReqBody = {
  id: "express-req-body",
  title: "Request Body — req.body",
  category: "Express",
  difficulty: "Beginner",
  tags: ["req.body", "POST", "JSON", "Body Parser", "Form Data", "Payload"],

  definition:
    "The 'req.body' object contains key-value pairs of data submitted in the request body. By default, it is 'undefined' and must be populated using body-parsing middleware such as 'express.json()' for JSON data or 'express.urlencoded()' for form-submitted data.",

  simpleExplanation:
    "The request body is like a 'Package' sent by the user. If we want to know what's inside the package (like a new user's email or a comment), we have to unwrap it. Express doesn't unwrap it automatically because it doesn't want to waste time if you don't need it. We use 'Middleware' as a tool to unwrap the JSON or Form data so we can use it in our code.",

  romanUrduRevision:
    "req.body wo data hai jo POST ya PUT requests mein bheja jata hai. Shuru mein yeh undefined hota hai, isliye humein 'express.json()' middleware use karna parta hai data ko 'parse' (extract) karne ke liye. Registration forms aur settings update karne ke liye req.body sab se zyada use hota hai.",

  why: "Modern apps send large amounts of data to the server, often as JSON. req.body is the primary way to receive structured data. Without it, you couldn't process logins, save new blog posts, or update a shopping cart. It is the core of any data-driven backend application.",

  how: [
    "Step 1 - Add 'app.use(express.json())' to handle JSON data from the frontend.",
    "Step 2 - Add 'app.use(express.urlencoded({ extended: true }))' to handle standard HTML form data.",
    "Step 3 - In your POST/PUT route, access the data using 'req.body.propertyName'.",
    "Step 4 - Ensure the client (Frontend) sends the correct 'Content-Type' header (e.g., application/json).",
  ],

  diagram: `
flowchart TD
    A[Client Sends JSON] --> B{Express App}
    B --> C[express.json Middleware]
    C --> D[Parse JSON String into Object]
    D --> E[Populate req.body]
    E --> F[Route Handler Logic]
    style C fill:#f1c40f,color:black
    style E fill:#2ecc71,color:white
  `,

  analogy:
    "It's like receiving a zip file. Your computer (Express) sees the file, but it can't read the photos inside until you 'Extract' them using a 7-Zip tool (Middleware). Once extracted, you can access the photos (req.body) easily.",

  realLifeExample:
    "A Signup Form: The user types their name, email, and password. When they click 'Sign Up', the React frontend sends a JSON object. The Express backend uses 'express.json()' to see that object and then saves it to a database using 'req.body.email' and 'req.body.password'.",

  code: `
const express = require('express');
const app = express();

// 1. IMPORTANT: This must be defined before your routes
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For Form data

app.post('/api/register', (req, res) => {
  // 2. Access variables from body
  const { username, password, age } = req.body;

  if (!username || !password) {
    return res.status(400).send('Credentials required');
  }

  console.log(\`Registering \${username}...\`);
  res.status(201).json({ message: 'User created successfully' });
});

app.listen(3000);
  `,

  commonMistake: [
    "Forgetting to include 'app.use(express.json())', leading to 'req.body' being undefined.",
    "Trying to read req.body in a GET request (GET requests usually don't have a body, use req.query instead).",
    "Mismatch between client Content-Type and server middleware (e.g., sending form-data but only having JSON middleware).",
    "Placing the middleware AFTER the route definition (middleware must be defined first).",
  ],

  interviewSummary: [
    "req.body is used for accessing payloads sent via POST/PUT requests.",
    "It requires built-in middleware like express.json() for parsing.",
    "Always check for the existence of body data before processing it (validation).",
    "It is different from req.params and req.query, which are part of the URL.",
  ],
};
