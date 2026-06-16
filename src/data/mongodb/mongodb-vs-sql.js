export const mongodbVsSql = {
  id: "mongodb-vs-sql",
  title: "MongoDB vs SQL — Which to Choose?",
  category: "MongoDB",
  difficulty: "Beginner",
  tags: ["NoSQL", "SQL", "Relational", "Database Comparison", "Architecture", "Schema"],

  definition:
    "SQL (Relational) databases use structured tables with fixed rows and columns. MongoDB (NoSQL) is a non-relational database that stores data in flexible, JSON-like documents. The choice between them depends on the data structure, consistency requirements, and scalability needs of the application.",

  simpleExplanation:
    "SQL is like a 'Book Library' where every book must have a title, author, and ISBN in a specific place. MongoDB is like a 'Filing Cabinet' where you can throw in notes, pictures, and letters. SQL is great if your data structure is rigid and complex (like a bank), while MongoDB is better if your data structure is always changing (like a blog or social media app).",

  romanUrduRevision:
    "SQL databases (jaise MySQL) traditional tarike se table aur columns use karte hain. MongoDB NoSQL hai, is mein JSON style data hota hai. SQL mein pehle se structure banana parta hai (Schema), lekin MongoDB mein aap change bohot asani se kar sakte hain. SQL relationship ke liye acha hai, MongoDB speed aur flexibility ke liye.",

  realLifeExample:
    "Social Media App: Imagine a post can have text, or an image, or a video, or all three. In SQL, you'd need many joined tables. In MongoDB, you just save one 'Post' document with whatever fields are needed. This makes development much faster.",

  why: "Productivity and Scaling. MongoDB's 'Dynamic Schema' means you spend less time writing SQL migrations and more time building features. It also handles huge traffic better through 'Sharding' (splitting data across servers), whereas SQL is usually limited to one big server.",

  how: [
    "Step 1 - Use SQL if your data is highly structured and needs strict ACID transactions (e.g., Banking).",
    "Step 2 - Use MongoDB if you need to handle massive volumes of diverse data quickly (e.g., IoT, Big Data).",
    "Step 3 - SQL uses 'Join' queries; MongoDB uses 'Aggregation' or 'Embedded Documents'.",
    "Step 4 - SQL is 'Vertical Scaling' (more RAM/CPU); MongoDB is 'Horizontal Scaling' (more Servers).",
  ],

  diagram: `
| Feature | SQL (Relational) | MongoDB (NoSQL) |
|---------|------------------|-----------------|
| Model   | Tables / Rows    | Collections / Documents |
| Schema  | Fixed / Rigid    | Dynamic / Flexible |
| Joins   | Native (JOIN)    | Handled via $lookup / Embedding |
| Scaling | Vertical (up)    | Horizontal (out) |
| ACID    | Strict           | Supported (since 4.0) |
  `,

  analogy:
    "SQL is a 'Uniform' (everyone must wear the same size and style). MongoDB is 'Casual Wear' (everyone wears what fits them best). Uniforms look very organized, but Casual Wear is easier to get ready in the morning.",

  code: `
// --- SQL Logic (Requires Tables) ---
// SELECT * FROM users JOIN orders ON users.id = orders.user_id;

// --- MongoDB Logic (Single Document) ---
{
  "_id": "user123",
  "name": "Noman",
  "orders": [
    { "item": "Laptop", "price": 1200 },
    { "item": "Mouse", "price": 25 }
  ]
}
// Data is nested (Embedded), so no JOIN needed!
  `,

  commonMistake: [
    "Thinking MongoDB can't do relationships. It can, using references or embedding. You just have to choose the right way.",
    "Using MongoDB when your data is 100% rigid. If your data never changes structure, SQL might be more efficient for storage.",
    "Over-using embedding. If you put too many things inside one document, it can hit the 16MB limit and become slow to read.",
    "Ignoring Transactions in MongoDB. People think NoSQL has no consistency, but MongoDB has supported multi-document ACID transactions since version 4.0.",
  ],

  interviewSummary:
    "SQL provides a structured, relational model with strict schemas, ideal for complex data integrity. MongoDB offers a flexible, document-based model that excels in agility and horizontal scaling. Choosing between them depends on the specific use case and data velocity.",

  interviewQA: [
    {
      q: "When should I use MongoDB over SQL?",
      a: "When you have a flexible schema, need high availability, need to scale horizontally, or are working with hierarchical data like JSON.",
    },
    {
      q: "Does MongoDB support ACID transactions?",
      a: "Yes, since version 4.0, MongoDB supports multi-document ACID transactions, making it suitable for many financial and mission-critical applications.",
    },
  ],
};
