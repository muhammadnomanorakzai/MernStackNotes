export const mapSet = {
  id: "map-set",
  title: "Map & Set",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "Map",
    "Set",
    "WeakMap",
    "WeakSet",
    "unique values",
    "key-value",
    "iterable",
    "insertion order",
    "O(1) lookup",
    "deduplication",
  ],

  definition:
    "Map and Set are two built-in JavaScript data structures introduced in ES6. A Map is a collection of key-value pairs — just like a plain object — but with one important difference: Map allows any type of key, not just strings. You can use objects, functions, numbers, or even null as keys and they will never be converted or lost. A Set is a collection of values where every value must be unique. If you try to add a duplicate, it is silently ignored. Both Map and Set remember the order in which items were added and provide fast O(1) lookup performance.",

  simpleExplanation:
    "Imagine you are building a contact list app. With a plain object, every contact name gets converted to a string key — that works fine for simple cases. But what if you want to use the actual user object as the key, not just their name as a string? That is where Map comes in. Map lets you use anything as a key and never changes it. Now imagine you are collecting tags from blog posts — 'javascript', 'react', 'javascript', 'node'. You want only unique tags. Instead of writing a manual filter loop, you just throw the array into a Set and duplicates vanish automatically. These are the two problems Map and Set were designed to solve.",

  romanUrduRevision:
    "Map ek key-value collection hay jahan key koi bhi type ho sakti hay — string, number, object, ya function. Plain object mein keys hamesha string ban jati hain. Map mein exact reference save hoti hay. map.set() se add karo, map.get() se nikalo, map.has() se check karo, map.size se count lo. Set ek unique values ki collection hay — duplicate add karo tu kuch nahi hota, silently ignore ho jata hay. set.add() se add karo, set.has() se check karo. Deduplication ke liye [...new Set(array)] — yeh ek liner interview mein zaroor poocha jata hay. WeakMap aur WeakSet same hain lekin weak references rakhte hain — garbage collector object ko free kar sakta hay even if it is still in the WeakMap.",

  why: "Plain objects have three problems that become painful in real applications. First, every key gets coerced to a string — if you use an object as a key, it becomes '[object Object]' and all object keys collide into one. Second, objects do not have a reliable .size property — you have to use Object.keys(obj).length which is slower. Third, checking if a value exists in an array uses Array.includes() which scans every element one by one — that is O(n) and gets slow with large data. Map solves the first two problems. Set solves the third. Together they give you the right tool for key-value storage with any key type, and fast uniqueness or membership checking.",

  how: [
    "Step 1 — Create a Map with new Map(). You can also pass an array of [key, value] pairs to initialize it: new Map([['name', 'Noman'], ['age', 25]]).",
    "Step 2 — Add entries with map.set(key, value). The key can be any type — string, number, object, function, null, anything.",
    "Step 3 — Read entries with map.get(key). You must pass the exact same reference for object keys — a new object with the same properties is a different key.",
    "Step 4 — Check existence with map.has(key) which returns true or false. Use map.delete(key) to remove one entry. Use map.clear() to remove all entries.",
    "Step 5 — Get the count with map.size — this is a direct property, not a method like Object.keys().length.",
    "Step 6 — Iterate with for...of loop. map.keys() gives all keys, map.values() gives all values, map.entries() gives [key, value] pairs — all in insertion order.",
    "Step 7 — Create a Set with new Set(). Pass any iterable to initialize it: new Set([1, 2, 2, 3]) gives you {1, 2, 3}.",
    "Step 8 — Add values with set.add(value). Duplicates are silently ignored — no error, no change.",
    "Step 9 — Check membership with set.has(value) — this is O(1), much faster than Array.includes() which is O(n).",
    "Step 10 — Deduplicate an array in one line: [...new Set(array)]. This is the most common Set use case in interviews.",
    "Step 11 — For set operations use spread and filter: union is new Set([...setA, ...setB]), intersection is new Set([...setA].filter(x => setB.has(x))).",
    "Step 12 — Use WeakMap when you want to associate data with an object but do not want to prevent garbage collection. Common use: storing private data for class instances.",
  ],

  diagram: `
flowchart TD
  A[You have key-value data] --> B{What type are the keys?}
  B --> C[Only string keys - simple record]
  B --> D[Object, function, number keys needed]
  C --> E[Use plain object - simpler syntax]
  D --> F[Use Map - preserves key identity]

  F --> G[map.set key value]
  G --> H[map.get key - exact reference lookup]
  H --> I[map.has key - O1 check]
  I --> J[map.size - direct count]

  K[You have an array with duplicates] --> L[new Set array]
  L --> M[Duplicates automatically removed]
  M --> N[Spread back - unique array]

  O[Membership check needed] --> P{Array or Set?}
  P --> Q[Array.includes - scans every element - ON]
  P --> R[Set.has - hash lookup - O1]
  R --> S[Use Set for large collections]

  T[WeakMap and WeakSet] --> U[Same as Map and Set]
  U --> V[BUT keys are weak references]
  V --> W[Garbage collector can free the object]
  W --> X[Good for private class data and caching]
  `,

  analogy:
    "Think of a plain object as a coat check at a restaurant where every item must have a name tag written in English — numbers and special items get relabeled and you might lose track of which coat was whose. A Map is a professional coat check where each item gets a unique numbered token — you can check in any item including a bag of cash or a pet carrier and you will get back exactly the right thing using that token. A Set is like a guest list with a smart bouncer. The bouncer has a photographic memory — if Ali tries to enter twice, the bouncer recognizes him immediately and turns him away without making a scene. WeakMap is like a coat check that automatically clears unclaimed items — if the owner leaves the building and nobody holds a reference to them anymore, their coat slot gets freed up automatically.",

  realLifeExample:
    "Imagine you are building a social media app. You have an array of 5,000 'like' notifications, but some users liked twice and then unliked. To show a clean list of unique users who liked your post, just put all the User IDs into a Set. In one step, all duplicates are gone, and you can show the 'Liked by' count instantly.",

  code: `
// ─── MAP: Basic Usage ─────────────────────────────────────────────────────────

const map = new Map();

// Keys can be ANY type — object, function, number, null
const userObj = { id: 1, name: "Noman" };
const userFn  = () => "user";

map.set(userObj, "profile data for this exact object");
map.set(userFn,  "metadata for this function");
map.set(42,      "data stored under the number 42");
map.set("name",  "regular string key also works");

console.log(map.get(userObj));  // "profile data for this exact object"
console.log(map.get(42));       // "data stored under the number 42"
console.log(map.has("name"));   // true
console.log(map.size);          // 4

map.delete(42);
console.log(map.size);          // 3


// ─── MAP: Initialize with data ────────────────────────────────────────────────

const config = new Map([
  ["theme",    "dark"],
  ["language", "en"],
  ["fontSize", 16],
]);

console.log(config.get("theme")); // "dark"


// ─── MAP: Iteration in insertion order ────────────────────────────────────────

for (const [key, value] of config) {
  console.log(key, "→", value);
}
// theme → dark
// language → en
// fontSize → 16

// Convert Map to plain object when needed
const configObj = Object.fromEntries(config);
console.log(configObj); // { theme: 'dark', language: 'en', fontSize: 16 }

// Convert plain object to Map
const settingsMap = new Map(Object.entries(configObj));


// ─── MAP: Real use case — frequency counter ───────────────────────────────────
// Count how many times each word appears

const words  = ["js", "react", "js", "node", "react", "js"];
const freq   = new Map();

for (const word of words) {
  freq.set(word, (freq.get(word) ?? 0) + 1);
}

console.log(freq.get("js"));    // 3
console.log(freq.get("react")); // 2
console.log(freq.get("node"));  // 1


// ─── SET: Basic Usage ─────────────────────────────────────────────────────────

const set = new Set([1, 2, 3, 2, 1]); // duplicates ignored on creation
console.log(set);       // Set {1, 2, 3}
console.log(set.size);  // 3

set.add(4);
set.add(2); // already exists — silently ignored
console.log(set.size);  // 4

console.log(set.has(3)); // true
console.log(set.has(9)); // false

set.delete(1);
console.log(set.size);  // 3


// ─── SET: Most common interview use case — deduplication ──────────────────────

const rawTags    = ["js", "react", "js", "node", "react", "js"];
const uniqueTags = [...new Set(rawTags)];
console.log(uniqueTags); // ["js", "react", "node"]

// Remove duplicate IDs from an API response
const ids       = [1, 2, 3, 2, 1, 4];
const uniqueIds = [...new Set(ids)];
console.log(uniqueIds); // [1, 2, 3, 4]


// ─── SET: Set operations — union, intersection, difference ────────────────────

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Union — all values from both sets
const union        = new Set([...setA, ...setB]);
console.log([...union]);        // [1, 2, 3, 4, 5, 6]

// Intersection — only values that exist in BOTH sets
const intersection = new Set([...setA].filter(x => setB.has(x)));
console.log([...intersection]); // [3, 4]

// Difference — values in setA but NOT in setB
const difference   = new Set([...setA].filter(x => !setB.has(x)));
console.log([...difference]);   // [1, 2]


// ─── SET vs ARRAY: Performance difference ────────────────────────────────────

const millionItems = new Set(Array.from({ length: 1_000_000 }, (_, i) => i));
const millionArr   = Array.from({ length: 1_000_000 }, (_, i) => i);

// Set.has() is O(1) — instant regardless of size
console.time("Set.has");
millionItems.has(999_999);
console.timeEnd("Set.has"); // ~0.01ms

// Array.includes() is O(n) — scans every element
console.time("Array.includes");
millionArr.includes(999_999);
console.timeEnd("Array.includes"); // ~5ms or more


// ─── WEAKMAP: Private class data ─────────────────────────────────────────────
// WeakMap allows object keys to be garbage collected when no other reference exists

const _private = new WeakMap();

class BankAccount {
  constructor(owner, balance) {
    // Store private data in WeakMap — not on the instance
    _private.set(this, { balance });
    this.owner = owner;
  }

  deposit(amount) {
    const data = _private.get(this);
    data.balance += amount;
  }

  getBalance() {
    return _private.get(this).balance;
  }
}

const account = new BankAccount("Noman", 1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
console.log(account.balance);      // undefined — truly private
// When 'account' is garbage collected, WeakMap entry is freed automatically
  `,

  ommonMistakes: [
    {
      mistake:
        "Using a new object literal as a Map key and expecting to retrieve the value",
      explanation:
        "Map uses object identity for keys — it compares by reference, not by value. If you set a value using one object and try to get it using a different object with the same properties, you will get undefined. You must use the exact same object reference.",
      wrong: `
const map = new Map();
map.set({ id: 1 }, "Noman");

// This is a DIFFERENT object in memory — same properties but different reference
console.log(map.get({ id: 1 })); // undefined — wrong`,
      right: `
const map = new Map();
const key = { id: 1 }; // save the reference

map.set(key, "Noman");
console.log(map.get(key)); // "Noman" — correct, same reference`,
    },
    {
      mistake: "Using an object instead of a Map when keys are not strings",
      explanation:
        "When you use a non-string key on a plain object, JavaScript converts it to a string by calling .toString(). Objects become '[object Object]', so all object keys collide into one slot and overwrite each other. Always use Map when your keys are not plain strings.",
      wrong: `
const obj = {};
const keyA = { type: "admin" };
const keyB = { type: "user" };

obj[keyA] = "admin data";
obj[keyB] = "user data";

console.log(obj); // { '[object Object]': 'user data' }
// keyA and keyB both became '[object Object]' — keyB overwrote keyA`,
      right: `
const map = new Map();
map.set(keyA, "admin data");
map.set(keyB, "user data");

console.log(map.get(keyA)); // "admin data" — preserved correctly
console.log(map.get(keyB)); // "user data"  — preserved correctly`,
    },
    {
      mistake: "Checking Set membership with == or === instead of .has()",
      explanation:
        "A Set does not expose its values as array indexes. You cannot check if a value exists using bracket notation or a comparison operator. Always use set.has() which is O(1) and works correctly.",
      wrong: `
const tags = new Set(["js", "react", "node"]);

if (tags["js"]) { } // undefined — wrong, Set is not an object with string keys
if (tags == "js") { } // always false — comparing Set to string`,
      right: `
const tags = new Set(["js", "react", "node"]);

if (tags.has("js")) {
  console.log("js found!"); // correct — O(1) lookup
}`,
    },
    {
      mistake: "Confusing WeakMap with Map and expecting iteration to work",
      explanation:
        "WeakMap and WeakSet are NOT iterable. You cannot loop over them, check their size, or get all keys. This is intentional — because entries can be garbage collected at any time, exposing them through iteration would be unpredictable. Use WeakMap only for private data storage tied to object lifetimes.",
      wrong: `
const wm = new WeakMap();
wm.set({}, "value");

console.log(wm.size);     // undefined — WeakMap has no size
for (const [k, v] of wm) // TypeError — WeakMap is not iterable`,
      right: `
// WeakMap is only for storing data tied to an object reference
const cache = new WeakMap();

function process(obj) {
  if (cache.has(obj)) return cache.get(obj); // return cached result
  const result = expensiveOperation(obj);
  cache.set(obj, result);
  return result;
}
// When obj is garbage collected, cache entry is freed automatically`,
    },
  ],

  interviewQA: [
    {
      q: "What is the difference between Map and a plain object?",
      a: "Map allows any type of key — objects, functions, numbers, null — without converting them to strings. Plain objects coerce all keys to strings, so object keys become '[object Object]' and collide. Map has a .size property that gives the count directly. Map is directly iterable with for...of and preserves insertion order reliably. Plain objects are best for simple records with known string keys like API responses. Map is better for dynamic key-value storage where keys are not plain strings.",
    },
    {
      q: "What is a Set and what is its most common use case?",
      a: "A Set is a collection of unique values where duplicates are automatically ignored. You cannot add the same value twice — the second add is silently skipped. The most common use case in interviews and real code is deduplicating an array in one line: [...new Set(array)]. The second most common use is fast membership checking with set.has() which is O(1) compared to Array.includes() which is O(n).",
    },
    {
      q: "What is the time complexity of Set.has() vs Array.includes()?",
      a: "Set.has() is O(1) — it uses a hash-based lookup that finds the value in constant time regardless of how many items are in the Set. Array.includes() is O(n) — it scans every element from the beginning until it finds a match or reaches the end. For large collections or frequent membership checks, Set is significantly faster. If you have a million items and need to check membership repeatedly, use a Set.",
    },
    {
      q: "Can you use an object as a Map key? How does lookup work?",
      a: "Yes. Map uses object identity for key comparison — it compares by reference, not by value. You must use the exact same object reference to retrieve the stored value. A new object with identical properties is a completely different key and will return undefined. This is actually useful — you can attach metadata to any object without modifying the object itself, and the data stays associated with that exact object instance.",
    },
    {
      q: "What is WeakMap and when would you use it?",
      a: "WeakMap is like Map but it holds weak references to its keys. This means if no other variable holds a reference to the key object, the garbage collector can free that object and WeakMap automatically removes the entry. WeakMap is not iterable and has no .size property. Use it for storing private data associated with class instances — the classic pattern is const _private = new WeakMap() outside the class, then _private.set(this, data) in the constructor. When the instance is garbage collected, its private data is freed automatically too.",
    },
    {
      q: "How do you perform union, intersection, and difference operations on Sets?",
      a: "Union combines all unique values from both sets: new Set([...setA, ...setB]). Intersection keeps only values that exist in both: new Set([...setA].filter(x => setB.has(x))). Difference keeps values from setA that are not in setB: new Set([...setA].filter(x => !setB.has(x))). The key insight is that you spread the Set into an array for filtering, then wrap back in new Set to get unique values. The filter uses setB.has() which is O(1) making these operations efficient.",
    },
    {
      q: "How do you convert between Map and plain object?",
      a: "To convert a plain object to a Map, use new Map(Object.entries(obj)) — Object.entries gives you an array of [key, value] pairs which is exactly what Map's constructor accepts. To convert a Map back to a plain object, use Object.fromEntries(map) — this works because Map is iterable and yields [key, value] pairs. Note that this only works cleanly when all Map keys are strings or symbols — object and function keys cannot be represented as object properties.",
    },
  ],

  interviewSummary:
    "Map is a key-value collection where keys can be any type — strings, numbers, objects, functions — without coercion. Use map.set(), map.get(), map.has(), map.delete(), and map.size. Map iterates in insertion order. Set is a collection of unique values — duplicates are silently ignored. Use set.add(), set.has(), set.delete(). Deduplicate arrays with [...new Set(array)]. Set.has() is O(1) vs Array.includes() which is O(n) — use Set for frequent membership checks on large data. Map vs plain object: plain objects coerce keys to strings and have no .size — use Map when keys are not plain strings. WeakMap and WeakSet hold weak references — garbage collector can free entries when the key object has no other references. WeakMap is not iterable and has no .size. Common use: private class instance data. Set operations: union with spread, intersection and difference with filter and has(). Most common interview asks: deduplicate an array, frequency counter with Map, explain WeakMap vs Map, Set.has() O(1) vs Array.includes() O(n).",
};
