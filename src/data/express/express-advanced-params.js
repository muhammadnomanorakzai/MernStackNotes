export const expressAdvancedParams = {
  id: "express-advanced-params",
  title: "Wildcard & Optional Parameters",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Routing", "Wildcards", "Regex", "Optional Params", "Dynamic Routes"],

  definition:
    "Advanced Route parameters allow for more complex URL matching using special characters like '?' (optional), '*' (wildcard), and '+' (one or more). Express uses the 'path-to-regexp' library under the hood, enabling developers to create extremely flexible and dynamic routing patterns.",

  simpleExplanation:
    "Standard parameters are like a 'Single Blank Space' in a form. Advanced parameters are more like 'Instructions' for that space. For example, '?' means 'You can leave this blank if you want'. '*' means 'Accept anything and everything that follows'. This gives you the power to handle URLs that might have different shapes or lengths.",

  romanUrduRevision:
    "Advanced route parameters URL matching ko mazeed flexible banate hain. Agar hum ':id?' likhein, toh iska matlab hai ke 'id' optional hai—chahay client id bhejay ya na bhejay, route match ho jayega. '*' ka matlab hai ke URL ka baqi poora hissa match kar lo. Yeh un scenarios mein kaam aata hai jahan humein variable depths ya missing data handle karna ho.",

  why: "Real-world URLs aren't always perfect. Sometimes a user might search with a category, and sometimes they won't. Sometimes you want a 'Catch-all' route for an entire section of your site. Advanced parameters prevent you from having to write 10 different route handlers for 10 slightly different URLs.",

  how: [
    "Step 1 - Use '?' for Optional parameters: '/users/:id?'.",
    "Step 2 - Use '*' for Wildcard/Catch-all segments: '/files/*'.",
    "Step 3 - Use '+' for one or more occurrences: '/category/:id+'.",
    "Step 4 - Use Regex in routes for strict matching: '/user/:id([0-9]+)' (only matches numbers).",
    "Step 5 - Access these values in 'req.params' just like normal parameters.",
  ],

  diagram: `
flowchart LR
    A[URL Parsing] --> B{Pattern?}
    B -- ":id?" --> C[Matches /user and /user/1]
    B -- "*" --> D[Matches /file/a/b/c]
    B -- "(regex)" --> E[Matches specified format]
    C --> F[req.params.id]
    D --> G[req.params[0]]
    style B fill:#e67e22,color:white
  `,

  analogy:
    "Think of a Mailing Address. A standard parameter is 'House Number'. An optional parameter is 'Apartment Number' (some houses have them, some don't). A wildcard is 'Care Of' (you accept any name that follows). This flexibility ensures the mail (the request) gets delivered even if some details are missing or extra.",

  realLifeExample:
    "A File Explorer: You want to support a URL like '/download/photos/2023/vacation.jpg'. Since the folder depth is unknown, you use '/download/*'. Express matches the entire path after 'download' and gives it to you, so you can find the file on your server's disk.",

  code: `
const express = require('express');
const app = express();

// 1. OPTIONAL PARAMETER
// Matches: /user AND /user/123
app.get('/user/:id?', (req, res) => {
  const id = req.params.id || 'Guest';
  res.send(\`Hello, \${id}!\`);
});

// 2. WILDCARD (Catch-all)
// Matches: /files/image.jpg AND /files/docs/work/pdf.pdf
app.get('/files/*', (req, res) => {
  const filePath = req.params[0];
  res.send(\`Accessing file: \${filePath}\`);
});

// 3. REGEX (Strict matching)
// Matches only if ID is a number: /product/45
// Does NOT match: /product/apple
app.get('/product/:id([0-9]+)', (req, res) => {
  res.send(\`Product ID \${req.params.id} is a valid number.\`);
});

app.listen(3000);
  `,

  commonMistake: [
    "Overusing wildcards, which can accidentally steal requests meant for other specific routes.",
    "Forgetting that regex routes must be strings or literal regex objects.",
    "Assuming all parameters are required (remember to add '?' for optional ones).",
    "Not validating the type of data (e.g., accepting 'abc' when you expect a numeric ':id').",
  ],

  interviewSummary: [
    "The '?' modifier makes a route parameter optional.",
    "Wildcard (*) captures everything in the URL path at that position.",
    "Express uses 'path-to-regexp' for advanced URL matching.",
    "Regex can be used inside parameter definitions for strict validation.",
  ],
};
