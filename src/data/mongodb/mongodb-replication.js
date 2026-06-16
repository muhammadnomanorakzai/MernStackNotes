export const mongodbReplication = {
  id: "mongodb-replication",
  title: "Replication & Replica Sets",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Replication", "Replica Set", "High Availability", "Failover"],

  definition:
    "Replication is the process of synchronizing data across multiple servers. A Replica Set is a group of MongoDB instances (usually 3+) that maintain the same data. One node is Primary (handles writes), others are Secondaries (copies). If Primary fails, an automatic election promotes a Secondary to Primary.",

  simpleExplanation:
    "Imagine you write important notes in a notebook. Your two friends copy everything you write into their notebooks too. If your notebook gets destroyed (server crash), your friend's notebook has the exact same information — nothing is lost! That's Replication. The 'election' part means your friends vote on who takes over as the main note-taker.",

  romanUrduRevision:
    "Replication ka matlab hai data ki copies banake alag alag servers par rakhna. Agar aik server crash ho jaye toh doosra server kaam leta hai — is liye app kabhi band nahi hoti. Replica Set mein 3 nodes hote hain: 1 Primary (jis par write hota hai) aur 2 Secondary (jo Primary ka data copy karte hain). Agar Primary crash ho toh 'Election' hoti hai aur naya Primary banta hai.",

  realLifeExample:
    "Banking System: CANNOT go offline even for 1 minute. They run Replica Sets across cities. If Lahore server dies, Karachi server automatically takes over within seconds. Customers never notice any disruption. MongoDB Atlas does this automatically for you.",

  why: "Hardware fails. Servers crash. Natural disasters happen. Without replication, a single hardware failure means your data is GONE and your app is DOWN. Replica Sets provide 'High Availability' (app stays online) and 'Data Redundancy' (data is safe on multiple machines).",

  how: [
    "Step 1 — Deploy 3+ MongoDB instances (odd number recommended)",
    "Step 2 — Initiate: rs.initiate({ _id:'mySet', members: [...] })",
    "Step 3 — Primary handles ALL writes; Secondaries replicate via Oplog",
    "Step 4 — If Primary crashes, Secondaries hold an election (takes ~10 seconds)",
    "Step 5 — New Primary is elected automatically; app reconnects",
    "Step 6 — On Atlas: this is configured automatically with 0 effort",
  ],

  diagram: `
graph TD
    App[Application] --> P["Primary Node (Read/Write)"]
    P -- "Oplog Sync" --> S1["Secondary 1 (Read Only)"]
    P -- "Oplog Sync" --> S2["Secondary 2 (Read Only)"]
    P -. "Crash!" .-> Election[Automatic Election]
    Election --> NewP["S1 promoted to Primary"]
  `,

  analogy:
    "It's like having a Captain and Co-Pilots in an airplane. The Captain (Primary) flies the plane (handles writes). The Co-Pilots (Secondaries) monitor everything and copy all flight data. If the Captain passes out, a Co-Pilot immediately takes the controls (election). Passengers (users) don't even notice.",

  code: `
// 1. Initiate Replica Set (run on primary node)
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "mongo1:27017" },   // Primary
    { _id: 1, host: "mongo2:27017" },   // Secondary
    { _id: 2, host: "mongo3:27017" }    // Secondary
  ]
});

// 2. Check replica set status
rs.status();

// 3. Read from Secondary (for load balancing)
db.getMongo().setReadPref("secondaryPreferred");

// 4. Mongoose connection string for Replica Set
mongoose.connect(
  "mongodb://mongo1:27017,mongo2:27017,mongo3:27017/myDb?replicaSet=myReplicaSet"
);
  `,

  commonMistake: [
    "Using even number of nodes (2 or 4). Elections can tie. Always use odd numbers or add an Arbiter.",
    "Thinking replication = backup. If you accidentally delete data, the delete replicates to all nodes. You still need independent backups.",
    "Reading from Secondaries by default. Secondary reads may return slightly stale data due to replication lag. Use only when eventual consistency is acceptable.",
  ],

  interviewSummary:
    "A Replica Set has one Primary (read/write) and multiple Secondaries (read-only copies). Replication happens via the Oplog. Automatic failover through elections takes ~10 seconds. Minimum 3 nodes recommended. Replication provides availability, NOT backup.",

  interviewQA: [
    {
      q: "What is the Oplog?",
      a: "The Operations Log — a special capped collection on the Primary that records every data modification. Secondaries continuously read the Oplog to stay synchronized.",
    },
    {
      q: "What is an Arbiter and when would you use it?",
      a: "An Arbiter is a lightweight node that participates in elections but holds no data. Used when you can only afford 2 data-bearing nodes but need a tiebreaker for elections.",
    },
  ],
};
