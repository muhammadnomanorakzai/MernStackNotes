export const expressParams = {
  id: "express-params",
  title: "Route Parameters — req.params",
  category: "Express",
  difficulty: "Beginner",
  tags: ["req.params", "Dynamic Routing", "URL Parameters", "Variables", "Endpoints"],

  definition:
    "Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the 'req.params' object, with the name of the route parameter specified in the path as their respective keys.",

  simpleExplanation:
    "Route parameters are like 'Placeholders' in your URL. Instead of creating a separate route for every user (e.g., /user/1, /user/2, /user/3), you create one generic route '/user/:id'. The ':id' part acts as a variable that catches whatever number or name the user types there.",

  romanUrduRevision:
    "Route parameters dynamic URLs banane ke liye use hote hain. URL mein ':' colon use kar ke hum variable define karte hain (e.g., /users/:id). Client jab '/users/101' hit karega, toh server par humein 'req.params.id' mein '101' mil jayega. Yeh IDs aur usernames handle karne ka standard tareeqa hai.",

  why: "Without route parameters, it would be impossible to build apps with dynamic content like social media profiles, product pages, or news articles. It allows your server to handle millions of different URLs with just a single line of code.",

  how: [
    "Step 1 - Define a route with a colon followed by the parameter name (e.g., '/users/:username').",
    "Step 2 - Access the value inside the handler using 'req.params.parameterName'.",
    "Step 3 - You can use multiple parameters in one URL (e.g., '/post/:year/:month').",
    "Step 4 - Always validate the parameter (e.g., check if the ID is a valid number) before using it.",
  ],

  diagram: `
flowchart LR
    A[Browser URL: /product/45] --> B{Express Matching}
    B -- "Matches /product/:id" --> C[Handler Function]
    C --> D[req.params.id = '45']
    D --> E[Fetch Product 45 from DB]
    style D fill:#f39c12,color:white
  `,

  analogy:
    "Think of a Locker System. Every locker has a number on the door (the parameter). When you tell the guard 'I want to open locker 45', the guard doesn't need 100 different keys. They have one master key system that takes the 'Locker Number' you provide and opens that specific door for you.",

  realLifeExample:
    "A Blog Post URL: 'example.com/blog/how-to-learn-node'. Here, 'how-to-learn-node' is a route parameter (often called a slug). The server looks at 'req.params.slug', finds that specific article in the database, and displays it to the user.",

  code: `
const express = require('express');
const app = express();

// 1. Single parameter
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  res.send(\`Showing profile for User ID: \${id}\`);
});

// 2. Multiple parameters
app.get('/flights/:from-:to', (req, res) => {
  const { from, to } = req.params;
  res.send(\`Searching flights from \${from} to \${to}\`);
});

// 3. More complex example
app.get('/shop/:category/:productId', (req, res) => {
  const { category, productId } = req.params;
  res.json({
    category,
    productId,
    message: "Data extracted from URL segments"
  });
});

app.listen(3000);
  `,

  commonMistake: [
    "Forgetting the colon (:) when defining the route (e.g., '/users/id' instead of '/users/:id').",
    "Naming parameters with special characters or spaces (only use alphanumeric characters).",
    "Parameters are always strings (e.g., if you expect a number, you must use Number(req.params.id)).",
    "Ordering routes wrong: app.get('/users/all') must come before app.get('/users/:id').",
  ],

  interviewSummary: [
    "Route parameters capture values from URL path segments.",
    "They are accessed via req.params as keys.",
    "Order of routes is critical when using dynamic parameters.",
    "Values captured are always of type 'string'.",
  ],
};
