export const mongodbIdxTypes = {
  id: "mongodb-idx-types",
  title: "Single Field Index & Compound Index",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Indexes", "Single Field", "Compound Index", "ESR Rule"],

  definition:
    "A Single Field Index targets exactly one field. A Compound Index targets multiple fields in a specific order. Compound indexes follow the 'Prefix Rule' — the index on (A, B, C) can serve queries on (A), (A, B), or (A, B, C), but NOT queries on just (B) or (C) alone. The ESR (Equality, Sort, Range) rule guides optimal field ordering.",

  simpleExplanation:
    "Single Field Index = Phone contacts sorted by Name only. You can quickly find 'Ali'. Compound Index = Phone contacts sorted by City THEN Name. You can quickly find 'Ali in Karachi'. But you CANNOT quickly find 'Ali in any city' if City comes first in the index — the order matters.",

  romanUrduRevision:
    "Single Field Index sirf aik field par banta hai — jaise { email: 1 }. Compound Index do ya zyada fields par banta hai — jaise { category: 1, price: -1 }. Compound mein ORDER bohot matter karta hai. ESR Rule yaad rakhein: Pehle Equality fields (exact match), phir Sort fields, phir Range fields ($gt, $lt). Agar index (A, B) hai toh sirf B wali query fast nahi hogi.",

  realLifeExample:
    "E-commerce: Users filter by category='Shoes' AND sort by price. A compound index { category: 1, price: -1 } handles BOTH operations in one go. Without it, MongoDB finds shoes (scan) and then sorts them in memory (slow). With it, the results come pre-sorted from the index.",

  why: "Single indexes handle simple queries. But real apps have complex queries: 'Find active users in Karachi sorted by signup date'. A compound index on { status: 1, city: 1, createdAt: -1 } handles this entire query from the index alone, without touching the actual documents until the final result.",

  how: [
    "Step 1 — Single: db.users.createIndex({ email: 1 })",
    "Step 2 — Compound: db.products.createIndex({ category: 1, price: -1 })",
    "Step 3 — ESR Rule: Equality first, Sort second, Range third",
    "Step 4 — Compound (A,B,C) supports queries: (A), (A,B), (A,B,C)",
    "Step 5 — Compound (A,B,C) does NOT support: (B), (C), (B,C)",
  ],

  diagram: `
graph TD
    Single["Single Index: { email: 1 }"] --> Q1["find({email: '...'}) ✅ Fast"]
    Compound["Compound: { cat: 1, price: -1 }"] --> Q2["find({cat: 'X'}).sort({price:-1}) ✅"]
    Compound --> Q3["find({cat: 'X'}) ✅ Prefix works"]
    Compound --> Q4["find({price: 100}) ❌ No prefix 'cat'"]
  `,

  analogy:
    "Single Index = Dictionary sorted by word. Compound Index = Library catalog sorted by Genre → Author → Year. If you want 'Fiction by Ali', the catalog finds it instantly. But if you want 'Books from 2024' without specifying genre, the catalog can't help — you need to scan everything.",

  code: `
// Single Field Index
db.users.createIndex({ email: 1 });   // Ascending
db.users.createIndex({ score: -1 });  // Descending

// Compound Index — ESR Rule applied
// Query: find active users in a city, sorted by date
db.users.createIndex({ 
  status: 1,      // E: Equality (status = 'active')
  createdAt: -1,   // S: Sort (newest first)
  age: 1           // R: Range (age > 18)
});

// This compound index supports:
db.users.find({ status: "active" }).sort({ createdAt: -1 });  // ✅
db.users.find({ status: "active" });  // ✅ (prefix)
db.users.find({ age: { $gt: 18 } }); // ❌ (no prefix)
  `,

  commonMistake: [
    "Wrong field order in Compound Index. { price: 1, category: 1 } is very different from { category: 1, price: 1 }. The prefix must match your query's filter fields.",
    "Having both a single index on (A) AND a compound index on (A, B). The compound already covers (A) queries — the single index is wasted space.",
    "Using -1 vs 1 doesn't matter for Single indexes (B-Tree is traversable both ways). But for Compound indexes, sort direction matters when combining ascending and descending sorts.",
  ],

  interviewSummary:
    "Single indexes target one field. Compound indexes target multiple fields and follow the Prefix Rule. The ESR (Equality, Sort, Range) rule determines optimal field ordering. A compound index on (A, B) also serves as an index for (A) alone, making a separate single index on (A) redundant.",

  interviewQA: [
    {
      q: "What is the ESR Rule?",
      a: "Equality fields first (exact matches like status='active'), then Sort fields (the field you sort by), then Range fields ($gt, $lt). This order maximizes the number of documents the index can eliminate at each step.",
    },
    {
      q: "If I have index { a: 1, b: 1, c: 1 }, which queries benefit?",
      a: "Queries on (a), (a, b), and (a, b, c). Queries on just (b), (c), or (b, c) cannot use this index because they miss the prefix 'a'.",
    },
  ],
};
