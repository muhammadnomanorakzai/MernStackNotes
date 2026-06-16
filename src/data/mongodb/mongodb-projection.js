export const mongodbProjection = {
  id: "mongodb-projection",
  title: "Projection — Selected Fields Only",
  category: "MongoDB",
  difficulty: "Beginner",
  tags: ["MongoDB", "Projection", "Filtering", "Performance", "Querying", "Security"],

  definition:
    "Projection is the process of specifying which fields you want MongoDB to return in a query result. By default, MongoDB returns the entire document. With projection, you can 'Include' (1) only specific fields or 'Exclude' (0) unwanted fields (like passwords).",

  simpleExplanation:
    "Imagine you are at a fast-food counter. Even though the kitchen has hundreds of ingredients, you only want a 'Burger' and a 'Coke'. You don't want the raw onions, the flour, or the secret sauce containers. Projection is like your 'Order Receipt'. It tells the database: 'I only need the Name and Email of this user; don't bother sending me their 500-line history or their encrypted password.'",

  romanUrduRevision:
    "Projection ka matlab hai ke aap database se sirf wahi data mangwayein jo aapko chahiye. Agar aik document mein 50 fields hain aur aapko sirf 'name' chahiye, toh projection use karein. Is se network speed barhti hai kyunke data size chota ho jata hai. '_id' hamesha ata hai, agar hata na ho toh zero (0) set karein.",

  realLifeExample:
    "User Directory: On a 'Members List' page, you only need to show names and profile pictures. You don't need their phone numbers, addresses, or private notes. Using projection ensures that sensitive data never even leaves the database server, keeping your app secure and fast.",

  why: "Security and Performance. Fetching large documents when you only need one field wastes RAM and network bandwidth. More importantly, it is a massive security risk to send passwords or internal secret keys to the frontend, even if you hide them later in JavaScript. Projection stops the data at the source.",

  how: [
    "Step 1 - Use the second argument of '.find()' or '.findOne()'.",
    "Step 2 - Use '{ fieldName: 1 }' to INCLUDE a field.",
    "Step 3 - Use '{ fieldName: 0 }' to EXCLUDE a field.",
    "Step 4 - Note: You cannot mix 1s and 0s (except for '_id').",
    "Step 5 - Use 'select()' if you are using Mongoose (e.g., '.select(\"name email -password\")').",
  ],

  diagram: `
graph LR
    Source[Full Doc: 100KB] -- "Query + Projection" --> MDB[MongoDB Engine]
    MDB -- "Filters Fields" --> Out[Proj Doc: 2KB]
    subgraph Fields [Inside Document]
      F1[Name: Include]
      F2[Age: Include]
      F3[Secret Key: Exclude]
    end
  `,

  analogy:
    "It's like looking through a 'Mask'. The database has the whole picture (Full Document). The mask (Projection) has small holes cut out only for the parts you want to see. Everything else stays hidden behind the mask.",

  code: `
// 1. Include only Name and Email (1 = Include)
db.users.find({}, { name: 1, email: 1 });

// 2. Exclude Password (0 = Exclude)
db.users.find({}, { password: 0 });

// 3. Exclude _id specifically (The only exception to mixing)
db.users.find({}, { name: 1, _id: 0 });

// 4. Mongoose Syntax (Very human-readable)
User.find().select('name email -password');

// 5. Using Projection in Aggregation
db.orders.aggregate([
  { $project: { customerName: 1, total: 1 } }
]);
  `,

  commonMistake: [
    "Attempting to mix include and exclude: '{ name: 1, age: 0 }'. MongoDB will throw an error because it doesn't know whether to start with everything and remove 'age', or start with nothing and add 'name'.",
    "Forgetting that '_id' is included by default unless you explicitly set it to 0.",
    "Over-fetching data and filtering it in JavaScript 'map()' instead of using projection. (Always filter at the database layer!).",
    "Assuming projection reduces memory usage inside MongoDB—it primarily reduces NETWORK traffic and memory usage in your Node.js app.",
  ],

  interviewSummary:
    "Projection is an essential tool for optimizing query performance and maintaining security. It limits the fields returned by a query, reducing data payload and preventing the leakage of sensitive info. In Mongoose, the .select() method provides a convenient wrapper for this functionality.",

  interviewQA: [
    {
      q: "Can you mix inclusions and exclusions in a single projection?",
      a: "No, you must either specify only include (1) or only exclude (0). The only exception is the '_id' field, which can be excluded even when other fields are being included.",
    },
    {
      q: "What is the benefit of projection for performance?",
      a: "It reduces the amount of data transferred over the network (BSON size) and reduces the amount of memory consumed by the Node.js process to store the result objects.",
    },
  ],
};
