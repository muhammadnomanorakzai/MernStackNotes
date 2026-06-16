export const mongodbAggIntro = {
  id: "mongodb-agg-intro",
  title: "What is Aggregation & Why Use It",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Aggregation", "Pipeline", "Data Analysis"],

  definition:
    "Aggregation in MongoDB is a way of processing a large number of documents in a collection by passing them through a series of stages called a 'Pipeline'. Each stage transforms the documents as they pass through. The pipeline can filter, sort, group, reshape, and modify documents that pass through it.",

  simpleExplanation:
    "Imagine a factory assembly line. Raw material (documents) enters one end. At each station (stage), something happens — one station filters bad pieces, another groups them by colour, another counts them. At the end, you get a finished report instead of raw materials. That's exactly what Aggregation does to your data.",

  romanUrduRevision:
    "Aggregation ka matlab hai data ko process karna. Jab aapko sirf find() se kaam nahi chalta — jaise total sales nikalni ho, ya monthly average chahiye — toh aggregation use hoti hai. Ye ek pipeline hoti hai jahan data stages se guzarta hai aur har stage data ko thora sa change karti hai. End mein aapko clean, processed result milta hai.",

  realLifeExample:
    "E-commerce Dashboard: You want to see 'Total Revenue per Category for This Month'. You can't do this with a simple find(). You need to first filter this month's orders ($match), then group them by category ($group), and finally sort by revenue ($sort). This multi-step processing is Aggregation.",

  why: "find() can only filter and project. It cannot group, sum, average, join collections, or reshape data. Aggregation is MongoDB's answer to SQL's GROUP BY, JOIN, and HAVING. It runs on the database server (not in Node.js), so it's extremely fast even on millions of documents.",

  how: [
    "Step 1 — Call db.collection.aggregate([ stage1, stage2, ... ])",
    "Step 2 — Each stage is an object like { $match: { ... } } or { $group: { ... } }",
    "Step 3 — Stages run in order; output of one stage becomes input of the next",
    "Step 4 — Common stages: $match, $group, $project, $sort, $limit, $lookup, $unwind",
  ],

  diagram: `
graph LR
    Input[Raw Documents] --> S1["$match (Filter)"]
    S1 --> S2["$group (Summarize)"]
    S2 --> S3["$sort (Order)"]
    S3 --> Output[Final Result]
  `,

  analogy:
    "Think of a Water Purification Plant. Dirty water (raw data) enters. It passes through Filter 1 (remove sand), Filter 2 (remove bacteria), Filter 3 (add minerals). Each filter is a 'stage'. The clean water at the end is your aggregated result.",

  code: `
// Simple pipeline: Total orders per category
db.orders.aggregate([
  { $match: { status: "completed" } },         // Stage 1: Filter
  { $group: { _id: "$category", total: { $sum: "$amount" } } }, // Stage 2: Group & Sum
  { $sort: { total: -1 } }                      // Stage 3: Sort descending
]);
// Output: [ { _id: "Electronics", total: 50000 }, { _id: "Books", total: 12000 } ]
  `,

  commonMistake: [
    "Confusing aggregation with find(). find() is for simple queries; aggregation is for data analysis and transformation.",
    "Not placing $match first. If you filter late, the pipeline wastes time processing documents it will eventually discard.",
    "Forgetting that aggregation returns a cursor (array), not a single document.",
  ],

  interviewSummary:
    "MongoDB Aggregation is a pipeline-based data processing framework. Documents flow through ordered stages that filter, transform, group, and reshape data. It is the MongoDB equivalent of SQL GROUP BY, HAVING, and JOIN operations, and runs entirely on the server for maximum performance.",

  interviewQA: [
    {
      q: "What is the difference between find() and aggregate()?",
      a: "find() can only filter and project fields. aggregate() can group, join, calculate, reshape, and perform complex transformations using a multi-stage pipeline.",
    },
    {
      q: "Does aggregation run on the client or server?",
      a: "It runs entirely on the MongoDB server. The server processes all stages and returns only the final result to the client, making it very efficient.",
    },
  ],
};
