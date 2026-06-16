export const expressSse = {
  id: "express-sse",
  title: "Server-Sent Events (SSE) — One-Way Real-time",
  category: "Express",
  difficulty: "Advanced",
  tags: ["SSE", "Server-Sent Events", "Real-time", "Streaming", "EventSource", "One-Way"],

  definition:
    "Server-Sent Events (SSE) is a web technology where a browser receives automatic updates from a server via an HTTP connection. Unlike WebSockets, SSE is one-way (Server-to-Client only) and works over standard HTTP, making it simpler to implement and better for firewalls.",

  simpleExplanation:
    "Imagine subscribing to a magazine. You subscribe once, and they keep sending you new issues whenever they are ready. You don't have to ask for them. SSE is like that: the browser opens a connection to the server, and the server 'pushes' data whenever there's an update. It's perfect for things like live news feeds or social media notifications.",

  romanUrduRevision:
    "SSE aik one-way real-time communication method hai. Is mein sirf server data bhejta hai (push karta hai) aur client sirf sunta (listen) hai. Is ke liye hum 'text/event-stream' content-type use karte hain. WebSockets se zyada simple hai kyunke ye standard HTTP par chalti hai.",

  realLifeExample:
    "A Live Score Dashboard for Cricket or Football: The score only changes when someone hits a boundary or a goal is scored. Instead of the user refreshing the page every 10 seconds, the server 'pushes' the new score to thousands of users instantly via SSE.",

  why: "Simplicity and Native Support. SSE is built into all modern browsers via the 'EventSource' API. It handles reconnections automatically and doesn't require a special protocol like WebSockets (WS://). It is highly efficient for unidirectional data flows.",

  how: [
    "Step 1 - Set headers: 'Content-Type: text/event-stream', 'Cache-Control: no-cache', 'Connection: keep-alive'.",
    "Step 2 - Keep the response open (don't call 'res.end()').",
    "Step 3 - Format data as 'data: <message>\\n\\n'.",
    "Step 4 - On the client side, use 'const source = new EventSource(\"/stream\")'.",
    "Step 5 - Listen for messages with 'source.onmessage'.",
  ],

  diagram: `
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: HTTP GET /events (Keep-alive)
    Server-->>Client: Headers (text/event-stream)
    Note over Client,Server: Connection stays OPEN
    Server-->>Client: data: {"msg": "First update"}
    Server-->>Client: data: {"msg": "Price changed to $10"}
    Server-->>Client: data: {"msg": "Stock sold out"}
  `,

  analogy:
    "It's like a 'Newspaper Delivery Service'. You don't talk back to the delivery person; you just open your door and pick up the new paper every morning. You set up the subscription once, and they keep pushing the papers to you.",

  code: `
const express = require('express');
const app = express();

app.get('/events', (req, res) => {
  // 1. Set required headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders(); // Establish the stream

  // 2. Send data periodically
  const interval = setInterval(() => {
    const data = { time: new Date().toLocaleTimeString(), message: 'Hello from Server!' };
    res.write(\`data: \${JSON.stringify(data)}\\n\\n\`);
  }, 2000);

  // 3. Clean up on connection close
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

// Client Side Code (In Browser Console):
// const evtSource = new EventSource("/events");
// evtSource.onmessage = (event) => {
//   console.log("New Event:", JSON.parse(event.data));
// };
  `,

  commonMistake: [
    "Not using the double newline ('\\n\\n') at the end of each message (the browser waits for the double newline to 'fire' the event).",
    "Forgetting to handle the 'close' event (this leads to memory leaks as the server keeps running intervals for dead connections).",
    "Using SSE for heavy binary data (it is text-based only; for binary, use WebSockets).",
    "Reaching the browser's 6-connection limit per domain (if you use many subdomains or open many tabs, older HTTP/1.1 servers might block new requests).",
  ],

  interviewSummary:
    "SSE is a lightweight alternative to WebSockets for unidirectional streaming. It is easier to implement, works over standard port 80/443, and provides native automatic reconnection, making it ideal for event feeds and notifications.",

  interviewQA: [
    {
      q: "When should you prefer SSE over WebSockets?",
      a: "When you only need to push data from the server (e.g., logging, news feeds). It is simpler to scale and uses standard HTTP infrastructure.",
    },
    {
      q: "Does SSE support binary data?",
      a: "No, SSE is strictly text-based (UTF-8). If you need to send binary, you either need to Base64 encode it or switch to WebSockets.",
    },
  ],
};
