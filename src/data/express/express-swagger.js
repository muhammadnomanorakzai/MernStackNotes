export const expressSwagger = {
  id: "express-swagger",
  title: "API Documentation — Swagger & OpenAPI",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Swagger", "OpenAPI", "API Documentation", "Swagger-UI", "Documentation", "Best Practices"],

  definition:
    "Swagger (now OpenAPI) is a suite of tools for designing, building, and documenting RESTful APIs. In Express, it is used to generate a beautiful, interactive 'Swagger UI' page that allows developers and clients to test endpoints directly from the browser.",

  simpleExplanation:
    "Imagine you built a massive library, but no one knows where any of the books are. Swagger is like a digital, interactive map and catalog for your API. It lists every endpoint, what data it needs, and what it returns. It even let's you 'Try it out' by clicking a button, so you don't need Postman for every quick test.",

  romanUrduRevision:
    "Swagger API documentation ka sabse bada standard hai. Is se aapke backend endpoints ki ek interactive website ban jati hai jahan frontend developers dekh sakte hain ke kaunsa URL kab aur kaise call karna hai. Is ke liye hum 'swagger-jsdoc' aur 'swagger-ui-express' use karte hain.",

  realLifeExample:
    "An e-commerce API being used by a Mobile App team: Instead of sending them a long PDF or WhatsApp messages explaining the /products endpoint, you give them a link to /api-docs. They can see the required fields, sample responses, and even test the login flow right there.",

  why: "Consistency and Communication. Manual documentation (like Readme files) always gets outdated. Swagger uses 'OpenAPI Specification' which serves as a single source of truth. It reduces friction between frontend and backend teams and acts as a professional 'face' for your API.",

  how: [
    "Step 1 - Install 'swagger-ui-express' and 'swagger-jsdoc'.",
    "Step 2 - Define the 'swaggerDefinition' (title, version, base URL).",
    "Step 3 - Use JSDoc comments (@swagger) above your routes to describe them.",
    "Step 4 - Initialize swagger-jsdoc with your files.",
    "Step 5 - Serve the UI using 'app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))'.",
  ],

  diagram: `
graph LR
    Dev[Developer] -- Writes --> JSDoc[JSDoc / YAML]
    JSDoc -- Parsed by --> JSDocLib[swagger-jsdoc]
    JSDocLib -- Generates --> JSON[Swagger JSON/YAML]
    JSON -- Rendered by --> UI[Swagger UI Express]
    User[Client/Frontend] -- Accesses --> UI
  `,

  analogy:
    "It's like a 'Restaurant Menu' that also has a 'Sample Station'. You don't just read about the Pasta; there's a small plate right there for you to taste (test) to see if it's exactly what you want before you place an order.",

  code: `
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MERN Stack API',
      version: '1.0.0',
      description: 'A professional API documentation example',
    },
    servers: [{ url: 'http://localhost:5000' }],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Returns an array of user objects from the database.
 *     responses:
 *       200:
 *         description: Success
 */
app.get('/api/users', (req, res) => { /* logic */ });
  `,

  commonMistake: [
    "Not keeping the JSDoc comments updated when changing the route logic (leading to false documentation).",
    "Leaving API documentation public in production for sensitive internal APIs (use environment checks or basic auth).",
    "Forgetting to document error responses (400, 401, 500), which are just as important as the 200 Success response.",
    "Not using 'Tags' in Swagger to group routes, making the documentation page messy.",
  ],

  interviewSummary:
    "Swagger is the industry standard for REST API documentation. In the MERN stack, it is implemented using swagger-jsdoc to extract definitions from code comments and swagger-ui-express to serve the interactive documentation page.",

  interviewQA: [
    {
      q: "What is the difference between Swagger and OpenAPI?",
      a: "OpenAPI is the specification (the rules), while Swagger is the set of tools (the software) used to implement that specification.",
    },
    {
      q: "How do you handle JWT Authentication in Swagger?",
      a: "You define a 'securityScheme' with type 'http' and scheme 'bearer' in the Swagger configuration, and then apply it to specific routes.",
    },
  ],
};
