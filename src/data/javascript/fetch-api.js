export const fetchApi = {
  id: "fetch-api",
  title: "Fetch API & HTTP Requests",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "fetch",
    "HTTP",
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "headers",
    "JSON",
    "CORS",
    "AbortController",
    "status codes",
    "response.ok",
  ],

  definition:
    "The Fetch API is a built-in browser interface used to make HTTP requests. It is Promise-based and returns a Response object that must be explicitly parsed (like JSON or text) before usable data is obtained.",

  simpleExplanation:
    "Fetch is how JavaScript talks to servers.\n\nWhen you call fetch, it does not immediately give you data. Instead, it returns a Response object wrapped inside a Promise.\n\nThat response still needs to be converted into usable data using methods like .json() or .text().\n\nImportant idea: Fetch succeeding does NOT mean request is successful — it only means the server responded.",

  romanUrduRevision:
    "Fetch API server se data lene ka modern tareeqa hai.\nYe promise return karta hai, lekin actual data manually parse karna parta hai.",

  why: "Modern applications constantly interact with servers for authentication, APIs, databases, and dynamic content.\nFetch provides a native, lightweight, Promise-based way to handle HTTP requests without external libraries for basic use cases.",

  how: [
    "Step 1 - fetch sends an HTTP request and returns a Promise",
    "Step 2 - Promise resolves into a Response object (not actual data)",
    "Step 3 - Response contains metadata like status, headers, and body stream",
    "Step 4 - You must manually parse body using response.json() or response.text()",
    "Step 5 - fetch does NOT reject on HTTP errors like 404 or 500",
    "Step 6 - You must check response.ok manually",
    "Step 7 - POST/PUT requests require method, headers, and body setup",
    "Step 8 - AbortController can cancel ongoing requests (important in React cleanup)",
  ],

  diagram: `
sequenceDiagram
  participant Client
  participant Server

  Client->>Server: fetch request (GET /users)
  Server-->>Client: HTTP 200 + Response object
  Client->>Client: check response.ok
  Client->>Client: response.json() parsing

  Client->>Server: fetch request (invalid route)
  Server-->>Client: 404 response
  Client->>Client: response.ok = false → handle error
  `,

  analogy:
    "Fetch API is like ordering food in a restaurant.\nYou placing the order (fetch) does not guarantee the food quality.\nYou still need to open the dish and check if it is correct, complete, and acceptable before saying the order succeeded.",

  realLifeExample:
    "Think of a 'Contact Us' form. When you hit submit, you don't refresh the page. Instead, you use fetch() to send the user's name and message to your server. The code waits for the server to say 'Got it!' (status 200) before showing a 'Thank you' message on the screen.",

  code: `
// Basic GET request
async function getUsers() {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error("Request failed: " + response.status);
  }

  const data = await response.json();
  return data;
}


// POST request
async function createUser(user) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
}


// Reusable API wrapper
async function api(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    throw new Error("HTTP Error: " + res.status);
  }

  return res.json();
}


// AbortController (important in React)
const controller = new AbortController();

fetch("/api/data", { signal: controller.signal })
  .catch(err => {
    if (err.name === "AbortError") {
      console.log("Request cancelled");
    }
  });

controller.abort();
  `,

  commonMistakes: [
    "Assuming fetch rejects on 404 or 500 errors",
    "Forgetting to use response.json() after fetch",
    "Not checking response.ok before using data",
    "Missing headers in POST requests",
    "Not handling abort in React cleanup",
  ],

  interviewQA: [
    {
      q: "What does Fetch API return?",
      a: "Fetch returns a Promise that resolves to a Response object, not the actual data directly.",
    },
    {
      q: "Does fetch reject on HTTP errors?",
      a: "No. Fetch only rejects on network failure. HTTP errors like 404 or 500 must be handled manually using response.ok.",
    },
    {
      q: "Why do we use response.json()?",
      a: "Because the Response body is a stream, not usable data. json() parses it into a JavaScript object and returns a Promise.",
    },
    {
      q: "What is AbortController used for?",
      a: "It allows canceling ongoing fetch requests, especially useful in React to prevent memory leaks when components unmount.",
    },
    {
      q: "What is difference between fetch and Axios?",
      a: "Fetch is native browser API; Axios is a library with built-in features like automatic JSON parsing and better error handling.",
    },
  ],

  interviewSummary:
    "Fetch API is a Promise-based browser feature used for HTTP requests. It returns a Response object that must be manually parsed. It does not throw errors for HTTP status codes, so manual checking is required. It is widely used in frontend development and React applications.",
};
