export const expressCookieAuth = {
  id: "express-cookie-auth",
  title: "Cookie-based Auth — httpOnly, Secure & SameSite",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Cookies", "Security", "Authentication", "httpOnly", "CSRF", "XSS", "SameSite"],

  definition:
    "Cookie-based authentication is the process of storing authentication tokens (like JWT or Session IDs) within browser cookies instead of LocalStorage. This allows developers to use specialized security flags like 'httpOnly', 'Secure', and 'SameSite' to significantly protect the token from common web attacks.",

  simpleExplanation:
    "Storing a token in LocalStorage is like putting your house key under a 'Welcome Mat'—it's easy to reach, but any JavaScript (including malicious ones) can steal it. Storing a token in an 'httpOnly' Cookie is like putting your key in a 'High-Security Safe' that only the browser can open. JavaScript cannot touch it. This is the single most important security upgrade for modern web authentication.",

  romanUrduRevision:
    "Cookie-based auth MERN apps ko XSS attacks se bachane ka behtareen tareeqa hai. Jab aap token ko LocalStorage mein rakhte hain, toh koi bhi script use read kar sakti hai. Lekin agar aap 'httpOnly' cookie use karein, toh browser us token ko JavaScript se chhupa leta hai. 'Secure' flag use karne se token sirf HTTPS par jayega, aur 'SameSite' CSRF attacks ko rokne mein madad karta hai. Senior developers hamesha cookies ko priority dete hain.",

  why: "Security flags are the magic here. \n1. **httpOnly**: Prevents XSS (scripts can't read the cookie). \n2. **Secure**: Token is only sent over encrypted HTTPS. \n3. **SameSite**: Prevents CSRF (cross-site requests). Combined, these three flags turn a standard token into a production-grade secure credential.",

  how: [
    "Step 1 - Use 'res.cookie('name', 'value', options)' in your login route.",
    "Step 2 - Set 'httpOnly: true' to block JavaScript access.",
    "Step 3 - Set 'secure: true' for production (HTTPS only).",
    "Step 4 - Set 'sameSite: \"Strict\"' or '\"Lax\"' to prevent CSRF.",
    "Step 5 - Use 'cookie-parser' on the server to read the incoming cookies.",
  ],

  diagram: `
flowchart LR
    A[Login] --> B[Server]
    B -- "Set-Cookie: token=...; httpOnly" --> C[Browser Storage]
    C -- "JS: document.cookie" --> D[Empty / Protected]
    C -- "Automatic HTTP Request" --> E[Server: Parse Cookie]
    E --> F[Auth Success]
    style C fill:#3498db,color:white
    style D fill:#e74c3c,color:white
  `,

  analogy:
    "LocalStorage is like a public notice board—anyone in the building (the website) can read what you wrote. An httpOnly Cookie is like a 'Pneumatic Tube' in a bank. You put your card in the tube, it goes straight to the teller (the Server), and no one in the lobby can see or touch the card. It is a private channel between the customer and the vault.",

  realLifeExample:
    "E-commerce Site: You log into Amazon or eBay. Even if a hacker manages to inject a malicious script (XSS) onto the page, they cannot steal your session token because it is locked inside an httpOnly cookie. This is why you don't hear about millions of people getting their accounts hacked just by visiting a page.",

  code: `
const express = require('express');
const app = express();

app.post('/api/login', (req, res) => {
  const token = 'your-generated-jwt-here';

  // --- SETTING THE SECURE COOKIE ---
  res.cookie('auth_token', token, {
    httpOnly: true, // 1. NO JS ACCESS (Prevents XSS)
    secure: process.env.NODE_ENV === 'production', // 2. HTTPS ONLY
    sameSite: 'Strict', // 3. PREVENTS CSRF (No cross-site)
    maxAge: 3600000, // 1 hour in ms
    path: '/' // Available for all routes
  });

  res.json({ success: true, message: 'Logged in securely!' });
});

app.post('/api/logout', (req, res) => {
  // Clear the cookie
  res.clearCookie('auth_token');
  res.send('Logged out!');
});

app.listen(3000);
  `,

  commonMistake: [
    "Forgetting to set 'httpOnly: true' (this defeats the whole purpose of using cookies for auth).",
    "Setting 'secure: true' on localhost (unless you are using a local SSL certificate, your browser will block the cookie).",
    "Not using 'sameSite: \"Strict\"' or '\"Lax\"' in modern browsers (they might reject a cookie without a samesite policy).",
    "Mixing cookies and LocalStorage for the same token (keep it simple: pick one).",
  ],

  interviewSummary: [
    "httpOnly cookies are the most secure way to store auth tokens because they prevent XSS theft.",
    "The Secure flag ensures tokens are never sent over unencrypted connections.",
    "SameSite is a critical defense against Cross-Site Request Forgery (CSRF).",
    "Unlike LocalStorage, cookies are sent automatically with every request by the browser.",
  ],
};
