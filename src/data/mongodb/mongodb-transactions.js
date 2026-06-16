export const mongodbTransactions = {
  id: "mongodb-transactions",
  title: "Transactions — ACID & Multi-Document",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Transactions", "ACID", "Session", "Atomicity", "Consistency"],

  definition:
    "A MongoDB Transaction allows you to execute multiple read/write operations across multiple documents and collections as a single atomic unit. Either ALL operations succeed (commit) or ALL operations fail (abort). Transactions guarantee ACID properties: Atomicity, Consistency, Isolation, Durability.",

  simpleExplanation:
    "Imagine a bank transfer: you withdraw 1000 from Account A and deposit 1000 into Account B. If something crashes AFTER the withdrawal but BEFORE the deposit, money disappears! A Transaction wraps both operations together — either BOTH happen or NEITHER happens. MongoDB calls this 'Atomicity'.",

  romanUrduRevision:
    "Transaction ka matlab hai ke do ya zyada operations ko aik saath chalana — ya sab kamyaab hon ya sab fail hon. Bank transfer jaise: Account A se 1000 nikalne aur Account B mein dalne ke dono kaam aik session mein hote hain. Agar beech mein error aaye toh sab ROLLBACK ho jata hai. MongoDB 4.0+ mein ye feature available hai, lekin Replica Set zaroori hai.",

  realLifeExample:
    "E-commerce Checkout: When a user places an order: (1) Decrease product stock, (2) Create order record, (3) Charge payment. If payment fails at step 3, the stock must be restored and the order deleted. A transaction ensures all three succeed or all three roll back.",

  why: "Without transactions, if your app crashes between two related operations, your data becomes inconsistent (e.g., money withdrawn but not deposited). Transactions are essential for financial, inventory, and any system where multiple documents must change together or not at all.",

  how: [
    "Step 1 — Start a session: const session = client.startSession()",
    "Step 2 — Start transaction: session.startTransaction()",
    "Step 3 — Perform multiple operations, passing { session } to each",
    "Step 4 — Commit: await session.commitTransaction()",
    "Step 5 — On error: await session.abortTransaction()",
    "Step 6 — Finally: session.endSession()",
  ],

  diagram: `
graph TD
    Start[Start Session] --> Begin[startTransaction]
    Begin --> Op1["Deduct from Account A"]
    Op1 --> Op2["Add to Account B"]
    Op2 --> Check{Error?}
    Check -- No --> Commit[commitTransaction ✅]
    Check -- Yes --> Abort[abortTransaction ❌ Rollback]
  `,

  analogy:
    "A Transaction is like a 'Save Point' in a video game. You save your game before a boss fight. If you die (error), you reload from the save point (rollback) — nothing was lost. If you win (success), the game progresses (commit).",

  code: `
// Mongoose Transaction — Bank Transfer
const session = await mongoose.startSession();
session.startTransaction();

try {
  // Deduct from sender
  await Account.updateOne(
    { _id: senderId },
    { $inc: { balance: -1000 } },
    { session }
  );

  // Add to receiver
  await Account.updateOne(
    { _id: receiverId },
    { $inc: { balance: 1000 } },
    { session }
  );

  // Both succeeded — commit
  await session.commitTransaction();
  console.log("Transfer successful");

} catch (error) {
  // Something failed — rollback everything
  await session.abortTransaction();
  console.error("Transfer failed, rolled back");

} finally {
  session.endSession();
}
  `,

  commonMistake: [
    "Using transactions on a standalone MongoDB server. Transactions REQUIRE a Replica Set (even for development — use a single-node replica set).",
    "Forgetting to pass { session } to every operation inside the transaction. Operations without the session run outside the transaction.",
    "Using transactions for everything. Single-document operations are already atomic in MongoDB. Only use transactions for MULTI-document operations.",
    "Long-running transactions (>60 seconds default timeout). Keep them short.",
  ],

  interviewSummary:
    "MongoDB transactions provide ACID guarantees for multi-document operations. They require a Replica Set, use sessions with startTransaction/commitTransaction/abortTransaction, and have a default 60-second timeout. Single-document operations are already atomic and don't need transactions.",

  interviewQA: [
    {
      q: "Are single-document operations atomic without transactions?",
      a: "Yes. MongoDB guarantees atomicity at the single-document level by default. Transactions are only needed when multiple documents or collections must change together.",
    },
    {
      q: "Can transactions span multiple collections?",
      a: "Yes. A single transaction can include operations on multiple collections within the same database, and in MongoDB 4.2+, even across different databases.",
    },
  ],
};
