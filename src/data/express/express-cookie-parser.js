export const expressCookieParser = {
  id: "express-cookie-parser",
  title: "cookie-parser — Handling Browser Cookies",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Cookies", "Middleware", "Authentication", "Storage", "Parsing", "Security"],

  definition:
    "Cookie-parser is a middleware that parses the 'Cookie' header from incoming requests and populates 'req.cookies' with an object keyed by the cookie names. It optionally supports signed cookies by providing a secret string, which helps verify that the cookie hasn't been tampered with on the client side.",

  simpleExplanation:
    "Think of a Cookie as a 'Customer ID Badge' given to you by a store. Every time you return to the store, you wear the badge. 'Cookie-parser' is the store's 'Badge Scanner'. It reads the badge, verifies who you are, and puts that information on the clerk's desk (req.cookies) so they can serve you immediately without asking for your name again.",

  romanUrduRevision:
    "Cookie-parser middleware browser se aane wali cookies ko read (parse) karne ke kaam aata hai. Default mein Express cookies ko nahi samajhta; is middleware ke baghair aap 'req.cookies' access nahi kar saktay. Authentication aur Session management ke liye cookies bohot zaroori hain. 'Signed cookies' use kar ke aap apni cookies ko mazeed secure bana saktay hain.",

  why: "Cookies are the standard way to persist user state (like login sessions) across multiple requests. Because cookies are sent automatically by the browser, they are perfect for 'Keeping a user logged in'. Cookie-parser makes working with this data as simple as reading a normal JavaScript object.",

  how: [
    "Step 1 - Install the package: 'npm install cookie-parser'.",
    "Step 2 - Import it: 'const cookieParser = require(\"cookie-parser\");'.",
    "Step 3 - Use it globally: 'app.use(cookieParser(\"your-secret-key\"));'.",
    "Step 4 - Read cookies via 'req.cookies' or signed cookies via 'req.signedCookies'.",
    "Step 5 - Set cookies in a response using 'res.cookie(\"name\", \"value\", options)'.",
  ],

  diagram: `
flowchart LR
    A[Browser] -- "Cookie: session=123" --> B[Express Server]
    B --> C[Cookie-Parser]
    C -- "req.cookies.session = '123'" --> D[Route Handler]
    D -- "res.cookie('theme', 'dark')" --> E[Set-Cookie Header]
    E --> A
    style C fill:#3498db,color:white
  `,

  analogy:
    "Imagine a hotel guest (the Browser) leaving a 'Do Not Disturb' sign on their door. When the maid (the Middleware) comes by, they need to 'Read' the sign to know what to do. 'Cookie-parser' is the skill of being able to read and understand those signs left by the guests.",

  realLifeExample:
    "A 'Remember Me' Feature: When a user logs in, you set a cookie with a unique token that lasts for 30 days. Every time the user visits your site, cookie-parser reads that token, and your server automatically logs them in without asking for a password. This creates a smooth, professional user experience.",

  code: `
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Use middleware with a secret for signed cookies
app.use(cookieParser('my-super-secret-key'));

app.get('/set-cookie', (req, res) => {
  // Setting a secure, httpOnly cookie
  res.cookie('user_id', 'noman123', {
    maxAge: 900000, // 15 mins
    httpOnly: true, // Prevents XSS attacks
    signed: true    // Signs the cookie for integrity
  });
  res.send('Cookie has been set!');
});

app.get('/get-cookie', (req, res) => {
  // Reading the signed cookie
  const userId = req.signedCookies.user_id;
  res.send(\`Welcome back, user: \${userId}\`);
});

app.listen(3000);
  `,

  commonMistake: [
    "Forgetting to provide a secret string when using 'signed: true' (this will cause errors).",
    "Checking 'req.cookies' for a signed cookie (signed cookies live in 'req.signedCookies').",
    "Not setting the 'httpOnly' flag (this makes your cookies vulnerable to theft via JavaScript/XSS).",
    "Expect cookies to be available immediately after setting them (they only appear in the NEXT request from the client).",
  ],

  interviewSummary: [
    "Cookie-parser populates req.cookies with the cookie data from the request header.",
    "Signed cookies use HMAC and a secret to ensure they haven't been modified.",
    "The httpOnly flag is a critical security setting to prevent client-side script access.",
    "Cookies are superior to LocalStorage for session tokens because of automatic transmission and security flags.",
  ],
};
