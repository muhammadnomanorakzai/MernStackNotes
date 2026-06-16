export const mongodbOpLogical = {
  id: "mongodb-op-logical",
  title: "Logical Operators — Combining Queries ($or, $and)",
  category: "MongoDB",
  difficulty: "Intermediate",
  tags: ["MongoDB", "Operators", "Logical", "Querying", "$or", "$and", "$not", "Complex Filtering"],

  definition:
    "Logical operators in MongoDB allow you to join multiple query conditions together. Using '$and', '$or', '$not', and '$nor', you can create sophisticated filters that check for multiple criteria simultaneously across one or more fields.",

  simpleExplanation:
    "Imagine you are hiring a developer. '$and' means they must have JS skills AND Python skills. '$or' means they can have either JS OR Python skills. '$not' means they should NOT have a specific trait (like 'isStudent: true'). These operators are the 'logic' of your search, helping you narrow down exactly who matches your requirements.",

  romanUrduRevision:
    "Logical operators multi-condition queries ke liye hote hain. '$or' tab use hota hai jab koi aik condition bhi sahi ho toh document mil jaye. '$and' tab use hota hai jab saari conditions ka sahi hona zaroori ho. '$not' kisi condition ko invert (bilkul ulat) karne ke liye use hota hai. Boolean logic ki tarah kaam karte hain.",

  realLifeExample:
    "Promotional Discount: An online store wants to show a sale banner if: (The user is a 'New Customer') OR (The cart value is greater than $500). The backend uses an '$or' query to check both conditions in one go.",

  why: "Advanced Filtering. In real apps, a single filter is rarely enough. You often need to find 'Active users who are also Admins' ($and) or 'Products that are either Red or Blue' ($or). Without these operators, you'd have to make multiple database calls and merge the results manually in Node.js, which is slow and messy.",

  how: [
    "Step 1 - Use '$or: [ { cond1 }, { cond2 } ]' for matching any condition.",
    "Step 2 - Use '$and: [ { cond1 }, { cond2 } ]' for matching every condition.",
    "Step 3 - Note: MongoDB uses 'implicit AND' by default, e.g., '{ a: 1, b: 2 }' is already an AND.",
    "Step 4 - Use '$not' to negate a specific operator, like '{ price: { $not: { $gt: 100 } } }'.",
    "Step 5 - Use '$nor' to find documents that fail ALL given conditions.",
  ],

  diagram: `
graph TD
    Query["$or Logic"]
    Query --> C1["Cond 1: price < 10"]
    Query --> C2["Cond 2: sale = true"]
    C1 -- "Match" --> Res[Included in Result]
    C2 -- "Match" --> Res
    subgraph LogicalBox [Operators List]
      A["$and (All must be true)"]
      O["$or (Any can be true)"]
      N["$not (Inverse)"]
      R["$nor (None can be true)"]
    end
  `,

  analogy:
    "It's like 'Ordering Food'. '$and' is a meal deal: 'Burger AND Fries AND Drink'. You only get it if all three are there. '$or' is a choice: 'Burger OR Pizza'. You are happy with either one. '$not' is a dietary restriction: 'NOT Spicy'.",

  code: `
// 1. Using $or (Find users who are either Admins OR have 1000+ points)
db.users.find({
  $or: [
    { role: "admin" },
    { points: { $gt: 1000 } }
  ]
});

// 2. Explicit $and (Needed when querying the same field twice)
db.products.find({
  $and: [
    { price: { $gt: 50 } },
    { price: { $lt: 200 } }
  ]
});

// 3. Using $not (Price is NOT greater than 50)
db.products.find({
  price: { $not: { $gt: 50 } }
});

// 4. Using $nor (Neither banned nor deleted)
db.users.find({
  $nor: [
    { status: "banned" },
    { status: "deleted" }
  ]
});
  `,

  commonMistake: [
    "Using '$and' unnecessarily. In MongoDB, '{ a: 1, b: 2 }' is already an 'AND'. Only use '$and' when you are targeting the same field multiple times (like a range).",
    "Forgetting the square brackets '[ ]'. Logical operators always take an array of condition objects.",
    "Nesting '$or' inside another '$or' too deeply, which makes the query very slow and hard for the database to optimize.",
    "Confusing '$not' with '$ne'. '$ne' is for a simple value ({age: {$ne: 10}}), while '$not' is used to negate other operators ({age: {$not: {$gt: 10}}}).",
  ],

  interviewSummary:
    "Logical operators allow for boolean-style query construction in MongoDB. While implicit AND is the default, explicit operators like $or and $and are essential for complex branching logic and range queries on identical fields.",

  interviewQA: [
    {
      q: "When is the $and operator explicitly required in MongoDB?",
      a: "It is required when you need to specify multiple conditions for the same field in a single query object, as standard JSON keys must be unique. For example, filtering a single 'price' field for both $gt and $lt.",
    },
    {
      q: "Does $or utilize indexes efficiently?",
      a: "Yes, MongoDB can perform index scans for each clause of an $or expression and then merge the results, provided that each field in the $or clauses has its own index.",
    },
  ],
};
