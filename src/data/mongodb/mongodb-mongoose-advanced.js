export const mongodbMongooseAdvanced = {
  id: "mongodb-mongoose-advanced",
  title: "Mongoose — Validation, Hooks & Virtuals",
  category: "MongoDB",
  difficulty: "Intermediate",
  tags: ["Mongoose", "Validation", "Middleware", "Pre Hooks", "Post Hooks", "Virtuals", "Business Logic"],

  definition:
    "Mongoose Advanced Features allow you to automate business logic inside your schemas. 'Validation' ensures data integrity, 'Middleware' (Hooks) are functions that run before or after database operations (like hash passwords before saving), and 'Virtuals' are properties that can be get and set but are not stored in MongoDB.",

  simpleExplanation:
    "Imagine a smart car. 'Validation' is the sensor that won't let you close the trunk if something is in the way. 'Middleware' is the automatic lock that clicks as soon as you start driving (before the action). 'Virtuals' are like the dashboard showing your 'Speed in Miles' even though the car only measures 'Rotations of the wheels'. These features make your data logic cleaner and more automatic.",

  romanUrduRevision:
    "Mongoose validation se hum data rules set karte hain (jaise email format). 'Middleware' (Hooks) bohot important hain, jaise password save karne se pehle use 'hash' karna ($pre save hook$). 'Virtuals' woh fields hoti hain jo database mein store nahi hoti lekin code mein asani se mil jati hain (jaise 'firstName' aur 'lastName' ko mila kar 'fullName' banana).",

  realLifeExample:
    "Password Hashing: When a user signs up, you don't want to save their plain text password. You use a Mongoose 'pre-save' hook to automatically hash the password using bcrypt right before it enters the database. No matter where in your app you call '.save()', the password will always be hashed safely.",

  why: "Decoupling Logic and Security. By putting validation and security logic (like hashing or auto-slug generation) directly in the Schema, you don't have to repeat that code in every Express controller. This 'Fat Models, Skinny Controllers' approach makes your app much easier to maintain and test.",

  how: [
    "Step 1 - Add 'validate' functions to schema paths for custom logic.",
    "Step 2 - Use '.pre()' for hooks that run before an action (save, find, update).",
    "Step 3 - Use '.post()' for hooks that run after an action (logging, cleanup).",
    "Step 4 - Define '.virtual()' getters to derive data from existing fields.",
    "Step 5 - Use 'toJSON: { virtuals: true }' if you want virtuals to appear in API responses.",
  ],

  diagram: `
graph TD
    Data[Input Data] --> V[Validation Engine]
    V -- "Pass" --> Pre["Pre-Save Hook (e.g. Hash Password)"]
    Pre --> Save["Save to MongoDB"]
    Save --> Post["Post-Save Hook (e.g. Send Welcome Email)"]
    Post --> Result[Action Complete]
    subgraph VirtualsLayer [Virtuals]
      V1[Full Name] -- "Reads" --> F[First Name]
      V1 -- "Reads" --> L[Last Name]
    end
  `,

  analogy:
    "It's like an 'Automatic Factory Line'. Validation is the quality inspector checking for defects. Pre-save hooks are the machines painting the product before it's boxed. Post-save hooks are the shipping labels being applied after it's boxed. Virtuals are the computer display telling you how many boxes are ready.",

  code: `
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  password: { type: String, required: true }
});

// 1. Virtual (Combining data on the fly)
userSchema.virtual('fullName').get(function() {
  return \`\${this.firstName} \${this.lastName}\`;
});

// 2. Pre-save Hook (Security logic)
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// 3. Post-save Hook (Background tasks)
userSchema.post('save', function(doc, next) {
  console.log(\`User \${doc.email} has been saved successfully!\`);
  next();
});
  `,

  commonMistake: [
    "Using Arrow Functions in hooks or virtuals. You MUST use 'function()' so that 'this' correctly points to the document.",
    "Forgetting to call 'next()' in older versions of Mongoose hooks, which causes the operation to hang forever.",
    "Performing heavy database operations inside a 'post-find' hook, which can slow down every single lookup in your app.",
    "Thinking Virtuals are in the DB. If you try to query 'db.users.find({ fullName: \"...\" })', it will fail because fullName doesn't exist in MongoDB.",
  ],

  interviewSummary:
    "Mongoose validation, middleware, and virtuals provide a powerful framework for implementing business logic at the data layer. This ensures that rules are consistently applied across the entire application, improving security, maintainability, and data integrity.",

  interviewQA: [
    {
      q: "Why should we not use arrow functions for Mongoose virtuals?",
      a: "Arrow functions do not have their own 'this' binding. Mongoose relies on the 'this' keyword to give you access to the document's fields.",
    },
    {
      q: "What is the difference between a pre-save hook and a validator?",
      a: "A validator checks if the data is correct. A pre-save hook can modify or transform the data (like hashing a password) after it has been validated but before it is saved.",
    },
  ],
};
