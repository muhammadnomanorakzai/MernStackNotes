export const mongodbBasics = {
  id: "mongodb-basics",
  title: "What is MongoDB & How it Works",
  category: "MongoDB",
  difficulty: "Beginner",
  tags: ["MongoDB", "NoSQL", "BSON", "Document Model", "Collections", "Database"],

  definition:
    "MongoDB is a source-available, cross-platform, document-oriented database program. Classified as a NoSQL database, MongoDB uses JSON-like documents with optional schemas (BSON). It is designed for scalability, flexibility, and high performance in modern web applications.",

  simpleExplanation:
    "Imagine a traditional database like an Excel sheet (Rows and Columns). MongoDB is different—it's like a 'Folder full of Digital Files'. Each file (Document) is a JSON object. You can have different information in each file, and you don't need to define every column beforehand. This 'Document Model' makes it very easy to store complex data that changes over time.",

  romanUrduRevision:
    "MongoDB aik NoSQL database hai jo data ko 'Documents' (JSON style) mein store karta hai. Is mein Excel ki tarah rigid tables nahi hote, balke 'Collections' hoti hain jin mein 'Documents' rakhe jate hain. Ye fast hai, scalable hai, aur MERN stack ka bohot important hissa hai.",

  realLifeExample:
    "User Profiles: On a social media site, one user might have their 'Bio' and 'Website', while another user might only have their 'Phone Number'. In MongoDB, we can store both users in the same 'Users' collection without forcing the second user to have empty fields for Bio and Website.",

  why: "Flexibility and Speed. Since MongoDB uses BSON (Binary JSON), it maps perfectly to JavaScript objects in your MERN app. You don't have to write complex 'JOIN' queries like in SQL. It also scales horizontally, meaning you can handle millions of users easily by adding more servers.",

  how: [
    "Step 1 - Data is stored in 'Documents' (Key-Value pairs).",
    "Step 2 - Related documents are grouped into 'Collections' (like folders).",
    "Step 3 - Multiple collections make up a 'Database'.",
    "Step 4 - MongoDB uses 'BSON' (Binary JSON) internally for speed and extra data types (like Date and Decimal).",
    "Step 5 - Every document gets a unique '_id' (ObjectID) automatically.",
  ],

  diagram: `
graph TD
    DB[Database: MyStore]
    DB --> C1[Collection: Users]
    DB --> C2[Collection: Products]
    C1 --> D1["Doc: { name: 'Ali', age: 25 }"]
    C1 --> D2["Doc: { name: 'Sara', email: 's@s.com' }"]
    C2 --> D3["Doc: { title: 'Laptop', price: 1000 }"]
    subgraph DocumentStructure [Inside a Document]
      K1[Key: name] -- "Value" --> V1["Ali"]
      K2[Key: _id] -- "Special" --> V2["ObjectId('...')"]
    end
  `,

  analogy:
    "It's like a 'Dresser with Drawers'. A traditional SQL DB is like a suit hanger—everything must be a specific shape to fit. MongoDB is like a drawer where you can toss in socks, shirts, or even a hat. As long as it's in the drawer (Collection), you can find it later, even if the items are different shapes.",

  code: `
// Example of a MongoDB Document (represented as JSON)
{
  "_id": ObjectId("60d5ec42c5f1c2bca0"), // Unique Identifier
  "username": "noman_orakzai",
  "email": "noman@example.com",
  "age": 28,
  "address": {
    "city": "Peshawar",
    "zip": 25000
  },
  "tags": ["developer", "mern-expert"],
  "createdAt": ISODate("2023-06-25T10:00:00Z")
}

// BSON vs JSON
// JSON only supports: String, Number, Boolean, Array, Object, Null
// BSON adds: ObjectId, Date, Binary Data, Decimal128, etc.
  `,

  commonMistake: [
    "Thinking MongoDB has NO schema. While it's flexible, you should still use 'Mongoose schemas' to keep your data clean.",
    "Using huge documents. A single MongoDB document is limited to 16MB. If you exceed this, you need a better data model (like GridFS).",
    "Not understanding BSON. Forgetting that '_id' is an ObjectId, not a simple string, which causes errors during lookups.",
    "Treating MongoDB exactly like SQL (e.g., trying to do 10-way joins, which is slow in NoSQL).",
  ],

  interviewSummary:
    "MongoDB is a document-oriented NoSQL database. It stores data in BSON format, grouped into collections. Its main advantages are schema flexibility, high performance for read/write operations, and ease of horizontal scaling.",

  interviewQA: [
    {
      q: "What is BSON?",
      a: "BSON stands for Binary JSON. It is the storage format used by MongoDB. It is faster to parse than JSON and supports additional data types like Date and ObjectID.",
    },
    {
      q: "What is a 'Collection' in MongoDB?",
      a: "A collection is a grouping of MongoDB documents. It is the equivalent of a 'Table' in relational databases (SQL).",
    },
  ],
};
