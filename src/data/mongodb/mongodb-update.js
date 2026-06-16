export const mongodbUpdate = {
  id: "mongodb-update",
  title: "CRUD — Update Operations (Atomic Operators)",
  category: "MongoDB",
  difficulty: "Intermediate",
  tags: ["MongoDB", "CRUD", "Update", "$set", "$inc", "$push", "$pull", "Atomic"],

  definition:
    "Update operations in MongoDB modify existing documents in a collection. You can update a single document using 'updateOne()' or several matching documents using 'updateMany()'. MongoDB uses 'Atomic Update Operators' to modify specific fields without replacing the entire document.",

  simpleExplanation:
    "Imagine you have a student's card and you just want to change their phone number. You don't throw away the whole card and write a new one; you just erase the old number and write the new one. This is exactly what '$set' does. If you want to increase a student's marks, you use '$inc'. Atomic operators mean that these changes happen instantly and safely, even if many people are updating at the same time.",

  romanUrduRevision:
    "Update ka matlab hai data ko change karna. 'updateOne' aik ke liye aur 'updateMany' sab matching documents ke liye. Sab se important operators hain: '$set' (value change karne ke liye), '$inc' (number barhane ke liye), aur '$push' (array mein naya item dalne ke liye). Is se poora document replace nahi hota, sirf wohi field change hoti hai jo aap chahte hain.",

  realLifeExample:
    "Social Media Likes: When someone clicks 'Like' on your photo, the backend doesn't download your whole post, change the number, and re-upload it. It just runs a fast 'update' using '$inc: { likes: 1 }'. This ensures that even if 100 people like it at the same second, the count remains accurate.",

  why: "Efficiency and Consistency. Updating only specific fields saves network bandwidth and CPU time. Using atomic operators like '$inc' or '$push' prevents 'Race Conditions' (where two updates overwrite each other), making your application highly reliable under high traffic.",

  how: [
    "Step 1 - Use 'db.collection.updateOne({ filter }, { $set: { ... } })'.",
    "Step 2 - Use '$set' to update or add a new field.",
    "Step 3 - Use '$inc' to increment/decrement numeric values.",
    "Step 4 - Use '$push' to add items to an array and '$pull' to remove them.",
    "Step 5 - Use 'upsert: true' to create a new document if no match is found for the filter.",
  ],

  diagram: `
graph TD
    API[Update Request] -- "$set: { status: 'paid' }" --> MDB[MongoDB Server]
    MDB -- "Locate Document" --> Doc["{ id: 1, status: 'pending' }"]
    Doc -- "Update Field Only" --> NewDoc["{ id: 1, status: 'paid' }"]
    MDB -- "{ modifiedCount: 1 }" --> API
    subgraph ArrayOps [Array Operations]
       P1["$push (Add)"]
       P2["$pull (Remove)"]
       P3["$addToSet (Add Unique)"]
    end
  `,

  analogy:
    "It's like 'Patching a Bike Tire'. You don't buy a new bike (Replace) or even a new tire. You just find the specific hole (Filter) and put a small patch on it (Update Operator). The rest of the bike stays exactly the same.",

  code: `
// 1. Basic Update (Change one field)
db.users.updateOne(
  { email: "noman@example.com" }, 
  { $set: { status: "verified", age: 29 } }
);

// 2. Incrementing a value (Followers + 1)
db.users.updateMany(
  { popular: true },
  { $inc: { followers: 1 } }
);

// 3. Array Update (Add a new tag)
db.users.updateOne(
  { username: "js_dev" },
  { $push: { tags: "MongoDB Expert" } }
);

// 4. Removing from Array
db.users.updateOne(
  { username: "js_dev" },
  { $pull: { tags: "Junior" } }
);

// 5. Upsert (Update or Create if missing)
db.settings.updateOne(
  { userId: 123 },
  { $set: { theme: "dark" } },
  { upsert: true }
);
  `,

  commonMistake: [
    "Forgetting the update operator (like '$set'). If you run 'db.users.updateOne({id:1}, {name:\"Ali\"})', MongoDB will REPLACe the entire document, losing all other fields like email and password!",
    "Using '$push' when you only want unique items. Use '$addToSet' instead to prevent duplicate entries in an array.",
    "Updating the wrong documents with 'updateMany' because of a weak filter (e.g., updating all users instead of just active ones).",
    "Trying to increment a field that is a String instead of a Number.",
  ],

  interviewSummary:
    "Updates in MongoDB are driven by atomic operators like $set, $inc, $push, and $pull. These operators allow for efficient, in-place modifications. The 'upsert' option provides a powerful way to handle 'update-or-create' logic with a single command.",

  interviewQA: [
    {
      q: "What is the difference between updateOne and updateMany?",
      a: "updateOne only modifies the FIRST document that matches the filter. updateMany modifies ALL documents that match the filter.",
    },
    {
      q: "What does the '$set' operator do?",
      a: "It replaces the value of a field with a specified value. If the field does not exist, $set will create it.",
    },
  ],
};
