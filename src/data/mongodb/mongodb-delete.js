export const mongodbDelete = {
  id: "mongodb-delete",
  title: "CRUD — Delete Operations (Removal)",
  category: "MongoDB",
  difficulty: "Beginner",
  tags: ["MongoDB", "CRUD", "Delete", "deleteOne", "deleteMany", "Data Safety", "Data Persistence"],

  definition:
    "Delete operations in MongoDB allow you to remove documents from a collection. You can use 'deleteOne()' to remove the first document that matches a filter, or 'deleteMany()' to remove all documents that meet the specified criteria.",

  simpleExplanation:
    "Imagine you are cleaning your desk. 'deleteOne()' is like picking up one specific piece of trash and throwing it away. 'deleteMany()' is like sweeping everything into a trash can at once. Be very careful with 'deleteMany()'—if you don't give it a filter, it will empty the entire folder (Collection)! In most professional apps, we often use 'Soft Delete' (just hiding the data) instead of 'Hard Delete' (actually removing it).",

  romanUrduRevision:
    "Delete ka matlab hai data ko database se hamesha ke liye khatam karna. 'deleteOne' sirf aik document delete karta hai, aur 'deleteMany' sab matching documents ko target karta hai. Agar aap query empty chor dain '{ }', toh puri collection khali ho jayegi. Is liye delete query likhte waqt hamesha confirm karna chahiye.",

  realLifeExample:
    "Account Deletion: When a user clicks 'Delete my Account', the backend runs 'db.users.deleteOne({ _id: userId })'. If a moderator wants to delete all 'Spam' comments from a post, they use 'db.comments.deleteMany({ postId: id, type: \"spam\" })'.",

  why: "Resource Management and Privacy. Over time, databases accumulate useless or outdated data that slows down queries. Deleting this data keeps the database small and fast. It's also vital for privacy laws (like GDPR), where users have the 'Right to be Forgotten' and their data must be removed upon request.",

  how: [
    "Step 1 - Use 'db.collection.deleteOne({ filter })' for a single document.",
    "Step 2 - Use 'db.collection.deleteMany({ filter })' for multiple documents.",
    "Step 3 - Pass an empty object '{ }' to delete ALL documents in a collection (CAUTION!).",
    "Step 4 - Both methods return a 'deletedCount' showing how many items were removed.",
    "Step 5 - Use 'db.collection.drop()' if you want to delete the ENTIRE collection and its indexes.",
  ],

  diagram: `
graph LR
    API[Delete Request] -- "{ status: 'inactive' }" --> MDB[MongoDB Server]
    MDB -- "Filters Collection" --> Match["[Doc A, Doc B, Doc C]"]
    Match -- "Physical Removal" --> Trash["Storage Freed"]
    MDB -- "{ acknowledged: true, deletedCount: 3 }" --> API
  `,

  analogy:
    "It's like 'Unsubscribing from a Newsletter'. One click (deleteOne) removes your email from their list. If they close the whole company, they delete the whole list (deleteMany). Once it's gone, it's gone—so you better be sure!",

  code: `
// 1. Delete a single document (The first one it finds)
db.users.deleteOne({ email: "noman@example.com" });

// 2. Delete all inactive users
db.users.deleteMany({ status: "inactive" });

// 3. Delete all orders from a specific date
db.orders.deleteMany({ 
  createdAt: { $lt: ISODate("2022-01-01T00:00:00Z") } 
});

// 4. Checking the result
const result = db.products.deleteMany({ stock: 0 });
console.log(\`Removed \${result.deletedCount} out of stock products\`);

// 5. Deleting an entire collection (Nuclear Option)
db.logs.drop();
  `,

  commonMistake: [
    "Running 'deleteMany' without a filter (or with an empty filter), which wipes out all data in that collection.",
    "Confusing 'deleteOne' with 'deleteMany'. If you mean to delete all comments but use 'deleteOne', only the first one will be removed.",
    "Not verifying the 'deletedCount'. Sometimes you think you deleted something, but if the filter was wrong, 0 items were deleted.",
    "Hard Deleting data that might still be needed for 'foreign keys' in other collections (e.g., deleting a User while they still have Orders).",
  ],

  interviewSummary:
    "Deletion in MongoDB is straightforward but permanent. Use deleteOne for specific targets and deleteMany for bulk removal. Always ensure filters are precise to avoid accidental data loss. For production, consider 'Soft Deletes' by using a 'deletedAt' field instead of physical removal.",

  interviewQA: [
    {
      q: "What is the difference between 'deleteMany()' and 'drop()'?",
      a: "deleteMany removes the documents but keeps the collection and its indexes intact. drop() removes the entire collection, its indexes, and metadata from the database completely.",
    },
    {
      q: "How can I undo a delete operation in MongoDB?",
      a: "You can't. Once a document is deleted, it is gone. You would need to restore it from a database backup (snapshot).",
    },
  ],
};
