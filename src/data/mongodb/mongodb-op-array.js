export const mongodbOpArray = {
  id: "mongodb-op-array",
  title: "Array Operators — $all, $elemMatch & $size",
  category: "MongoDB",
  difficulty: "Intermediate",
  tags: ["MongoDB", "Operators", "Array", "Querying", "$elemMatch", "$all", "$size", "BSON"],

  definition:
    "Array operators in MongoDB are specialized query filters designed to work with documents that contain array fields. They allow you to find documents where arrays contain specific elements ($all), match complex objects within the array ($elemMatch), or have a specific length ($size).",

  simpleExplanation:
    "Normally, if you search an array in MongoDB, it checks if ANY one item matches. But sometimes you need to be stricter. '$all' is like saying, 'The student must have passed BOTH Math and English.' '$elemMatch' is like saying, 'Find me a student who has A Grade in a course that was also Very Difficult.' '$size' is like saying, 'Find me a team with exactly 5 players.'",

  romanUrduRevision:
    "Arrays ke andar data search karne ke liye special operators chahiye hotay hain. '$all' tab use hota hai jab saare items ka hona zaroori ho. '$elemMatch' sab se powerful hai, ye tab use hota hai jab aik hi array item ke andar multiple conditions check karni hon. '$size' array ki length check karne ke liye kaam aata hai.",

  realLifeExample:
    "Shopping Cart Filter: A user wants to find orders where they bought both a 'Laptop' AND a 'Mouse'. We use '$all: ['Laptop', 'Mouse']'. If we want to find orders where ANY product was 'Electronics' and priced over $1000, we use '$elemMatch'.",

  why: "Handling Complex Data. Modern apps use arrays for tags, categories, friend lists, and order items. If you just used simple filters, you might get 'False Positives' (matching one rule in the first array item and another rule in the second item). '$elemMatch' ensures the rules are met by the SAME item, making your search accurate.",

  how: [
    "Step 1 - Use '{ tags: { $all: ['A', 'B'] } }' to find documents having both tags.",
    "Step 2 - Use '{ items: { $size: 3 } }' to find arrays with exactly 3 items.",
    "Step 3 - Use '$elemMatch' when matching multiple criteria in an array of objects.",
    "Step 4 - Use 'dot notation' (e.g., 'tags.0') to target a specific index in an array.",
    "Step 5 - Remember: '$size' cannot be used for 'greater than' queries (use an index check or aggregation for that).",
  ],

  diagram: `
graph TD
    ArrayData["Array: [ {id:1, color:'red'}, {id:2, color:'blue'} ]"]
    Query["$elemMatch: { id:1, color:'red' }"]
    Query -- "Checks each item" --> Match{Found?}
    Match -- "Yes" --> Result[Document Returned]
    Match -- "No" --> Fail[Document Ignored]
    subgraph OpsList [Array Operators]
      S1["$all (Contains all)"]
      S2["$elemMatch (Nested match)"]
      S3["$size (Exact length)"]
    end
  `,

  analogy:
    "It's like 'Hiring a Specialist'. If you need a 'Doctor who speaks Urdu', you use '$elemMatch'. If you just searched for 'Doctor' and 'Urdu', you might find a hospital that has a Doctor (who speaks English) and a Janitor (who speaks Urdu). You need both traits in the SAME person!",

  code: `
// 1. Using $all (Must have both tags)
db.users.find({ 
  skills: { $all: ["Node.js", "MongoDB"] } 
});

// 2. Using $size (Exact array length)
db.teams.find({ 
  members: { $size: 5 } 
});

// 3. Using $elemMatch (Crucial for Arrays of Objects)
// Find students who have a grade > 90 in Math
db.students.find({
  grades: {
    $elemMatch: { subject: "Math", score: { $gt: 90 } }
  }
});

// 4. Dot Notation (Match first element)
db.users.find({ "comments.0.text": "First!" });
  `,

  commonMistake: [
    "Not using '$elemMatch' when querying multiple fields in an array of objects. Without it, MongoDB matches one field in doc A and the other in doc B, which is usually a bug.",
    "Trying to use '$size: { $gt: 5 }'. The '$size' operator only accepts a specific number. For 'greater than', you have to check if index 5 exists.",
    "Overusing arrays for data that should be in a separate collection. If an array has 5,000 items, array operators will become very slow.",
    "Forgetting that '$all' order doesn't matter (['A', 'B'] is same as ['B', 'A']).",
  ],

  interviewSummary:
    "Array operators like $all, $elemMatch, and $size enable precise querying of multi-valued fields. $elemMatch is particularly vital for querying arrays of sub-documents, ensuring that multiple criteria are satisfied by a single array element rather than across different ones.",

  interviewQA: [
    {
      q: "What is the difference between querying '{ tags: \"A\" }' and '{ tags: { $all: [\"A\"] } }' on an array field?",
      a: "Functionally they are identical for a single value. Both will scan the array and return the document if 'A' is present.",
    },
    {
      q: "How would you find documents where an array has more than 3 elements?",
      a: "Since $size only supports exact matches, you use the dot notation to check if the 4th element (index 3) exists: '{ \"myArray.3\": { $exists: true } }'.",
    },
  ],
};
