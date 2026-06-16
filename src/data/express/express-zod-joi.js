export const expressZodJoi = {
  id: "express-zod-joi",
  title: "Input Validation — Joi & Zod Schemas",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Validation", "Joi", "Zod", "Schema", "Clean Code", "Error Handling"],

  definition:
    "Schema-based validation is the process of defining the 'shape' and 'rules' for incoming request data (req.body, req.query, etc.). Joi and Zod are the leading libraries that allow you to enforce data types, character limits, and patterns before your database or business logic ever sees the data.",

  simpleExplanation:
    "Validation is like a 'Quality Control' check in a factory. If someone sends an order that is missing a name or has a negative price, you don't want to process it. You set up a 'Template' (a Schema) that says: 'Every order MUST have a name (string) and a price (positive number)'. If the incoming data doesn't fit the template EXACTLY, you reject it immediately. This keeps your database clean and prevents crashes.",

  romanUrduRevision:
    "Input validation MERN stack development ka ek intehai zaroori hissa hai. Joi aur Zod aese packages hain jo check karte hain ke frontend se aane wala data sahi format mein hai ya nahi. Maslan agar user ne email ki jagah sirf apna naam bhej diya, toh Joi use wahin rok dega aur error message bhej dega. Zod TypeScript ke saath bohot acha kaam karta hai kyunki yeh types bhi generate kar deta hai. Professional apps mein har API endpoint par validation schema laga hona chahiye.",

  why: "Defense. Hackers often try to send malicious code or broken data to see how your server reacts. Without validation, your server might crash, or worse, save corrupted data to your database that breaks your app for everyone. Schema validation also acts as 'Documentation'; just by looking at a Joi schema, you know exactly what a request is supposed to look like.",

  how: [
    "Step 1 - Install: 'npm install joi' or 'npm install zod'.",
    "Step 2 - Define a Schema: Specify fields, types, and constraints (e.g., .min(3), .email()).",
    "Step 3 - Create a Validation Middleware: A reusable function that calls '.validate()' or '.parse()'.",
    "Step 4 - Apply to the Route: Place the validation middleware before your controller.",
    "Step 5 - Return 400 Bad Request: If validation fails, send the meaningful error messages back to React.",
  ],

  diagram: `
flowchart LR
    A[Client Request] --> B[Validation Middleware]
    B -- "Schema Match?" --> C{Yes/No}
    C -- "No" --> D[res.status 400]
    C -- "Yes" --> E[req.body is Safe]
    E --> F[Controller Logic]
    style B fill:#3498db,color:white
    style D fill:#e74c3c,color:white
  `,

  analogy:
    "Imagine an 'Airport Security Scanner'. Everyone has to put their bags through the machine. The machine has a 'Schema' for what is allowed (No liquids, No sharp objects). If the scanner sees something that isn't allowed, it beeps (Validation Error) and the person is stopped. Only 'Clean' bags (Validated data) are allowed onto the plane (The Database).",

  realLifeExample:
    "Signup Form: A user tries to sign up with a password that is only 3 characters long. Your Zod schema has '.min(8)'. Your server catches this instantly and returns: 'Password must be at least 8 characters long'. The user sees this on their screen and fixes it, while your server remains safe from weak accounts.",

  code: `
const express = require('express');
const Joi = require('joi');
const { z } = require('zod');
const app = express();

// --- JOI EXAMPLE ---
const joiUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18)
});

app.post('/register-joi', (req, res) => {
  const { error, value } = joiUserSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  res.send('Validated by Joi!');
});

// --- ZOD EXAMPLE (Popular with TypeScript) ---
const zodUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  age: z.number().min(18).optional()
});

app.post('/register-zod', (req, res) => {
  const result = zodUserSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json(result.error);
  
  res.send('Validated by Zod!');
});

app.listen(3000);
  `,

  commonMistake: [
    "Validating ONLY on the frontend (React): Users can bypass frontend validation easily (e.g., via Postman). You MUST validate on the server too.",
    "Not sending clear error messages: Just saying 'Error' is frustrating for the user. Send exactly which field failed and why.",
    "Using very complex regex for simple things (use built-in methods like .email() or .alphanum() instead).",
    "Not handling nested objects (both Joi and Zod support deep validation, use it!).",
  ],

  interviewSummary: [
    "Joi and Zod are schema description languages and data validators.",
    "Zod is preferred for modern apps because of its superior TypeScript integration.",
    "Validation should happen early in the middleware pipeline (fail fast).",
    "400 Bad Request is the standard HTTP response for validation failures.",
  ],
};
