export const expressHttpMethods = {
  id: "express-http-methods",
  title: "HTTP Methods — GET, POST, PUT, DELETE",
  category: "Express",
  difficulty: "Beginner",
  tags: ["HTTP Methods", "GET", "POST", "PUT", "PATCH", "DELETE", "REST API", "CRUD"],

  definition:
    "HTTP methods (or verbs) indicate the desired action to be performed on a given resource. Express provides a set of methods 'app.get()', 'app.post()', etc., corresponding to these HTTP verbs. These methods are the foundation of building RESTful APIs.",

  simpleExplanation:
    "HTTP methods are like the 'Action Words' of the internet. They tell the server exactly what you want to do with a piece of information: Do you want to Read it (GET)? Create something new (POST)? Update what's already there (PUT/PATCH)? Or Remove it forever (DELETE)? It keeps your API organized and predictable.",

  romanUrduRevision:
    "HTTP methods server ko batate hain ke kya action lena hai. GET data lene ke liye hota hai (View), POST naya data save karne ke liye (Create), PUT/PATCH data update karne ke liye (Edit), aur DELETE data hatane ke liye. Inhe standard 'CRUD' actions bhi kaha jata hai.",

  why: "Using the correct HTTP method is crucial for 'REST' architecture. It makes your API semantically correct. For example, search engines only crawl GET requests. If you use GET to delete a user, a search engine could accidentally delete all your users! Proper verbs ensure security and clarity.",

  how: [
    "Step 1 - Use 'app.get()' for retrieving data.",
    "Step 2 - Use 'app.post()' for creating new resources.",
    "Step 3 - Use 'app.put()' or 'app.patch()' for updating existing resources.",
    "Step 4 - Use 'app.delete()' for removing resources.",
    "Step 5 - Define a callback function (handler) for each method to process the logic.",
  ],

  diagram: `
flowchart TD
    A[Client Request] --> B{HTTP Method?}
    B -- GET --> C[Read Data]
    B -- POST --> D[Create Record]
    B -- PUT --> E[Update Full Record]
    B -- PATCH --> F[Update Partial Record]
    B -- DELETE --> G[Remove Record]
    C --> H[JSON Response]
    D --> H
    E --> H
    F --> H
    G --> H
  `,

  analogy:
    "Think of a Filing Cabinet. GET is looking at a folder. POST is putting a brand new folder inside. PUT is taking a folder out, erasing everything, and rewriting it. PATCH is just fixing a typo on one page of the folder. DELETE is putting the folder in the shredder.",

  realLifeExample:
    "A Blog Site: \n- GET /posts : Sees all articles. \n- POST /posts : Submits a new article. \n- PATCH /posts/1 : Corrects a spelling mistake in article #1. \n- DELETE /posts/1 : Deletes article #1 because it was spam.",

  code: `
const express = require('express');
const app = express();
app.use(express.json());

// 1. GET - Fetch data
app.get('/products', (req, res) => {
  res.json({ message: 'List of products' });
});

// 2. POST - Create data
app.post('/products', (req, res) => {
  res.status(201).json({ message: 'Product created!', data: req.body });
});

// 3. PATCH - Update data partially
app.patch('/products/:id', (req, res) => {
  res.json({ message: \`Product \${req.params.id} updated!\` });
});

// 4. DELETE - Remove data
app.delete('/products/:id', (req, res) => {
  res.json({ message: \`Product \${req.params.id} deleted!\` });
});

app.listen(3000);
  `,

  commonMistake: [
    "Using GET for everything (e.g., /delete-user?id=1). This is dangerous and against REST standards.",
    "Forgetting that POST/PUT/PATCH need 'req.body' parsing to work properly.",
    "Confusing PUT (replace whole object) with PATCH (update only specific fields).",
    "Not sending a response back for DELETE (even a 204 No Content is better than nothing).",
  ],

  interviewSummary: [
    "GET is idempotent and should never change server state.",
    "POST is for creating; PUT is for full updates; PATCH is for partial updates.",
    "DELETE removes resources.",
    "CRUD mapping: Create (POST), Read (GET), Update (PUT/PATCH), Delete (DELETE).",
  ],
};
