export const expressStaticFiles = {
  id: "express-static-files",
  title: "express.static() — Serving Assets",
  category: "Express",
  difficulty: "Beginner",
  tags: ["express.static", "Assets", "Images", "CSS", "Frontend", "Public Folder"],

  definition:
    "The 'express.static()' is a built-in middleware function in Express used to serve static files such as images, CSS files, and JavaScript files. It allows you to define a folder that contains files that can be accessed directly by a URL, without needing special route handlers for every individual file.",

  simpleExplanation:
    "Imagine you have a box of 'Public' photos and documents. Every time someone asks for a file from that box (like 'my-image.jpg'), you don't want to have to manually find it and hand it to them. 'express.static()' is like a 'Self-Service counter'. You tell Express: 'Watch this folder. If anyone asks for a file that exists in here, just give it to them automatically.'",

  romanUrduRevision:
    "express.static() images, CSS, aur JS files ko serve karne ke liye use hota hai. Agar aapne 'public' folder ko static banaya hai, toh aap directly browser mein '/image.jpg' likh kar wo file dekh sakte hain. Iske liye alag se routes banane ki zaroorat nahi parti. Isse frontend files ko backend ke saath connect karna asaan ho jata hai.",

  why: "Modern web apps need to serve assets like logos, stylesheets, and scripts. Writing a separate 'app.get()' for every single image in your project would be a nightmare. 'express.static()' manages the file reading, MIME types, and headers for you, making your asset management efficient and simple.",

  how: [
    "Step 1 - Create a folder for your static assets (usually named 'public' or 'assets').",
    "Step 2 - Use 'app.use(express.static('folderName'))' in your Express app.",
    "Step 3 - To use a virtual path prefix, use 'app.use('/static', express.static('public'))'.",
    "Step 4 - Access files in the browser via '/fileName.extension' (e.g., localhost:3000/style.css).",
    "Step 5 - Use 'path.join' to ensure the directory path works across different operating systems.",
  ],

  diagram: `
flowchart LR
    A[Client Request: /logo.png] --> B{Express App}
    B --> C[express.static 'public']
    C --> D{File Exists?}
    D -- Yes --> E[Send File Content]
    D -- No --> F[Continue to Routes]
    style C fill:#2ecc71,color:white
  `,

  analogy:
    "Think of a restaurant. Requesting a route is like ordering from the menu and waiting for the chef to cook (Logic). But requesting a static file is like grabbing a 'Soda' from the open fridge near the door. You just grab it and go without needing the chef's help. The fridge is regulated by 'express.static'.",

  realLifeExample:
    "A Landing Page: You have a directory named 'public' that contains 'index.html', 'main.css', and 'hero.png'. By using 'app.use(express.static('public'))', a user can simply visit your server's URL and Express will automatically serve the 'index.html' and all its linked CSS and images.",

  code: `
const express = require('express');
const path = require('path');
const app = express();

// 1. Serving files from the 'public' directory
// Now localhost:3000/image.jpg will work!
app.use(express.static('public'));

// 2. Using a virtual path prefix (Recommended)
// Now localhost:3000/static/my-css.css will work!
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Static files are being served!');
});

app.listen(3000);
  `,

  commonMistake: [
    "Including the folder name in the URL (e.g., trying to visit '/public/img.jpg' when you've already defined '/public' as static). The URL should be '/img.jpg'.",
    "Using relative paths that break when the app is started from a different directory (always use path.join(__dirname, 'folder')).",
    "Placing static middleware AFTER your catch-all routes (it should be near the top).",
    "Forgetting that static file names are case-sensitive on some operating systems like Linux.",
  ],

  interviewSummary: [
    "express.static() is used for serving files like images, CSS, and JS.",
    "It supports multiple static directories.",
    "Virtual path prefixes can be used to organize asset URLs.",
    "It handles caching and MIME types automatically.",
  ],
};
