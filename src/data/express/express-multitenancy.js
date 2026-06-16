export const expressMultitenancy = {
  id: "express-multitenancy",
  title: "Multitenancy Architecture in Express",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Multitenancy", "SaaS", "Architecture", "Data Isolation", "Middleware", "B2B"],

  definition:
    "Multitenancy is a software architecture where a single instance of an application serves multiple customers (tenants). Each tenant's data is isolated and invisible to other tenants, even though they all share the same hardware, database, and codebase. This is the core foundation of SaaS (Software as a Service) platforms.",

  simpleExplanation:
    "Imagine an 'Apartment Building' (The App). Everyone shares the same building structure, water pipes, and electricity (Code & Infrastructure). However, each family has their own 'Apartment' (Tenant) with their own front door and key (Data Isolation). You cannot walk into your neighbor's apartment and see their stuff. Multitenancy in Express is the art of making sure Request A only sees Data A, and Request B only sees Data B.",

  romanUrduRevision:
    "Multitenancy SaaS apps ke liye zaroori hai. Iska matlab hai aik hi code base se hazaron companies ko handle karna. Har company (tenant) ka data 'isolate' hona chahiye taake aik ka data doosra na dekh sake. Is ke liye hum ya toh database level par alag collections use karte hain, ya har record mein 'tenantId' ka column dalti hain.",

  realLifeExample:
    "Slack or Trello: When you log into Slack, you are in a specific 'Workspace' (Tenant). Your messages and files are only visible to your coworkers. Other companies using Slack have their own workspaces on the same servers, but their data is completely segregated from yours.",

  why: "Scalability and Cost Efficiency. Developing and maintaining 100 separate apps for 100 customers is impossible. Multitenancy allows you to update the code once and fix bugs for all 100 customers simultaneously. It also significantly reduces hosting costs because resources are shared efficiently.",

  how: [
    "Step 1 - Identify the tenant (e.g., via subdomains like 'tenant1.myapp.com' or headers).",
    "Step 2 - Use a middleware to extract the 'tenantId' from the request.",
    "Step 3 - Set the 'tenantId' in 'res.locals' or a request context.",
    "Step 4 - Filter all Database queries using that 'tenantId' (e.g., 'Model.find({ tenantId })').",
    "Step 5 - For high-security, use separate databases or separate schemas per tenant.",
  ],

  diagram: `
graph TD
    U1[User Company A] -- "tenant-a.app.com" --> Proxy[Reverse Proxy]
    U2[User Company B] -- "tenant-b.app.com" --> Proxy
    Proxy --> Express[Express App]
    Express -- "Identify Tenant A" --> DB_A[(Tenant A DB)]
    Express -- "Identify Tenant B" --> DB_B[(Tenant B DB)]
    subgraph DataIsolation [Data Isolation Strategies]
        Strategy1[Shared DB, Shared Schema - filtered by tenantId]
        Strategy2[Shared DB, Separate Schemas]
        Strategy3[Separate DBs per Tenant]
    end
  `,

  analogy:
    "It's like a 'Bank'. Thousands of people use the same bank building and vault system. But when you go to the ATM, you can only see your own balance and withdraw your own money. The bank's system 'multitenants' all accounts while keeping them strictly private.",

  code: `
const express = require('express');
const app = express();

// 1. Middleware to identify the tenant
const tenantContext = (req, res, next) => {
  // Option A: Subdomain (company1.myapp.com)
  const host = req.headers.host; 
  const tenantId = host.split('.')[0]; 

  // Option B: Custom Header
  // const tenantId = req.headers['x-tenant-id'];

  if (!tenantId) return res.status(400).send('Tenant not identified');

  // Attach to request object
  req.tenantId = tenantId;
  next();
};

app.use(tenantContext);

// 2. Multi-tenant Data Access
app.get('/orders', async (req, res) => {
  // CRITICAL: Always filter by tenantId!
  const orders = await Order.find({ tenantId: req.tenantId });
  res.json(orders);
});

// 3. Dynamic Database Connection (Advanced)
app.get('/users', async (req, res) => {
  const tenantDb = getTenantDatabaseConnection(req.tenantId);
  const users = await tenantDb.model('User').find({});
  res.json(users);
});
  `,

  commonMistake: [
    "Cross-tenant data leakage: Forgetting to add '{ tenantId: req.tenantId }' to a single query can leak data to the wrong customer.",
    "Inefficient scaling: Creating a brand new database connection for EVERY request instead of using a connection pool or cache.",
    "Hardcoding tenant identifiers instead of using a dynamic system like subdomains or custom paths.",
    "Not validating that the user actually belongs to the tenant they are trying to access (Security/Authorization).",
  ],

  interviewSummary:
    "Multitenancy is a design pattern for SaaS applications. The main strategies include Shared Database (discriminator column), Shared Database (separate schemas), and Isolated Databases. Middleware is used in Express to track the tenant context globally for each request.",

  interviewQA: [
    {
      q: "Which multitenancy strategy is the most secure?",
      a: "Isolated Databases (Database-per-tenant) is the most secure as it provides physical data separation, but it is the hardest to manage at scale.",
    },
    {
      q: "What is a 'noisy neighbor' in multitenancy?",
      a: "It's when one tenant uses too many server resources (CPU/RAM/Bandwidth), causing performance issues for all other tenants on the same infrastructure.",
    },
  ],
};
