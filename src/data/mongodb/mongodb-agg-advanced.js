export const mongodbAggAdvanced = {
  id: "mongodb-agg-advanced",
  title: "$addFields, $replaceRoot, Real Pipeline Examples",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Aggregation", "$addFields", "$replaceRoot", "$set", "Pipeline Examples"],

  definition:
    "'$addFields' (alias: $set) adds new fields to documents without removing existing ones. '$replaceRoot' replaces the entire document with a specified sub-document, promoting nested data to the top level. Together with real pipeline examples, these stages complete your aggregation toolkit for building production-grade data transformations.",

  simpleExplanation:
    "$addFields is like putting a new sticker on a box — the box stays the same, you just added extra info. $replaceRoot is like opening a box and throwing away the box — only keeping what was inside. Real pipelines combine everything: filter → group → join → reshape → sort → limit. That's how dashboards and reports are built.",

  romanUrduRevision:
    "$addFields naye fields add karta hai bina purane fields hataye (jaise $set). Agar price hai aur tax chahiye toh: { tax: { $multiply: ['$price', 0.15] } }. $replaceRoot nested object ko main document bana deta hai — ye $lookup ke baad useful hai jab joined data ko flat karna ho. Real pipelines mein sab stages milkar kaam karte hain.",

  realLifeExample:
    "Invoice System: You have orders with subtotal. $addFields creates 'tax' and 'grandTotal'. After $lookup with products, the product info is nested inside an array. $unwind + $replaceRoot flattens it so each line item becomes a clean, top-level document ready for the invoice PDF.",

  why: "$addFields is preferred over $project when you want to ADD fields without listing every existing one. $replaceRoot is essential for cleaning up $lookup results. Mastering real pipeline patterns separates beginners from intermediate developers — interviewers test these combinations frequently.",

  how: [
    "Step 1 — $addFields: { newField: expression } — adds without removing",
    "Step 2 — $set is an alias for $addFields (same thing, shorter name)",
    "Step 3 — $replaceRoot: { newRoot: '$nestedField' } — promotes sub-document",
    "Step 4 — Use $mergeObjects to combine root and nested data before replacing",
    "Step 5 — Real patterns: $match → $group → $lookup → $addFields → $sort → $limit",
  ],

  diagram: `
graph TD
    D1["{price: 100}"] --> AF["$addFields: {tax: 15}"]
    AF --> D2["{price: 100, tax: 15}"]
    D3["{a:1, info: {b:2, c:3}}"] --> RR["$replaceRoot: '$info'"]
    RR --> D4["{b:2, c:3}"]
  `,

  analogy:
    "$addFields = Putting a name tag on your shirt. Your shirt stays; you just added info. $replaceRoot = Unzipping a folder and deleting the zip. The folder disappears; only its contents remain. Real pipelines = A cooking recipe with multiple ordered steps.",

  code: `
// $addFields — Calculate tax and total
db.orders.aggregate([
  {
    $addFields: {
      tax: { $multiply: ["$subtotal", 0.15] },
      grandTotal: { $multiply: ["$subtotal", 1.15] },
      isPremium: { $gte: ["$subtotal", 5000] }
    }
  }
]);

// $replaceRoot — Flatten a $lookup result
db.orders.aggregate([
  { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
  { $unwind: "$user" },
  { $replaceRoot: { newRoot: { $mergeObjects: ["$user", { orderId: "$_id" }] } } }
]);

// REAL PIPELINE — Top 3 Customers by Spending
db.orders.aggregate([
  { $match: { date: { $gte: ISODate("2024-01-01") } } },
  { $group: { _id: "$userId", totalSpent: { $sum: "$amount" } } },
  { $sort: { totalSpent: -1 } },
  { $limit: 3 },
  { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "info" } },
  { $unwind: "$info" },
  { $project: { _id: 0, name: "$info.name", totalSpent: 1 } }
]);
  `,

  commonMistake: [
    "$addFields does NOT save changes permanently — use $merge or $out if you want to persist computed fields.",
    "$replaceRoot on a non-object field (like a string) causes an error. Always ensure the target is an embedded document.",
    "In real pipelines, placing $lookup before $match means MongoDB joins ALL documents first, then filters — very slow. Always $match first!",
  ],

  interviewSummary:
    "$addFields/$set decorates documents with computed fields non-destructively. $replaceRoot promotes nested sub-documents to the top level, essential for flattening $lookup results. Real pipeline patterns follow a standard flow: filter → group → join → reshape → sort → limit.",

  interviewQA: [
    {
      q: "What is the difference between $addFields and $project for adding new fields?",
      a: "$addFields keeps ALL existing fields and adds new ones. $project requires you to explicitly include (1) every field you want to keep — unlisted fields are dropped.",
    },
    {
      q: "How would you build a 'Top 5 Customers' report in one aggregation query?",
      a: "$match (filter date range) → $group by userId with $sum → $sort by total descending → $limit 5 → $lookup users for names → $project clean output.",
    },
  ],
};
