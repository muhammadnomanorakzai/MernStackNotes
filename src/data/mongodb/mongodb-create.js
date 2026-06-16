export const mongodbCreate = {
  id: "mongodb-create",
  title: "CRUD — Create Operations (Insert)",
  category: "MongoDB",
  difficulty: "Beginner",
  tags: ["MongoDB", "CRUD", "Create", "insertOne", "insertMany", "Write Concern"],

  definition:
    "Create operations in MongoDB are used to add new documents to a collection. The primary methods used for this are 'insertOne()' for a single document and 'insertMany()' for multiple documents. If the collection does not exist, MongoDB creates it automatically upon the first insertion.",

  simpleExplanation:
    "Imagine you are adding a new student's record into a physical file folder. 'insertOne()' is like putting one paper in. 'insertMany()' is like taking a stack of papers and putting them all in at once. One cool thing about MongoDB is that you don't need to create the folder (Collection) first; just 'put the paper in', and MongoDB will build the folder for you.",

  romanUrduRevision:
    "Aap 'insertOne' aik document ke liye use karte hain aur 'insertMany' aik list (array) ke liye. MongoDB khud ba khud har document ko aik unique '_id' de deta hai. Agar collection pehle se nahi bani hui, toh woh insert ke waqt khud hi ban jayegi. Bohat simple aur fast hai.",

  realLifeExample:
    "E-Commerce Product Entry: When a seller adds a 'New Smartphone' to their store, the backend uses 'insertOne({})' to save the product details. If they use a bulk-upload CSV to add 50 products at once, the backend uses 'insertMany([])'.",

  why: "Productivity and Performance. These methods allow you to save whole JavaScript objects directly into the database without mapping each field manually. 'insertMany' is particularly efficient because it performs many insertions in a single network round-trip, significantly speeding up bulk operations.",

  how: [
    "Step 1 - Use 'db.collection.insertOne({ ... })' for one document.",
    "Step 2 - Use 'db.collection.insertMany([ { ... }, { ... } ])' for an array of docs.",
    "Step 3 - Both methods return an object containing 'insertedId' or 'insertedIds'.",
    "Step 4 - You can optionally set 'ordered: false' in insertMany so that if one fails, others still continue.",
    "Step 5 - Use 'writeConcern' to control how many servers must confirm the save for extra safety.",
  ],

  diagram: `
graph LR
    API[Express / Node.js] -- "{ name: 'Item A' }" --> MDB[MongoDB Server]
    MDB -- "Assigns _id" --> Doc["Document in Collection"]
    MDB -- "{ acknowledged: true, insertedId: ... }" --> API
  `,

  analogy:
    "It's like 'Stocking a Grocery Shelf'. You can put one can of milk on the shelf (insertOne) or you can take a whole box of milk cans and slide them all onto the shelf in one go (insertMany).",

  code: `
// 1. Inserting a single document
db.users.insertOne({
  name: "Noman Orakzai",
  role: "Senior Instructor",
  active: true
});

// 2. Inserting multiple documents (Array)
db.products.insertMany([
  { title: "Keyboard", price: 30, stock: 100 },
  { title: "Monitor", price: 200, stock: 15 },
  { title: "Mouse", price: 15, stock: 500 }
], { ordered: false }); // Continue remaining even if one fails

// Output from insertOne:
// { "acknowledged": true, "insertedId": ObjectId("60ca...") }
  `,

  commonMistake: [
    "Passing a single object to 'insertMany' (it MUST be an array of objects).",
    "Manually generating '_id' incorrectly. It's usually best to let MongoDB handle it to ensure worldwide uniqueness.",
    "Not handling errors during bulk inserts. If one document fails in an 'ordered' insert, the entire operation stops midway.",
    "Trying to 'Insert' into a non-existent database. (Actually, MongoDB is smart and will create it for you, but beginners often panic thinking they need to run a 'CREATE DATABASE' command first).",
  ],

  interviewSummary:
    "Creation in MongoDB is handled via insertOne and insertMany. These operations are atomic at the single-document level and return the generated IDs. They are designed for speed and flexibility, requiring no pre-defined table structure.",

  interviewQA: [
    {
      q: "What happens if I don't provide an '_id' field?",
      a: "MongoDB will automatically generate a unique 12-byte ObjectId and add it to the document before saving it.",
    },
    {
      q: "What is the benefit of using 'ordered: false' in insertMany?",
      a: "It tells MongoDB to continue processing the remaining documents in the array even if some of them fail (due to duplicate keys, etc.), improving performance for bulk imports.",
    },
  ],
};
