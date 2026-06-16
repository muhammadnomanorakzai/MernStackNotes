export const mongodbRelOneToOne = {
  id: "mongodb-rel-one-to-one",
  title: "1:1 Relationships — Modeling Singular Links",
  category: "MongoDB",
  difficulty: "Intermediate",
  tags: ["MongoDB", "Relationships", "One-to-One", "Embedding", "Referencing", "Database Design"],

  definition:
    "A One-to-One (1:1) relationship occurs when a document in one collection is associated with exactly one document in another collection. In MongoDB, these are most commonly modeled using 'Embedding' for better performance, but 'Referencing' is used if the data is sensitive or large.",

  simpleExplanation:
    "Imagine a person and their Passport. One person has exactly one passport, and one passport belongs to exactly one person. This is a 1:1 relationship. In MongoDB, you can just put the passport details directly inside the Person's file (Embedding), or you can keep the passport in a separate safe and just put a 'note' with its ID in the Person's file (Referencing).",

  romanUrduRevision:
    "1:1 relationship tab hota hai jab aik record sirf aik doosre record se connected ho (jaise User aur uska Profile Settings). MongoDB mein isay handle karne ke 2 tareeqay hain: Aik toh ye ke data ko usi document mein 'Embed' kar lo (preferred), aur doosra ye ke alag collection bana kar 'Reference' ID de do.",

  realLifeExample:
    "User Account and Security Settings: Every user has exactly one set of security settings (2FA, recovery email). Since these are small and always accessed together when the user logs in, we embed them in the User document.",

  why: "Performance and Data Isolation. 1:1 relationships are usually embedded because it's faster to fetch a single document. However, we use Referencing if we want to 'Hide' sensitive data (like payment details) from a standard User query, or if one part of the data is rarely updated and very large.",

  how: [
    "Step 1 - Determine if the two entities are always used together.",
    "Step 2 - If YES: Use 'Embedding'. Just add the second object as a field in the first schema.",
    "Step 3 - If NO (or if sensitive): Use 'Referencing'. Store an 'ObjectId' in one and the actual data in the other.",
    "Step 4 - Use 'unique: true' on the reference field to ensure it stays a 1:1 relationship.",
  ],

  diagram: `
graph LR
    subgraph Method1 [1:1 Embedding]
        U1["User: { name: 'Ali', settings: { lang: 'ur' } }"]
    end
    subgraph Method2 [1:1 Referencing]
        U2["User: { name: 'Sara', profileId: 505 }"] -- unique ref --> P["Profile: { id: 505, bio: 'Dev' }"]
    end
  `,

  analogy:
    "It's like your 'Brain' (Embedded) vs your 'Smartphone' (Referenced). Your brain is physically inside you and always with you. Your smartphone is a separate object that belongs only to you, but you can leave it at home if you don't need it right now.",

  code: `
// --- OPTION 1: EMBEDDING (Better Performance) ---
const userSchema = new Schema({
  username: String,
  settings: {
    theme: String,
    notifications: Boolean
  } 
});

// --- OPTION 2: REFERENCING (Better Security/Isolation) ---
const userSchema = new Schema({
  username: String,
  accountInfo: {
    type: Schema.Types.ObjectId,
    ref: 'AccountInfo',
    unique: true // Important for 1:1
  }
});
  `,

  commonMistake: [
    "Using referencing for tiny data that is always needed (causes unnecessary extra DB calls).",
    "Forgetting the 'unique: true' index on a referenced 1:1 ID, which allows the database to accidentally link two users to the same profile.",
    "Not using 'Required' fields properly, leading to 'Ghost' relationships where a user exists but their 1:1 partner is missing.",
  ],

  interviewSummary:
    "1:1 relationships in MongoDB are usually implemented via embedding for efficiency. Referencing is reserved for cases involving sensitive data, data that is rarely accessed, or when the combined document size would be too large.",

  interviewQA: [
    {
      q: "When would you split a 1:1 relationship into separate collections?",
      a: "When a portion of the data is sensitive (security/PII), very large (hitting the 16MB limit), or used in a performance-critical query where the extra data would slow down the memory scan.",
    },
    {
      q: "How do you enforce a 1:1 relationship in Mongoose?",
      a: "By adding 'unique: true' to the ObjectId reference field in the schema.",
    },
  ],
};
