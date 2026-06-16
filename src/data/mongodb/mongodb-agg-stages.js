export const mongodbAggStages = {
  id: "mongodb-agg-stages",
  title: "$unwind, $sort, $limit, $skip Stages",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Aggregation", "$unwind", "$sort", "$limit", "$skip", "Pagination"],

  definition:
    "'$unwind' deconstructs an array field, creating one document per array element. '$sort' orders documents by specified fields (1 ascending, -1 descending). '$limit' caps the number of documents passed to the next stage. '$skip' skips a specified number of documents. Together, these stages handle array flattening, ordering, and pagination.",

  simpleExplanation:
    "Imagine a packet of biscuits — that's $unwind: it opens the packet and puts each biscuit on its own plate. $sort is lining up those plates from biggest to smallest biscuit. $limit says 'only show me the first 3 plates'. $skip says 'ignore the first 2 plates and start from the 3rd'. These 4 stages handle all ordering and paging needs.",

  romanUrduRevision:
    "$unwind array ko 'kholnay' ke liye hai — agar tags mein ['js', 'react'] hai toh do alag documents ban jayenge. $sort data ko tarteeb deta hai (1 = ascending, -1 = descending). $limit batata hai kitne results chahiye. $skip batata hai kitne chorna hai. Pagination ke liye formula: skip = (page - 1) * pageSize, phir limit = pageSize.",

  realLifeExample:
    "Blog Tags: Each post has a 'tags' array. To find the most popular tag: $unwind tags → $group by tag with $sum:1 → $sort by count -1 → $limit 5. This gives you the 'Top 5 Tags'. For showing search results Page 2 with 10 items: $skip 10, $limit 10.",

  why: "$unwind is essential because $group cannot process individual array elements — it needs flat documents. $sort + $limit together solve 'Top N' queries efficiently. $skip + $limit together solve pagination. Without these stages, you'd have to fetch ALL data to Node.js and process it there — very slow.",

  how: [
    "Step 1 — $unwind: { path: '$arrayField', preserveNullAndEmptyArrays: true }",
    "Step 2 — $sort: { fieldName: -1 } for descending order",
    "Step 3 — Always $sort BEFORE $limit for correct 'Top N' results",
    "Step 4 — Pagination: $skip: (page-1) * size, then $limit: size",
    "Step 5 — $sort has 100MB RAM limit; use { allowDiskUse: true } for large data",
  ],

  diagram: `
graph TD
    Post["{tags: ['A','B']}"] --> Unwind["$unwind '$tags'"]
    Unwind --> D1["{tags: 'A'}"]
    Unwind --> D2["{tags: 'B'}"]
    D1 --> Sort["$sort: {count: -1}"]
    D2 --> Sort
    Sort --> Skip["$skip: 10"]
    Skip --> Limit["$limit: 5"]
    Limit --> Page[Page Results]
  `,

  analogy:
    "$unwind = Opening a zip file (extracting items). $sort = Arranging books on a shelf by height. $limit = Taking only the first 3 books. $skip = Starting from the 4th book instead of the 1st.",

  code: `
// Top 5 most popular tags across all posts
db.posts.aggregate([
  { $unwind: "$tags" },
  { $group: { _id: "$tags", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 5 }
]);

// Pagination — Page 3, 10 items per page
const page = 3, size = 10;
db.products.aggregate([
  { $match: { active: true } },
  { $sort: { createdAt: -1 } },
  { $skip: (page - 1) * size },
  { $limit: size }
]);

// $unwind with preserveNullAndEmptyArrays
db.posts.aggregate([
  { $unwind: { path: "$comments", preserveNullAndEmptyArrays: true } }
]);
  `,

  commonMistake: [
    "$unwind removes documents with empty or missing arrays by default. Use preserveNullAndEmptyArrays: true to keep them.",
    "Placing $limit before $sort gives random N results, not Top N results.",
    "$skip performance degrades on large offsets (e.g., skip 1,000,000). For huge datasets, use cursor-based pagination with _id instead.",
    "Sorting on un-indexed fields with large data hits the 100MB RAM limit — use allowDiskUse option.",
  ],

  interviewSummary:
    "$unwind flattens arrays into individual documents. $sort orders results (index-backed when first stage). $limit caps output. $skip enables offset pagination. For production, cursor-based pagination (_id) is preferred over $skip for large offsets due to performance degradation.",

  interviewQA: [
    {
      q: "What does preserveNullAndEmptyArrays do in $unwind?",
      a: "It keeps documents that have null, missing, or empty array values instead of removing them from the pipeline.",
    },
    {
      q: "Why is $skip inefficient for deep pagination?",
      a: "Because MongoDB must scan and discard all skipped documents. Skipping 1 million documents is very expensive. Cursor-based pagination using the last seen _id is O(1) regardless of page depth.",
    },
  ],
};
