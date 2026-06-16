export const expressRouting = {
  id: "express-routing",
  title: "Route Definition — app.get, app.post, etc.",
  category: "Express",
  difficulty: "Beginner",
  tags: ["Routing", "app.get", "app.post", "app.put", "app.delete", "Endpoint", "URL"],

  definition:
    "Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on). Each route can have one or more handler functions, which are executed when the route is matched.",

  simpleExplanation:
    "Routing is like the 'Street Address' system of your application. When a user visits '/home', your code needs to know to show the home page. If they visit '/contact', it shows the contact page. Express lets you define these paths easily by linking a URL (the path) to a specific function (the handler).",

  romanUrduRevision:
    "Routing ka matlab hai URL paths decide karna. 'app.get('/', ...)' ka matlab hai ke jab user base URL par aaye toh kya response milna chahiye. 'app.post('/login', ...)' login request handle karega. Har route ke liye hum ek method aur ek path define karte hain.",

  why: "Routing is the backbone of any web application. It allows you to organize your API into logical sections (e.g., users, products, orders). Without routing, your server wouldn't know which code to run for which link, making it impossible to build anything more complex than a single-page site.",

  how: [
    "Step 1 - Use the 'app' instance followed by the HTTP verb (e.g., app.get, app.post).",
    "Step 2 - Pass the path string as the first argument (e.g., '/api/users').",
    "Step 3 - Pass a callback function with 'req' and 'res' as the second argument.",
    "Step 4 - Inside the callback, add your logic and send a response.",
    "Step 5 - Define a 'Catch-all' route (app.all('*')) at the end to handle 404 errors.",
  ],

  diagram: `
flowchart LR
    A[Browser URL] --> B{Express Router}
    B -- "/about" --> C[About Handler]
    B -- "/users" --> D[Users Handler]
    B -- "others" --> E[404 Handler]
    C --> F[res.send]
    D --> F
    E --> F
  `,

  analogy:
    "Think of a large office building. The main entrance is the server. Once inside, you see a directory board (the Router). It tells you that 'Sales' is on Room 101 (/sales), 'Support' is on Room 102 (/support), and 'Human Resources' is on Room 205 (/hr). You follow the signs (paths) to get to the right department (handler).",

  realLifeExample:
    "An E-commerce site: When you click 'Add to Cart', the browser sends a POST request to '/cart'. Express catches that route, saves the item to your database, and sends back a success message. If you just visit your profile, it sends a GET request to '/profile'.",

  code: `
const express = require('express');
const app = express();

// 1. Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page');
});

// 2. About route
app.get('/about', (req, res) => {
  res.send('This is the About Page');
});

// 3. User Login (POST)
app.post('/login', (req, res) => {
  res.send('Processing Login...');
});

// 4. Wildcard route (404)
app.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(3000);
  `,

  commonMistake: [
    "Defining more than one response in a single route handler (only the first one will be sent).",
    "Forgetting the leading slash in the path (e.g., writing 'users' instead of '/users').",
    "Not ordering routes correctly (specific routes like '/users/me' must come before generic ones like '/users/:id').",
    "Assuming app.get handles all methods (you must use app.all for that).",
  ],

  interviewSummary: [
    "Routing connects a URI and HTTP method to a handler function.",
    "Order of route definition matters; first match wins.",
    "A route handler must end the request-response cycle or pass control to the 'next' middleware.",
  ],
};
