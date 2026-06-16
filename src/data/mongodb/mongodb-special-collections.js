export const mongodbSpecialCollections = {
  id: "mongodb-special-collections",
  title: "Capped Collections & TTL Index",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Capped Collections", "TTL", "Auto-Delete", "Circular Buffer"],

  definition:
    "Capped Collections are fixed-size collections that work like circular buffers — when they fill up, the oldest documents are automatically overwritten. TTL (Time-To-Live) Indexes automatically delete documents after a specified number of seconds based on a Date field. Both provide automatic data lifecycle management without cron jobs.",

  simpleExplanation:
    "Capped Collection = A security camera that records for 7 days. On Day 8, it starts recording over Day 1. The storage never grows. TTL Index = A self-destructing message. You set it to expire in 5 minutes, and MongoDB deletes it automatically after 5 minutes. No code needed for cleanup!",

  romanUrduRevision:
    "Capped Collection aik fixed-size collection hai — jab full ho jaye toh purana data khud delete ho jata hai. Ye logs aur notifications ke liye best hai. TTL Index kisi bhi Date field par laga saktay hain — jaise 'createdAt'. MongoDB ka background thread har minute check karta hai aur expired documents delete kar deta hai. OTP, sessions, aur temporary tokens ke liye best hai.",

  realLifeExample:
    "OTP System: Save OTP with createdAt field. Set TTL index of 300 seconds (5 mins). User doesn't verify within 5 mins? MongoDB deletes the OTP automatically. No cron job needed. Chat App: Use capped collection to store last 1000 messages per room. Old messages automatically disappear.",

  why: "Manual cleanup is error-prone and adds complexity. TTL indexes eliminate the need for scheduled cleanup tasks in Node.js. Capped collections guarantee fixed storage usage, which is critical for logging systems where disk space must be predictable.",

  how: [
    "Step 1 — Capped: db.createCollection('logs', { capped: true, size: 5242880, max: 1000 })",
    "Step 2 — TTL: db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })",
    "Step 3 — TTL runs every 60 seconds (not instant delete)",
    "Step 4 — TTL field MUST be a Date type, not a string",
    "Step 5 — Capped collections cannot have documents deleted individually",
  ],

  diagram: `
graph LR
    subgraph Capped [Capped Collection — Circular]
      New[New Doc] --> Slot1[Doc 3]
      Slot1 --> Slot2[Doc 2]
      Slot2 --> Slot3[Doc 1 — Overwritten]
    end
    subgraph TTL [TTL Index — Timer]
      Doc["createdAt: 2pm"] --> Timer["expireAfterSeconds: 3600"]
      Timer --> Delete["Auto-deleted at 3pm"]
    end
  `,

  analogy:
    "Capped = A notebook with only 50 pages. When you reach page 50, you tear out page 1 and write on it again. TTL = A sticky note with a timer. After the timer runs out, the note self-destructs.",

  code: `
// --- Capped Collection ---
db.createCollection("notifications", {
  capped: true,
  size: 1048576,  // 1MB max size
  max: 500         // Max 500 documents
});

db.notifications.isCapped(); // true

// --- TTL Index ---
// Delete sessions 1 hour after creation
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
);

// Delete at exact time (set expireAfterSeconds to 0)
db.invites.createIndex(
  { expireAt: 1 },
  { expireAfterSeconds: 0 }
);

// Mongoose TTL
const otpSchema = new Schema({
  code: String,
  createdAt: { type: Date, default: Date.now, index: { expires: 300 } } // 5 min
});
  `,

  commonMistake: [
    "TTL on a non-Date field. If createdAt is a String ('2024-01-01'), TTL will NEVER delete the document. Must be ISODate/Date type.",
    "Thinking TTL deletes instantly. The background thread runs every ~60 seconds, so documents may live up to 60 extra seconds.",
    "Trying to delete individual documents from a capped collection — not allowed. You can only drop the entire collection.",
    "Using capped collections for important data. Old data is permanently lost when overwritten.",
  ],

  interviewSummary:
    "Capped collections are fixed-size circular buffers ideal for logging. TTL indexes auto-delete documents after a time period based on a Date field. Both eliminate manual cleanup. TTL runs every 60 seconds. Capped collections don't support individual deletes. Neither is suitable for critical persistent data.",

  interviewQA: [
    {
      q: "Can you use TTL index on a capped collection?",
      a: "No. TTL indexes are not supported on capped collections. Capped collections manage lifecycle by size/count, while TTL manages by time — the two mechanisms are incompatible.",
    },
    {
      q: "What is a Tailable Cursor?",
      a: "A special cursor for capped collections that remains open after consuming all results, waiting for new inserts — similar to Unix 'tail -f'. Useful for real-time event streaming.",
    },
  ],
};
