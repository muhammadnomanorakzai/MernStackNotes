export const expressIntro = {
  id: "express-intro",
  title: "What is Express.js & Why Use It?",
  category: "Express",
  difficulty: "Beginner",
  tags: ["Express.js", "Node.js", "Web Framework", "Backend", "Middleware", "Fast"],

  definition:
    "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is the 'de facto' standard server framework for Node.js, acting as a layer built on top of the built-in 'http' module to simplify routing, middleware, and server logic.",

  simpleExplanation:
    "Think of Node.js as the 'Engine' of a car. It's powerful, but hard to drive by just touching the gears and wires. Express.js is the 'Dashboard' and 'Steering Wheel'. It makes it much easier and faster to build a website or API without having to write hundreds of lines of complex code for simple things like handling a URL or sending JSON data.",

  romanUrduRevision:
    "Express.js Node.js ka sab se popular framework hai. Yeh plain Node.js se kaafi asaan hai kyunki yeh routing, request handling, aur middleware support built-in deta hai. Server banane ke liye humein 'http' module ki mushkil coding nahi karni parti; Express use kar ke hum chand lines mein server ready kar sakte hain.",

  why: "Plain Node.js requires manual parsing of URLs, bodies, and headers, which is time-consuming and error-prone. Express simplifies this with intuitive methods like 'app.get()' and 'res.json()'. Most of the professional Node.js ecosystem (like NestJS or many production APIs) is built on or inspired by Express.",

  how: [
    "Step 1 - Install: 'npm install express'.",
    "Step 2 - Import: 'const express = require(\"express\");'.",
    "Step 3 - Initialize: 'const app = express();'.",
    "Step 4 - Define Route: 'app.get(\"/\", (req, res) => res.send(\"Hello!\"));'.",
    "Step 5 - Start Server: 'app.listen(3000);'.",
  ],

  diagram: `
flowchart LR
    A[Client Request] --> B{Express App}
    B --> C[Middleware 1]
    C --> D[Middleware 2]
    D --> E[Route Handler]
    E --> F[Response Sent]
    style B fill:#333,color:fff
  `,

  analogy:
    "Using plain Node.js is like building a house by cutting the trees and making your own bricks. Using Express.js is like buying pre-made furniture and bricks from a store and just assembling them. Both build a house, but Express gets you inside the house much faster.",

  realLifeExample:
    "A Simple API: You want to build a system where users can fetch their profile. In plain Node, you'd have to check 'req.url === \"/profile\"' and manually read chunks of data. In Express, you just write 'app.get(\"/profile\", (req, res) => ...)' and it's done.",

  code: `
// Plain Node.js (Hard)
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World');
  }
});
server.listen(3000);

// Express.js (Easy & Clean)
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => console.log('Server running!'));
  `,

  commonMistake: [
    "Thinking Express is a separate language (it is just a library for JavaScript).",
    "Forgetting to call 'res.send()' or 'res.json()', leading to a browser that spins indefinitely.",
    "Not understanding that Express is 'minimalist'—it doesn't include a database or admin panel by default.",
  ],

  interviewSummary: [
    "Express is a Node.js framework used for building web apps and APIs.",
    "It follows a middleware-based architecture.",
    "Key advantages: routing, easy request/response handling, and a huge ecosystem of plugins.",
  ],
};
