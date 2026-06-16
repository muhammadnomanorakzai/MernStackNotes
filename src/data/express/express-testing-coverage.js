export const expressTestingCoverage = {
  id: "express-testing-coverage",
  title: "Test Coverage — Metrics & Quality Gates",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Testing", "Coverage", "Jest", "Istanbul", "Metrics", "Reports", "Code Quality"],

  definition:
    "Test Coverage (or Code Coverage) is a metric that describes what percentage of your source code is executed when your test suite runs. It identifies which lines, branches, and functions are 'covered' by tests and which are 'untested', helping you find gaps in your quality assurance process.",

  simpleExplanation:
    "Imagine you are painting a wall. Code coverage is like a special light that shows you exactly which parts of the wall you missed. If 80% of your code is covered, it means 20% of your code has never even been 'run' during a test. Those 20% 'dark' areas are where bugs like to hide because no one is watching them.",

  romanUrduRevision:
    "Test coverage humein batati hai ke hamare kitne percent code ko tests ne cover kiya hai. Jest humein detail mein report deta hai ke kaunsi lines aur branches test hui hain aur kaunsi reh gayi hain. Ideally 80% coverage achi mani jati hai, lekin 100% ka matlab ye nahi ke code bug-free hai.",

  realLifeExample:
    "An 'If/Else' block in a Discount Controller: You wrote a test for the 'If' case (applying discount), but forgot the 'Else' case (no discount). The coverage report will highlight the 'Else' block in RED, telling you exactly which scenario you need to write another test for.",

  why: "Visibility and Accountability. Without coverage, you are 'guessing' your code quality. Coverage reports provide objective proof of testing efforts. They are often used as 'Quality Gates' in professional teams—meaning you cannot merge new code if the coverage percentage drops below a certain level (e.g., 85%).",

  how: [
    "Step 1 - Add '--coverage' to your Jest command in 'package.json'.",
    "Step 2 - Run 'npm test -- --coverage'.",
    "Step 3 - View the summary table in the terminal after tests finish.",
    "Step 4 - Open 'coverage/lcov-report/index.html' in your browser for a detailed line-by-line view.",
    "Step 5 - Set coverage thresholds in 'jest.config.js' to enforce minimum percentages.",
  ],

  diagram: `
graph TD
    Test[Run: jest --coverage]
    Test --> Parser[Istanbul Coverage Tool]
    Parser -- "Collect Metrics" --> Stats[Stats Table]
    Stats -- "Lines" --> L[90%]
    Stats -- "Functions" --> F[85%]
    Stats -- "Statements" --> S[88%]
    Stats -- "Branches" --> B[75%]
    Parser -- "Generate HTML" --> Report[Visual Code Report]
    Report -- "Highlight Reds" --> Dev[Developer fills gaps]
  `,

  analogy:
    "It's like an 'Exam Paper'. Your marks (Coverage) tell you how much of the syllabus you studied. If you only studied 60% of the book, you are taking a risk that the exam (Production) might ask questions from the other 40%.",

  code: `
// package.json script
{
  "scripts": {
    "test": "jest",
    "test:cov": "jest --coverage",
    "test:watch": "jest --watchAll"
  }
}

// jest.config.js (Advanced configuration)
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}", // Files to include
    "!src/index.js",     // Files to exclude
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ["json", "lcov", "text", "clover"]
};
  `,

  commonMistake: [
    "Aiming for 100% coverage at the cost of logic. High coverage doesn't mean high quality; you can have 100% coverage on a function that returns the wrong answer.",
    "Excluding too many files from reports to 'artificially' boost the percentage.",
    "Ignoring 'Branch Coverage' (logical If/Else paths). You might cover the line, but only the 'true' path and not the 'false' path.",
    "Not checking the HTML report. The terminal summary is just numbers; the HTML report actually shows you WHICH lines are missing.",
  ],

  interviewSummary:
    "Test coverage is a key metric for software maintainability. While high coverage is a good goal, the focus should always be on meaningful assertions and testing critical business logic rather than just hitting a specific percentage target.",

  interviewQA: [
    {
      q: "What is 'Branch Coverage'?",
      a: "Branch coverage ensures that every logical fork in your code (if-else, switch cases) has been executed in both its 'true' and 'false' states.",
    },
    {
      q: "Does 100% code coverage guarantee a bug-free application?",
      a: "No. Coverage only tracks which lines were executed. It doesn't check if the logic is correct, if edge cases were handled, or if different modules integrate correctly under load.",
    },
  ],
};
