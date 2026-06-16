export const mongodbIdxIntro = {
  id: "mongodb-idx-intro",
  title: "What are Indexes & Why They Matter",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Indexes", "Performance", "B-Tree", "COLLSCAN", "IXSCAN"],

  definition:
    "An index in MongoDB is a special data structure (B-Tree) that stores a small portion of the collection's data in an easy-to-traverse form. Indexes support the efficient resolution of queries. Without indexes, MongoDB must scan every document in a collection (COLLSCAN) to find matching documents.",

  simpleExplanation:
    "Think of the Index at the back of a textbook. If you want to find 'Aggregation', you don't read the entire 500-page book. You go to the index, find 'Aggregation — Page 145', and jump straight there. MongoDB indexes work the same way — they tell the database exactly WHERE to find your data without scanning everything.",

  romanUrduRevision:
    "Index aik shortcut hai jo MongoDB ko batata hai ke data kahan hai. Bina index ke MongoDB COLLSCAN karta hai — matlab POORA collection ek ek document parh ke check karta hai. Index ke saath IXSCAN hota hai — matlab seedha us jagah jata hai jahan data hai. Ye bilkul kitaab ke peechay walay index jaisa hai. Har MongoDB collection par _id ka index by-default hota hai.",

  realLifeExample:
    "Login System: Your app has 1 million users. When someone logs in, MongoDB searches for their email. Without an index on 'email', it reads ALL 1 million documents — taking 5+ seconds. With an index, it jumps to the exact document in under 1 millisecond. The difference between a usable app and a broken one.",

  why: "Speed. A collection scan on 1 million documents might take 5 seconds. The same query with a proper index takes 1ms. For production apps with real users, indexes are not optional — they are a requirement. The difference between IXSCAN and COLLSCAN can be 1000x in performance.",

  how: [
    "Step 1 — MongoDB automatically creates an index on the _id field",
    "Step 2 — Create additional indexes with db.collection.createIndex({ field: 1 })",
    "Step 3 — 1 = ascending order, -1 = descending order",
    "Step 4 — View existing indexes: db.collection.getIndexes()",
    "Step 5 — Drop an index: db.collection.dropIndex('index_name')",
  ],

  diagram: `
graph LR
    Q[Query: find email] -- "No Index" --> CS[COLLSCAN: Read ALL docs one by one]
    Q -- "With Index" --> IX[IXSCAN: Jump to B-Tree location]
    CS --> Slow[5000ms]
    IX --> Fast[1ms]
  `,

  analogy:
    "Imagine a library with 100,000 books, all piled randomly on the floor. Finding a book = scanning everything (COLLSCAN). Now imagine those books organized on shelves A-Z with labels. Finding a book = going to the right shelf (IXSCAN). The _shelf system_ is the Index.",

  code: `
// Create an index on 'email' field
db.users.createIndex({ email: 1 });

// Create a unique index
db.users.createIndex({ username: 1 }, { unique: true });

// View all indexes on a collection
db.users.getIndexes();

// Drop a specific index
db.users.dropIndex("email_1");

// Mongoose: Define index in schema
const userSchema = new Schema({
  email: { type: String, index: true, unique: true },
  name: String
});
  `,

  commonMistake: [
    "Not creating indexes at all and wondering why the app is slow. Always index fields used in find(), sort(), and aggregation $match.",
    "Creating too many indexes. Each index takes RAM and slows down writes (Insert/Update/Delete). Only index what you query.",
    "Thinking _id index is enough. The default _id index only helps queries that search by _id. All other fields need their own indexes.",
  ],

  interviewSummary:
    "Indexes are B-Tree data structures that enable O(log n) query performance instead of O(n) collection scans. The _id index is created automatically. Additional indexes should target frequently queried or sorted fields. Trade-off: faster reads but slower writes and more RAM usage.",

  interviewQA: [
    {
      q: "What is the difference between COLLSCAN and IXSCAN?",
      a: "COLLSCAN means MongoDB reads every document in the collection sequentially. IXSCAN means MongoDB uses an index to jump directly to matching documents. IXSCAN is dramatically faster.",
    },
    {
      q: "Does create an index lock the collection?",
      a: "In MongoDB 4.2+, index builds are performed in the background by default and do not lock the collection for reads/writes. Older versions required specifying { background: true }.",
    },
  ],
};
