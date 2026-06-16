export const mongodbIdxText = {
  id: "mongodb-idx-text",
  title: "Text Index — Full-Text Search",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Indexes", "Text Search", "Full-Text", "$text", "$search"],

  definition:
    "A Text Index is a special index type that supports full-text search queries on string content. It allows you to search for words or phrases within string fields using the $text query operator, similar to search engines. MongoDB tokenizes the string, removes stop words, and stems words to their root form.",

  simpleExplanation:
    "Normal indexes match EXACT values — searching 'MongoDB tutorial' only finds that exact string. A Text Index is like Google Search for your database — search 'MongoDB' and it finds 'MongoDB tutorial', 'Learn MongoDB basics', 'Advanced MongoDB tips'. It breaks sentences into words and matches individually.",

  romanUrduRevision:
    "Text Index string fields par full-text search enable karta hai. Ye $text aur $search operators ke saath kaam karta hai. Normal index sirf exact match karta hai, lekin Text Index words ko tod kar store karta hai — toh 'Learn MongoDB' search karne par wo document bhi milega jis mein 'MongoDB is great' likha ho. Aik collection mein sirf AIK text index ho sakta hai.",

  realLifeExample:
    "Blog Search: Users type 'react hooks tutorial' in a search bar. The text index on the 'title' and 'content' fields finds all posts containing any of those words, ranked by relevance score. No need for external tools like Elasticsearch for basic search.",

  why: "Without text indexes, you would use regex ($regex) for text searching, which is very slow because it cannot use standard indexes. Text indexes provide proper word-level search with stemming, stop word removal, and relevance scoring built in.",

  how: [
    "Step 1 — Create: db.posts.createIndex({ title: 'text', content: 'text' })",
    "Step 2 — Search: db.posts.find({ $text: { $search: 'mongodb tutorial' } })",
    "Step 3 — Exact phrase: $search: '\"exact phrase\"' (wrap in quotes)",
    "Step 4 — Exclude word: $search: 'mongodb -sql' (minus sign)",
    "Step 5 — Only ONE text index per collection is allowed",
  ],

  diagram: `
graph LR
    Text["'Learn MongoDB Fast'"] --> Tokenize["Tokens: learn, mongodb, fast"]
    Search["$search: 'mongodb'"] --> Match["Token 'mongodb' ✅ Found"]
    Match --> Doc["Returns the document"]
  `,

  analogy:
    "A Normal Index is like an alphabetical file cabinet — you find 'Ahmed' only if you search for 'Ahmed'. A Text Index is like a detective's keyword board — you pin keywords ('robbery', 'bank', '2024') and every case file containing ANY of those keywords shows up.",

  code: `
// Create a text index on title and body
db.articles.createIndex({ title: "text", body: "text" });

// Search for posts containing 'react' OR 'hooks'
db.articles.find({ $text: { $search: "react hooks" } });

// Search for exact phrase
db.articles.find({ $text: { $search: '"react hooks"' } });

// Exclude a word (find react but NOT class components)
db.articles.find({ $text: { $search: "react -class" } });

// Sort by relevance score
db.articles.find(
  { $text: { $search: "mongodb performance" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });
  `,

  commonMistake: [
    "Trying to create two text indexes on a collection. MongoDB allows only ONE text index per collection. Include all searchable fields in that one index.",
    "Using $regex instead of $text for keyword search. $regex is much slower and cannot rank by relevance.",
    "Expecting partial word matching. Text index matches whole words — searching 'Mong' will NOT find 'MongoDB'. For partial matching, use Atlas Search or regex.",
  ],

  interviewSummary:
    "Text indexes enable full-text search with tokenization, stemming, and stop word removal. They support word search, exact phrases, and word exclusion via $text/$search. Only one text index per collection is allowed. For advanced features (fuzzy matching, autocomplete), MongoDB Atlas Search is recommended.",

  interviewQA: [
    {
      q: "How does text search ranking work?",
      a: "MongoDB assigns a textScore based on how well a document matches the search terms. You can access it with { $meta: 'textScore' } and sort by it to show the most relevant results first.",
    },
    {
      q: "Can text indexes handle multiple languages?",
      a: "Yes. Text indexes support multiple languages for stemming and stop words. You can specify a default_language or set a per-document language_override field.",
    },
  ],
};
