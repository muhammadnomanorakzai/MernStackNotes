export const expressResDeepDive = {
  id: "express-res-deep-dive",
  title: "res.json vs res.send vs res.end — Choosing the Right Output",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Response", "JSON", "Performance", "Headers", "Best Practices", "API"],

  definition:
    "Express provides several methods for sending a response to a client. 'res.send()' is highly flexible and can handle strings, buffers, and objects. 'res.json()' is specialized for sending JSON data and sets the correct 'Content-Type' header automatically. 'res.end()' is a terminal method used to end the response process without sending any data.",

  simpleExplanation:
    "Choosing between these three is like deciding how to finish a conversation. 'res.send()' is like a general 'Goodbye'—it works in most situations. 'res.json()' is like a 'Data Exchange'—you are handing over a specific JSON file. 'res.end()' is like 'Hanging up the phone'—you are finishing the connection without saying anything else. Most of the time in MERN apps, you will use 'res.json()'.",

  romanUrduRevision:
    "Express mein response bhejne ke 3 main tareeqay hain. JSON APIs ke liye 'res.json()' best hai kyunki yeh 'Content-Type' header khud hi set kar deta hai. 'res.send()' flexible hai aur mostly strings ya HTML ke liye use hota hai. Agar aap sirf response khatam karna chahte hain aur koi data nahi bhejna (maslan delete request ke baad), toh 'res.end()' use karein.",

  why: "Using the correct method ensures that the client (the browser or your React app) understands exactly what kind of data it is receiving. For example, if you send an object via 'res.send()', Express will try to convert it to JSON, but 'res.json()' is more explicit and semantically correct for APIs. Proper method choice also avoids minor performance overheads.",

  how: [
    "Step 1 - Use 'res.json()' for all API data responses, especially with React/Vue.",
    "Step 2 - Use 'res.send()' for simple success messages or HTML strings.",
    "Step 3 - Use 'res.end()' only when you have no data to send (e.g., a '204 No Content' response).",
    "Step 4 - Remember: You can only call one 'sending' method per request. Calling twice will throw an error.",
    "Step 5 - You can chain status codes before sending: 'res.status(201).json(data)'.",
  ],

  diagram: `
flowchart LR
    A[Route Handler] --> B{What's the data?}
    B -- "Object/Array" --> C[res.json]
    B -- "String/HTML" --> D[res.send]
    B -- "None/Signal" --> E[res.end]
    C --> F[Browser: application/json]
    D --> G[Browser: text/html]
    E --> H[Browser: (No Body)]
    style C fill:#2ecc71,color:white
    style D fill:#3498db,color:white
    style E fill:#95a5a6,color:white
  `,

  analogy:
    "Imagine a waiter at a restaurant. 'res.json()' is the waiter bringing you a plate of food. 'res.send()' is the waiter bringing you a note with a message. 'res.end()' is the waiter just nodding and walking away because the task is finished. Each one is appropriate for a different stage of the meal.",

  realLifeExample:
    "API Development: When building a login endpoint, you use 'res.json({ token, user })' so the frontend can easily read the JSON object. When building a simple health check '/status', you might use 'res.send(\"OK\")'. When a user deletes their account, you might just send 'res.status(204).end()'.",

  code: `
const express = require('express');
const app = express();

// 1. Sending JSON (Recommended for MERN)
app.get('/api/user', (req, res) => {
  res.json({ id: 1, name: 'Noman' });
});

// 2. Sending simple text/html
app.get('/hello', (req, res) => {
  res.send('<h1>Hello from Express!</h1>');
});

// 3. Ending without data (e.g. after a delete)
app.delete('/api/user/:id', (req, res) => {
  // Logic to delete user...
  res.status(204).end(); 
});

app.listen(3000);
  `,

  commonMistake: [
    "Calling 'res.send()' multiple times in one route (this will cause 'Headers already sent' error).",
    "Forgetting to call 'res.json()' and just returning an object (Express won't send it unless you use the method).",
    "Using 'res.end()' when you actually want to send a success message.",
    "Assuming 'res.json()' behaves like 'return' (it doesn't stop the code execution below it, only the network response).",
  ],

  interviewSummary: [
    "res.json() is semantic and sets 'Content-Type' to 'application/json'.",
    "res.send() is generic and automatically determines the content type based on input.",
    "res.end() closes the response stream without a body.",
    "Only one response-sending method can be called in the request-response cycle.",
  ],
};
