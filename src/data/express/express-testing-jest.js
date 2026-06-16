export const expressTestingJest = {
  id: "express-testing-jest",
  title: "Unit Testing with Jest — Controllers & Services",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Testing", "Jest", "Unit Testing", "TDD", "QA", "Controllers", "Services"],

  definition:
    "Unit testing is the process of testing small, isolated pieces of code (like a single function in a controller or service) to ensure they work correctly in isolation. Jest is the most popular JavaScript testing framework, providing a test runner, assertion library, and mocking tools in one package.",

  simpleExplanation:
    "Imagine you are building a car. Before driving the whole car, you test the brakes, the engine, and the headlights individually. Unit testing is testing those 'parts' of your Express app. Jest is your 'Testing Lab' where you write scripts that say: 'If I give this function A, it should return B.' If it returns C, the lab tells you exactly where you failed.",

  romanUrduRevision:
    "Unit testing ka matlab hai code ke chote chote hisson ko test karna (jaise sirf aik controller function). Jest aik bohot powerful testing framework hai. Is mein hum 'test' ya 'it' blocks likhte hain aur 'expect' keyword se result verify karte hain. Is se bugs early stage par catch ho jate hain.",

  realLifeExample:
    "Calculating Order Total: You have a service function 'calculateTotal(cart)'. You write a Jest test that provides a cart with items worth $100 and a 10% discount. You 'expect' the result to be $90. If your logic is wrong (e.g., adding discount twice), the test fails instantly before you even deploy the code.",

  why: "Quality and Refactoring Confidence. Without tests, every code change is a gamble. Unit tests document how your code is supposed to behave and protect you from 'Regression Bugs' (fixing one thing and breaking another). It's the most professional way to build a reliable MERN application.",

  how: [
    "Step 1 - Install 'jest' and 'ts-jest' (if using TypeScript).",
    "Step 2 - Create a test file, e.g., 'userController.test.js'.",
    "Step 3 - Use 'describe' to group related tests.",
    "Step 4 - Use 'it' or 'test' for individual test cases.",
    "Step 5 - Use 'expect(result).toBe(value)' or other matchers to assert the outcome.",
  ],

  diagram: `
graph TD
    Code[Actual Logic: Controller/Service] -- "Input" --> Jest[Jest Test Runner]
    Jest -- "Compare" --> Expected[Expected Outcome]
    Expected -- "Match" --> Pass[Green: TEST PASSED]
    Expected -- "Mismatch" --> Fail[Red: TEST FAILED]
    Fail -- "Details" --> Dev[Developer Fixes Code]
  `,

  analogy:
    "It's like an 'Exam Paper'. The 'describe' is the Subject, 'it' is the specific Question, and 'expect' is the Answer Key. If your code's answer doesn't match the key, you fail the exam and need to study (debug) more.",

  code: `
// --- user.service.js ---
const formatUserName = (user) => {
  if (!user) return null;
  return \`\${user.firstName} \${user.lastName}\`.toUpperCase();
};

// --- user.service.test.js ---
const { formatUserName } = require('./user.service');

describe('User Service - formatUserName', () => {
  
  test('should correctly format and capitalize user name', () => {
    const mockUser = { firstName: 'Noman', lastName: 'Orakzai' };
    const result = formatUserName(mockUser);
    
    expect(result).toBe('NOMAN ORAKZAI');
  });

  test('should return null if user is missing', () => {
    const result = formatUserName(null);
    expect(result).toBeNull();
  });

  test('should handle missing last names gracefully', () => {
    const result = formatUserName({ firstName: 'Ali', lastName: '' });
    expect(result).toBe('ALI '); // Based on current logic
  });
});
  `,

  commonMistake: [
    "Testing everything at once: Unit tests should not connect to a database or call a real API (use mocks for those).",
    "Writing tests that are too brittle (e.g., testing private functions or internal details instead of the public output).",
    "Assuming code with high coverage is bug-free (coverage only means the code was EXECUTED, not that the logic is CORRECT).",
    "Not resetting mocks between tests, leading to state leakage where one test affects another.",
  ],

  interviewSummary:
    "Jest is a complete testing solution. Its core features include a fast runner, built-in matchers (toBe, toEqual, toContain), and powerful mocking capabilities. Unit testing is the first line of defense in software quality.",

  interviewQA: [
    {
      q: "What is the difference between 'toBe' and 'toEqual' in Jest?",
      a: "'toBe' uses strict equality (===) and is for primitive values. 'toEqual' recursively checks every field of an object or array (Deep Equality).",
    },
    {
      q: "How do you test asynchronous code in Jest?",
      a: "You can either use the 'done' callback, return a Promise, or use 'async/await' directly within the test function.",
    },
  ],
};
