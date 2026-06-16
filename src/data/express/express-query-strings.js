export const expressQueryStrings = {
  id: "express-query-strings",
  title: "Query Strings — req.query",
  category: "Express",
  difficulty: "Beginner",
  tags: ["req.query", "Query Parameters", "Filtering", "Searching", "URL Params"],

  definition:
    "Query strings are the part of a URL that assigned values to specified parameters. They appear after a '?' symbol in the URL and are often used for filtering, sorting, or searching data. Express automatically parses these and makes them available in the 'req.query' object.",

  simpleExplanation:
    "Query strings are like 'Filters' on a shopping website. If you visit '/shoes', you see all shoes. But if you visit '/shoes?color=red&size=42', you are telling the server to only show you the red ones in size 42. It's a way to send extra instructions to a URL without changing the main path.",

  romanUrduRevision:
    "Query strings URL ke end par '?' ke baad aati hain. Inhe filter, sort, ya search karne ke liye use kiya jata hai (e.g., /search?name=noman). Express mein hum 'req.query.name' se iski value lete hain. Multiple types of data send karne ke liye hum '&' symbol use karte hain (e.g., ?page=1&limit=10).",

  why: "Query strings are the best way to handle non-unique data requests. For example, if you want to support pagination (page 1, 2, 3) or sorting (price high to low), query strings are the industry-standard way to do it. They are also 'Bookmarkable', meaning a user can save the exact filtered URL.",

  how: [
    "Step 1 - Add a '?' after the URL path in the browser or client (e.g., '/api/products?qty=5').",
    "Step 2 - Inside the Express handler, access the variable via 'req.query.variableName'.",
    "Step 3 - For multiple queries, separate them with '&' (e.g., '?sort=desc&limit=20').",
    "Step 4 - Handle cases where the query might be missing (undefined).",
  ],

  diagram: `
flowchart LR
    A["URL: /search?term=react&page=2"] --> B{Express Parser}
    B --> C["req.query.term = 'react'"]
    B --> D["req.query.page = '2'"]
    C --> E[Database Query]
    D --> E
    style B fill:#3498db,color:white
  `,

  analogy:
    "Imagine you go to a library (the Route). The librarian asks what you want. You say 'I want books (the Path), but only Science Fiction ones, and only from the year 2020 (the Query Strings)'. The librarian uses those specific filters to find your books.",

  realLifeExample:
    "Google Search: When you search for 'Express js' on Google, the URL looks something like 'google.com/search?q=express+js'. Google's server reads 'req.query.q' and knows exactly what results to show you.",

  code: `
const express = require('express');
const app = express();

app.get('/search', (req, res) => {
  // 1. Single query param
  const term = req.query.q;

  // 2. Multiple values
  const { sort, limit, page } = req.query;

  // 3. Logic with defaults
  const itemsPerPage = limit || 10;

  res.json({
    searchingFor: term,
    sortingBy: sort,
    pagination: {
      page: page || 1,
      limit: itemsPerPage
    }
  });
});

app.listen(3000);
  `,

  commonMistake: [
    "Thinking you need to define query strings in the route path (e.g., app.get('/search?q=:term')). You only define the base path: '/search'.",
    "Assuming query params are secure (never send passwords or tokens in a query string, as they appear in browser history).",
    "Not handling missing values (always provide defaults like `limit = req.query.limit || 10`).",
    "Mixing up req.params (path segments) with req.query (the string after ?).",
  ],

  interviewSummary: [
    "req.query is an object containing a property for each query string parameter in the route.",
    "Used for filtering, sorting, and pagination.",
    "Unlike req.params, query strings are optional and don't affect route matching.",
    "Multiple parameters are separated by '&'.",
  ],
};
