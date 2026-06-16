export const expressCsrfProtection = {
  id: "express-csrf-protection",
  title: "CSRF Protection — Preventing Cross-Site Forgery",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Security", "CSRF", "csurf", "Cookies", "SameSite", "Form Protection"],

  definition:
    "Cross-Site Request Forgery (CSRF) is a type of attack where a malicious website, email, or blog causes a user's web browser to perform an unwanted action on a different website to which the user is currently authenticated. CSRF protection in Express involves using unique tokens or specialized cookie flags to ensure that requests only come from your own official frontend.",

  simpleExplanation:
    "Imagine you are logged into your Bank's website. While you have the tab open, you visit a 'Funny Cat' website in another tab. The cat website has a hidden button that says: 'Bank, please send $500 to the hacker!'. Because your browser already has your Bank login cookie, the Bank thinks it's a real request from YOU and sends the money. CSRF protection is like a 'Secret Passcode' printed on your bank's form. The hacker's cat site doesn't know the passcode, so the Bank rejects their hidden request.",

  romanUrduRevision:
    "CSRF (Cross-Site Request Forgery) ek aesa attack hai jis mein hacker dusri website ke zariye aapke behalf par koi action karwa leta hai. Maslan agar aap FB par logged in hain, aur koi hacker aapse kisi link par click karwa kar aapka status update ya password change karwa le bina aapki marzi ke. Isse bachne ke liye hum 'CSRF Tokens' use karte hain. Har form ke saath ek secret 'token' jaata hai jo server check karta hai. Modern apps mein 'SameSite: Lax' cookies use karne se bhi CSRF se kafi had tak bacha ja sakta hai.",

  why: "Action Security. XSS is about stealing data; CSRF is about stealing *actions*. A CSRF attack can change a user's email, trigger a password reset, or make a purchase. Since the browser sends cookies automatically, the server can't tell the difference between a real user's click and a malicious site's background request. You need a second layer of verification to prove the request started from *your* UI.",

  how: [
    "Step 1 - Use 'SameSite: Strict' or 'Lax' on all authentication cookies (First line of defense).",
    "Step 2 - Use a CSRF library like 'csurf' (Note: 'csurf' is deprecated; modern apps often use Double Submit Cookies or specialized middleware).",
    "Step 3 - The server generates a 'Secret' and sends a matching 'Token' to the frontend.",
    "Step 4 - On every POST/PUT/DELETE request, the frontend sends the token back in a header (like 'X-CSRF-Token').",
    "Step 5 - The server verifies that the token matches the secret stored in the session/cookie.",
  ],

  diagram: `
flowchart TD
    A[User visits Bank.com] --> B[Bank sends Form + CSRF Token]
    B --> C[User visits Malicious.com]
    C -- "Tries to POST /transfer" --> D[Bank Server]
    D -- "Check Token" --> E{Token present?}
    E -- "No (Hacker doesn't have it)" --> F[Status 403: Forbidden]
    E -- "Yes (Official Form used)" --> G[Process Action]
    style D fill:#3498db,color:white
    style F fill:#e74c3c,color:white
  `,

  analogy:
    "Think of a 'Counter-Sign' in a military setting. To enter the base, you need the ID badge (the Cookie). But if you want to 'Launch a Rocket' (a POST request), the officer asks: 'What is today's counter-sign?'. If you're a spy who stole a badge, you'll still fail because you don't know the daily counter-sign that was whispered to the real soldiers at the morning meeting.",

  realLifeExample:
    "Money Transfer: When you click 'Confirm' on a bank transfer form, notice that the form has a hidden input field named '_csrf'. That long random string is your protection. A hacker can't 'see' that string because of browser security, so they can't forge a fake transfer request from their own malicious website.",

  code: `
const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf'); // Classic example (though deprecated in some stacks)
const app = express();

app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

// 1. SEND TOKEN TO FRONTEND
app.get('/form', csrfProtection, (req, res) => {
  // Pass the token to YOUR frontend template/app
  res.json({ csrfToken: req.csrfToken() });
});

// 2. VERIFY TOKEN ON ACTIONS
app.post('/process', csrfProtection, (req, res) => {
  res.send('Successfully processed! CSRF verified.');
});

// DEFAULT DEFENSE (Modern Way)
/*
res.cookie('token', token, {
  httpOnly: true,
  sameSite: 'Lax',  // Standard browser defense
  secure: true
});
*/

app.listen(3000);
  `,

  commonMistake: [
    "Thinking that 'SameSite: None' is safe (it's the exact opposite; it disables CSRF protection entirely).",
    "Forgetting that GET requests should NOT perform actions (CSRF only targets state-changing requests like POST/DELETE).",
    "Protecting only some routes (every single POST/PUT/DELETE route must be checked).",
    "Not handling AJAX/Axios correctly (you need to manually read the token from the meta tag/cookie and attach it to your Axios headers).",
  ],

  interviewSummary: [
    "CSRF tricks a browser into performing unwanted actions on a trusted site.",
    "The 'SameSite' cookie attribute (Strict/Lax) is the modern first-line defense.",
    "Anti-CSRF Tokens provide a second layer of defense by ensuring request origin.",
    "GET requests must always be idempotent (read-only) to avoid CSRF risks.",
  ],
};
