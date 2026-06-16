export const mongodbAggGroup = {
  id: "mongodb-agg-group",
  title: "$group Stage — sum, avg, count, min, max",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Aggregation", "$group", "Accumulators", "$sum", "$avg"],

  definition:
    "The '$group' stage groups input documents by a specified identifier expression and applies accumulator expressions to each group. It is the MongoDB equivalent of SQL's GROUP BY clause. Common accumulators include $sum, $avg, $min, $max, $count, $push, and $addToSet.",

  simpleExplanation:
    "Imagine you have a basket of mixed fruits — apples, oranges, and bananas. $group is like sorting them into separate piles by type. Then for each pile, you count how many there are ($sum: 1), find the heaviest one ($max), or calculate the average weight ($avg). You turn many individual items into a summary per group.",

  romanUrduRevision:
    "$group stage data ko categories mein divide karta hai aur har category ka summary nikalta hai. _id field mein wo field likhte hain jis ke hisab se group karna hai (jaise category, city, ya userId). Phir accumulators use karte hain: $sum se total, $avg se average, $min/$max se sabse choti/bari value. Ye SQL ke GROUP BY jaisa hai.",

  realLifeExample:
    "Sales Report: Your boss wants 'Total Revenue per City'. You $group by city and use $sum on the price field. Result: Karachi: 500000, Lahore: 350000, Islamabad: 200000. One query, instant report — no JavaScript loops needed.",

  why: "Without $group, you would fetch ALL documents to Node.js and loop through them to calculate totals. This is slow and memory-heavy. $group lets the database do the math internally (written in C++), returning only the small summary. It's the backbone of analytics and reporting.",

  how: [
    "Step 1 — _id defines the grouping key: { $group: { _id: '$category' } }",
    "Step 2 — Add accumulators: { total: { $sum: '$price' } }",
    "Step 3 — Use _id: null to group ALL documents into one result",
    "Step 4 — $sum: 1 counts documents in each group",
    "Step 5 — $push and $addToSet collect values into arrays per group",
  ],

  diagram: `
graph TD
    D1["{city:'KHI', amt:100}"] --> G["$group by city"]
    D2["{city:'LHR', amt:200}"] --> G
    D3["{city:'KHI', amt:150}"] --> G
    G --> R1["{_id:'KHI', total:250}"]
    G --> R2["{_id:'LHR', total:200}"]
  `,

  analogy:
    "It's like a School Report Card. The teacher (pipeline) takes all test scores (documents), groups them by subject (_id), and calculates the average score ($avg) for each subject. Instead of 100 individual test papers, you get one clean summary per subject.",

  code: `
// Total revenue, average price, and order count per category
db.orders.aggregate([
  {
    $group: {
      _id: "$category",
      totalRevenue: { $sum: "$amount" },
      avgOrderValue: { $avg: "$amount" },
      maxOrder: { $max: "$amount" },
      minOrder: { $min: "$amount" },
      orderCount: { $sum: 1 },
      allProducts: { $addToSet: "$productName" }
    }
  }
]);

// Group ALL documents (no category) — overall stats
db.orders.aggregate([
  { $group: { _id: null, grandTotal: { $sum: "$amount" } } }
]);
  `,

  commonMistake: [
    "Forgetting ' $ ' before field names inside accumulators. { $sum: 'price' } returns 0; correct is { $sum: '$price' }.",
    "Trying to access original fields after $group. After grouping, only _id and accumulator fields exist. Other fields are lost.",
    "Using $push on a field with millions of values. It creates a massive array in memory and can crash the query.",
  ],

  interviewSummary:
    "$group is the primary aggregation stage for data summarization. It uses _id to define the grouping key and accumulators ($sum, $avg, $min, $max, $count, $push, $addToSet) to compute values per group. It is the MongoDB equivalent of SQL's GROUP BY with aggregate functions.",

  interviewQA: [
    {
      q: "How do you count all documents in a group?",
      a: "Use { $sum: 1 } as the accumulator. Each document adds 1 to the count. Alternatively, use the $count stage for total count without grouping.",
    },
    {
      q: "What is the difference between $push and $addToSet?",
      a: "$push adds every value (including duplicates) to the group's array. $addToSet only adds unique values, ignoring duplicates.",
    },
  ],
};
