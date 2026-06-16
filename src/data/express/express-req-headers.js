export const expressReqHeaders = {
  id: "express-req-headers",
  title: "req.headers — Reading & Validating Input Metadata",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Headers", "Metadata", "Request", "req.headers", "Security", "Validation"],

  definition:
    "'req.headers' is an object that contains the HTTP headers sent by the client. Express automatically converts all header names to lowercase for consistency. Headers provide essential metadata about the request, such as the 'Content-Type', 'Authorization' tokens, and user-agent information.",

  simpleExplanation:
    "Incoming headers are like the 'Postmarks' and 'Stamps' on an incoming envelope. Before you even open the letter (the Body), you look at the headers to see: Where did this come from? (Origin), Is it for me? (Host), and Is there a special delivery permit? (Authorization). Reading these headers correctly is the first step in deciding whether to process the request or reject it as spam.",

  romanUrduRevision:
    "req.headers mein wo sari information hoti jo client ne bheji hoti hai requests ke saath. Express inke names ko khud hi lowercase kar deta hai (e.g., 'Auth-Token' ban jayega 'auth-token'). Authentication ke liye hum 'authorization' header check karte hain. Agar koi header missing ho jo aap ko chahiye, toh aap wahin se 400 ya 401 error bhej sakte hain.",

  why: "Headers are the standard way to handle 'Non-Data' information. You shouldn't put passwords or tokens in a URL; you put them in headers. You also use headers to check if the client can understand JSON or if they are using an outdated browser. Validating headers is a critical security layer that happens before your expensive database logic runs.",

  how: [
    "Step 1 - Access the headers object using 'req.headers'.",
    "Step 2 - Access specific headers by their lowercase name: 'req.headers['authorization']'.",
    "Step 3 - Use 'req.get('header-name')' for a more formal way to retrieve values.",
    "Step 4 - Validate important headers (like API keys) in a specialized middleware.",
    "Step 5 - Always check for 'undefined' if a header is optional.",
  ],

  diagram: `
flowchart LR
    A[Client Request] -- "Authorization: Bearer xyz" --> B[Express Server]
    B --> C{Header Valid?}
    C -- No --> D[res.status 401]
    C -- Yes --> E[Next Middleware]
    E --> F[Process Body Data]
    style C fill:#3498db,color:white
    style D fill:#e74c3c,color:white
  `,

  analogy:
    "Think of a 'Secret Society' meeting. The entry password isn't written on your name tag (the Body). Instead, you whisper it into the guard's ear (the Headers) as you walk in. The guard checks the whisper against the secret code. If they match, you are allowed inside the room.",

  realLifeExample:
    "JWT Authentication: In almost every MERN project, the React app sends a token in the 'Authorization' header. Your Express server reads 'req.headers.authorization', splits the string to get the token, and verifies it. This is the foundation of modern web security.",

  code: `
const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
  // 1. Reading headers
  const userAgent = req.headers['user-agent'];
  const apiKey = req.headers['x-api-key'];

  // 2. Simple Validation
  if (!apiKey || apiKey !== 'secret_123') {
    return res.status(403).json({ error: 'Invalid API Key' });
  }

  // 3. Using req.get() (Recommended)
  const contentType = req.get('Content-Type');

  res.json({
    message: 'Authorized!',
    browser: userAgent,
    type: contentType
  });
});

app.listen(3000);
  `,

  commonMistake: [
    "Trying to access headers with uppercase letters (e.g., 'req.headers.Authorization' might fail; use 'req.headers.authorization' instead).",
    "Assuming all headers exist (always add a null check).",
    "Confusing 'req.headers' with 'req.body' (headers are metadata, body is the main payload).",
    "Thinking you can set headers via 'req.headers' (use 'res.set()' to set headers for the response).",
  ],

  interviewSummary: [
    "req.headers contains all incoming HTTP headers from the client.",
    "Header names are automatically lower-cased by Express.",
    "req.get() is a case-insensitive way to retrieve an incoming header value.",
    "Authentication tokens and Content-Type are the most commonly used headers in APIs.",
  ],
};
