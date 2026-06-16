export const expressPagination = {
  id: "express-pagination",
  title: "Pagination — Offset vs. Cursor Strategies",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Pagination", "MongoDB", "Performance", "REST API", "Scalability", "Cursor"],

  definition:
    "Pagination is the process of dividing a large dataset into discrete chunks or pages. In Express/MongoDB, this is achieved using two main strategies: Offset-based (Skip/Limit) and Cursor-based (Key-based), each with different performance implications for large-scale applications.",

  simpleExplanation:
    "If you have 10,000 photos, you can't show them all at once—it would crash the browser. Offset pagination is like saying 'Show me photos 100 to 120'. Cursor pagination is like saying 'Show me the next 20 photos AFTER the one with ID #X'. The second way is much faster because the database doesn't have to count from the very beginning every time.",

  romanUrduRevision:
    "Barray datasets ko chhote parts mein dikhane ko Pagination kehte hain. Offset method (skip/limit) simple hai par baray data mein slow ho jata hai kyunke DB ko shuru se count karna parta hai. Cursor method ID use karta hai aur hamesha fast rehta hai chahe aap page 1 par hon ya page 10,000 par.",

  realLifeExample:
    "Google Search uses Offset Pagination (Page 1, 2, 3) because users rarely go past page 5. Twitter/Instagram use Cursor Pagination for 'Infinite Scroll' so that as you scroll down, the feed stays fast and consistent even if 1,000 new tweets are posted while you're reading.",

  why: "To prevent 'System Exhaustion'. Loading 1 million records into memory will crash your Node.js process and the client's browser. Pagination ensures fixed-size payloads, predictable response times, and reduced database server load.",

  how: [
    "Step 1 - Determine the strategy based on the UI (Pages vs. Infinite Scroll).",
    "Step 2 - For Offset: Use 'skip((page-1) * limit)' and 'limit(pageSize)'.",
    "Step 3 - For Cursor: Use 'find({ _id: { $gt: lastSeenId } })' and 'limit(pageSize)'.",
    "Step 4 - Always sort the results (usually by _id or createdAt) to ensure consistency.",
    "Step 5 - Return metadata like 'hasNextPage' or 'totalCount' to the client.",
  ],

  diagram: `
graph LR
    subgraph Offset
        O1[Skip 1000] --> O2[Fetch 20]
        Note[Slow: scans first 1000]
    end
    subgraph Cursor
        C1[ID > XYZ] --> C2[Fetch 20]
        Note2[Fast: jumps to XYZ]
    end
  `,

  analogy:
    "Offset is like reading a 1000-page book and being told to start at page 500—you have to flip through 500 pages to find it. Cursor is like having a physical bookmark on page 500—you open the book directly to that spot.",

  code: `
// 1. OFFSET-BASED (Traditional)
app.get('/api/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const users = await User.find().skip(skip).limit(limit);
  res.json({ page, users });
});

// 2. CURSOR-BASED (Professional/Infinite Scroll)
app.get('/api/feed', async (req, res) => {
  const limit = 10;
  const lastId = req.query.cursor; // Last ID from previous request

  const query = lastId ? { _id: { $gt: lastId } } : {};
  
  const posts = await Post.find(query)
    .sort({ _id: 1 })
    .limit(limit);

  const nextCursor = posts.length > 0 ? posts[posts.length - 1]._id : null;
  res.json({ posts, nextCursor });
});
  `,

  commonMistakes: [
    "Using Offset pagination for real-time feeds (items can be skipped or shown twice if new data is inserted).",
    "Not indexing the fields used for sorting and filtering.",
    "Returning very large page sizes (e.g., limit=500), which defeats the purpose of pagination.",
    "Using skip() in MongoDB with large numbers (it has O(N) complexity).",
  ],

  interviewSummary:
    "Pagination is mandatory for performance. Use Offset for simple UIs with page numbers and Cursor for high-performance infinite scrolling. Cursor-based is superior for large datasets as it avoids the 'skip' performance penalty.",

  interviewQA: [
    {
      q: "Why is Cursor pagination better for Infinite Scroll?",
      a: "It provides 'Deterministic' results. If new items are added, a cursor ensures you only see items AFTER your last seen marker, avoiding duplicate entries that happen with offsets.",
    },
    {
      q: "What is the Big O complexity of skip() in MongoDB?",
      a: "It is O(N), because MongoDB has to iterate through and discard 'N' documents before returning the 'limit' results.",
    },
  ],
};

