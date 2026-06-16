export const expressGraphql = {
  id: "express-graphql",
  title: "GraphQL with Express — Apollo Server",
  category: "Express",
  difficulty: "Advanced",
  tags: ["GraphQL", "Apollo Server", "API Design", "Schemas", "Resolvers", "Queries", "Mutations"],

  definition:
    "GraphQL is a query language for your API and a runtime for fulfilling those queries with your existing data. Unlike REST where you have multiple endpoints for different data, GraphQL typically uses a single endpoint (/graphql) where you can request exactly the data you need and nothing more.",

  simpleExplanation:
    "Imagine a restaurant where instead of a 'fixed menu' (REST), you get a 'blank checklist' (GraphQL). You check off exactly what you want—maybe just the fries from the burger meal, or just the cheese from the pizza. Your server (Express + Apollo) looks at your checklist and brings you exactly those items. This prevents 'over-fetching' (getting too much data) and 'under-fetching' (not getting enough).",

  romanUrduRevision:
    "GraphQL traditional REST ka aik modern alternative hai. REST mein har kaam ke liye alag URL hota hai, lekin GraphQL mein sirf aik URL hota hai. Client batata hai ke use kaun kaun si field chahiye (jaise sirf 'name' aur 'email'). Is se mobile apps bohot fast ho jati hain kyunke data transfer kam hota hai.",

  realLifeExample:
    "A User Profile screen in a social media app: With REST, you might have to call /users/:id to get the name, and then /users/:id/posts to get their posts. With GraphQL, you send one query asking for both 'user name' and 'posts titles' in one single round-trip.",

  why: "Flexibility and Efficiency. GraphQL solves the problem of Versioning (you don't need v1, v2 as you just add fields) and Performance. It allows frontend developers to define the data structure they need without requiring backend changes for every new UI requirement.",

  how: [
    "Step 1 - Install 'apollo-server-express' and 'graphql'.",
    "Step 2 - Define your 'Type Definitions' (Schema) describing the data types and their fields.",
    "Step 3 - Write 'Resolvers'—functions that actually fetch the data from a database or API.",
    "Step 4 - Create an instance of 'ApolloServer' with your typeDefs and resolvers.",
    "Step 5 - Use 'server.applyMiddleware({ app })' to integrate it with your Express app.",
  ],

  diagram: `
graph TD
    Client[Frontend Client] -- GraphQL Query --> API["Express + Apollo Server (/graphql)"]
    API -- parse & validate --> Schema[GraphQL Schema]
    Schema -- fetch data --> Resolvers[Resolvers]
    Resolvers -- DB Query --> DB[(MongoDB / SQL)]
    Resolvers -- REST Call --> ExtAPI[External API]
    Resolvers -- combines --> Result[JSON Response]
    Result -- returns --> Client
  `,

  analogy:
    "It's like a 'Custom Suit Shop'. In a normal store (REST), you buy a suit in size Large, and it comes with specific pants and a specific tie. In the custom shop (GraphQL), you say: 'I want this specific sleeve length, this specific button type, and no tie.' You get exactly what fits your body perfectly.",

  code: `
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// 1. Define the Schema (Type Definitions)
const typeDefs = gql\`
  type User {
    id: ID!
    username: String!
    email: String
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
  }
\`;

// 2. Define the Resolvers (The logic)
const resolvers = {
  Query: {
    getUser: (parent, args) => users.find(u => u.id === args.id),
    getAllUsers: () => users,
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app }); // Defaults to /graphql

  app.listen(4000, () => {
    console.log('Server ready at http://localhost:4000' + server.graphqlPath);
  });
}

startServer();
  `,

  commonMistake: [
    "Over-complicating simple APIs (don't use GraphQL if your app only has 2-3 simple CRUD endpoints).",
    "N+1 Query Problem: Forgetting to use solutions like 'DataLoader' when fetching related data (e.g., getting 10 posts and then firing 10 separate DB queries to get the author of each).",
    "Missing Authorization: Assuming that because it's 'one endpoint', you don't need to check user permissions inside each resolver.",
    "Not handling errors properly; GraphQL often returns a 200 OK status even if there are errors in the 'errors' array, which can confuse frontend logic.",
  ],

  interviewSummary:
    "GraphQL is a strongly-typed query language and runtime. Its core components are Schemas (what is available) and Resolvers (how to get it). It optimizes frontend performance by allowing declarative data fetching and eliminates multiple round-trips.",

  interviewQA: [
    {
      q: "What is a 'Mutation' in GraphQL?",
      a: "A Mutation is a type of GraphQL operation used to change data (Create, Update, Delete), similar to POST, PUT, or DELETE in REST.",
    },
    {
      q: "What is 'schema-first' vs 'code-first' development?",
      a: "Schema-first (like Apollo) involves writing the schema in SDL (Schema Definition Language) first. Code-first involves generating the schema automatically from your code models or classes.",
    },
  ],
};
