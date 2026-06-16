export const expressJwtAuth = {
  id: "express-jwt-auth",
  title: "JWT Authentication — Sign & Verify",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["JWT", "Authentication", "Security", "jsonwebtoken", "Token", "Sign", "Verify"],

  definition:
    "JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. In Express, it is the standard method for authentication where the server 'Signs' a token with a secret key and the client sends it back in the headers to prove their identity.",

  simpleExplanation:
    "Think of a JWT as a 'Digital Cinema Ticket'. When you buy the ticket (Login), the cinema owner signs it with a secret pen. You carry the ticket in your pocket (Browser). Every time you want to enter a hall (a Route), you show the ticket. The ticket-taker only needs to look at the 'Secret Signature' to know the ticket is real. They don't need to call the office or check a database every single time.",

  romanUrduRevision:
    "JWT (Json Web Token) MERN stack apps mein authentication ka sab se popular tareeqa hai. Jab user login karta hai, server ek 'Token' generate karke deta hai (sign karta hai). Client ise mostly localstorage ya cookies mein save kar leta hai aur har request ke saath 'Authorization' header mein bhejta hai. Server bas yeh check karta hai ke signature sahi hai ya nahi, aur har bar database hit karne ki zaroorat nahi parti.",

  why: "Scalability. Unlike sessions, JWTs are 'Stateless'. The server doesn't need to store anything in its memory (RAM). This means you can have 1 million users and your server won't slow down because it's not looking up session IDs in a database. It's also perfect for mobile apps and multi-server environments (microservices).",

  how: [
    "Step 1 - Install: 'npm install jsonwebtoken'.",
    "Step 2 - Import: 'const jwt = require(\"jsonwebtoken\");'.",
    "Step 3 - Sign: 'jwt.sign(payload, secret, { expiresIn: \"1h\" });'.",
    "Step 4 - Verify: 'jwt.verify(token, secret);'.",
    "Step 5 - Pass the data: Once verified, attach the decoded payload to 'req.user'.",
  ],

  diagram: `
flowchart LR
    A[Client: Login] --> B[Server]
    B -- "jwt.sign(user, secret)" --> C[Token Sent]
    C --> D[Client: Saved in App]
    D -- "Header: Authorization Bearer..." --> E[Server: Verify]
    E -- "jwt.verify(token, secret)" --> F[Auth Success]
    style B fill:#3498db,color:white
    style E fill:#2ecc71,color:white
  `,

  analogy:
    "Imagine a 'Wristband' at a music festival. After you pay (Login), they put a tamper-proof wristband on you. As long as you have that wristband, you can walk in and out of the stages. The security guard doesn't need to remember your face; they just check the wristband's color and seal (the Signature).",

  realLifeExample:
    "A Modern Web App: You log into your dashboard. The server sends a token like 'eyJhbG...'. Your React app stores this in 'localStorage'. Every time you click 'Settings' or 'Profile', the React app sends that long string in the headers. The server verifies it in milliseconds and shows you your data.",

  code: `
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const SECRET_KEY = 'your-super-secret-key';

// 1. LOGIN (Generating Token)
app.post('/login', (req, res) => {
  const user = { id: 1, email: 'noman@example.com' };
  
  // Sign the token
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
  
  res.json({ token });
});

// 2. VERIFYING (Protecting Route)
app.get('/profile', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    res.json({ message: 'Welcome to your profile', user: verified });
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
});

app.listen(3000);
  `,

  commonMistake: [
    "Using a weak secret key (always use a long, random string in .env).",
    "Storing sensitive data like passwords in the JWT payload (anyone can decode a JWT, it is only protected from TAMPERING, not reading).",
    "Forgetting to set an expiration time (expiresIn), which means the token is valid forever—a huge security risk.",
    "Not handling verification errors (if the token is expired or fake, jwt.verify will throw an error).",
  ],

  interviewSummary: [
    "JWT is a stateless authentication mechanism.",
    "A token consists of three parts: Header, Payload, and Signature.",
    "Signing (jwt.sign) creates the token; Verifying (jwt.verify) validates it.",
    "JWTs are preferred for cross-domain auth and mobile applications.",
  ],
};
