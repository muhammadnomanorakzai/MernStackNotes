export const dataTypes = {
  id: "data-types",
  title: "Data Types in JavaScript",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: [
    "primitives",
    "typeof",
    "null",
    "undefined",
    "string",
    "number",
    "boolean",
    "object",
    "symbol",
    "bigint",
  ],

  definition:
    "JavaScript has 8 data types: 7 primitive types and 1 non-primitive type called Object. The 7 primitives are string, number, bigint, boolean, undefined, null, and symbol. A primitive stores its value directly in memory. An object does not store its value directly — instead it stores a reference, which is like an address pointing to where the actual data lives in memory. This distinction controls how values are copied, compared, and passed to functions.",

  simpleExplanation:
    "Every piece of data in your JavaScript program has a type. The type tells JavaScript how to store the value, what operations are allowed on it, and how to compare it with other values. There are two categories. Primitives are simple values like a name, a number, or true/false — when you copy a primitive, you get a completely independent copy. Objects are complex values like arrays and user profiles — when you copy an object, both variables point to the same data in memory, so a change through one variable affects the other. Understanding this difference prevents some of the most common and confusing bugs in JavaScript.",

  romanUrduRevision:
    "JavaScript mein 8 data types hain. 7 primitive hain: string, number, bigint, boolean, undefined, null, symbol. 1 non-primitive hay: object — jis mein arrays, functions, dates sab shaamil hain. Primitive copy karo tu independent copy milti hay — ek badlo tu doosra nahi badlega. Object copy karo tu dono same memory location point karte hain — ek badlo tu doosra bhi badlega. typeof null returns 'object' — yeh 1995 ka bug hay jo abhi tak fix nahi hua. undefined ka matlab hay variable declare hua lekin value assign nahi ki. null ka matlab hay developer ne khud se empty set kiya.",

  why: "Every program works with data — user names, prices, true/false flags, lists of items. JavaScript needs to know the type of each value so it can decide how to store it in memory, what operations are valid, and how comparisons work. If you do not understand types, you will be confused when adding a number to a string gives you a string instead of a number, or when copying an object and editing the copy unexpectedly changes the original too. Types are the foundation of everything else in JavaScript — coercion, equality, function arguments, and memory management all depend on whether a value is primitive or non-primitive.",

  how: [
    "Step 1 — JavaScript reads your value — 'hello', 42, true, null, or undefined — and automatically assigns a type because JavaScript is dynamically typed. You do not declare types manually.",
    "Step 2 — Primitive values are stored directly in the stack — a fast, small memory area. The variable holds the actual value itself.",
    "Step 3 — Object values are stored in the heap — a larger memory area for complex data. The variable in the stack holds only a reference, which is like a memory address pointing to where the object lives in the heap.",
    "Step 4 — Use the typeof operator to check a value's type at runtime. It returns a lowercase string like 'string', 'number', 'boolean', 'object', 'undefined', 'function', 'symbol', or 'bigint'.",
    "Step 5 — typeof null returns 'object' — this is a famous bug from JavaScript's original 1995 implementation. null's internal type tag accidentally matched the object tag in the early engine. It was never fixed because changing it would break millions of old websites.",
    "Step 6 — When you copy a primitive, JavaScript creates a completely independent copy. Changing the copy has zero effect on the original.",
    "Step 7 — When you copy an object, JavaScript copies the reference, not the actual data. Both variables now point to the same object in memory. Changing the object through either variable affects both.",
    "Step 8 — The same rule applies when passing values to functions. Primitives are passed by value — the function gets a fresh copy. Objects are passed by reference — the function receives the same reference and can mutate the original object.",
  ],

  diagram: `
flowchart TD
  A[JavaScript Data Types] --> B[Primitive - 7 types]
  A --> C[Non-Primitive - Object]

  B --> D[String - 'hello' 'Noman']
  B --> E[Number - 42 3.14 Infinity NaN]
  B --> F[BigInt - 9999999999999999n]
  B --> G[Boolean - true false]
  B --> H[Undefined - declared but no value]
  B --> I[Null - intentionally empty]
  B --> J[Symbol - unique hidden key]

  C --> K[Plain Object - name age]
  C --> L[Array - list of items]
  C --> M[Function - reusable block]
  C --> N[Date RegExp Map Set]

  B --> O[Stored in STACK - stores actual value]
  C --> P[Stored in HEAP - variable holds reference address]

  O --> Q[Copy = independent value]
  P --> R[Copy = shared reference - both see changes]

  A --> S[typeof null = object - 1995 bug never fixed]
  A --> T[typeof function = function - special case]
  `,

  analogy:
    "Primitives are like writing a phone number directly on your own sticky note. You own that value. If you give a copy of your note to a friend and they change the number on their note, your note is completely unaffected — each note is independent. Objects are like sharing a Google Doc link. Both you and your friend have the link, but it points to the same document. If your friend edits the document, you open your link and see the exact same changes — because there is only one document and both links point to it. null is like deliberately writing 'empty' on your note — you made a conscious choice that this note has no phone number. undefined is like a blank sticky note that was never written on — it exists but nothing was ever put on it.",

  code: `
// ─── The 8 Data Types and typeof ─────────────────────────────────────────────

console.log(typeof "Noman");          // "string"
console.log(typeof 42);              // "number"
console.log(typeof 3.14);            // "number"   — no separate float type
console.log(typeof NaN);             // "number"   — NaN is still the number type
console.log(typeof 9999999999999n);  // "bigint"
console.log(typeof true);            // "boolean"
console.log(typeof undefined);       // "undefined"
console.log(typeof null);            // "object"   — famous 1995 bug
console.log(typeof Symbol("id"));    // "symbol"
console.log(typeof { name: "Ali" }); // "object"
console.log(typeof [1, 2, 3]);       // "object"   — arrays are objects
console.log(typeof function() {});   // "function" — special case for functions


// ─── Checking for null correctly ─────────────────────────────────────────────
// typeof null is "object" so you cannot use typeof to detect null

const value = null;
console.log(typeof value === "object" && value === null); // true — correct null check
console.log(value === null);                              // simplest null check


// ─── Checking for Array correctly ─────────────────────────────────────────────
// typeof [] is "object" so you cannot use typeof to detect arrays

const arr = [1, 2, 3];
console.log(typeof arr);          // "object" — not helpful
console.log(Array.isArray(arr));  // true — correct way to check for array


// ─── Primitive: Copy by Value ─────────────────────────────────────────────────
// Changing the copy does NOT affect the original

let a = 10;
let b = a;   // b gets an independent copy of the value 10
b = 20;      // only b changes

console.log(a); // 10 — a is completely unaffected
console.log(b); // 20


// ─── Object: Copy by Reference ────────────────────────────────────────────────
// Both variables point to the SAME object in memory

const user1 = { name: "Sara" };
const user2 = user1;        // user2 holds the same reference, not a new object

user2.name = "Ayesha";      // modifying through user2 changes the shared object

console.log(user1.name); // "Ayesha" — user1 also sees the change
console.log(user2.name); // "Ayesha"
console.log(user1 === user2); // true — they are literally the same object


// ─── How to properly copy an object ──────────────────────────────────────────

// Shallow copy — works for flat objects with no nested objects
const original = { name: "Noman", age: 25 };
const copy      = { ...original };  // spread creates a new object

copy.name = "Ali";
console.log(original.name); // "Noman" — unaffected, copy is independent

// BUT shallow copy does not protect nested objects
const deep = { name: "Noman", address: { city: "Peshawar" } };
const shallowCopy = { ...deep };

shallowCopy.address.city = "Islamabad"; // nested object is still shared
console.log(deep.address.city); // "Islamabad" — original affected!

// Deep copy — fully independent at every level
const deepCopy = structuredClone(deep); // modern way
deepCopy.address.city = "Lahore";
console.log(deep.address.city); // "Islamabad" — original safe


// ─── Pass by Value vs Pass by Reference in functions ─────────────────────────

// Primitive — function gets a copy, original is safe
function doubleIt(num) {
  num = num * 2; // only changes the local copy
}

let price = 100;
doubleIt(price);
console.log(price); // 100 — unchanged, function worked on a copy


// Object — function gets the reference, can mutate original
function addRole(user) {
  user.role = "admin"; // mutates the actual object in memory
}

const userProfile = { name: "Noman" };
addRole(userProfile);
console.log(userProfile.role); // "admin" — original was mutated


// ─── null vs undefined ────────────────────────────────────────────────────────

let declared;               // JavaScript sets this to undefined automatically
console.log(declared);      // undefined — exists but never assigned

let intentional = null;     // developer explicitly says "no value here"
console.log(intentional);   // null — conscious choice

console.log(typeof declared);   // "undefined"
console.log(typeof intentional); // "object" — the bug

console.log(declared == intentional);  // true  — loose equality treats them the same
console.log(declared === intentional); // false — strict equality, different types
  `,

  realLifeExample:
    "Think of a grocery list. Each item has a name (string), a price (number), and a flag for whether it's bought or not (boolean). The entire list itself is an object or an array. JavaScript uses these types to know that it can add prices up, but it can't add a name to a price in a way that makes sense mathematically.",

  commonMistakes: [
    {
      mistake: "Using typeof to check for null and getting 'object' instead",
      explanation:
        "typeof null returns 'object' — this is a JavaScript bug from 1995. If you write typeof value === 'object' to check if something is an object, null will pass that check even though null is not an object. Always add a separate null check when checking for objects.",
      wrong: `
function processUser(user) {
  if (typeof user === "object") {
    console.log(user.name); // TypeError if user is null — null passes typeof check
  }
}
processUser(null); // crashes — null passed the typeof check`,
      right: `
function processUser(user) {
  if (typeof user === "object" && user !== null) {
    console.log(user.name); // safe — null is excluded
  }
}
processUser(null); // safely ignored`,
    },
    {
      mistake: "Copying an object with = and expecting an independent copy",
      explanation:
        "Using = to copy an object does not create a new object. It copies the reference — both variables now point to the exact same object in memory. Any change through either variable affects both. Use spread {...obj} for a shallow copy or structuredClone() for a deep copy.",
      wrong: `
const settings = { theme: "dark", fontSize: 16 };
const userSettings = settings; // NOT a copy — same reference

userSettings.theme = "light";
console.log(settings.theme); // "light" — original changed unexpectedly`,
      right: `
const settings = { theme: "dark", fontSize: 16 };
const userSettings = { ...settings }; // shallow copy — new object

userSettings.theme = "light";
console.log(settings.theme); // "dark" — original is safe`,
    },
    {
      mistake: "Using typeof to check for arrays and getting 'object'",
      explanation:
        "Arrays are objects in JavaScript, so typeof [] returns 'object', not 'array'. If you want to check whether a value is specifically an array, always use Array.isArray().",
      wrong: `
const tags = ["js", "react", "node"];

if (typeof tags === "object") {
  // This is true for arrays, plain objects, AND null
  // You cannot tell if tags is an array or a plain object here
  tags.forEach(t => console.log(t)); // works here by luck, but the check is wrong
}`,
      right: `
if (Array.isArray(tags)) {
  tags.forEach(t => console.log(t)); // correct and safe
}`,
    },
    {
      mistake: "Confusing undefined and null and using them interchangeably",
      explanation:
        "undefined and null are different. undefined means a variable was declared but never assigned a value — JavaScript sets this automatically. null is a value you assign intentionally to say 'this is empty on purpose'. Mixing them up causes confusing bugs, especially with strict equality checks and API responses.",
      wrong: `
function getUser(id) {
  // Returning undefined when you mean "user not found" is confusing
  if (id < 0) return undefined;
}

const user = getUser(-1);
if (user === null) {
  console.log("user not found"); // never runs — got undefined, not null
}`,
      right: `
function getUser(id) {
  if (id < 0) return null; // intentional empty — "no user found"
}

const user = getUser(-1);
if (user === null) {
  console.log("user not found"); // correct
}`,
    },
  ],

  interviewQA: [
    {
      q: "What is the difference between primitive and non-primitive types in JavaScript?",
      a: "Primitives are string, number, bigint, boolean, undefined, null, and symbol. They store their value directly in memory and are immutable — you cannot change the value itself, only reassign the variable. Non-primitives are objects — including arrays, functions, and dates. They store a reference to a memory location in the heap. Primitives are compared by value — two variables holding the same number are equal. Objects are compared by reference — two objects with identical properties are not equal unless they are literally the same object in memory.",
    },
    {
      q: "Why does typeof null return 'object'?",
      a: "This is a bug from JavaScript's original 1995 implementation by Brendan Eich. In the early JavaScript engine, every value had an internal type tag stored in the lower bits of its memory representation. The type tag for objects was 000. null was represented as a null pointer, which also had all bits set to 000, so the typeof operator incorrectly classified it as an object. By the time this was discovered, the web was already built on it and fixing it would have broken too much existing code, so it was kept as-is.",
    },
    {
      q: "What is the difference between null and undefined?",
      a: "undefined means a variable has been declared but no value has ever been assigned to it. JavaScript sets variables to undefined automatically when they are declared without a value. null is an intentional assignment made by the developer to explicitly say 'this variable has no value right now' — it is a conscious choice. typeof undefined returns 'undefined'. typeof null returns 'object' due to the 1995 bug. In loose equality null == undefined is true, but in strict equality null === undefined is false because they are different types.",
    },
    {
      q: "What does pass by value vs pass by reference mean in JavaScript?",
      a: "When you pass a primitive to a function, JavaScript passes a copy of the value. The function works on its own independent copy and cannot affect the original variable. When you pass an object to a function, JavaScript passes the reference — the memory address of the object. The function receives access to the same object in memory and can mutate its properties, which affects the original. This is why functions that modify objects can have side effects while functions that modify primitive arguments cannot.",
    },
    {
      q: "How do you check if a value is null, an array, or NaN — since typeof fails for all three?",
      a: "For null, use value === null — strict equality is the correct check. For arrays, use Array.isArray(value) — typeof returns 'object' for arrays so it is useless here. For NaN, use Number.isNaN(value) — the global isNaN() coerces its argument first so it gives wrong results for strings, while Number.isNaN() checks without coercion and only returns true for actual NaN values. These three are the most common typeof traps in interviews.",
    },
    {
      q: "What is the difference between a shallow copy and a deep copy of an object?",
      a: "A shallow copy creates a new object but only copies the top-level properties. If any property value is itself an object, the shallow copy stores a reference to that same nested object — not a copy of it. So changes to nested objects still affect the original. A deep copy creates a completely independent copy at every level of nesting. The modern way to deep copy is structuredClone(obj) which is built into modern browsers and Node.js. For simple flat objects with no nested data, spread syntax {...obj} is sufficient.",
    },
  ],

  interviewSummary:
    "JavaScript has 8 data types — 7 primitives (string, number, bigint, boolean, undefined, null, symbol) and 1 non-primitive (object, which includes arrays and functions). Primitives are stored by value in the stack — copying creates an independent value. Objects are stored by reference in the heap — copying shares the same memory location. typeof null returns 'object' — this is a 1995 bug, not intentional behavior. typeof [] returns 'object' and typeof NaN returns 'number' — both are common interview traps. Correct checks: value === null for null, Array.isArray() for arrays, Number.isNaN() for NaN. undefined means never assigned — set automatically by JavaScript. null means intentionally empty — set deliberately by the developer. Pass by value means functions get a copy of primitives and cannot affect the original. Pass by reference means functions get the same object reference and can mutate the original. Shallow copy with spread {...obj} works for flat objects. Deep copy with structuredClone() is needed for nested objects.",
};
