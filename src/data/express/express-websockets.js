export const expressWebsockets = {
  id: "express-websockets",
  title: "Real-time WebSockets — Socket.io & Express",
  category: "Express",
  difficulty: "Advanced",
  tags: ["WebSockets", "Socket.io", "Real-time", "Bi-directional", "Events", "Server-Push"],

  definition:
    "WebSockets provide a full-duplex (double-sided), persistent communication channel over a single TCP connection. Socket.io is the most popular library that wraps WebSockets, adding features like auto-reconnection, fallback to long-polling, and easy event-based communication.",

  simpleExplanation:
    "Normal REST APIs are like sending a letter: you send one, you wait for a reply. WebSockets are like a 'Phone Call': once the connection is open, both people can talk at the same time instantly without hanging up. It's used for things that need to happen NOW, like chat apps, live sports scores, or stock market updates.",

  romanUrduRevision:
    "WebSockets real-time apps ke liye hote hain. HTTP mein browser request karta hai tabhi server response deta hai, lekin socket.io mein server khud se browser ko data bhej sakta hai (Server Push). Chat apps aur notifications ke liye ye ideal hai. 'io.on(\"connection\")' se process shuru hota hai.",

  realLifeExample:
    "A Live Support Chat: When a customer types a message, it appears on the agent's screen instantly without the agent having to refresh their page. When the agent replies, the customer sees it immediately. This 'instant' feeling is powered by WebSockets.",

  why: "Efficiency and Speed. Traditional HTTP polling (asking 'Is there new data?' every 2 seconds) wastes bandwidth and server resources. WebSockets eliminate this overhead by keeping a single open tunnel, allowing for high-frequency, low-latency data exchange.",

  how: [
    "Step 1 - Create an HTTP server from your Express app using 'http.createServer(app)'.",
    "Step 2 - Initialize socket.io with that server: 'new Server(server)'.",
    "Step 3 - Listen for the 'connection' event.",
    "Step 4 - Use 'socket.emit()' to send data and 'socket.on()' to receive it.",
    "Step 5 - Use 'io.emit()' to broadcast to ALL connected clients (e.g., global announcements).",
  ],

  diagram: `
sequenceDiagram
    participant Client
    participant Server
    Client->>Server: HTTP Handshake (Upgrade to WS)
    Server-->>Client: Handshake Accepted
    Note over Client,Server: Persistent TCP Connection established
    Client->>Server: emit("chat message", "Hello!")
    Server-->>Client: emit("reply", "Received!")
    Server-->>Client: emit("notification", "Someone liked your post")
  `,

  analogy:
    "It's like a 'Walkie-Talkie'. In HTTP, you have to push a button to talk and wait. In WebSockets, the channel is always open, and both parties can speak whenever they want without any setup delay.",

  code: `
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // Allow any origin for testing
});

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  // Listening for a custom event
  socket.on('message_from_client', (data) => {
    console.log('Message:', data);
    
    // Broadcast to everyone ELSE
    socket.broadcast.emit('message_to_others', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Real-time server on port 3000');
});
  `,

  commonMistakes: [
    "Trying to 'app.listen(3000)' instead of 'server.listen(3000)' (socket.io needs the raw HTTP server instance).",
    "Not handling CORS properly; socket.io 4+ has strict default CORS that often blocks frontend connections.",
    "Overusing WebSockets for everything (use REST for standard CRUD and WebSockets only for true real-time needs).",
    "Memory leaks: Forgetting to clean up intervals or event listeners when a socket disconnects.",
  ],

  interviewSummary:
    "Socket.io is a library for real-time, bi-directional communication. It uses WebSockets as the primary transport but provides reliability features like heartbeats, namespaces, and room-based broadcasting that native WebSockets lack.",

  interviewQA: [
    {
      q: "What are 'Rooms' in Socket.io?",
      a: "Rooms are arbitrary channels that sockets can 'join' or 'leave'. They allow you to broadcast messages to a specific subset of players or users (e.g., in a specific group chat).",
    },
    {
      q: "What happens if a browser doesn't support WebSockets?",
      a: "Socket.io will automatically 'fallback' to HTTP long-polling, ensuring the app still works even on older browsers.",
    },
  ],
};
