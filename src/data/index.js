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
  expressIntro,
  expressAppListen,
  expressRequest,
  expressResponse,
  expressHttpMethods,
  expressRouting,
  expressParams,
  expressQueryStrings,
  expressReqBody,
  expressMiddlewareIntro,
  expressAppUse,
  expressNextFunction,
  expressBuiltInMiddleware,
  expressStaticFiles,
  expressRouter,
  expressRouterMiddleware,
  expressRouteGrouping,
  expressChainedHandlers,
  expressAdvancedParams,
  expressRouteOrder,
  expressMiddlewarePipeline,
  expressErrorMiddleware,
  expressAsyncErrors,
  expressConditionalMiddleware,
  expressCors,
  expressHelmet,
  expressMorgan,
  expressCompression,
  expressRateLimit,
  expressCookieParser,
  expressResDeepDive,
  expressStatusCodes,
  expressHeadersLocals,
  expressReqHeaders,
  expressContentNegotiation,
  expressMulterUploads,
  expressDownloads,
  expressStreaming,
  expressJwtAuth,
  expressJwtRefresh,
  expressAuthMiddleware,
  expressCookieAuth,
  expressSessionAuth,
  expressRbac,
  expressBcrypt,
  expressZodJoi,
  expressValidator,
  expressNosqlInjection,
  expressXssPrevention,
  expressCsrfProtection,
  expressAdvancedRateLimit,
  expressApiKeyAuth,
  expressCentralError,
  expressAppError,
  expressErrorTypes,
  expressAsyncWrapper,
  expressProcessExceptions,
  expressErrorLogging,
  expressErrorShape,
  expressRedisCaching,
  expressDbPooling,
  expressPagination,
  expressClustering,
  expressPm2,
  expressCacheControl,
  expressEventLoop,
  expressSwagger,
  expressWebsockets,
  expressSse,
  expressGraphql,
  expressProxy,
  expressBullQueue,
  expressCron,
  expressGracefulShutdown,
  expressEnvConfig,
  expressHealthCheck,
  expressMultitenancy,
  expressTestingJest,
  expressTestingSupertest,
  expressTestingMocking,
  expressTestingCoverage,
  expressProdEnv,
  expressNginx,
  expressSsl,
  expressDocker,
  expressSecrets,
  expressZeroDowntime,
} from "./express/index.js";
import {
  mongodbBasics,
  mongodbVsSql,
  mongodbCreate,
  mongodbRead,
  mongodbUpdate,
  mongodbDelete,
  mongodbDataModeling,
  mongodbRelOneToOne,
  mongodbRelOneToMany,
  mongodbRelManyToMany,
  mongodbMongooseBasics,
  mongodbMongooseAdvanced,
  mongodbOpComparison,
  mongodbOpLogical,
  mongodbOpArray,
  mongodbProjection,
  mongodbPagination,
  mongodbQueryOptimization,
  mongodbAggIntro,
  mongodbAggMatchProject,
  mongodbAggGroup,
  mongodbAggLookup,
  mongodbAggStages,
  mongodbAggAdvanced,
  mongodbIdxIntro,
  mongodbIdxTypes,
  mongodbIdxText,
  mongodbIdxExplain,
  mongodbIdxStrategies,
  mongodbSpecialCollections,
  mongodbTransactions,
  mongodbReplication,
  mongodbSharding,
  mongodbAtlas,
  mongodbMongoosePopulation,
  mongodbInterviewQa,
} from "./mongodb/index.js";
import {
  asyncAwait,
  arrayMethods,
  arrowFunctions,
  callbacks,
  classes,
  closures,
  dataTypes,
  designPatterns,
  destructuring,
  errorHandling,
  executionContext,
  eventLoop,
  fetchApi,
  functionTypes,
  functionalProgramming,
  hoisting,
  implementFromScratch,
  iteratorsGenerators,
  jsInterviewMaster,
  jsTrickyOutputs,
  logicalAssignment,
  mapSet,
  memoryManagement,
  modules,
  objectsDeepDive,
  operators,
  promises,
  performanceOptimization,
  prototypes,
  proxyReflect,
  regexBasics,
  scopeChain,
  symbolsWeakmap,
  templateLiterals,
  thisKeyword,
  truthyFalsy,
  typeCoercion,
  varLetConst,
} from "./javascript/index.js";
import { 
  virtualDom, 
  useStateHook, 
  useEffectHook, 
  useRefHook, 
  useContextHook, 
  useReducerHook, 
  useMemoCallback, 
  customHooks,
  stateManagementOverview,
  contextReducerPattern,
  reduxToolkit,
  reduxAsyncThunk,
  zustand,
  choosingStateSolution,
  reactRouterBasics,
  reactRouterAdvanced,
  dataFetchingPatterns,
  reactQueryDeepDive,
  reactForms,
  reactMemo,
  lazyLoading,
  virtualScrolling,
  profilerDevTools,
  concurrentFeatures,
  performanceChecklist,
  reactDesignPatterns,
  errorBoundariesSuspense,
  reactArchitecture,
  reactTrickyQuestions,
  reactInterviewMaster,
} from "./react/index.js";

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
  // -- Phase 5: Advanced JavaScript (Advanced) --
  memoryManagement,
  designPatterns,
  functionalProgramming,
  modules,
  proxyReflect,
  symbolsWeakmap,
  // -- Phase 6: ES6+ Modern JavaScript (Intermediate) --
  classes,
  templateLiterals,
  mapSet,
  logicalAssignment,
  regexBasics,
  // -- Phase 7: Interview Specials (All Levels) --
  jsTrickyOutputs,
  implementFromScratch,
  performanceOptimization,
  jsInterviewMaster,
  virtualDom,

  // -- Phase 2: Hooks Deep Dive (Intermediate) --
  useStateHook,
  useEffectHook,
  useRefHook,
  useContextHook,
  useReducerHook,
  useMemoCallback,
  customHooks,

  // -- Phase 3: State Management (Intermediate) --
  stateManagementOverview,
  contextReducerPattern,
  reduxToolkit,
  reduxAsyncThunk,
  zustand,
  choosingStateSolution,

  // -- Phase 4: Modern React Mastery (Advanced) --
  reactRouterBasics,
  reactRouterAdvanced,
  dataFetchingPatterns,
  reactQueryDeepDive,
  reactForms,

  // -- Phase 5: Optimization & Performance (Advanced) --
  reactMemo,
  lazyLoading,
  virtualScrolling,
  profilerDevTools,
  concurrentFeatures,
  performanceChecklist,

  // -- Phase 6: Patterns & Interview Prep (Advanced) --
  reactDesignPatterns,
  errorBoundariesSuspense,
  reactArchitecture,
  reactTrickyQuestions,
  reactInterviewMaster,

  // -- Phase 1: Express Foundations (Beginner) --
  expressIntro,
  expressAppListen,

  // -- Phase 2: Request & Response (Beginner) --
  expressRequest,
  expressResponse,
  expressHttpMethods,

  // -- Phase 3: Routing & Parameters (Intermediate) --
  expressRouting,
  expressParams,
  expressQueryStrings,
  expressReqBody,

  // -- Phase 4: Middleware Essentials (Intermediate) --
  expressMiddlewareIntro,
  expressAppUse,
  expressNextFunction,
  expressBuiltInMiddleware,
  expressStaticFiles,

  // -- Phase 5: Advanced Routing & Logic (Intermediate) --
  expressRouter,
  expressRouterMiddleware,
  expressRouteGrouping,
  expressChainedHandlers,
  expressAdvancedParams,
  expressRouteOrder,

  // -- Phase 6: Advanced Middleware & Error Handling (Intermediate) --
  expressMiddlewarePipeline,
  expressErrorMiddleware,
  expressAsyncErrors,
  expressConditionalMiddleware,

  // -- Phase 7: Security & Production Middleware (Production) --
  expressCors,
  expressHelmet,
  expressMorgan,
  expressCompression,
  expressRateLimit,
  expressCookieParser,

  // -- Phase 8: Advanced Req/Res & File Handling (Advanced) --
  expressResDeepDive,
  expressStatusCodes,
  expressHeadersLocals,
  expressReqHeaders,
  expressContentNegotiation,
  expressMulterUploads,
  expressDownloads,
  expressStreaming,

  // -- Phase 9: Authentication & Authorization (Advanced) --
  expressJwtAuth,
  expressJwtRefresh,
  expressAuthMiddleware,
  expressCookieAuth,
  expressSessionAuth,
  expressRbac,
  expressBcrypt,

  // -- Phase 10: Security & Validation (Advanced) --
  expressZodJoi,
  expressValidator,
  expressNosqlInjection,
  expressXssPrevention,
  expressCsrfProtection,
  expressAdvancedRateLimit,
  expressApiKeyAuth,

  // -- Phase 11: Advanced Error Handling (Advanced) --
  expressCentralError,
  expressAppError,
  expressErrorTypes,
  expressAsyncWrapper,
  expressProcessExceptions,
  expressErrorLogging,
  expressErrorShape,

  // -- Phase 12: Advanced Performance (Advanced) --
  expressRedisCaching,
  expressDbPooling,
  expressPagination,
  expressClustering,
  expressPm2,
  expressCacheControl,
  expressEventLoop,

  // -- Phase 13: Advanced Patterns & Features (Advanced) --
  expressSwagger,
  expressWebsockets,
  expressSse,
  expressGraphql,
  expressProxy,
  expressBullQueue,
  expressCron,
  expressGracefulShutdown,
  expressEnvConfig,
  expressHealthCheck,
  expressMultitenancy,

  // -- Phase 14: Advanced Testing (Advanced) --
  expressTestingJest,
  expressTestingSupertest,
  expressTestingMocking,
  expressTestingCoverage,

  // -- Phase 15: Advanced Deployment (Advanced) --
  expressProdEnv,
  expressNginx,
  expressSsl,
  expressDocker,
  expressSecrets,
  expressZeroDowntime,

  // -- Phase 16: MongoDB Fundamentals --
  mongodbBasics,
  mongodbVsSql,
  mongodbCreate,
  mongodbRead,
  mongodbUpdate,
  mongodbDelete,

  // -- Phase 17: Schema Design & Mongoose --
  mongodbDataModeling,
  mongodbRelOneToOne,
  mongodbRelOneToMany,
  mongodbRelManyToMany,
  mongodbMongooseBasics,
  mongodbMongooseAdvanced,

  // -- Phase 18: Querying & Operators --
  mongodbOpComparison,
  mongodbOpLogical,
  mongodbOpArray,
  mongodbProjection,
  mongodbPagination,
  mongodbQueryOptimization,

  // -- Phase 19: Aggregation Pipeline --
  mongodbAggIntro,
  mongodbAggMatchProject,
  mongodbAggGroup,
  mongodbAggLookup,
  mongodbAggStages,
  mongodbAggAdvanced,

  // -- Phase 20: Indexing & Performance --
  mongodbIdxIntro,
  mongodbIdxTypes,
  mongodbIdxText,
  mongodbIdxExplain,
  mongodbIdxStrategies,
  mongodbSpecialCollections,

  // -- Phase 21: Advanced MongoDB --
  mongodbTransactions,
  mongodbReplication,
  mongodbSharding,
  mongodbAtlas,
  mongodbMongoosePopulation,
  mongodbInterviewQa,
];

export const topicsByCategory = allTopics.reduce((accumulator, topic) => {
  if (!accumulator[topic.category]) {
    accumulator[topic.category] = [];
  }

  accumulator[topic.category].push(topic);
  return accumulator;
}, {});
