export const mongodbRead = {
  id: "mongodb-read",
  title: "CRUD — Read Operations (Querying)",
  category: "MongoDB",
  difficulty: "Beginner",
  tags: ["MongoDB", "CRUD", "Read", "find", "findOne", "Query Operators", "Filtering"],

  definition:
    "Read operations in MongoDB are used to retrieve documents from a collection. The primary methods are 'find()'—which returns a cursor pointing to all matching documents—and 'findOne()', which returns the first document that matches the query criteria.",

  simpleExplanation:
    "Imagine you are looking for a specific book in a library. 'findOne()' is like saying, 'Find me the first book titled Harry Potter and bring it to me.' 'find()' is like saying, 'Show me ALL the books written by J.K. Rowling.' You can use filters (Query Operators) to be very specific, like 'Find me all books cheaper than $20 ($lt: 20).'",

  romanUrduRevision:
    "Read ka matlab hai database se data nikalna. 'find' sab ke liye aur 'findOne' sirf pehle match honay walay document ke liye use hota hai. Hum criteria de sakte hain jaise ke '{ age: 25 }'. MongoDB mein filter karne ke liye operators like '$gt' (greater than) aur '$in' kaafi useful hote hain.",

  realLifeExample:
    "Search Bar: When a user types 'iPhone' in a search bar, the backend runs 'db.products.find({ name: /iPhone/i })'. If a user clicks on a product to see its details, the backend runs 'db.products.findOne({ _id: productId })'.",

  why: "Precision and Flexibility. Reading is the most frequent operation in any app. MongoDB allows you to query deep inside nested objects and arrays easily. Its 'Query Operators' make it very powerful for building complex filters (like price ranges or category selections) with minimal code.",

  how: [
    "Step 1 - Use 'db.collection.find({ criteria })' to get multiple items.",
    "Step 2 - Use 'db.collection.findOne({ id })' to get one specific item.",
    "Step 3 - Use Comparison Operators: '$gt' (>), '$lt' (<), '$gte' (>=), '$lte' (<=), '$ne' (!=).",
    "Step 4 - Use Logical Operators: '$and', '$or', '$not', '$nor'.",
    "Step 5 - Chain '.limit(n)', '.skip(n)', and '.sort({ field: 1 })' to the 'find()' cursor.",
  ],

  diagram: `
graph LR
    API[Backend Query] -- "{ price: { $gt: 500 } }" --> MDB[MongoDB Engine]
    MDB -- "Scans Index/Collection" --> Result[Matching Docs]
    Result -- "Returns Cursor/JSON" --> API
    subgraph Operators [Common Filters]
      O1["$eq (Equals)"]
      O2["$in (In Array)"]
      O3["$regex (Pattern)"]
    end
  `,

  analogy:
    "It's like 'Filtering on an E-commerce site'. You select 'Brand: Apple' and 'Price: Under $1000'. The website sends a query to MongoDB using these filters, and MongoDB only hands back the products that fit both descriptions.",

  code: `
// 1. Find all active users
db.users.find({ status: "active" });

// 2. Find one user by ID
db.users.findOne({ _id: ObjectId("60ca...") });

// 3. Complex Query: Users older than 18 but younger than 30
db.users.find({ 
  age: { $gt: 18, $lt: 30 } 
});

// 4. Using $in (Match any in list)
db.products.find({ 
  category: { $in: ["Electronics", "Gadgets"] } 
});

// 5. Sorting and Limiting
db.orders.find()
  .sort({ createdAt: -1 }) // Newest first
  .limit(10); // Page 1
  `,

  commonMistake: [
    "Forgetting that 'find()' returns a CURSOR, not an array. If you are using the Node.js driver, you must call '.toArray()' or use a loop.",
    "Using '$eq' for every single match. Actually, '{ name: \"Ali\" }' is exactly the same as '{ name: { $eq: \"Ali\" } }'. Keep it simple!",
    "Querying for an ObjectID but passing it as a simple string. You MUST wrap it in 'ObjectId()' or it won't match.",
    "Not using Indexes for frequent read queries, which makes the whole database slow as it grows.",
  ],

  interviewSummary:
    "Reading in MongoDB is performant and expressive. 'find' and 'findOne' are the core methods, supported by a rich set of comparison and logical operators. Use cursors for large datasets and indexes for optimized lookup speeds.",

  interviewQA: [
    {
      q: "What is a 'Cursor' in MongoDB?",
      a: "A cursor is a pointer to the result set of a query. It allows the server to send small chunks of data at a time instead of loading the entire result into memory at once.",
    },
    {
      q: "How do you find documents where a field 'tags' contains the value 'MERN'?",
      a: "You can simply use '{ tags: \"MERN\" }'. MongoDB is smart enough to look inside an array and see if any element matches.",
    },
  ],
};
