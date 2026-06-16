export const mongodbDataModeling = {
  id: "mongodb-data-modeling",
  title: "Schema Design — Embedding vs Referencing",
  category: "MongoDB",
  difficulty: "Intermediate",
  tags: ["MongoDB", "Data Modeling", "Embedding", "Referencing", "Normalization", "Denormalization", "Schema Design"],

  definition:
    "Data modeling in MongoDB involves deciding how to structure your documents. The two main patterns are 'Embedding' (putting related data inside a single document) and 'Referencing' (storing related data in separate collections and linking them via IDs). This choice impacts performance, consistency, and scalability.",

  simpleExplanation:
    "Imagine you are organizing a picnic. 'Embedding' is like putting the napkins, plates, and forks inside the picnic basket (one big document). Everything is together move. 'Referencing' is like putting the plates in one bag and the forks in another (separate collections). For small things like napkins, embedding is great. But if you have 1000 forks, the basket will get too heavy (Document Size Limit), so you must use separate bags (Referencing).",

  romanUrduRevision:
    "MongoDB mein data model karne ke 2 tareeqay hain. 'Embedding' ka matlab hai ke related data ko aik hi document ke andar rakhna ($Denormalization$). Is se reading fast ho jati hai. 'Referencing' ka matlab hai data ko alag collections mein rakhna aur ID se connect karna ($Normalization$). Agar data bohot zayada barhne wala ho toh referencing behtar hai.",

  realLifeExample:
    "User Profile and Addresses: A user usually has only 1 or 2 addresses. We should 'Embed' the addresses directly in the User document. But if a user makes 5,000 orders over 5 years, we should 'Reference' the orders in a separate collection, or else the User document will become massive and slow.",

  why: "Read vs Write Performance. Embedding allows you to get all related data in a single database read, making your app feel incredibly fast. Referencing prevents documents from hitting the 16MB limit and avoids data duplication, making it easier to update information in one place without inconsistencies.",

  how: [
    "Step 1 - Use Embedding for 'One-to-Few' relationships (e.g., tags, sub-settings).",
    "Step 2 - Use Referencing for 'One-to-Many' or 'Many-to-Many' (e.g., products in an order).",
    "Step 3 - Embed data that is frequently read together and rarely changes.",
    "Step 4 - Reference data that grows infinitely or is shared between multiple entities.",
    "Step 5 - Use Mongoose '.populate()' to easily fetch referenced data during queries.",
  ],

  diagram: `
graph TD
    subgraph Embedding [Denormalized: Embedding]
        U1["User Document"]
        U1 --- A1["Address: { city: 'Karachi' }"]
        U1 --- A2["Address: { city: 'Lahore' }"]
    end
    subgraph Referencing [Normalized: Referencing]
        U2["User Document { id: 101 }"]
        O1["Order 1 { userId: 101 }"]
        O2["Order 2 { userId: 101 }"]
        U2 -.-> O1
        U2 -.-> O2
    end
  `,

  analogy:
    "Embedding is like a 'Swiss Army Knife' (everything is attached and ready to use). Referencing is like a 'Toolbox' (you have to pick up each tool separately when you need it). The knife is faster for quick tasks, but the toolbox can hold much bigger and more specialized tools.",

  code: `
// --- EMBEDDING (Good for small, related data) ---
const userSchema = new Schema({
  name: String,
  addresses: [{
    street: String,
    city: String
  }] // EMBEDDED ARRAY
});

// --- REFERENCING (Good for large or growing data) ---
const authorSchema = new Schema({
  name: String
});

const postSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'Author' } // REFERENCE (Normalized)
});
  `,

  commonMistake: [
    "Embedding too much data, which leads to the '16MB Document Limit' error in MongoDB.",
    "Using Referencing for everything (treating MongoDB like SQL), which causes your app to be slow because it has to do many separate queries (or 'lookups').",
    "Not indexing the foreign keys (IDs) when using Referencing, making '.populate()' operations extremely slow.",
    "Denormalizing data (embedding) but forgetting to update all copies when the original data changes (Data Inconsistency).",
  ],

  interviewSummary:
    "The golden rule of MongoDB modeling is: 'Data that is accessed together should be stored together'. Use embedding for high-performance reads of small, related data. Use referencing to maintain data integrity and handle large-scale growth without hitting document size limits.",

  interviewQA: [
    {
      q: "When should I prefer Embedding over Referencing?",
      a: "When the related data follows a 'One-to-Few' relationship, is mostly read-only, and you need maximum query performance in a single round-trip.",
    },
    {
      q: "What is the 16MB limit in MongoDB?",
      a: "It is the maximum size allowed for a single BSON document. This limit exists to ensure that a single document doesn't hog too much RAM or network bandwidth during transmission.",
    },
  ],
};
