export const expressSessionAuth = {
  id: "express-session-auth",
  title: "Session-based Auth — express-session",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Sessions", "Authentication", "express-session", "Cookies", "Memory Store", "Serialization"],

  definition:
    "Session-based authentication is the 'Traditional' way of handling login. Unlike JWT (which is stateless), sessions are 'Stateful'. The server creates a session file or database entry for every logged-in user and sends a unique 'Session ID' to the browser via a cookie. The server then uses this ID to look up the user's data on its own storage.",

  simpleExplanation:
    "Think of Session Auth like a 'Coat Check' at a club. When you enter (Login), you give the attendant your coat (User data). They give you a small 'Numbered Ticket' (the Session ID). You keep the ticket in your pocket (the Browser). When you want your data back, you show the ticket. The attendant looks at the number, goes to the 'Back Room' (the Server Database), finds the matching coat, and gives it to you.",

  romanUrduRevision:
    "Session-based auth MERN stack se pehle ka standard tareeqa hai. Is mein user ka data server par hi save hota hai (Memory mein ya Database mein). Client ko sirf ek 'Session ID' di jati hai cookie ke zariye. Iska sab se bara faida yeh hai ke aap kisi bhi waqt kisi user ko 'Force Logout' kar sakte hain kyunki data aap ke control mein hai. Lekin scalability mein JWT se peeche hai kyunki server ki RAM consume hoti hai.",

  why: "Control. Because the session data is stored on your server, you have absolute power. You can see how many users are online, you can instantly kick a hacker out, and you can change user permissions in real-time. This is much harder with JWTs (which work until they naturally expire). It's perfect for internal tools, admin panels, and apps that don't need to scale to millions of servers.",

  how: [
    "Step 1 - Install: 'npm install express-session'.",
    "Step 2 - Import it and configure the middleware with a 'secret' and 'resave/saveUninitialized' options.",
    "Step 3 - Upon login, attach data to 'req.session.user = { ... }'.",
    "Step 4 - Access it in any route: 'const currentUser = req.session.user;'.",
    "Step 5 - On logout, destroy the session: 'req.session.destroy()'.",
  ],

  diagram: `
flowchart LR
    A[Client: Login] --> B[Server]
    B -- "Store data in Server Memory" --> C[Session ID: 556]
    C -- "Set-Cookie: sid=556" --> D[Browser]
    D -- "Request with Cookie: sid=556" --> B
    B -- "Search Memory for 556" --> E[Success: Found User]
    style C fill:#3498db,color:white
    style E fill:#2ecc71,color:white
  `,

  analogy:
    "Think of a 'Gym Membership'. You don't carry your whole file with your weight and progress with you. You just carry a 'Member Card' with a barcode. When you scan the card at the desk, the gym's computer opens your file on their screen. The card is the Session ID; the file on the computer is the Session Data.",

  realLifeExample:
    "A Classic CMS: When you log into WordPress or an old University portal, you are usually using Sessions. If you go to 'Active Sessions' in your settings, you can see 'Log out from all other devices'—this button exists because the server is tracking every active session in its own database.",

  code: `
const express = require('express');
const session = require('express-session');
const app = express();

// 1. CONFIGURE SESSION
app.use(session({
  secret: 'my-keyboard-cat', // Secret to sign the session ID cookie
  resave: false,             // Don't save session if unmodified
  saveUninitialized: true,   // Don't create session until something is stored
  cookie: { 
    secure: false,           // Set to true for HTTPS
    maxAge: 60000            // 1 minute
  }
}));

// 2. LOGIN (Storing data)
app.post('/login', (req, res) => {
  req.session.user = { id: 1, username: 'Noman' };
  res.send('Session Created!');
});

// 3. ACCESSING DATA
app.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.send(\`Hello \${req.session.user.username}\`);
  } else {
    res.status(401).send('Please log in.');
  }
});

// 4. LOGOUT (Destroying data)
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.send('Logged out!');
  });
});

app.listen(3000);
  `,

  commonMistake: [
    "Using the default memory-store in production (it will leak memory and sessions will disappear every time the server restarts; use 'Connect-Mongo' or 'Redis' instead).",
    "Forgetting that 'req.session' is only available after the session middleware is initialized.",
    "Not setting secure:true in production, which makes the session ID vulnerable to theft over HTTP.",
    "Trying to use sessions across different domains (cookies are domain-locked).",
  ],

  interviewSummary: [
    "Session-based auth is stateful; user data is stored on the server.",
    "The client only receives a session ID via cookie.",
    "It allows for easy features like force-logout and session monitoring.",
    "For production scalability, sessions must be stored in an external database like Redis.",
  ],
};
