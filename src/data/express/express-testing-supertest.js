export const expressTestingSupertest = {
  id: "express-testing-supertest",
  title: "Integration Testing — Supertest & Express",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Testing", "Supertest", "Integration Testing", "API Testing", "Endpoints", "Automated Testing"],

  definition:
    "Integration testing is the phase in software testing where individual modules are combined and tested as a group. In Express, this specifically means testing your full API endpoints (routes) from the outside, including middleware, validation, and database interaction using the 'Supertest' library.",

  simpleExplanation:
    "If unit testing is testing the 'parts' of a car (brakes, engine), integration testing is 'Test Driving' the car. You step on the gas and see if it actually accelerates. With Supertest, you don't manually open Postman; you write a script that sends a real 'POST /register' request to your app and checks if it returns a 201 Created status and a JSON body.",

  romanUrduRevision:
    "Integration testing mein hum poore API route ko end-to-end check karte hain. Supertest library humein ye allow karti hai ke hum HTTP requests (GET, POST, etc.) bhej sakein baghair server ko manually start kiye. Is se ye pata chalta hai ke Middleware, Controller aur Routes sab mil kar sahi kaam kar rahe hain.",

  realLifeExample:
    "Testing a Login API: You send a POST request with correct credentials. Supertest verifies that the server returns a '200 OK', a 'token' in the body, and sets a secure cookie. Then you send wrong credentials and verify it returns '401 Unauthorized'. This ensures the whole security flow works together.",

  why: "Reality Check. Unit tests can pass while the app still fails because a middleware was placed in the wrong order or a database query has a syntax error. Integration tests catch these 'Connection' problems. They give you the ultimate proof that your API actually works for the frontend.",

  how: [
    "Step 1 - Install 'supertest' and 'jest'.",
    "Step 2 - Export your 'app' from 'app.js' (don't call 'app.listen' in that file).",
    "Step 3 - Import 'request' from supertest into your test file.",
    "Step 4 - Use 'await request(app).get(\"/some-path\")' to fire a request.",
    "Step 5 - Chain assertions like '.expect(200)' or '.expect(\"Content-Type\", /json/)'.",
  ],

  diagram: `
graph LR
    Test[Supertest Script] -- "HTTP Request" --> Router[Express Router]
    Router -- "Pipe through" --> MW[Middleware]
    MW -- "Process" --> Ctrl[Controller]
    Ctrl -- "Query" --> DB[(Database / Mock)]
    DB -- "Data" --> Ctrl
    Ctrl -- "200 JSON" --> Router
    Router -- "HTTP Response" --> Test
    Test -- "Verify" --> Result[Pass/Fail]
  `,

  analogy:
    "It's like 'Ordering Food at a Restaurant'. You don't just test the raw flour (Unit Test); you order the 'Pizza' (Request) and see if it arrives hot, with the right toppings, and within 30 minutes (Response Assertion).",

  code: `
// --- app.js ---
const express = require('express');
const app = express();
app.use(express.json());
app.post('/api/echo', (req, res) => res.json(req.body));
module.exports = app; // Export for testing

// --- api.test.js ---
const request = require('supertest');
const app = require('./app');

describe('API Integration Tests', () => {
  
  test('POST /api/echo - should return the sent body', async () => {
    const data = { message: 'Hello' };
    
    const response = await request(app)
      .post('/api/echo')
      .send(data)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello');
    expect(response.headers['content-type']).toMatch(/json/);
  });

  test('GET /unknown - should return 404', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });
});
  `,

  commonMistake: [
    "Starting the server twice: If your 'app.js' calls 'app.listen(3000)', Supertest will fail because it tries to start the same port. Solution: Move 'app.listen' to a separate 'server.js' file.",
    "Using a real Production Database for tests. This will corrupt your actual data! Always use a 'Test Database' (e.g., MongoDB Memory Server).",
    "Not handling async code properly: Forgetting to 'await' the supertest request, which causes the test to finish before the response arrives.",
    "Testing too many things in one test case. Keep one 'test' block for one specific scenario (e.g., 'should return 401 if token missing').",
  ],

  interviewSummary:
    "Supertest is the industry-standard tool for testing Express HTTP servers. It allows you to simulate requests and assert on responses without spinning up the network stack, making it fast and reliable for CI/CD pipelines.",

  interviewQA: [
    {
      q: "Why is 'supertest' called an integration testing tool?",
      a: "Because it executes the entire Express stack—from the router and middleware to the controller—verifying that all these layers integrate correctly to produce the expected HTTP response.",
    },
    {
      q: "How do you test routes that require authentication in Supertest?",
      a: "You can either manually set the 'Authorization' header with a mock JWT, or use '.set(\"Cookie\", [\"token=xxx\"])' if using cookie-based auth.",
    },
  ],
};
