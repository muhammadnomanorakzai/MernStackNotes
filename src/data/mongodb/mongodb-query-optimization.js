export const mongodbQueryOptimization = {
  id: "mongodb-query-optimization",
  title: "Query Optimization — Performance Tips",
  category: "MongoDB",
  difficulty: "Intermediate",
  tags: ["MongoDB", "Performance", "Optimization", "Indexing", "Explain Plan", "Cursors", "Best Practices"],

  definition:
    "Query optimization is the practice of tuning your database queries to run as fast as possible while consuming the least amount of server resources. It involves smart use of indexes, selective projections, and avoiding expensive collection scans that slow down the entire system.",

  simpleExplanation:
    "Imagine searching for a doctor's number in a phone book. If you have an alphabetized list (Index), you find it in 5 seconds. If the pages are randomly scattered (No Index), you have to check every single page (Collection Scan). Optimization means making sure your database always has the right 'Indexes' and that you aren't asking for more data than you actually need.",

  romanUrduRevision:
    "Optimization ka maqsad database ko fast banana hai. Sab se barra rule: 'Hamesha Index use karein'. Agar index nahi hoga toh MongoDB poori collection scan karega ($COLLSCAN$) jo ke bohot slow hai. Sirf zaroori fields mangwayein (Projection) aur unnecessary regular expressions se bachein. '.explain()' command se aap check kar sakte hain ke query slow kyun hai.",

  realLifeExample:
    "E-commerce Search: When a user searches for 'Nike Shoes', if the 'name' field isn't indexed, MongoDB will check every single item in the store (maybe 1 million items). With an index, it jumps straight to the Nike section and finishes in 1 millisecond.",

  why: "Cost and Scaling. Slow queries eat up your CPU and RAM, making your server lag for everyone. If you optimize, you can handle 10x more users on the same cheap server. Optimization also ensures a smooth UI where users don't have to wait for 'Loading...' spinners every time they click a button.",

  how: [
    "Step 1 - Use '.explain(\"executionStats\")' to see if your query is using an index.",
    "Step 2 - Create indexes on fields that appear frequently in '.find()' filters.",
    "Step 3 - Use Projection to limit returned fields (Topic 114).",
    "Step 4 - Avoid '$regex' queries starting with a wildcard (e.g., /.*abc/). These can't use indexes efficiently.",
    "Step 5 - Use 'limit()' so the database stops searching once it finds enough matches.",
  ],

  diagram: `
graph TD
    Query[Query: { email: '...' }] --> Plan[Query Planner]
    Plan -- "Has Index?" --> Yes[IXSCAN: Very Fast]
    Plan -- "No Index?" --> No[COLLSCAN: Very Slow]
    Yes --> Res[Document Found]
    No --> Res
    subgraph Tips [Fast Tips]
      T1[Use Indexes]
      T2[Use Projection]
      T3[Avoid Negation $ne]
    end
  `,

  analogy:
    "Optimization is like 'Using a Map' vs 'Driving Randomly'. Without a map (Indexes), you eventually find the destination, but you waste a lot of gas (CPU) and time. Using a map gets you there instantly using the shortest path possible.",

  code: `
// 1. Checking Performance (Explain Plan)
db.users.find({ email: "ali@test.com" }).explain("executionStats");
// Look for "stage": "IXSCAN" (Success) vs "COLLSCAN" (Failure)

// 2. The Power of Indexing
// Before: find() takes 500ms
db.users.createIndex({ email: 1 });
// After: find() takes 1ms

// 3. Selective Projection (Optimization Principle)
// Don't do: db.users.find({ age: 25 })
// Do: 
db.users.find({ age: 25 }, { name: 1, email: 1 });

// 4. Avoiding Regex Wildcards (Optimization Tip)
// Bad: { name: /.*noman/ } (Scans everything)
// Good: { name: /^noman/ } (Uses index for start-of-string)
  `,

  commonMistake: [
    "Indexing every single field. Each index slows down 'inserts' and 'updates' because the index must be updated too. Only index what you actually query.",
    "Using '$or' queries on non-indexed fields. This can be much slower than an '$in' query.",
    "Assuming Mongoose handles optimization for you. Mongoose is just a wrapper; you still need to define indexes and write efficient queries.",
    "Not using 'Limit' for search results—always assume the worst case where a query might find 100k records.",
  ],

  interviewSummary:
    "Query optimization in MongoDB centers around efficient index utilization and reducing resource footprint. Developers should regularly use the 'explain' tool to identify performance bottlenecks and follow best practices such as prefix-matching regex and selective projection to ensure low latency.",

  interviewQA: [
    {
      q: "What is a 'Collection Scan' (COLLSCAN)?",
      a: "It occurs when MongoDB has to search through every document in a collection to satisfy a query because no suitable index was found. This is inefficient for large datasets.",
    },
    {
      q: "How does 'covered query' improve performance?",
      a: "A covered query is one where all the fields in the query AND all fields in the projection are part of the same index. MongoDB doesn't even need to look at the documents on disk; it gets all the info from the index alone.",
    },
  ],
};
