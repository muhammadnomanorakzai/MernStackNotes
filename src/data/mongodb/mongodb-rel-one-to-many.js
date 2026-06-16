export const mongodbRelOneToMany = {
  id: "mongodb-rel-one-to-many",
  title: "1:N Relationships — Modeling Hierarchies",
  category: "MongoDB",
  difficulty: "Intermediate",
  tags: ["MongoDB", "Relationships", "One-to-Many", "Normalization", "Denormalization", "Parent-Child"],

  definition:
    "A One-to-Many (1:N) relationship occurs when a parent document is associated with multiple child documents. This is the most common relationship type in web apps. In MongoDB, these are modeled using 'Array Embedding' for small collections or 'Parent Referencing' for large/infinite collections.",

  simpleExplanation:
    "Imagine a YouTube Channel and its Videos. One channel has many videos. This is 1:N. In MongoDB, if the channel has only 10 videos, you could just list the video titles inside the Channel document (Embedding). But if the channel has 10,000 videos, the Channel file will get way too big! Instead, you give each Video its own file and put a 'note' (Reference) in each one saying which channel it belongs to.",

  romanUrduRevision:
    "1:N relationship mein aik 'Parent' ke bohot saare 'Children' hote hain (jaise aik Author ke bohot saare Posts). Agar children thore hain (1:Few), toh unhein parent mein 'Embed' karlo. Agar children unlimited hain (1:Many), toh 'Parent Referencing' use karo, yani har child document mein parent ki ID rakho. Ye scaling ke liye zaroori hai.",

  realLifeExample:
    "Blog Posts and Comments: A single blog post might have 500 comments. We should NOT embed all comments inside the post because many comments with text, author, and dates will eventually hit the 16MB limit. Instead, we store comments in a separate 'Comments' collection and link them back to the 'PostId'.",

  why: "Scalability and Flexibility. One-to-Many relationships can grow very large (e.g., millions of logs for one app). Parent Referencing allows you to scale to any number of children without worrying about document size limits. Array Embedding is reserved only for data that stays consistently small.",

  how: [
    "Step 1 - Determine the scale: One-to-Few (Embed) vs One-to-Many (Reference).",
    "Step 2 - For 'One-to-Few': Use an array of sub-documents inside the parent.",
    "Step 3 - For 'One-to-Many': Store the parent's ObjectId in every child document.",
    "Step 4 - For 'One-to-Squillions' (huge): Always use Parent Referencing.",
    "Step 5 - Use '.populate()' in Mongoose to bring them back together in a query.",
  ],

  diagram: `
graph TD
    subgraph DataModeling [1:N Modeling]
        P1["Parent: Author { id: 1 }"]
        C1["Child: Post { authorId: 1 }"]
        C2["Child: Post { authorId: 1 }"]
        C3["Child: Post { authorId: 1 }"]
        P1 -.-> C1
        P1 -.-> C2
        P1 -.-> C3
    end
    subgraph SmallExample [1:Few - Embedding]
        User["User: { name: 'Ali', phoneNumbers: ['0300...', '0333...'] }"]
    end
  `,

  analogy:
    "Embedding is like a 'Mother Kangaroo' carrying her babies in a pouch. She always has them with her, but she can only fit a few. Referencing is like a 'School Teacher' and students. The teacher doesn't carry the students; the students exist separately, and each one knows who their teacher is.",

  code: `
// --- OPTION 1: PARENT REFERENCING (Scalable) ---
const postSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'Author' } // Link to parent
});

// --- OPTION 2: CHILDREN REFERENCING (Good for moderate lists) ---
const authorSchema = new Schema({
  name: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }] // List of child IDs
});

// --- OPTION 3: EMBEDDING (Only for "One-to-Few") ---
const userSchema = new Schema({
  name: String,
  shippingAddresses: [{ street: String, zip: Number }] // Nested
});
  `,

  commonMistake: [
    "Embedding an ever-growing list (like notifications) inside a user document until it's too big to load.",
    "Using 'Children Referencing' (array of IDs) for thousands of records. MongoDB has to load the whole array just to find one ID, which is slow.",
    "Not creating an INDEX on the parent ID in the child collection, making your '.find({ parentId })' queries extremely slow.",
    "Data Duplication: Storing a child's name in both the array and the child document and forgetting to update both.",
  ],

  interviewSummary:
    "The primary choice in 1:N modeling is Parent vs Child referencing. Use Parent Referencing (ID in child) for high-growth collections. Array Embedding should only be used when the number of related documents is guaranteed to stay small (under a few dozen).",

  interviewQA: [
    {
      q: "When would you prefer Parent Referencing over Child Referencing?",
      a: "When the 'Many' side is expected to grow indefinitely (e.g., logs, comments). This prevents the parent document from growing too large and ensures query performance remains stable.",
    },
    {
      q: "What is 'Two-Way Referencing'?",
      a: "It's when you store IDs on both sides (Parent has child IDs, and Child has parent ID). This makes querying faster in both directions but is harder to maintain because you have two places to update.",
    },
  ],
};
