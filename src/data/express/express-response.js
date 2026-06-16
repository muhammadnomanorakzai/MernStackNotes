export const expressResponse = {
  id: "express-response",
  title: "The Response Object (res)",
  category: "Express",
  difficulty: "Beginner",
  tags: ["Response", "res", "res.send", "res.json", "res.status", "res.redirect"],

  definition:
    "The 'res' object represents the HTTP response that an Express app sends when it gets an HTTP request. It contains methods to send data back to the client, set status codes, and manage headers. Calling a terminal response method (like .send or .json) is required to end the request-response cycle.",

  simpleExplanation:
    "If the 'req' object is a customer's order, the 'res' object is the 'Serving Tray'. It's how your server carries the food (Data) back to the customer. You can decide if the tray has JSON data, a simple message, a file, or even an instruction to 'go to another shop' (Redirect). Without the tray, the customer is left waiting forever.",

  romanUrduRevision:
    "Response object (res) server ki taraf se bheja jane wala 'answer' hai. 'res.send()' general message ke liye, 'res.json()' API responses ke liye, 'res.status()' success ya error code dikhane ke liye, aur 'res.redirect()' user ko kisi doosre page par bhejne ke liye use hota hai. Response bheje baghair cycle khatam nahi hogi.",

  why: "Sending correct responses is vital for UX and client-side logic. Use 200 for success, 404 for not found, and 500 for server errors. Without setting the correct status and format (JSON vs HTML), the frontend won't know how to handle the result, leading to broken apps and bad user experiences.",

  how: [
    "Step 1 - Use 'res.send()' for basic text or HTML responses.",
    "Step 2 - Use 'res.json()' for sending JavaScript objects as JSON strings (Standard for APIs).",
    "Step 3 - Use 'res.status()' to set the HTTP status code (e.g., res.status(404).send('Not Found')).",
    "Step 4 - Use 'res.redirect()' to move the user to a different URL.",
    "Step 5 - Use 'res.sendFile()' to serve physical files like images or PDFs.",
  ],

  diagram: `
flowchart LR
    A[Route Handler] --> B[res Object]
    B --> C[res.status 200/404/500]
    C --> D{Method?}
    D -- .send --> E[Text/HTML]
    D -- .json --> F[JSON Data]
    D -- .redirect --> G[New URL]
    E --> H[End Response Cycle]
    F --> H
    G --> H
    style B fill:#2ecc71,color:white
  `,

  analogy:
    "Think of 'res' as an ATM machine. You put in your card (Request). The machine checks your balance. Then, it gives you a 'Response'. It might give you Cash (JSON Data), a Receipt (Success Message), or a Message saying 'Insufficient Balance' (Error Status). If the machine doesn't respond at all, you'd be very frustrated!",

  realLifeExample:
    "A User Profile API: If a user exists, the server sends 'res.status(200).json(userData)'. If the user doesn't exist, it sends 'res.status(404).json({ message: \"User not found\" })'. This tells the frontend exactly what to display (the profile vs an error message).",

  code: `
const express = require('express');
const app = express();

app.get('/api/example', (req, res) => {
  // 1. Success response with JSON
  return res.status(200).json({ success: true, message: 'Welcome!' });
});

app.get('/old-page', (req, res) => {
  // 2. Redirect to new location
  res.redirect('/new-page');
});

app.get('/error-test', (req, res) => {
  // 3. Chain status with send (Standard Practice)
  res.status(500).send('Server broke!');
});

app.listen(3000);
  `,

  commonMistake: [
    "Trying to send a response twice (e.g., calling res.send() and then res.json()). This causes an 'Headers already sent' error.",
    "Forgetting to return after sending a response in a conditional (if/else), which leads to the code continuing to run.",
    "Not setting a status code for errors (defaults to 200, which confuses the frontend).",
    "Confusing res.send() with res.end() (res.send is the standard way to send data).",
  ],

  interviewSummary: [
    "res.send() automatically sets the Content-Type based on the input.",
    "res.json() forces the Content-Type to application/json.",
    "Response methods like send, json, and redirect end the request-response cycle.",
    "Chaining (.status(404).send()) is the best practice for clarity.",
  ],
};
