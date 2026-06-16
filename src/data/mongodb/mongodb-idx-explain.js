export const mongodbIdxExplain = {
  id: "mongodb-idx-explain",
  title: "explain() — Analyzing Query Performance",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Performance", "explain", "Query Plan", "IXSCAN", "COLLSCAN"],

  definition:
    "The explain() method provides information about how MongoDB executes a query. It shows the query plan — whether an index was used (IXSCAN) or a full collection scan occurred (COLLSCAN), how many documents were examined vs. returned, and the execution time in milliseconds.",

  simpleExplanation:
    "explain() is like asking a delivery driver: 'What route did you take and how long did it take?' It reveals whether MongoDB took the highway (index) or a dirt road (full scan). If your query examined 100,000 documents but only returned 5, you know something is wrong — you need an index. explain() tells you exactly where the bottleneck is.",

  romanUrduRevision:
    "explain() aapko batata hai ke MongoDB ne aapki query kaise execute ki. Sab se zaroori cheezein dekhein: 'winningPlan.stage' — agar COLLSCAN hai toh slow hai, IXSCAN hai toh fast hai. 'totalDocsExamined' vs 'nReturned' — agar 10000 docs examine kiye aur sirf 5 return hue toh index missing hai. 'executionTimeMillis' se pata chalta hai kitna time laga.",

  realLifeExample:
    "Debugging Slow API: Your /api/users endpoint takes 5 seconds. You run explain() and see COLLSCAN with 500,000 documents examined. You add an index on the queried field, run explain() again, and see IXSCAN with only 1 document examined. API now takes 2ms.",

  why: "You can't improve what you can't measure. Without explain(), you're guessing why a query is slow. explain() provides hard data — exactly which index was used, how many documents were scanned, and whether the query plan is optimal. It's the #1 debugging tool for MongoDB performance.",

  how: [
    "Step 1 — Append .explain() to any find/aggregate query",
    "Step 2 — Use .explain('executionStats') for detailed timing info",
    "Step 3 — Check 'winningPlan.stage': IXSCAN = good, COLLSCAN = bad",
    "Step 4 — Compare 'totalDocsExamined' vs 'nReturned' — ideally equal",
    "Step 5 — Check 'executionTimeMillis' for actual speed",
  ],

  diagram: `
graph TD
    Query["find({email: '...'})"] --> Explain[".explain('executionStats')"]
    Explain --> Plan{winningPlan.stage?}
    Plan -- "IXSCAN" --> Good["✅ Fast — Index used"]
    Plan -- "COLLSCAN" --> Bad["❌ Slow — Full scan"]
    Bad --> Fix["Create Index!"]
  `,

  analogy:
    "explain() is like getting an X-Ray of your query. From the outside, you just see the result. But the X-Ray shows you the bones — which path the database took, where it's stressed, and what's broken. Doctors (developers) use this to diagnose and fix performance issues.",

  code: `
// Basic explain
db.users.find({ email: "ali@test.com" }).explain();

// Detailed execution stats
db.users.find({ email: "ali@test.com" }).explain("executionStats");
// Key fields to check:
// - executionStats.executionTimeMillis → How long
// - executionStats.totalDocsExamined → How many docs scanned
// - executionStats.nReturned → How many docs returned
// - winningPlan.stage → IXSCAN or COLLSCAN

// Aggregation explain
db.orders.explain("executionStats").aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$category", total: { $sum: "$amount" } } }
]);

// Ideal result: totalDocsExamined ≈ nReturned (both small)
// Bad result: totalDocsExamined = 500000, nReturned = 3
  `,

  commonMistake: [
    "Never using explain() and assuming queries are fast. Always verify with explain() in development before going to production.",
    "Only checking .explain() without 'executionStats'. The default verbosity doesn't show timing or document counts — always use explain('executionStats').",
    "Ignoring 'rejectedPlans'. Sometimes MongoDB chooses a suboptimal plan. Check if the rejected plan would have been better.",
  ],

  interviewSummary:
    "explain() reveals the query execution plan. Key indicators: IXSCAN = indexed (fast), COLLSCAN = full scan (slow). The ratio of totalDocsExamined to nReturned should be as close to 1:1 as possible. Use explain('executionStats') for complete performance data.",

  interviewQA: [
    {
      q: "What's the ideal ratio of docsExamined to nReturned?",
      a: "Ideally 1:1. If you examine 1000 docs but return only 1, that means 999 docs were scanned unnecessarily — a sign of a missing or poorly designed index.",
    },
    {
      q: "What are the three verbosity levels of explain()?",
      a: "'queryPlanner' (default) — shows the chosen plan. 'executionStats' — adds timing and document counts. 'allPlansExecution' — shows stats for all candidate plans, not just the winner.",
    },
  ],
};
