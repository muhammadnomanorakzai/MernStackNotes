export const expressDownloads = {
  id: "express-downloads",
  title: "File Downloads — res.download() & res.sendFile()",
  category: "Express",
  difficulty: "Beginner",
  tags: ["Downloads", "Response", "Static", "sendFile", "File Hosting"],

  definition:
    "Express provides two main ways to send files to a client. 'res.download()' prompts the browser to download the file by setting the 'Content-Disposition' header. 'res.sendFile()' sends the file to be displayed or processed directly by the browser (like an image or a PDF) without forcing a download.",

  simpleExplanation:
    "Downloading vs Viewing. 'res.download()' is like handing someone a closed box and saying 'Take this home' (the browser opens a save dialog). 'res.sendFile()' is like opening the box and showing the person the item inside (the browser shows the image or PDF in the tab). Knowing which one to use depends on whether you want the user to 'Keep' the file or just 'See' it.",

  romanUrduRevision:
    "Agar aap chahte hain ke user koi file download kare (jaise Resume ya Invoice), toh 'res.download()' use karein. Isse browser automatically 'Save As' ka option de deta hai. Lekin agar aap chahte hain ke browser file ko tab mein hi open kar le (jaise Display Picture), toh 'res.sendFile()' use karein. 'res.sendFile' ke liye absolute path provide karna zaroori hota hai.",

  why: "UX (User Experience). You don't want a user to have to right-click and 'Save Image As' manually. If they click a 'Download Invoice' button, they expect a download dialog. Conversely, if they click 'View Logo', they want to see it immediately. Using the correct method ensures your app behaves exactly how the user expects.",

  how: [
    "Step 1 - Identify the path to the file on your server.",
    "Step 2 - Use 'res.download(path)' to force a download.",
    "Step 3 - Use 'res.sendFile(path)' to serve the file for viewing.",
    "Step 4 - Provide a filename as a second argument to 'res.download' to rename the file for the user.",
    "Step 5 - Use 'path.join(__dirname, ...)' to ensure you are providing a valid absolute path.",
  ],

  diagram: `
flowchart LR
    A[Client Request] --> B{Action?}
    B -- "Download" --> C[res.download]
    B -- "View" --> D[res.sendFile]
    C --> E[Browser: 'Save As' Dialog]
    D --> F[Browser: Display in Tab]
    style C fill:#3498db,color:white
    style D fill:#2ecc71,color:white
  `,

  analogy:
    "Imagine a Librarian. If you ask for a book to 'Borrow' (Download), they give you the book and you take it home. If you ask to 'Reference' the book (View), they let you sit at a desk and read it right there (res.sendFile). Both involve the same book, but the delivery method is different.",

  realLifeExample:
    "An E-learning Platform: For study materials like 'PDF Notes', you use 'res.download()'. For 'Video Thumbnails' or 'User Avatars', you use 'res.sendFile()'. This keeps the interface clean and predictable.",

  code: `
const express = require('express');
const path = require('path');
const app = express();

// 1. SEND FILE FOR VIEWING
app.get('/view-image', (req, res) => {
  const imagePath = path.join(__dirname, 'public/banner.png');
  res.sendFile(imagePath);
});

// 2. FORCE DOWNLOAD
app.get('/get-report', (req, res) => {
  const reportPath = path.join(__dirname, 'docs/report_v1.pdf');
  
  // Custom name for the user's computer
  res.download(reportPath, 'Monthly_Report.pdf'); 
});

app.listen(3000);
  `,

  commonMistake: [
    "Using relative paths with 'res.sendFile' (it REQUIRES an absolute path or it will throw an error).",
    "Not handling cases where the file doesn't exist (the server might crash or send an ugly error).",
    "Using 'res.download' for large system files (it might time out; use streaming for very large files).",
    "Forgetting that browsers might ignore 'res.download' instructions if they have specific settings or plugins.",
  ],

  interviewSummary: [
    "res.download() sets Content-Disposition to 'attachment'.",
    "res.sendFile() transfers the file at the given path and sets Content-Type based on extension.",
    "res.sendFile requires an absolute path unless the 'root' option is provided.",
    "Both methods handle the necessary headers and system calls for file transmission.",
  ],
};
