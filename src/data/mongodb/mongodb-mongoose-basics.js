export const mongodbMongooseBasics = {
  id: "mongodb-mongoose-basics",
  title: "Mongoose ODM — Connection, Schemas & Models",
  category: "MongoDB",
  difficulty: "Beginner",
  tags: ["Mongoose", "ODM", "MongoDB", "Schemas", "Models", "Connection", "Middleware"],

  definition:
    "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, and business logic hooks (middleware).",

  simpleExplanation:
    "Think of MongoDB as a wild, lawless land where you can store anything anywhere. Mongoose is like a 'Police Officer' that brings law and order. It allows you to define a 'Schema' (a set of rules) that says, 'Every user MUST have a name, and that name MUST be a string.' It makes communicating between your Express app and MongoDB much easier and safer.",

  romanUrduRevision:
    "Mongoose aik ODM library hai jo Node.js aur MongoDB ke darmiyan aik bridge ka kaam karti hai. Iska sab se bara faida 'Schema' hai, jo database mein data insert karne se pehle check karta hai ke data sahi format mein hai ya nahi. Is mein connections handle karna aur complex queries likhna bohot asan ho jata hai.",

  realLifeExample:
    "Form Validation: When a user signs up on your site, Mongoose checks if the email they entered is actually a valid email string and if the password is long enough. If the rules aren't met, Mongoose blocks the save and sends an error back to your Express server automatically.",

  why: "Consistency and Productivity. Without Mongoose, you'd have to write manual validation code for every single database operation. Mongoose handles data types (String, Number, Date), enforces required fields, and provides powerful methods like '.populate()' to handle relationships effortlessly.",

  how: [
    "Step 1 - Install Mongoose ('npm install mongoose').",
    "Step 2 - Connect to the database using 'mongoose.connect(uri)'.",
    "Step 3 - Define a 'Schema' (The Blueprint).",
    "Step 4 - Create a 'Model' using the schema (The Interface).",
    "Step 5 - Use model methods (find, save, update) to interact with the collection.",
  ],

  diagram: `
graph TD
    App[Express App] -- "Uses" --> Mod[Mongoose Model]
    Mod -- "Validates with" --> Sch[Mongoose Schema]
    Sch -- "Rules: String, Required, etc." --> DB[(MongoDB)]
    subgraph MongooseLayers [Mongoose Internal]
      C[Connection Manager]
      V[Validation Engine]
      Q[Query Builder]
    end
  `,

  analogy:
    "Mongoose is like a 'Cookie Cutter'. The raw dough is your data (flexible and messy). The cookie cutter (Schema) ensures that every cookie (Document) you bake has the exact same shape and size before it goes into the oven (Database).",

  code: `
const mongoose = require('mongoose');

// 1. Connection
mongoose.connect('mongodb://localhost:27017/myApp')
  .then(() => console.log('Connected to DB!'))
  .catch(err => console.error('Connection Failed', err));

// 2. Define Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, unique: true, lowercase: true },
  age: { type: Number, min: 18 },
  createdAt: { type: Date, default: Date.now }
});

// 3. Create Model
const User = mongoose.model('User', userSchema);

// 4. Usage
const newUser = new User({ name: 'Noman', email: 'N@N.com', age: 25 });
await newUser.save(); // Validates and Saves
  `,

  commonMistake: [
    "Thinking Mongoose is 'The Database'. It's not; it's just a tool to TALK to the database.",
    "Forgetting that MongoDB is 'NoSQL'. Even if Mongoose enforces a schema, MongoDB itself remains flexible.",
    "Not handling connection errors properly, leading to the app crashing if the database is down.",
    "Using 'var' or global variables for models; always export models from their own files for better organization.",
  ],

  interviewSummary:
    "Mongoose is the industry standard ODM for Node.js. It simplifies MongoDB interactions by adding a schema layer, providing rich validation, and abstracting complex query logic into intuitive methods. It is the 'M' in the MERN stack.",

  interviewQA: [
    {
      q: "What is the difference between a Schema and a Model?",
      a: "A Schema is the 'definition' or blueprint of the data structure. A Model is a 'class' constructed from the schema that you use to actually perform CRUD operations.",
    },
    {
      q: "Does Mongoose provide primary keys?",
      a: "No, but it automatically includes the MongoDB '_id' (ObjectID) in every schema by default, which acts as the unique primary key.",
    },
  ],
};
