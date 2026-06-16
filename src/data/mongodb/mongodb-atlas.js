export const mongodbAtlas = {
  id: "mongodb-atlas",
  title: "MongoDB Atlas — Cloud, Search, Vector",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Atlas", "Cloud", "Atlas Search", "Vector Search", "DBaaS"],

  definition:
    "MongoDB Atlas is a fully-managed cloud database service by MongoDB Inc. It provides: (1) One-click database deployment on AWS/GCP/Azure, (2) Atlas Search — a full-text search engine built on Apache Lucene (like Elasticsearch), and (3) Atlas Vector Search — for AI/ML applications like semantic search and RAG (Retrieval-Augmented Generation).",

  simpleExplanation:
    "Atlas is the 'Luxury Hotel' for your database — you don't build anything; you just bring your data. Atlas Search lets you add 'Google-like search' to your app without Elasticsearch. Atlas Vector Search lets you build 'AI-powered search' — search by meaning, not just keywords. All managed, all in the cloud, zero DevOps needed.",

  romanUrduRevision:
    "Atlas aik cloud service hai jahan MongoDB automatically manage hota hai — backups, scaling, security sab khud hoti hai. Atlas Search Elasticsearch jaisa full-text search provide karta hai bina kisi alag tool ke. Vector Search AI ke liye hai — ye embeddings (numbers) se similarity search karta hai, jo ChatGPT jaise AI systems mein use hota hai. Free tier (M0) seekhne ke liye best hai.",

  realLifeExample:
    "Job Portal: Atlas hosts the database. Atlas Search powers the job search bar — 'React developer Karachi' finds relevant listings with typo tolerance and autocomplete. Vector Search helps suggest 'Similar Jobs' based on the job description's meaning, not just keywords.",

  why: "Self-hosting MongoDB is complex — you need to manage backups, security patches, scaling, and monitoring. Atlas handles all of this. Adding Elasticsearch for search means another server to manage. Atlas Search eliminates that need. Vector Search is essential for modern AI applications (RAG, recommendation engines).",

  how: [
    "Step 1 — Atlas Cloud: Create account → Create cluster → Whitelist IP → Connect",
    "Step 2 — Atlas Search: Create a Search Index on your collection fields",
    "Step 3 — Query with $search stage in aggregation pipeline",
    "Step 4 — Vector Search: Store embeddings → Create vector index → Query with $vectorSearch",
    "Step 5 — Free Tier (M0): 512MB storage, great for learning and prototypes",
  ],

  diagram: `
graph TD
    App[MERN App] --> Atlas[MongoDB Atlas Cluster]
    Atlas --> DB[Database — CRUD]
    Atlas --> Search["Atlas Search (Full-text)"]
    Atlas --> Vector["Vector Search (AI/ML)"]
    Atlas --> Backup[Auto Backups]
    Atlas --> Monitor[Performance Charts]
  `,

  analogy:
    "Atlas Cloud = Renting a luxury apartment (database) instead of building a house. Atlas Search = Having a personal librarian who finds books by keywords and phrases. Vector Search = Having an AI librarian who understands 'I want books SIMILAR to this one' even if the words are different.",

  code: `
// 1. Connect to Atlas from Mongoose
mongoose.connect(process.env.MONGODB_URI); // mongodb+srv://...

// 2. Atlas Search — Full-text search in aggregation
db.products.aggregate([
  {
    $search: {
      index: "default",
      text: {
        query: "wireless headphones",
        path: ["title", "description"],
        fuzzy: { maxEdits: 1 }  // Typo tolerance
      }
    }
  },
  { $limit: 10 }
]);

// 3. Vector Search — AI semantic search
db.products.aggregate([
  {
    $vectorSearch: {
      index: "vector_index",
      path: "embedding",        // Field with vector data
      queryVector: [0.1, 0.5, ...],  // From OpenAI/etc
      numCandidates: 100,
      limit: 5
    }
  }
]);
  `,

  commonMistake: [
    "Forgetting to whitelist your IP in Atlas Network Access. Connection will fail with 'connection refused'.",
    "Hardcoding the Atlas connection string in code. Always use environment variables (.env).",
    "Confusing Atlas Search with MongoDB's basic $text search. Atlas Search is far more powerful — supports fuzzy matching, autocomplete, facets, and scoring.",
    "Free Tier has a 512MB limit. Exceeding it makes the cluster read-only until you upgrade or delete data.",
  ],

  interviewSummary:
    "MongoDB Atlas is a managed DBaaS on AWS/GCP/Azure. Atlas Search provides Lucene-powered full-text search via the $search stage. Atlas Vector Search enables AI/ML applications with semantic similarity search. All three are integrated into the same platform, eliminating the need for separate Elasticsearch or Pinecone deployments.",

  interviewQA: [
    {
      q: "How is Atlas Search different from MongoDB's $text operator?",
      a: "$text uses basic text indexes with limited features. Atlas Search runs on Apache Lucene and supports fuzzy matching, autocomplete, custom scoring, facets, and compound queries — comparable to Elasticsearch.",
    },
    {
      q: "What is Vector Search used for?",
      a: "For AI/ML applications like semantic search, recommendation engines, and RAG (Retrieval-Augmented Generation). It searches by mathematical similarity of embeddings rather than keyword matching.",
    },
  ],
};
