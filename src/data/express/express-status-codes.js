export const expressStatusCodes = {
  id: "express-status-codes",
  title: "HTTP Status Codes — res.status()",
  category: "Express",
  difficulty: "Beginner",
  tags: ["Status Codes", "HTTP", "Success", "Error", "Semantic", "Best Practices"],

  definition:
    "HTTP response status codes indicate whether a specific HTTP request has been successfully completed. Express allows you to set these codes using the 'res.status()' method. Using correct status codes is essential for building semantic APIs that communicate clearly with frontends and other services.",

  simpleExplanation:
    "Status codes are like 'Signal Lights' for the internet. '200' is a green light (Everything is OK). '404' is a red light (Not found). '500' is a flashing warning (Server broke). When your server talks to your React app, it uses these numbers to quickly tell the app: 'I found the user' (200), 'I created the post' (201), or 'You aren't allowed here' (403). Using the right number makes your API professional.",

  romanUrduRevision:
    "HTTP status codes server se client ko milne wale 'signal' hote hain. Express mein hum 'res.status(code)' use kar ke batate hain ke result kya aaya. common codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), aur 404 (Not Found). Sahi code use karna isliye zaroori hai taake frontend developer asani se handle kar sake ke error client ki side se hai ya server ki.",

  why: "Semantics and Automation. Many automation tools and search engines rely on status codes to understand your site's health. For example, if you send a 401 (Unauthorized), the browser or your Axios setup can automatically redirect the user to the login page. If you just send everything as a 200 (OK) with an error message inside, you are making the frontend's job much harder and more prone to errors.",

  how: [
    "Step 1 - Determine the outcome of the request (Success, Client Error, Server Error).",
    "Step 2 - Call 'res.status(NUMBER)' with the appropriate code.",
    "Step 3 - Chain it with a sending method: 'res.status(201).json(data)'.",
    "Step 4 - Use '200' for standard GET/PUT successes.",
    "Step 5 - Use '201' for successful POST creations.",
  ],

  diagram: `
flowchart TD
    A[Outcome] --> B{Type?}
    B -- 2xx --> C[Success]
    B -- 3xx --> D[Redirection]
    B -- 4xx --> E[Client Error]
    B -- 5xx --> F[Server Error]
    C -- 200 --> G[OK]
    C -- 201 --> H[Created]
    E -- 400 --> I[Bad Request]
    E -- 401 --> J[Unauthorized]
    E -- 404 --> K[Not Found]
    F -- 500 --> L[Internal Server Error]
    style C fill:#27ae60,color:white
    style E fill:#e67e22,color:white
    style F fill:#e74c3c,color:white
  `,

  analogy:
    "Imagine you are at an Airport. The status codes are like the 'Departure Board'. 'On Time' (200), 'Boarding' (201), 'Gate Changed' (301), 'Delayed' (408), or 'Cancelled' (500). Without these codes, all the passengers (your data requests) would have to go to the counter and ask for info manually, which is slow and messy.",

  realLifeExample:
    "User Registration: A user fills a form. If it's successful, you send '201 Created'. If they forgot their email, you send '400 Bad Request'. If the email is already taken, you send '409 Conflict'. Each specific code tells the React app exactly which error message to show to the user.",

  code: `
const express = require('express');
const app = express();

app.get('/user/:id', (req, res) => {
  const user = findUser(req.params.id);
  
  if (!user) {
    // 1. Semantic 404
    return res.status(404).json({ error: 'User not found' });
  }
  
  // 2. Standard 200
  res.status(200).json(user);
});

app.post('/api/posts', (req, res) => {
  // 3. 201 for NEW resource
  res.status(201).json({ message: 'Post created successfully' });
});

app.listen(3000);
  `,

  commonMistake: [
    "Using the same code for everything (e.g., always 200 even for errors).",
    "Confusing 401 (Unauthorized - No ID) with 403 (Forbidden - Has ID but no permission).",
    "Sending a status code AFTER sending a response (it won't work, status must come before sending).",
    "Not providing a body with error statuses (always send a JSON message so the client knows WHY it failed).",
  ],

  interviewSummary: [
    "HTTP status codes are categorized by their first digit (2 = Success, 4 = Client Error, 5 = Server Error).",
    "res.status() sets the HTTP response status code.",
    "201 Created is the standard for successful resource creation.",
    "404 Not Found indicates the requested resource does not exist.",
  ],
};
