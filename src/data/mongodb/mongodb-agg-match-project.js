export const mongodbAggMatchProject = {
  id: "mongodb-agg-match-project",
  title: "$match and $project Stages",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Aggregation", "$match", "$project", "Filter", "Reshape"],

  definition:
    "'$match' filters documents to pass only those that match specified conditions to the next stage. '$project' reshapes each document by including, excluding, renaming, or creating computed fields. Together, they are the most frequently used opening stages in any aggregation pipeline.",

  simpleExplanation:
    "$match is a Security Guard — only the right people get in. $project is a Tailor — once inside, it decides what clothes (fields) they wear. First you filter who enters ($match), then you control what information about them is visible ($project). Always filter first so the tailor has less work to do.",

  romanUrduRevision:
    "$match bilkul find() ki tarah kaam karta hai — ye documents ko filter karta hai. $project data ki shakal badalta hai — kaunse fields dikhane hain (1), kaunse chhupane hain (0), ya naye fields banana hain. Hamesha $match pehle rakhein taake kam data par kaam ho. $project mein aap fields rename bhi kar saktay hain aur calculations bhi kar saktay hain.",

  realLifeExample:
    "API Response: You want active users' names and emails only (not passwords). First, $match filters active users. Then $project selects only 'name' and 'email' fields, hiding '_id' and 'password'. The API sends clean, safe, minimal data to the frontend.",

  why: "$match placed first can use indexes and reduces the number of documents flowing through the pipeline — saving memory and CPU. $project reduces document size, saving network bandwidth when results are sent to Node.js. Together they are the foundation of every efficient pipeline.",

  how: [
    "Step 1 — Place $match as the first stage (uses indexes here)",
    "Step 2 — Use standard query operators inside $match ($gte, $in, $or, etc.)",
    "Step 3 — Use $project to include (1) or exclude (0) fields",
    "Step 4 — Create computed fields: { fullName: { $concat: ['$first', ' ', '$last'] } }",
    "Step 5 — Cannot mix inclusion (1) and exclusion (0) in $project, except for _id",
  ],

  diagram: `
graph LR
    All[1000 Docs] --> Match["$match: {active: true}"]
    Match --> Filtered[200 Docs]
    Filtered --> Project["$project: {name:1, email:1}"]
    Project --> Clean[200 Slim Docs]
  `,

  analogy:
    "$match is like a Coffee Filter — keeps the grounds out, lets only liquid through. $project is like a Photo Crop — you take the filtered photo and cut it down to show only the important part.",

  code: `
// Filter active users, return only name and computed field
db.users.aggregate([
  // Stage 1: Filter — only active users
  { $match: { status: "active", age: { $gte: 18 } } },

  // Stage 2: Reshape — select fields and create new ones
  {
    $project: {
      _id: 0,
      fullName: { $concat: ["$firstName", " ", "$lastName"] },
      email: 1,
      memberSince: "$createdAt"   // Rename field
    }
  }
]);
  `,

  commonMistake: [
    "Putting $project before $match. This removes fields that $match might need for filtering.",
    "Mixing 1 and 0 in $project (e.g., { name: 1, password: 0 }). MongoDB throws an error — choose one strategy, exception is _id: 0.",
    "Forgetting the $ prefix when referencing fields inside $project expressions (e.g., '$firstName' not 'firstName').",
  ],

  interviewSummary:
    "$match filters documents using standard query syntax and should be first to leverage indexes. $project reshapes output by including/excluding fields and creating computed fields. They are the most commonly paired stages and form the backbone of pipeline efficiency.",

  interviewQA: [
    {
      q: "Can $match use indexes?",
      a: "Yes, but only when it is the first stage or follows another $match. After stages like $group or $unwind, indexes cannot be used.",
    },
    {
      q: "What is the difference between $project and $addFields?",
      a: "$project requires you to list every field you want to keep. $addFields keeps all existing fields and only adds new ones on top.",
    },
  ],
};
