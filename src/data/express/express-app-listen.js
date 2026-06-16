export const expressAppListen = {
  id: "express-app-listen",
  title: "app.listen() — Starting the Server",
  category: "Express",
  difficulty: "Beginner",
  tags: ["app.listen", "Port", "Environment Variables", "Server Startup", "Callback"],

  definition:
    "The 'app.listen()' method is used to bind and listen for connections on the specified host and port. This method is identical to Node’s 'http.Server.listen()'. It is typically the last line of code in an Express application that actually puts the server into an 'active' state.",

  simpleExplanation:
    "Imagine you've built a brand new shop (your code). 'app.listen()' is the act of 'Opening the Front Door' and hanging an 'Open' sign. You tell customers exactly which street number (Port) they can find you at. Without this line, your code exists, but no one from the outside world can talk to it.",

  romanUrduRevision:
    "app.listen() wo method hai jo server ko up and running karta hai. Isme hum port number aur ek optional callback function dete hain jo server start hone par chalta hai. Production mein hum console.log use karte hain yeh confirm karne ke liye ke server sahi port par chal raha hai.",

  why: "Hardcoding a port (like 3000) is fine for your laptop, but on a real server, the port might be different. Understanding how to use environment variables (process.env.PORT) ensures your app can run on any hosting platform like Heroku, AWS, or Vercel without changing the code.",

  how: [
    "Step 1 - Define a port variable (e.g., const PORT = 3000;).",
    "Step 2 - Call 'app.listen(PORT, callback);'.",
    "Step 3 - Use 'process.env.PORT' to allow dynamic port assignment from the environment.",
    "Step 4 - Add a console log inside the callback to verify the server is live.",
  ],

  diagram: `
flowchart TD
    A[Code Initialization] --> B[Middleware Setup]
    B --> C[Route Definitions]
    C --> D[app.listen]
    D --> E{Server Active?}
    E -- Yes --> F[Listening for Requests]
    E -- No --> G[Error: Port in Use]
  `,

  analogy:
    "It's like a radio station. You have the DJ, the music, and the microphone (your code), but unless you 'Broadcast' on a specific frequency (Port), no one with a radio can hear the music. 'app.listen' is the 'On Air' switch.",

  realLifeExample:
    "When you run a local server at 'localhost:5000', that '5000' is the port you passed to 'app.listen'. If you try to run another app on the same port, you'll get an 'EADDRINUSE' error, meaning that 'street address' is already taken by someone else.",

  code: `
const express = require('express');
const app = express();

// Use PORT from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Server is alive!');
});

// Starting the server
app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
  console.log('Press Ctrl+C to stop');
});
  `,

  commonMistake: [
    "Hardcoding port 3000 for production (always use process.env.PORT).",
    "Trying to run two servers on the same port simultaneously.",
    "Forgetting to add a callback function to verify the server started correctly.",
    "Calling app.listen() before defining any routes (it works, but it's bad practice for readability).",
  ],

  interviewSummary: [
    "app.listen() starts the HTTP server.",
    "It takes a port number and a callback function.",
    "Environment variables (process.env) are used for production port configuration.",
  ],
};
