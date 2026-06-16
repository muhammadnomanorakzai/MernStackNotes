export const expressStreaming = {
  id: "express-streaming",
  title: "Streaming Large Files — Memory Efficiency",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Streaming", "fs.createReadStream", "Node.js", "Performance", "Memory", "Buffer"],

  definition:
    "Streaming in Express is the process of reading a file chunk-by-chunk and sending those chunks to the client as they become available, instead of reading the entire file into memory first. This is achieved using Node.js 'Streams' (like 'fs.createReadStream') and the 'pipe()' method, which connects the file data directly to the HTTP response.",

  simpleExplanation:
    "Imagine you want to show someone a 2-hour movie. Standard file sending is like downloading the 'Whole Movie' first and then hitting play—it takes a long time and uses a lot of space. 'Streaming' is like watching it on Netflix; you start watching the first minute while the second minute is still being fetched. For your server, this means it can handle a 4GB video file without even using 1MB of RAM.",

  romanUrduRevision:
    "Streaming ka matlab hai bari files (jaise videos ya logs) ko tukron (chunks) mein bhejna. Agar aap direct 'fs.readFile' use karenge toh poori file pehle RAM mein load hogi, jo server crash kar sakta hai. Streaming use kar ke hum file ka ek chota hissa read karte hain aur foran' res.pipe' se bhej dete hain. Isse server ki memory (RAM) par bohot kam bojh parta hai aur speed barh jati hai.",

  why: "Scalability. If 1,000 users all try to download a 500MB video at the same time using standard methods, your server would need 500GB of RAM, which is impossible. By using Streams, your server only needs a few Kilobytes per user to handle the 'Pipe'. It makes your application extremely efficient and capable of handling massive files with minimal hardware.",

  how: [
    "Step 1 - Import the 'fs' module: 'const fs = require(\"fs\");'.",
    "Step 2 - Use 'fs.createReadStream(path)' to start reading the file.",
    "Step 3 - Pipe the stream into the response: 'stream.pipe(res);'.",
    "Step 4 - Handle stream errors using '.on(\"error\", ...)' to prevent server crashes.",
    "Step 5 - For videos, ensure you set the correct 'Content-Type' and 'Accept-Ranges' if you want seeking support.",
  ],

  diagram: `
flowchart LR
    A[Disk File: 2GB] -- "Chunk 1" --> B[Stream Buffer]
    B -- "Pipe" --> C[Response Stream]
    C --> D[Client Browser]
    A -- "Chunk 2" --> B
    B -- "Pipe" --> C
    style B fill:#3498db,color:white
    style C fill:#2ecc71,color:white
  `,

  analogy:
    "Standard methods are like a 'Bucket'. You fill the whole bucket with water (the data) from the well (the Disk) and then carry the heavy bucket to the customer. Streaming is like a 'Hose Pipe'. You just connect the hose to the well and the water flows through it directly to the customer. The hose is light and never gets full of water; it just passes it along.",

  realLifeExample:
    "A Video Hosting Site: When you build a site like YouTube or a simple video player, you use 'res.stream'. This allows users to start watching a video immediately. It also allows developers to process giant log files or generate PDF reports on the fly without running out of server memory.",

  code: `
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/video', (req, res) => {
  const filePath = path.join(__dirname, 'media/movie.mp4');
  
  // 1. Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Video not found');
  }

  // 2. Create a read stream
  const videoStream = fs.createReadStream(filePath);

  // 3. Optional: Set headers for video
  res.setHeader('Content-Type', 'video/mp4');

  // 4. PIPE the stream directly to response
  videoStream.pipe(res);

  // 5. Handle errors to prevent crash
  videoStream.on('error', (err) => {
    console.error(err);
    res.status(500).end();
  });
});

app.listen(3000);
  `,

  commonMistake: [
    "Using 'fs.readFile' for large files (this will quickly consume all your RAM and crash the server).",
    "Not handling 'error' events on the stream (if the disk fails mid-read, the server will crash).",
    "Forgetting to set 'Content-Type', which might make the browser download the file instead of playing it.",
    "Expecting streaming to work with 'res.json' (streaming is for binary/text streams, not structured objects).",
  ],

  interviewSummary: [
    "Streaming is memory-efficient for handling large files.",
    "Node.js Streams allow direct piping from source to destination.",
    "pipe() manages the 'Backpressure' (synchronizing the speed of reading and sending).",
    "Always handle error events on streams to ensure server stability.",
  ],
};
