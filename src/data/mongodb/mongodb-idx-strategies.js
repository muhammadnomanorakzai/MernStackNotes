export const mongodbIdxStrategies = {
  id: "mongodb-idx-strategies",
  title: "Index Strategies & When NOT to Index",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Indexes", "ESR Rule", "Covered Query", "Over-indexing", "Strategy"],

  definition:
    "Index strategy is the art of deciding WHICH fields to index, in WHAT order, and knowing WHEN to avoid indexing. Key concepts include the ESR Rule (Equality, Sort, Range), Covered Queries (queries answered entirely from the index without reading documents), Index Intersection, and the dangers of over-indexing.",

  simpleExplanation:
    "Indexing strategy is like choosing what to alphabetize in your office. Index the files you look for every day (email, username). Don't index files you rarely touch (biography, avatar colour). Too many indexes = too many filing cabinets = you run out of office space (RAM) and it takes forever to file a new document (slow writes).",

  romanUrduRevision:
    "Strategy ka matlab hai samajhna ke kab index banana chahiye aur kab NAHI. ESR Rule: pehle Equality (status='active'), phir Sort (date), phir Range ($gt, $lt). Covered Query tab hoti hai jab index mein hi sab kuch ho — MongoDB ko actual document parhne ki zaroorat nahi parti. Over-indexing se RAM khatam hoti hai aur writes slow ho jati hain. $indexStats se unused indexes dhondein aur drop karein.",

  realLifeExample:
    "Startup Optimization: Your app has 15 indexes on the users collection. Writes are slow. You run $indexStats and discover 10 of them have 0 accesses — nobody uses them. You drop those 10, and writes become 3x faster instantly. That's smart index strategy.",

  why: "Indexes consume RAM (WiredTiger cache). If your indexes exceed available RAM, queries slow down dramatically. Each extra index also adds overhead to every insert/update/delete. Smart developers create only 3-5 essential indexes per collection, not 15. Knowing what NOT to index is as important as knowing what to index.",

  how: [
    "Step 1 — Apply ESR Rule for compound indexes: Equality → Sort → Range",
    "Step 2 — Create 'Covered Queries' with $project to return only indexed fields",
    "Step 3 — Avoid indexing low-cardinality fields (boolean, gender)",
    "Step 4 — Avoid indexing fields never used in find/sort/aggregate",
    "Step 5 — Use db.collection.aggregate([{$indexStats:{}}]) to find unused indexes",
    "Step 6 — Drop redundant indexes (if you have {A,B}, you don't need {A})",
  ],

  diagram: `
graph TD
    New[New Index?] --> Q1{Is field queried often?}
    Q1 -- No --> Skip[Don't Index]
    Q1 -- Yes --> Q2{High cardinality?}
    Q2 -- No --> Skip
    Q2 -- Yes --> Q3{Already covered by compound?}
    Q3 -- Yes --> Skip
    Q3 -- No --> Create[Create Index ✅]
  `,

  analogy:
    "Think of indexes as employees. Each employee (index) costs a salary (RAM + write overhead). Hire only the ones that do useful work (speed up common queries). Fire the ones sitting idle (unused indexes). A lean team works better than a bloated one.",

  code: `
// 1. Find unused indexes
db.users.aggregate([{ $indexStats: {} }]);
// Check 'accesses.ops' — if 0, the index is unused

// 2. Drop unused index
db.users.dropIndex("rarely_used_field_1");

// 3. Covered Query — response comes ENTIRELY from index
db.users.createIndex({ email: 1, name: 1 });
db.users.find(
  { email: "ali@test.com" },
  { email: 1, name: 1, _id: 0 }  // Only request indexed fields
);
// explain() shows 'totalDocsExamined: 0' — didn't read any docs!

// 4. ESR Rule compound index
db.orders.createIndex({
  status: 1,     // E: Equality (status = 'shipped')
  date: -1,      // S: Sort (newest first)
  amount: 1      // R: Range (amount > 100)
});
  `,

  commonMistake: [
    "Indexing every field 'just in case'. 10+ indexes on one collection cause severe write degradation.",
    "Ignoring Index Intersection limitations. MongoDB CAN combine two single indexes, but a proper compound index is always faster.",
    "Not reviewing indexes after removing app features. Old indexes for deleted functionality waste RAM.",
    "Indexing fields with very few unique values (e.g., boolean isActive with only true/false). The index barely helps filtering.",
  ],

  interviewSummary:
    "Index strategy involves ESR ordering for compound indexes, creating covered queries, identifying and removing unused indexes via $indexStats, and avoiding low-cardinality or write-heavy field indexing. A well-indexed collection has 3-5 targeted indexes, not 15 generic ones.",

  interviewQA: [
    {
      q: "What is a Covered Query?",
      a: "A query where all the requested fields exist in the index itself. MongoDB returns results directly from the index without reading the actual documents, making it extremely fast (totalDocsExamined = 0).",
    },
    {
      q: "How do you find and remove unused indexes?",
      a: "Run db.collection.aggregate([{$indexStats:{}}]) and check the 'accesses.ops' count. If it's 0 or very low, the index is unused and should be dropped with dropIndex().",
    },
  ],
};
