export const mongodbInterviewQa = {
  id: "mongodb-interview-qa",
  title: "MongoDB Interview Master Sheet",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Interview", "Cheat Sheet", "Revision", "Questions"],

  definition:
    "This is a comprehensive Interview Master Sheet covering the most frequently asked MongoDB interview questions across all difficulty levels. It consolidates key concepts from CRUD, Schema Design, Aggregation, Indexing, Transactions, Replication, and Sharding into a rapid-revision format.",

  simpleExplanation:
    "Think of this as your 'Last Night Before Exam' notes. All the important MongoDB concepts, compressed into one page. Read this before any interview and you'll have answers ready for 90% of the questions they can throw at you.",

  romanUrduRevision:
    "Ye aapka interview se pehle ka 'Quick Revision' page hai. Sab se zyada puchay jane walay MongoDB ke sawalat yahan hain. Har topic — CRUD, Schema Design, Indexing, Aggregation, Transactions, Replication, aur Sharding — ka summary aur important Q&A yahan compiled hai. Interview se 1 ghanta pehle ye parh lein.",

  realLifeExample:
    "Job Interview: The interviewer asks 'Explain the difference between embedding and referencing in MongoDB'. You recall from this master sheet: 'Embedding puts related data in one document (fast reads), Referencing stores ObjectIds and requires population (normalized, less duplication)'. You nail the answer.",

  why: "Interviews move fast. You don't have time to recall theory from 20 different files. This master sheet is a single point of reference with concise, confident answers. It covers both theoretical concepts and practical coding patterns that interviewers love.",

  how: [
    "Step 1 — Read through all Q&A pairs below",
    "Step 2 — Practice explaining each concept in your own words",
    "Step 3 — Code the examples by hand (whiteboard practice)",
    "Step 4 — Focus on 'WHY' — interviewers care about reasoning, not just definitions",
    "Step 5 — Review this sheet 1 hour before any MongoDB interview",
  ],

  diagram: `
graph TD
    Interview[MongoDB Interview] --> T1[CRUD & Schema Design]
    Interview --> T2[Aggregation Pipeline]
    Interview --> T3[Indexing & Performance]
    Interview --> T4[Transactions & Replication]
    Interview --> T5[Sharding & Atlas]
  `,

  analogy:
    "This Master Sheet is like a 'Cheat Code Menu' in a video game. Each cheat code (Q&A) unlocks a level (interview topic) instantly. You don't need to grind through hours of theory — just memorize the codes.",

  code: `
// RAPID-FIRE: Key MongoDB Commands Every Dev Must Know

// Schema with Validation
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 18 }
});

// CRUD
db.users.insertOne({ name: "Ali" });
db.users.find({ age: { $gte: 18 } });
db.users.updateOne({ _id: id }, { $set: { name: "Ahmed" } });
db.users.deleteOne({ _id: id });

// Aggregation
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$category", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $limit: 5 }
]);

// Index
db.users.createIndex({ email: 1 }, { unique: true });
db.users.find({ email: "..." }).explain("executionStats");

// Transaction
const session = await mongoose.startSession();
session.startTransaction();
// ... operations ...
await session.commitTransaction();
  `,

  commonMistake: [
    "Memorizing definitions without understanding 'Why'. Interviewers test reasoning, not textbook answers.",
    "Ignoring performance topics. 70% of senior-level MongoDB questions are about indexing, explain(), and aggregation optimization.",
    "Not practicing code. Many interviews include live coding — practice writing aggregation pipelines and Mongoose schemas by hand.",
  ],

  interviewSummary:
    "MongoDB interviews cover: CRUD operations, Schema Design (embed vs reference), Aggregation Pipeline stages, Indexing (types, ESR, explain), Transactions (ACID), Replication (failover), Sharding (horizontal scaling), and Mongoose (populate, middleware, virtuals). Focus on WHY behind each concept.",

  interviewQA: [
    {
      q: "When would you embed vs reference in MongoDB?",
      a: "Embed when data is read together, rarely changes independently, and the sub-document is small. Reference when data changes often, is shared across documents, or is very large.",
    },
    {
      q: "Explain the aggregation pipeline in one sentence.",
      a: "A series of stages that transform documents step by step — filtering ($match), grouping ($group), joining ($lookup), reshaping ($project), and sorting ($sort) — to produce analytics and reports.",
    },
    {
      q: "What is the difference between IXSCAN and COLLSCAN?",
      a: "IXSCAN uses an index to find documents efficiently. COLLSCAN reads every document in the collection. Always aim for IXSCAN.",
    },
    {
      q: "How does Horizontal Scaling differ from Vertical Scaling?",
      a: "Vertical = Bigger server (more RAM/CPU). Horizontal (Sharding) = More servers. Vertical has a ceiling; Horizontal scales infinitely.",
    },
    {
      q: "What is ACID in the context of MongoDB transactions?",
      a: "Atomicity (all or nothing), Consistency (data rules respected), Isolation (concurrent transactions don't interfere), Durability (committed data survives crashes).",
    },
    {
      q: "How does populate() work in Mongoose?",
      a: "It replaces an ObjectId field with the full document from the referenced collection. Requires 'ref' in schema. For large data, $lookup in aggregation is faster.",
    },
  ],
};
