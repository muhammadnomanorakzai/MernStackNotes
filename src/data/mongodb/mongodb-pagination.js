export const mongodbPagination = {
  id: "mongodb-pagination",
  title: "Pagination — Sorting, Limiting & Skipping",
  category: "MongoDB",
  difficulty: "Intermediate",
  tags: ["MongoDB", "Pagination", "Sorting", "Skip", "Limit", "Performance", "Querying"],

  definition:
    "Pagination is the process of dividing a large dataset into smaller, manageable 'pages'. In MongoDB, this is achieved by combining three methods: 'sort()' (ordering), 'limit()' (batch size), and 'skip()' (jumping over previous results).",

  simpleExplanation:
    "Imagine you are reading a 500-page book. You don't try to read all 500 pages at once. You read 'Page 1' (10 lines), then 'Skip' those 10 lines and read the next 10 for 'Page 2'. This is how apps handle long lists like Facebook feeds or Amazon search results—they only load a 'Batch' of 10 or 20 items at a time to keep things fast.",

  romanUrduRevision:
    "Pagination ka matlab hai data ko hisso (pages) mein dikhana. 'sort' se hum order set karte hain (jaise -1 for latest). 'limit' se hum aik page par kitne item chahiye woh batate hain. 'skip' se hum purane items ko chor kar naye items par move karte hain. Zayada skip karna performance ke liye bura hai, is liye index zaroori hai.",

  realLifeExample:
    "Instagram Feed: When you scroll down, Instagram doesn't load every post ever made. It loads the first 10 posts (Limit 10). When you reach the bottom, it 'Skips' those 10 and loads the 'next' 10. This makes the scrolling feel smooth and saves battery and data.",

  why: "User Experience and Server Stability. If you have 1 million users and you try to display them all on one page, the browser will crash and your server will run out of memory. Pagination ensures that you only process a tiny amount of data at a time, keeping your app fast and responsive even as your database grows.",

  how: [
    "Step 1 - Use '.sort({ field: 1 })' (Asc) or '-1' (Desc) to set the order.",
    "Step 2 - Use '.limit(pageSize)' to set how many items per page.",
    "Step 3 - Use '.skip((pageNumber - 1) * pageSize)' to jump to the right page.",
    "Step 4 - Always sort by a unique field (like '_id' or 'createdAt') to avoid 'shuffling' errors.",
    "Step 5 - For huge datasets, use 'Cursor-based' pagination (Topic 70) instead of 'Skip'.",
  ],

  diagram: `
graph LR
    User[Page 2 Request] -- "Skip: 10, Limit: 10" --> MDB[MongoDB]
    MDB -- "Sorts by Date" --> Sorted[All Docs]
    Sorted -- "Jumps over first 10" --> P2[Doc 11 to 20]
    P2 -- "Result" --> User
    subgraph Commands [Chain Order]
      C1[sort] --> C2[skip] --> C3[limit]
    end
  `,

  analogy:
    "It's like a 'Slide Projector'. You 'Sort' the photos in order. You show only '1 slide' at a time (Limit: 1). To see the next one, you 'Skip' the current one move. Even though you have 100 slides, you only ever deal with one at a time.",

  code: `
// Configuration
const page = 2;
const pageSize = 10;

// 1. Basic Pagination (Page 2 of Users)
// Jumps over first 10, gives next 10
db.users.find()
  .sort({ createdAt: -1 }) // Newest first
  .skip((page - 1) * pageSize) // (2-1) * 10 = Skip 10
  .limit(pageSize); // Limit 10

// 2. Mongoose implementation
const getUsers = async (page, limit) => {
  return await User.find()
    .sort('-createdAt')
    .skip((page - 1) * limit)
    .limit(limit);
};
  `,

  commonMistake: [
    "Sorting by a non-indexed field. This forces MongoDB to do an 'In-Memory Sort', which crashes if the data is over 32MB.",
    "Using very large 'skip' values (e.g. Skip 100,000). MongoDB still has to scan through those 100k items just to find the start of your page, which is extremely slow.",
    "Not using limit—always set a limit to protect your server from 'Bulk Fetch' attacks or accidental massive queries.",
    "Sorting by a field where many documents have the same value (like 'age') without a second 'tie-breaker' sort like '_id'. This causes items to 'jump' between pages when the user refreshes.",
  ],

  interviewSummary:
    "Pagination is implemented in MongoDB using the sort-skip-limit pattern. While effective for small to medium datasets, skipping large numbers of documents is inefficient. For high-scale applications, cursor-based pagination (using the last seen ID) is the gold standard.",

  interviewQA: [
    {
      q: "Why is 'skip' slow for deep pagination?",
      a: "MongoDB must internally traverse and discard every document that is 'skipped'. If you skip 1 million documents, it still has to read all 1 million from the disk, even if it doesn't return them to you.",
    },
    {
      q: "What is the 32MB sort limit?",
      a: "MongoDB will refuse to sort a result set in RAM if it exceeds 32MB and no index is available to help. To fix this, you must add an index or use 'allowDiskUse' in aggregations.",
    },
  ],
};
