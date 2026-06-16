export const mongodbAggLookup = {
  id: "mongodb-agg-lookup",
  title: "$lookup — JOIN Between Collections",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Aggregation", "$lookup", "JOIN", "Relations"],

  definition:
    "The '$lookup' stage performs a left outer join to another collection in the same database. It adds a new array field to each input document containing the matching documents from the 'joined' collection. This is MongoDB's equivalent of SQL's LEFT JOIN.",

  simpleExplanation:
    "Imagine you have two notebooks — one with 'Orders' (orderId, userId) and another with 'Users' (userId, name, email). $lookup is like stapling the User's page to each Order page using the shared userId. Now each order has the customer's full details attached. You combined two separate notebooks into one connected document.",

  romanUrduRevision:
    "$lookup do alag collections ko jorne ke liye use hota hai. Ye SQL ke LEFT JOIN jaisa kaam karta hai. Aap batate hain ke kis collection se jorna hai (from), kaunsa field milana hai (localField aur foreignField), aur result kaunse naam se aaye (as). Result aik array ke andar aata hai, isliye aksar $unwind bhi lagana parta hai.",

  realLifeExample:
    "Order Details Page: You have 'orders' collection with productId. You want to show the product name and image on the invoice. $lookup joins the 'products' collection by productId, bringing in product details without storing them redundantly in every order.",

  why: "MongoDB is NoSQL — it doesn't have built-in JOINs like SQL. But sometimes you NEED related data from another collection. $lookup solves this without requiring you to make two separate database calls from Node.js. One aggregation query brings everything together efficiently.",

  how: [
    "Step 1 — from: Name of the collection to join with",
    "Step 2 — localField: Field from the input documents",
    "Step 3 — foreignField: Field from the 'from' collection",
    "Step 4 — as: Name of the new array field containing matched docs",
    "Step 5 — Usually follow with $unwind to flatten the array into a single object",
  ],

  diagram: `
graph TD
    Orders["Orders: {userId: 1, item: 'Book'}"] --> Lookup["$lookup from users"]
    Users["Users: {_id: 1, name: 'Ali'}"] --> Lookup
    Lookup --> Result["{item: 'Book', user: [{name: 'Ali'}]}"]
  `,

  analogy:
    "It's like a Detective connecting clues. You have a 'Crime Report' (Order) with a suspect ID. $lookup goes to the 'Suspects Database' (Users collection) and brings back the full profile of that suspect, attaching it to the original report.",

  code: `
// Join orders with user details
db.orders.aggregate([
  {
    $lookup: {
      from: "users",           // Target collection
      localField: "userId",     // Field in orders
      foreignField: "_id",      // Field in users
      as: "customerInfo"        // Output array name
    }
  },
  // Flatten the array (since we expect 1 user per order)
  { $unwind: "$customerInfo" },
  // Clean up the result
  {
    $project: {
      item: 1,
      amount: 1,
      customerName: "$customerInfo.name",
      customerEmail: "$customerInfo.email"
    }
  }
]);
  `,

  commonMistake: [
    "Forgetting that $lookup returns an ARRAY (even if there's only 1 match). You almost always need $unwind after it.",
    "Not indexing the foreignField. If 'users._id' is not indexed, the lookup scans the entire users collection for every order — extremely slow.",
    "Using $lookup on huge collections without $match first. Always filter documents before joining to reduce the number of lookups.",
  ],

  interviewSummary:
    "$lookup performs a left outer join between collections. It requires specifying from, localField, foreignField, and as. Results come as an array, typically followed by $unwind. For performance, always index the foreignField and filter with $match before the lookup stage.",

  interviewQA: [
    {
      q: "Can $lookup join collections from different databases?",
      a: "No. $lookup can only join collections within the same database.",
    },
    {
      q: "What happens if no matching document is found in the joined collection?",
      a: "The 'as' field will be an empty array []. It behaves like a LEFT JOIN — the original document is preserved even with no match.",
    },
  ],
};
