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
    "The Fetch API is the browser's modern Promise-based interface for making HTTP requests. It returns a Promise that resolves to a Response object, which must then be read with methods like json or text.",

  why:
    "Most real applications need to talk to servers for data, auth, forms, and updates. Fetch gives browsers a native way to do that without old XMLHttpRequest boilerplate or third-party libraries for simple cases.",

  how: [
    "Step 1 - fetch sends an HTTP request and returns a Promise of a Response",
    "Step 2 - The Response object contains metadata and a readable body, not final parsed data",
    "Step 3 - Methods like json and text read the body and return another Promise",
    "Step 4 - GET is the default request method when no method is specified",
    "Step 5 - POST requests usually send JSON with headers and JSON stringify",
    "Step 6 - fetch does not reject on HTTP error codes like 404 or 500",
    "Step 7 - You must check response ok or response status yourself and throw if needed",
    "Step 8 - AbortController can cancel in-flight requests, which is useful in React cleanup",
  ],

  diagram: `
sequenceDiagram
  participant Browser
  participant Server
  Browser->>Server: fetch api users
  Server-->>Browser: 200 OK plus JSON body
  Browser->>Browser: check response ok
  Browser->>Browser: await response json
  Browser->>Server: fetch missing resource
  Server-->>Browser: 404 Not Found
  Browser->>Browser: response ok false so throw error
  `,

  analogy:
    "fetch is like mailing a request letter to a company. Getting a reply means the delivery worked, but the contents still might say sorry, not found, or try again later. That is why fetch resolving does not automatically mean success. You still have to open the letter, read it, and check whether the response is acceptable.",

  code: `
async function getUsers() {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) throw new Error(\`HTTP Error: \${response.status}\`);
    return await response.json();
  } catch (err) {
    console.error("Failed to fetch users:", err.message);
    return [];
  }
}

async function createUser(userData) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error("Failed to create user");
  return response.json();
}

async function apiFetch(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
  return response.json();
}
  `,

  interviewQA: [
    {
      q: "What is the Fetch API?",
      a: "The Fetch API is the browser's modern Promise-based API for making HTTP requests. It resolves to a Response object first, and you then read the body with methods like json or text.",
    },
    {
      q: "Why does fetch not reject on a 404 response?",
      a: "Because the network request itself succeeded and a valid HTTP response came back. fetch only rejects for network-level failures, so you must check response ok or status yourself for application-level errors.",
    },
    {
      q: "How do you send a POST request with JSON data using fetch?",
      a: "Set method to POST, include the Content-Type application slash json header, and pass JSON.stringify of your data as the body. After that, check response ok before reading the response body.",
    },
    {
      q: "What is AbortController and when would you use it in React?",
      a: "AbortController lets you cancel an in-flight fetch request. In React it is useful inside effect cleanup so a component can abort a request when it unmounts and avoid updating state after it is gone.",
    },
  ],
};
