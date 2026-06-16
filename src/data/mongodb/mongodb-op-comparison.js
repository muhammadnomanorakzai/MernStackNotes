export const mongodbOpComparison = {
  id: "mongodb-op-comparison",
  title: "Comparison Operators — $gt, $lt, $in & more",
  category: "MongoDB",
  difficulty: "Intermediate",
  tags: ["MongoDB", "Operators", "Comparison", "Querying", "$gt", "$in", "Filtering"],

  definition:
    "Comparison operators are used in MongoDB queries to compare the value of a field against a specified value or a list of values. Common operators include '$eq' (equals), '$ne' (not equals), '$gt' (greater than), '$lt' (less than), '$in' (in an array), and '$nin' (not in an array).",

  simpleExplanation:
    "Imagine you are a security guard at a club. You use rules to decide who gets in. '$gt: 18' means 'only people taller (older) than 18'. '$in: ['VIP', 'Staff']' means 'only people who have a VIP or Staff badge'. Comparison operators are these rules for your data. They tell MongoDB exactly which documents to pick out and which ones to ignore.",

  romanUrduRevision:
    "Comparison operators data ko filter karne ke liye use hote hain. '$gt' (greater than) aur '$lt' (less than) numbers ke liye best hain. '$in' tab use hota hai jab aap ne aik se zyada possible values check karni hon (jaise category: ['electronics', 'mobile']). '$ne' ka matlab hai 'not equal to', yani us value ke ilawa sab dikhao.",

  realLifeExample:
    "Price Range Filter: On an Amazon-like site, when you set the price range from $500 to $1000, the backend runs a query like: '{ price: { $gte: 500, $lte: 1000 } }'. If you select 'Apple' and 'Samsung' brands, it uses: '{ brand: { $in: ['Apple', 'Samsung'] } }'.",

  why: "Precision and Business Logic. Every real-world app needs complex filtering—showing only available stock, filtering by date, or finding users in a specific age group. These operators allow you to perform these calculations on the database side, which is much faster than doing it in your JavaScript code.",

  how: [
    "Step 1 - Determine the field you want to filter (e.g., 'age' or 'category').",
    "Step 2 - Choose the operator: '$gt', '$lt', '$in', etc.",
    "Step 3 - Place the operator inside an object for that field: '{ price: { $lt: 200 } }'.",
    "Step 4 - Combine them for ranges: '{ age: { $gte: 18, $lte: 60 } }'.",
    "Step 5 - Use '$in' for matching any value in a provided array.",
  ],

  diagram: `
graph LR
    Input[Data Query] -- "{ stock: { $lt: 5 } }" --> MDB[MongoDB Engine]
    MDB -- "Finds Docs" --> Result["Count: 3 Docs"]
    subgraph Operators [Comparison Operators]
      E["$eq / $ne"]
      G["$gt / $gte"]
      L["$lt / $lte"]
      I["$in / $nin"]
    end
  `,

  analogy:
    "It's like 'Filtering a Spreadsheet'. In Excel, you click the little arrow on a column and select 'Greater than 50'. Comparison operators are the code version of those Excel filters; they help you find exactly what you need in a sea of data.",

  code: `
// 1. Basic equality (Implicit $eq)
db.products.find({ category: "Laptops" });

// 2. Greater than ($gt) and Less than ($lt)
db.products.find({ 
  price: { $gt: 500, $lt: 2000 } 
});

// 3. In a list ($in) - Matches any value in array
db.users.find({ 
  role: { $in: ["admin", "moderator"] } 
});

// 4. Not in a list ($nin)
db.users.find({ 
  status: { $nin: ["banned", "deleted"] } 
});

// 5. Not equal to ($ne)
db.inventory.find({ 
  qty: { $ne: 0 } 
});
  `,

  commonMistake: [
    "Using '$in' with a single value instead of an array (e.g. {role: {$in: 'admin'}} is wrong; use ['admin']).",
    "Trying to use '$gt' on a String field that looks like a number (e.g. '100' > '20'). In Strings, '20' is actually bigger than '100' alphabetically!",
    "Thinking '$in' is the same as matching an entire array. '$in' matches if ANY element in the DB field matches any element in your query array.",
    "Forgetting that MongoDB queries are case-sensitive by default (unless using Collation or Regex).",
  ],

  interviewSummary:
    "Comparison operators are the fundamental building blocks of MongoDB queries. They allow developers to filter documents based on range, equality, and set inclusion, enabling complex data retrieval with high efficiency.",

  interviewQA: [
    {
      q: "What is the difference between $in and $all?",
      a: "$in matches if AT LEAST ONE value from the query array matches the document field. $all matches only if ALL values from the query array are present in the document field (usually used for arrays).",
    },
    {
      q: "Does { age: 25 } perform differently than { age: { $eq: 25 } }?",
      a: "No, they are functionally identical. The first is just a shorthand syntax for the explicit $eq operator.",
    },
  ],
};
