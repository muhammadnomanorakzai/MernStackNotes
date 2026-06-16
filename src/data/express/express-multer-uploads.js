export const expressMulterUploads = {
  id: "express-multer-uploads",
  title: "File Uploads with Multer — Multi-part Form Data",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Multer", "File Upload", "Middleware", "Multi-part", "Images", "Attachments"],

  definition:
    "Multer is a node.js middleware for handling 'multipart/form-data', which is primarily used for uploading files. Express cannot handle file data by default because it requires complex binary parsing; Multer simplifies this process by providing an easy API to store files locally or in memory.",

  simpleExplanation:
    "Express is normally used to read 'Text' (like a letter). But a file (like a photo) is more like a 'Package'. Express doesn't know how to open the package. 'Multer' is the specialist who knows how to open the package, take out the photo, save it to a folder, and then tell Express where it put the file (via 'req.file'). Without Multer, you can't build profile photo uploads or document sharing features.",

  romanUrduRevision:
    "Express by default file uploads ko handle nahi kar sakta kyunki wo text-based data ke liye bana hai. File uploads (jaise images ya PDFs) ke liye hum 'Multer' middleware use karte hain. Yeh 'multipart/form-data' parse karta hai aur file ko server ki disk par save kar ke aapko 'req.file' provide karta hai. Yaad rahe ke frontend par bhi 'enctype=\"multipart/form-data\"' use karna zaroori hai.",

  why: "File handling is a core feature of almost any web app. Whether it's uploading an avatar, a resume, or a product image, you need a secure and efficient way to process binary data. Multer handles the difficult parts for you, like ensuring files aren't too large, filtering for specific types (like only .jpg), and renaming files to avoid duplicates.",

  how: [
    "Step 1 - Install the package: 'npm install multer'.",
    "Step 2 - Configure storage (destination and filename).",
    "Step 3 - Initialize Multer: 'const upload = multer({ storage: storage });'.",
    "Step 4 - Use it in a route: 'app.post('/upload', upload.single('avatar'), ...)'.",
    "Step 5 - Access file details via 'req.file' (for single) or 'req.files' (for multiple).",
  ],

  diagram: `
flowchart LR
    A[Form with File] --> B[POST Request]
    B --> C[Multer Middleware]
    C --> D[Save to /uploads]
    D --> E[req.file Object]
    E --> F[Route Handler Logic]
    style C fill:#3498db,color:white
    style D fill:#2ecc71,color:white
  `,

  analogy:
    "Imagine a Post Office where people send both letters and boxes. The mailman (Express) can read the addresses on the letters, but he isn't allowed to open the boxes. He calls a specialized 'Box Handler' (Multer). The handler opens the box, puts the item on a shelf, and hands the mailman a 'Receipt' (req.file) that says: 'Your item is on Shelf #5'.",

  realLifeExample:
    "Profile Picture Upload: You have a MERN app where users uploadavatars. When a user picks a photo, the React app sends it via FormData. Multer catches it on the server, renames it to 'user-123-timestamp.jpg', saves it in an 'uploads' folder, and then your database saves the path so you can show it later.",

  code: `
const express = require('express');
const multer  = require('multer');
const path = require('path');
const app = express();

// 1. CONFIGURE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder to save files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// 2. SINGLE FILE UPLOAD
app.post('/profile', upload.single('avatar'), (req, res) => {
  // req.file contains file info
  // req.body contains text fields
  console.log('Saved as:', req.file.path);
  res.send('File uploaded successfully!');
});

// 3. MULTIPLE FILES UPLOAD
app.post('/gallery', upload.array('photos', 5), (req, res) => {
  res.send(\`Uploaded \${req.files.length} photos!\`);
});

app.listen(3000);
  `,

  commonMistake: [
    "Forgetting to set 'enctype=\"multipart/form-data\"' on the HTML form (Multer will ignore the request).",
    "Not creating the destination folder (e.g., 'uploads/') manually before running the server (Multer might crash).",
    "Trying to access file info in 'req.body' (it only exists in 'req.file' or 'req.files').",
    "Not limiting file size (this allows attackers to fill up your disk space with giant files).",
  ],

  interviewSummary: [
    "Multer is the de facto middleware for handling file uploads in Node.js.",
    "It handles multipart/form-data specifically.",
    "Information about files is attached to the request object (req.file or req.files).",
    "Storage can be in-memory (Buffer) or on-disk (Local Filesystem).",
  ],
};
