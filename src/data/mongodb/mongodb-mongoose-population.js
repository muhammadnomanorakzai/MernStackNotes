export const mongodbMongoosePopulation = {
  id: "mongodb-mongoose-population",
  title: "Mongoose — Population (ref, populate)",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Mongoose", "populate", "ref", "Relations", "Virtual Populate"],

  definition:
    "Population is Mongoose's method for automatically replacing specified paths in a document with documents from other collections. It lets you store a reference (ObjectId) in one document and automatically 'fill in' the full data from the referenced collection, similar to a JOIN in SQL.",

  simpleExplanation:
    "Imagine an Order document that stores only the userId (like a phone number). When you need to display the order, you want the user's actual name and email. 'populate()' is like calling that phone number and getting the person's full profile. You stored a tiny reference, but Mongoose fetches the complete data for you on demand.",

  romanUrduRevision:
    "Mongoose mein hum har jagah poora data nahi rakhte. Order mein sirf userId rakhte hain (as ObjectId). Jab data chahiye toh '.populate(\"userId\")' use karte hain aur Mongoose khud se Users collection se us user ka poora data utha lata hai — jaise naam, email, etc. Is ke liye schema mein 'ref' lagana parta hai: { type: Schema.Types.ObjectId, ref: 'User' }.",

  realLifeExample:
    "Blog Post: Each post stores 'author: ObjectId'. When loading the post for the frontend, you call '.populate(\"author\", \"name avatar\")'. Instead of showing a random ID, the API returns { author: { name: 'Ali', avatar: 'pic.jpg' } }. Clean, readable data without manual lookups.",

  why: "Without populate, you'd have to make 2 separate database calls: (1) Get the order, (2) Get the user by the ID in the order. With populate, Mongoose does both in one step. It keeps your schema normalized (no data duplication) while making data retrieval simple and clean.",

  how: [
    "Step 1 — In schema, define a ref: { userId: { type: Schema.Types.ObjectId, ref: 'User' } }",
    "Step 2 — Query with .populate('userId')",
    "Step 3 — Select specific fields: .populate('userId', 'name email')",
    "Step 4 — Nested populate: .populate({ path: 'author', populate: { path: 'address' } })",
    "Step 5 — Virtual populate for reverse relationships (one-to-many without storing IDs)",
  ],

  diagram: `
graph LR
    Order["{userId: ObjectId('abc')}"] -- ".populate('userId')" --> Result["{userId: {name: 'Ali', email: '...'}}"]
    Users["Users Collection"] --> Result
  `,

  analogy:
    "ref + populate is like a 'Hyperlink' in a web page. The blog post only stores a link (ObjectId) to the author. When you click the link (populate), the full author profile loads automatically. Without populate, you just see a meaningless URL (ID).",

  code: `
// 1. Schema with ref
const orderSchema = new Schema({
  product: String,
  amount: Number,
  customer: { type: Schema.Types.ObjectId, ref: "User" }
});
const Order = model("Order", orderSchema);

// 2. Basic populate
const orders = await Order.find()
  .populate("customer");          // Replaces ObjectId with full User doc

// 3. Select specific fields only
const orders = await Order.find()
  .populate("customer", "name email -_id"); // Only name and email

// 4. Multi-path populate
const posts = await Post.find()
  .populate("author", "name")
  .populate("comments");

// 5. Nested populate
const posts = await Post.find()
  .populate({
    path: "author",
    populate: { path: "department" }  // Author → Department
  });

// 6. Virtual Populate (reverse relationship)
userSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "customer"
});
const user = await User.findById(id).populate("orders");
  `,

  commonMistake: [
    "Forgetting 'ref' in the schema. Without ref, populate() doesn't know which collection to look in.",
    "Using populate on thousands of documents — it creates one query per unique reference. For large datasets, consider $lookup in aggregation instead.",
    "Circular populate (Author → Posts → Author → Posts...). Always set maxDepth or select specific fields to avoid infinite loops.",
    "Not handling null references. If the referenced document was deleted, populate returns null. Always check for this in your code.",
  ],

  interviewSummary:
    "Mongoose populate() replaces ObjectId references with actual document data. It requires 'ref' in the schema definition. For performance, select only needed fields. For large-scale data, aggregation $lookup is more efficient than populate because it runs in a single database operation.",

  interviewQA: [
    {
      q: "What is the difference between populate() and $lookup?",
      a: "populate() is a Mongoose convenience method that runs multiple queries under the hood. $lookup is a MongoDB aggregation stage that runs as a single operation on the server. $lookup is faster for large datasets.",
    },
    {
      q: "What is Virtual Populate?",
      a: "It creates a virtual field that simulates a relationship without storing any IDs. For example, a User can have a virtual 'orders' field that finds all Orders where 'customer' matches the User's _id — no array of order IDs stored on the User.",
    },
  ],
};
