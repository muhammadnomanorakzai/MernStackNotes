export const modules = {
  id: "modules",
  title: "JavaScript Modules - ESM vs CommonJS",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "ESM",
    "CommonJS",
    "import",
    "export",
    "require",
    "named export",
    "default export",
    "dynamic import",
    "tree shaking",
    "barrel file",
  ],

  definition:
    "JavaScript modules are files with their own scope where variables are private by default. ESM uses import and export as the modern standard, while CommonJS uses require and module.exports as the older Node.js format.",

  why:
    "Modules prevent global namespace collisions, organize large codebases, enable code splitting, and let bundlers remove unused code through tree shaking. They are the foundation of modern frontend and Node.js application structure.",

  how: [
    "Step 1 - ESM named exports are imported with exact names inside braces",
    "Step 2 - ESM default exports can be imported with any local name",
    "Step 3 - A file can have one default export and many named exports",
    "Step 4 - Barrel files re-export from multiple modules through an index file",
    "Step 5 - Dynamic import loads a module on demand and returns a Promise",
    "Step 6 - ESM imports are static and resolved before code runs",
    "Step 7 - CommonJS require is synchronous and can run dynamically at runtime",
    "Step 8 - Static ESM imports allow bundlers to tree shake unused exports",
  ],

  diagram: `
flowchart TD
  A[ESM import export] --> B[Parsed before runtime]
  B --> C[Bundler analyzes graph]
  C --> D[Tree shaking removes unused code]
  E[CommonJS require] --> F[Runs at runtime]
  F --> G[Can be conditional]
  G --> H[Harder to tree shake]
  I[Dynamic import] --> J[Lazy loaded Promise]
  `,

  analogy:
    "Without modules, every tool sits on one giant shared table and names collide easily. Named exports are asking for a specific tool from a toolbox. Default exports are asking for the main tool. A barrel file is a catalog that re-exports items from many shelves, and dynamic import is fetching a heavy textbook only when class actually needs it.",

  code: `
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export default function multiply(a, b) { return a * b; }

// app.js
import multiply, { add, subtract } from "./math.js";
console.log(add(2, 3), subtract(5, 2), multiply(3, 4));

// components/index.js barrel file
export { default as Button } from "./Button.js";
export { default as Modal } from "./Modal.js";

async function loadHeavy() {
  const { heavyFunction } = await import("./heavy-module.js");
  return heavyFunction();
}

// CommonJS
module.exports = { add, subtract };
const { add: cjsAdd } = require("./math.js");
// ESM imports enable tree shaking better than dynamic CommonJS require
  `,

  interviewQA: [
    {
      q: "What is the difference between ESM and CommonJS?",
      a: "ESM is static, uses import and export, supports live bindings, and enables tree shaking. CommonJS is dynamic, uses require and module.exports, runs synchronously at runtime, and is the older Node.js module format.",
    },
    {
      q: "What is the difference between named and default exports?",
      a: "Named exports must be imported by their exact exported name inside braces, and a file can have many of them. A default export is the single main export of a file and can be imported with any local name.",
    },
    {
      q: "What is a barrel file?",
      a: "A barrel file is an index file that re-exports from multiple modules. It gives callers one clean import location instead of many long paths.",
    },
    {
      q: "What is dynamic import and when would you use it?",
      a: "Dynamic import loads a module at runtime and returns a Promise. Use it for lazy loading heavy libraries, route-based code splitting, or language files that are only needed under certain conditions.",
    },
  ],
};
