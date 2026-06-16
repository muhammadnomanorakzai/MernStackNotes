export const expressErrorShape = {
  id: "express-error-shape",
  title: "Consistent Error Response Shape",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["API Design", "Error Response", "Consistency", "REST", "Best Practices", "JSON"],

  definition:
    "A Consistent Error Response Shape is a standardized JSON structure returned by your API for every single error, regardless of whether it's a 404, 401, 400, or 500. This contract between the server and client means the frontend team can always expect the same fields (like 'success', 'message', 'errors', 'statusCode') and write a single, universal error handler in React.",

  simpleExplanation:
    "Imagine if every bank had a different format for their bank statements. One shows Account Number first, another shows balance first, a third uses a different currency format. It would be chaos. A consistent error shape is like a 'Universal Bank Statement Standard'—everyone follows the same layout. Your React developers know that EVERY error from your API will have 'success: false', 'message: string', and 'statusCode: number'. No more guessing, no more 'why does this error have a different shape?'",

  romanUrduRevision:
    "Professional APIs ki ek pehchaan yeh hoti hai ke inka error response ka format humesha ek jaisa hota hai. Agar kabhi 404 aata hai toh '{success: false, message: ...}', 401 aata hai toh bhi same format. Isse frontend developer ko har jagah alag error parsing nahi likhni parti. React mein ek global Axios interceptor likh do aur kaam ho gaya. Yeh ek chota sa kaam hai jo app ko bohot professional feel deta hai.",

  why: "Developer Experience and Predictability. Your API is a contract. If the frontend can't predict what an error looks like, they have to add defensive code everywhere. With a standardized shape, they write ONE Axios interceptor or ONE custom hook and handle every single API error elegantly. It also makes your API documentation much cleaner and simpler to write.",

  how: [
    "Step 1 - Design your error object: e.g., '{ success, statusCode, message, errors?, stack? }'.",
    "Step 2 - Enforce it in your central error handler — all errors must pass through here and be formatted.",
    "Step 3 - Use the 'errors' field (an array) for validation errors that have multiple issues.",
    "Step 4 - Include 'stack' only in development (gated by NODE_ENV).",
    "Step 5 - Document this shape clearly for your frontend team or in your API docs.",
  ],

  diagram: `
graph TD
    A[Any Error 4xx/5xx] --> B[Central Error Middleware]
    B --> C{Format}
    C --> D["{ success: false,\nstatusCode: 404,\nmessage: 'Not Found',\nerrors: [],\nstack: dev-only }"]
    style B fill:#3498db,color:white
    style D fill:#2c3e50,color:white
  `,

  analogy:
    "Think of a 'Standard Hospital Report Form'. No matter which department a patient visits — emergency, cardiology, or general — the report form always has the same fields: Patient Name, Date, Diagnosis, and Treatment. Doctors can hand off patients between departments seamlessly because they all speak the same 'language' of the form. Your error shape is that standard form.",

  realLifeExample:
    "React - Axios Integration: Your frontend team writes this ONCE: 'axios.interceptors.response.use(null, err => { const { message, statusCode } = err.response.data; showToast(message); }'. Because EVERY error from your Express server follows the same shape, this single interceptor handles every error in every component of your app automatically.",

  code: `
// --- The Agreed-Upon Error Shape ---
// {
//   success: false,
//   statusCode: 404,
//   message: "User not found",
//   errors: [],       <-- For validation (multiple errors)
//   stack: "..."      <-- Development only
// }


// --- globalErrorHandler.js ---
const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const isDev = process.env.NODE_ENV === 'development';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: err.errors || [],       // For validation arrays (express-validator)
    ...(isDev && { stack: err.stack }) // Dev-only
  });
};

module.exports = globalErrorHandler;


// --- React Axios Interceptor (Frontend) ---
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { message, errors } = error.response?.data || {};
//     toast.error(message || 'Something went wrong');
//     return Promise.reject(error);
//   }
// );
  `,

  commonMistake: [
    "Having different error shapes from different routes (e.g., some return 'error' key, others return 'message' key).",
    "Returning the full Mongoose/Express error object directly to the client (it contains system paths, internal logic, and security information).",
    "Not documenting the error shape for the frontend team (they waste hours figuring out what fields to expect).",
    "Using different status codes for the same type of error in different routes (e.g., returning 400 in some places and 422 in others for the same validation failure).",
  ],

  interviewSummary: [
    "A consistent error shape is a contract between your API and its consumers.",
    "It enables frontend teams to write a single, global error handler.",
    "Standard fields include: success (bool), statusCode (int), message (string), errors (array).",
    "Stack traces should only be included in development environments.",
  ],
};
