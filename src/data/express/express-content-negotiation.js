export const expressContentNegotiation = {
  id: "express-content-negotiation",
  title: "Content Negotiation — req.accepts()",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Content Negotiation", "Best Practices", "API", "res.format", "Accept Header"],

  definition:
    "Content Negotiation is the mechanism that allows a server and a client to agree on the best format for the data being transferred (e.g., JSON, HTML, or Plain Text). Express provides 'req.accepts()' to check what the client wants, and 'res.format()' to send different responses based on the client's preference.",

  simpleExplanation:
    "Think of Content Negotiation as a 'Translator'. The client says: 'I speak JSON' (Accept: application/json). The server looks at this and says: 'Okay, I will send you JSON'. If a different client says: 'I speak HTML' (Accept: text/html), the server sends a beautiful webpage instead. It allows one single URL to serve different types of people and apps automatically.",

  romanUrduRevision:
    "Content Negotiation ka matlab hai client aur server ka aapas mein 'Format' decide karna. Client browser batata hai ke use HTML chahiye ya JSON. Express mein hum 'req.accepts()' use karte hain yeh check karne ke liye. 'res.format()' use kar ke hum ek hi route se alag alag contents bhej sakte hain depending ke client ko kya suit karta hai. Yeh professional APIs ke liye bohot useful hai.",

  why: "Flexibility and Compatibility. You might want your API to be used by a React app (wants JSON) and a standard web browser (wants HTML). Instead of creating two different URLs, you use content negotiation. It also helps with versioning and internationalization (handling different languages or encodings).",

  how: [
    "Step 1 - The client sends an 'Accept' header (e.g., 'Accept: application/json').",
    "Step 2 - Use 'req.accepts('json', 'html', ...)' to see what the client prefers.",
    "Step 3 - Use 'res.format({...})' to provide different response functions for each type.",
    "Step 4 - If the client's request doesn't match any type, you can send a 406 Not Acceptable status.",
    "Step 5 - This ensures your server is 'Smart' and speaks the client's language.",
  ],

  diagram: `
flowchart LR
    A[Client Request\nAccept: json] --> B[Express Server]
    B --> C{res.format}
    C -- "json" --> D[res.json]
    C -- "html" --> E[res.render]
    C -- "default" --> F[res.send text]
    style C fill:#3498db,color:white
    style D fill:#2ecc71,color:white
  `,

  analogy:
    "Imagine a Restaurant Menu available in 3 languages. When a customer walks in, the waiter (the Server) asks: 'Which language do you prefer?' (Accept Header). If the customer says 'Japanese', the waiter brings the Japanese menu. If they say 'English', they get the English one. The 'Food' (Data) is the same, but the 'Presentation' (Format) changes.",

  realLifeExample:
    "A Data Export Tool: You have a route '/api/reports'. If a developer hits it from code, they want JSON to process data. If a manager hits it from a browser, they want a pretty HTML table. Content negotiation makes it possible to keep both happy with a single URL.",

  code: `
const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  const users = [{ id: 1, name: 'Noman' }];

  // --- CONTENT NEGOTIATION ---
  res.format({
    // 1. If client accepts HTML
    'text/html': () => {
      res.send('<ul><li>Noman</li></ul>');
    },

    // 2. If client accepts JSON (Common for MERN)
    'application/json': () => {
      res.json(users);
    },

    // 3. Default if nothing matches
    'default': () => {
      res.status(406).send('Not Acceptable');
    }
  });
});

app.listen(3000);
  `,

  commonMistake: [
    "Forgetting to provide a 'default' case in 'res.format()'.",
    "Assuming the client always sends an 'Accept' header (browsers send many, but simple scripts might send none).",
    "Not understanding that 'req.accepts()' returns the 'best' match based on quality values weight (q=0.5).",
    "Hardcoding formats instead of using standard types (e.g., using 'word' instead of 'application/msword').",
  ],

  interviewSummary: [
    "Content negotiation helps a server decide which format to send to a client.",
    "It relies primarily on the 'Accept' HTTP header.",
    "res.format() is the Express method to handle multi-format responses.",
    "It enables a single endpoint to serve multiple client types (Browser, Mobile, CLI).",
  ],
};
