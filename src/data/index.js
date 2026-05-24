/*
  ┌─────────────────────────────────────────────────────┐
  │  HOW TO ADD A NEW TOPIC                             │
  │                                                     │
  │  1. Create file: src/data/[category]/[topic].js     │
  │  2. Copy schema from any existing topic file        │
  │  3. Fill all 7 sections                             │
  │  4. Export from src/data/[category]/index.js        │
  │  5. Import + add to allTopics array in this file    │
  │  6. Done. No UI changes needed. Ever.               │
  └─────────────────────────────────────────────────────┘

  HOW TO ADD A NEW CATEGORY (e.g. Docker)
  1. Create folder: src/data/docker/
  2. Create src/data/docker/index.js
  3. Create your topic files inside
  4. Import in this file (src/data/index.js)
  5. Sidebar auto-groups it. Done.
*/

import {
  asyncAwait,
  arrayMethods,
  arrowFunctions,
  callbacks,
  closures,
  dataTypes,
  destructuring,
  errorHandling,
  executionContext,
  eventLoop,
  fetchApi,
  functionTypes,
  hoisting,
  iteratorsGenerators,
  objectsDeepDive,
  operators,
  promises,
  prototypes,
  scopeChain,
  thisKeyword,
  truthyFalsy,
  typeCoercion,
  varLetConst,
} from "./javascript/index.js";
import { virtualDom } from "./react/index.js";

export const allTopics = [
  // -- Phase 1: JS Foundations (Beginner) --
  dataTypes,
  varLetConst,
  hoisting,
  typeCoercion,
  truthyFalsy,
  operators,
  // -- Phase 2: Functions & Scope (Beginner -> Intermediate) --
  functionTypes,
  scopeChain,
  closures,
  thisKeyword,
  arrowFunctions,
  executionContext,
  // -- Phase 3: Objects & Arrays (Intermediate) --
  objectsDeepDive,
  prototypes,
  arrayMethods,
  destructuring,
  errorHandling,
  iteratorsGenerators,
  // -- Phase 4: Async JavaScript (Intermediate -> Advanced) --
  eventLoop,
  callbacks,
  promises,
  asyncAwait,
  fetchApi,
  virtualDom,
];

export const topicsByCategory = allTopics.reduce((accumulator, topic) => {
  if (!accumulator[topic.category]) {
    accumulator[topic.category] = [];
  }

  accumulator[topic.category].push(topic);
  return accumulator;
}, {});
