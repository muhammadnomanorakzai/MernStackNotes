export const expressCompression = {
  id: "express-compression",
  title: "compression Middleware — Gzip Responses",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Compression", "Performance", "Gzip", "Optimization", "Payload", "Bandwidth"],

  definition:
    "The 'compression' middleware for Express uses Gzip and Deflate algorithms to compress the response body before sending it to the client. This significantly reduces the size of the payload being transferred over the network, leading to faster load times for the end user and lower bandwidth costs for the server.",

  simpleExplanation:
    "Imagine you are sending a giant 100-page document through the mail. It's heavy and expensive. Instead, you put it in a 'Vacuumbag' (Compression) and suck out all the air. Now it's a tiny, light packet. When it reaches the client, they open the bag (Decompress) and get the full 100 pages. The data is exactly the same, but the 'Physical Weight' (Data size) is much smaller during the trip.",

  romanUrduRevision:
    "Compression middleware aapki API responses ka size kam kar deta hai algorithms (jaise Gzip) use kar ke. Jab aap JSON ya HTML bhejte hain, toh yeh use 'compress' kar deta hai taake network par data teizi se travel kare. Browsers khud hi ise decompress kar lete hain. Isse site ki loading speed barh jati hai aur bandwidth ki bachat hoti hai.",

  why: "Performance is a feature. A large JSON response (e.g., 5MB) can take several seconds to load on a mobile connection. With compression, that same 5MB might become 800KB. This makes your app feel 'Snappy' and professional. It's one of the easiest ways to improve your Google Lighthouse and Core Web Vitals scores without changing a single line of your database logic.",

  how: [
    "Step 1 - Install the package: 'npm install compression'.",
    "Step 2 - Import it: 'const compression = require(\"compression\");'.",
    "Step 3 - Use it globally: 'app.use(compression());'.",
    "Step 4 - It automatically detects if the browser supports compression (via the 'Accept-Encoding' header).",
    "Step 5 - You can configure a 'threshold' so it only compresses large responses (e.g., >1KB).",
  ],

  diagram: `
flowchart LR
    A[Server Data: 100KB] --> B[Compression Middleware]
    B -- "Gzip Algorithm" --> C[Compressed Data: 20KB]
    C -- "HTTP Network" --> D[Client Browser]
    D -- "Decompress" --> E[Final Data: 100KB]
    style B fill:#34495e,color:white
    style C fill:#27ae60,color:white
  `,

  analogy:
    "It's like 'IKEA Furniture'. Instead of shipping a fully assembled table (large data), IKEA ships it in 'Flat Packs' (compressed). It takes up much less space on the truck. Once it arrives at your house, you assemble it and it's a full table again. The 'Flat Pack' is the compressed version during transit.",

  realLifeExample:
    "A High-Traffic E-commerce Site: Your site sends a list of 1,000 products as a JSON array. In plain text, it's 2MB. With compression middleware enabled, it drops to 400KB. For a user on a slow 3G network, this is the difference between a 'Works' and 'Broken' user experience.",

  code: `
const express = require('express');
const compression = require('compression');
const app = express();

// 1. BASIC USAGE (Compresses everything)
// app.use(compression());

// 2. PROFESSIONAL CONFIG
app.use(compression({
  level: 6, // Compression level (0-9, 6 is balanced)
  threshold: 1024, // Only compress if response > 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      // Don't compress if special header exists
      return false;
    }
    // Fallback to standard check
    return compression.filter(req, res);
  }
}));

app.get('/huge-data', (req, res) => {
  const data = Array(10000).fill({ name: 'Bulk Product', price: 99.9 });
  res.json(data);
});

app.listen(3000);
  `,

  commonMistake: [
    "Compressing already compressed files (like .jpg or .mp4)—this actually makes them SLIGHTLY LARGER because of the compression headers.",
    "Using very high compression levels (level 9) which consumes more CPU than it saves in bandwidth.",
    "Not testing it: check the 'Content-Encoding: gzip' header in your browser's Network tab to make sure it's working.",
    "Assuming it works for images (it is mostly meant for text-based data like JSON, HTML, and CSS).",
  ],

  interviewSummary: [
    "Compression middleware reduces response size using Gzip/Deflate.",
    "It improves page load speed and reduces bandwidth consumption.",
    "It works automatically based on the browser's supported encodings.",
    "It is a standard optimization for production-ready Express servers.",
  ],
};
