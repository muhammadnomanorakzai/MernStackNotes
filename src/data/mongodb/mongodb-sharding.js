export const mongodbSharding = {
  id: "mongodb-sharding",
  title: "Sharding — Horizontal Scaling",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Sharding", "Horizontal Scaling", "Distributed", "Shard Key"],

  definition:
    "Sharding is MongoDB's strategy for horizontal scaling. It distributes data across multiple servers (shards). Each shard holds a subset of the data. A 'Shard Key' determines how data is distributed. A 'mongos' router directs queries to the right shard. This allows MongoDB to handle datasets too large for a single server.",

  simpleExplanation:
    "Imagine a library with 10 million books. One building can't fit them all. So you split the books across 3 buildings: Building A has books A-H, Building B has I-P, Building C has Q-Z. When someone asks for 'MongoDB in Action', the librarian (mongos) knows to check Building B. That's Sharding — splitting data across multiple servers.",

  romanUrduRevision:
    "Sharding ka matlab hai data ko multiple servers (shards) par divide karna. Jab aik server par data itna zyada ho jaye ke wo handle nahi kar sakta, toh hum sharding karte hain. Shard Key wo field hoti hai jis ke hisab se data baanta jata hai (jaise userId ya region). Mongos router har query ko sahi shard par bhejta hai. Atlas par ye automatic hai.",

  realLifeExample:
    "Social Media: Instagram has billions of posts. One server cannot store all of them. They shard by userId — User 1-1M on Shard A, User 1M-2M on Shard B, etc. When you open your profile, mongos routes the request directly to the shard that has YOUR posts.",

  why: "Vertical Scaling (bigger server) has a limit. A single server can only have so much RAM, CPU, and disk. Sharding provides Horizontal Scaling — add more servers to handle more data and more traffic. It's the only way to scale to billions of documents.",

  how: [
    "Step 1 — Choose a Shard Key carefully (e.g., userId, region) — it cannot be changed easily",
    "Step 2 — Data is split into 'Chunks' based on the Shard Key ranges",
    "Step 3 — mongos router sits between app and shards, directing queries",
    "Step 4 — Config Servers store metadata about which chunk is on which shard",
    "Step 5 — On Atlas: enable sharding with a few clicks, no manual setup",
  ],

  diagram: `
graph TD
    App[Application] --> Mongos[mongos Router]
    Mongos --> S1["Shard 1 (Users A-H)"]
    Mongos --> S2["Shard 2 (Users I-P)"]
    Mongos --> S3["Shard 3 (Users Q-Z)"]
    Config["Config Servers (Metadata)"] --> Mongos
  `,

  analogy:
    "It's like splitting a company into regional offices. Instead of one huge office handling ALL customers (single server), you have offices in Lahore, Karachi, and Islamabad. Each office handles its local customers. When a customer calls the main number, the receptionist (mongos) transfers them to the correct regional office.",

  code: `
// 1. Enable sharding on a database
sh.enableSharding("myDatabase");

// 2. Shard a collection by userId (Hashed for even distribution)
sh.shardCollection("myDatabase.orders", { userId: "hashed" });

// 3. Check sharding status
sh.status();

// 4. Mongoose — connection string includes mongos
mongoose.connect("mongodb://mongos1:27017,mongos2:27017/myDb");

// On Atlas: Go to Cluster > Collections > Configure Sharding > Pick Shard Key
  `,

  commonMistake: [
    "Choosing a bad Shard Key. A monotonically increasing key (like _id: ObjectId) sends all writes to ONE shard (hotspot). Use hashed keys or high-cardinality fields.",
    "The Shard Key cannot be changed after sharding is enabled (MongoDB 5.0 allows resharding, but it's expensive).",
    "Queries without the Shard Key in the filter become 'Scatter-Gather' — they hit ALL shards. Always include the Shard Key in frequent queries.",
    "Thinking every app needs sharding. Most apps don't need it until they exceed 1TB or handle millions of concurrent users.",
  ],

  interviewSummary:
    "Sharding distributes data horizontally across multiple servers using a Shard Key. The mongos router directs queries. Good shard keys have high cardinality and even distribution. Poor shard keys cause hotspots. Most apps don't need sharding until they reach extreme scale.",

  interviewQA: [
    {
      q: "What makes a good Shard Key?",
      a: "High cardinality (many unique values), even write distribution (no hotspots), and frequently used in queries. A hashed shard key on a high-cardinality field is often the best choice.",
    },
    {
      q: "What is a 'Scatter-Gather' query?",
      a: "A query that doesn't include the Shard Key in its filter. The mongos must forward the query to ALL shards and aggregate the results, making it much slower than a targeted query.",
    },
  ],
};
