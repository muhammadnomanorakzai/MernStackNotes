export const expressHelmet = {
  id: "express-helmet",
  title: "helmet Middleware — HTTP Security Headers",
  category: "Express",
  difficulty: "Beginner",
  tags: ["Helmet", "Security", "Headers", "XSS", "Clickjacking", "Production"],

  definition:
    "Helmet is a collection of 15 smaller middleware functions that set HTTP response headers. These headers help protect your app from some well-known web vulnerabilities by setting configuration values for the browser, such as 'X-Content-Type-Options', 'Strict-Transport-Security', and 'Content-Security-Policy'.",

  simpleExplanation:
    "Think of your Express server as a house. By default, the windows have no bars and the doors have weak locks. 'Helmet' is like a 'Security Upgrade Pack'. It adds bars to the windows, deadbolts to the doors, and a security camera. It doesn't make your house invulnerable, but it makes it much, much harder for 'burglars' (Hackers) to get in through common tricks.",

  romanUrduRevision:
    "Helmet middleware Express apps ko secure banane ke liye zaroori headers add karta hai. Yeh default mein bohot saari vulnerabilities (jaise XSS aur Clickjacking) se bachata hai. Production mein ise use karna best practice maani jati hai kyunki yeh browser ko batata hai ke server kitna secure hai. Bas ek line ka code hai: 'app.use(helmet())'.",

  why: "Browsers have many hidden security features that are turned OFF by default. To turn them ON, your server must send specific HTTP headers. Helmet does this automatically. For example, it stops hackers from 'hiding' malicious code inside a fake image file (Mime-sniffing) or putting your website in a hidden 'iFrame' to steal clicks (Clickjacking).",

  how: [
    "Step 1 - Install the package: 'npm install helmet'.",
    "Step 2 - Import it: 'const helmet = require(\"helmet\");'.",
    "Step 3 - Use it globally: 'app.use(helmet());'.",
    "Step 4 - You can disable specific headers or configure them (e.g., helmet.contentSecurityPolicy()).",
    "Step 5 - Always place it at the very top of your middleware stack.",
  ],

  diagram: `
flowchart LR
    A[Client Request] --> B[Helmet Middleware]
    B --> C[Set XSS Protection]
    B --> D[Set Frameguard]
    B --> E[Set HSTS]
    C --> F[Next Middleware]
    D --> F
    E --> F
    F --> G[Secure Response Headers]
    style B fill:#333,color:fff
    style G fill:#2ecc71,color:white
  `,

  analogy:
    "Using Helmet is like wearing a 'Safety Helmet' and 'Pads' while riding a bike. You can still crash, but if you do, the helmet protects your head from major damage. It's a 'Low Effort, High Reward' security measure that every professional developer uses.",

  realLifeExample:
    "A Bank Application: When a bank sends data to your browser, they want to make sure no other script can 'listen' or 'inject' code. They use Helmet to set 'Content-Security-Policy', which basically tells the browser: 'Only trust scripts that come from our specific server, ignore everything else.'",

  code: `
const express = require('express');
const helmet = require('helmet');
const app = express();

// 1. BASIC USAGE (Highly recommended)
app.use(helmet());

// 2. ADVANCED CONFIG (Custom CSP)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "trusted-scripts.com"],
        "object-src": ["'none'"],
        "upgrade-insecure-requests": [],
      },
    },
  })
);

app.get('/', (req, res) => {
  res.send('This site is protected by Helmet!');
});

app.listen(3000);
  `,

  commonMistake: [
    "Forgetting to use it in production (this is a major security red flag).",
    "Conflicts with inline scripts: A strict Content-Security-Policy (CSP) might block your own inline JavaScript or CSS. You must configure Helmet to allow them if needed.",
    "Not using 'upgrade-insecure-requests' in a site that uses HTTPS (Helmet can help force the browser to use secure connections).",
  ],

  interviewSummary: [
    "Helmet sets security-related HTTP headers.",
    "Protects against XSS, Clickjacking, and Mime-type sniffing.",
    "It is a 'must-have' for production Node.js applications.",
    "It uses 15 sub-middleware functions to cover different security domains.",
  ],
};
