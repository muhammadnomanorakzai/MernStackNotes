export const expressTestingMocking = {
  id: "express-testing-mocking",
  title: "Mocking Middleware & Database in Tests",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Mocking", "Jest Mocks", "Stubbing", "Testing", "Isolation", "Mongoose Mocks", "Spying"],

  definition:
    "Mocking is the technique of replacing parts of your system (like a database, an external API, or a middleware) with 'fake' objects that simulate the behavior of the real ones. This ensures your tests are fast, predictable, and isolated from external failures.",

  simpleExplanation:
    "Imagine you are practicing for a 'Fire Drill'. You don't actually set the building on fire (Real Database); you just blow a whistle (Mock) and pretend there's a fire. This lets you practice your 'exit strategy' (Your Code) safely and quickly without any danger or damage. Mocking in Jest lets you 'pretend' a database saved a record, so you can test if your controller sends the right success message.",

  romanUrduRevision:
    "Mocking ka matlab hai asli database ya external API ko 'fake' data se replace karna. Testing mein hum nahi chahte ke asli database slow ho jaye ya API ki cost barhe. Is liye hum Jest functions (jest.fn) use karte hain jo asli functions ki jagah le lete hain aur fake result return karte hain. Is se testing bohot fast ho jati hai.",

  realLifeExample:
    "Third-Party Payment Gateway: If you are testing a 'Subscribe' endpoint, you don't want to actually charge your credit card (Real Stripe API) every time you run a test. You 'Mock' the Stripe library to always return 'status: success' so you can test if your code correctly updates the user's plan in the database.",

  why: "Isolation and Speed. Tests should fail only if YOUR code is broken, not because the Internet is down or the database is slow. Mocks allow you to simulate edge cases (like a database timeout) easily, which would be very hard to trigger with real systems.",

  how: [
    "Step 1 - Use 'jest.mock(\"./path/to/module\")' to replace an entire module with a mock.",
    "Step 2 - Use 'jest.fn()' to create a single dummy function.",
    "Step 3 - Set return values using '.mockReturnValue(value)' or '.mockResolvedValue(value)'.",
    "Step 4 - Verify the mock was called using 'expect(myMock).toHaveBeenCalled()'.",
    "Step 5 - Use 'jest.clearAllMocks()' in 'afterEach' to reset the history between tests.",
  ],

  diagram: `
graph TD
    Test[Jest Test] -- "Calls" --> Code[Your Controller]
    Code -- "Tries to reach" --> Real[Real DB / API]
    Mock[Jest Mock / Spy] -- "Intercepts" --> Real
    Mock -- "Returns Fake Data" --> Code
    Code -- "Processes Fake Data" --> Success[Assert Outcome]
    style Mock fill:#3498db,color:white
  `,

  analogy:
    "It's like a 'Stunt Double' in a movie. The lead actor (Your Code) is too important to risk doing a dangerous jump (Connecting to real DB). The stunt double (Mock) looks like the actor and does the jump perfectly every time, so the scene (Test) can be completed safely.",

  code: `
// --- userController.js ---
const User = require('../models/User');
exports.getStats = async (req, res) => {
  const count = await User.countDocuments(); // We want to mock this!
  res.json({ totalUsers: count });
};

// --- userController.test.js ---
const User = require('../models/User');
const { getStats } = require('./userController');

// 1. Mock the entire User model
jest.mock('../models/User');

test('should return correct user stats count', async () => {
  const mReq = {};
  const mRes = { json: jest.fn() };

  // 2. Control the behavior of the mock
  User.countDocuments.mockResolvedValue(542);

  await getStats(mReq, mRes);

  // 3. Assertions
  expect(User.countDocuments).toHaveBeenCalledTimes(1);
  expect(mRes.json).toHaveBeenCalledWith({ totalUsers: 542 });
});
  `,

  commonMistake: [
    "Mocking too much: If you mock your own logic, you aren't testing anything! Only mock external dependencies like DBs and APIs.",
    "Not clearing mocks: If Test A calls a mock twice, and you don't clear it, Test B will think it was called 3 times total, causing a failure.",
    "Hard-coding file paths in 'jest.mock()' incorrectly (leading to the real module being used instead of the mock).",
    "Mocking asynchronous functions with '.mockReturnValue()' instead of '.mockResolvedValue()' (causes 'unhandled promise rejection' errors).",
  ],

  interviewSummary:
    "Mocking allows for deterministic and isolated testing. Jest provides powerful utilities like 'jest.mock' for module-level replacement and 'jest.fn' for property-level spying. It is the key to maintaining a fast and reliable test suite.",

  interviewQA: [
    {
      q: "What is the difference between a Mock and a Spy in Jest?",
      a: "A Mock replaces the entire function/module with fake logic. A Spy (jest.spyOn) wraps the real function, allowing it to run normally while tracking how it was called.",
    },
    {
      q: "How do you mock a middleware in Express for integration tests?",
      a: "You can use 'jest.mock' on the middleware file, or in Supertest, you can 'override' the middleware by providing a fake implementation in the test setup.",
    },
  ],
};
