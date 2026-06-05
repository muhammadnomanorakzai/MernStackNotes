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
    "Map is a key-value collection where keys can be any type, not just strings or symbols. Set is a collection of unique values where duplicates are automatically ignored.",

  why:
    "Plain objects coerce most keys to strings, lack a direct size property, and are not ideal for frequent add/delete operations. Arrays require O(n) membership checks. Map and Set are purpose-built collections for reliable keys, uniqueness, fast lookup, and clean iteration.",

  how: [
    "new Map() creates an ordered key-value collection",
    "map.set(key, value), map.get(key), map.has(key), and map.delete(key) manage entries",
    "Map keys preserve identity, so objects and functions can be keys without string coercion",
    "map.size gives the number of entries and for...of iterates entries in insertion order",
    "new Set(iterable) creates a unique-value collection",
    "set.add(value), set.has(value), and set.delete(value) manage values",
    "Use [...new Set(array)] to deduplicate arrays",
    "Use Map for dynamic key-value storage and Set for uniqueness or fast membership checks",
  ],

  diagram: `
flowchart TD
  A[Plain Object Keys] --> B[Keys become strings]
  B --> C[Object key can lose identity]
  D[Map Keys] --> E[Numbers objects functions preserved]
  E --> F[Exact reference lookup]
  G[Array with duplicates] --> H[new Set array]
  H --> I[Unique Set values]
  I --> J[Spread back to unique array]
  `,

  analogy:
    "A plain object is a notebook where every tab label must be a word. A Map lets tabs be anything: a photo, number, function, or object. A Set is like a guest list with a duplicate detector. If Ali is already on the list, adding Ali again changes nothing.",

  code: `
const map = new Map();
const userObj = { id: 1 };
const userFn = () => "user";

map.set(userObj, "metadata for this object");
map.set(userFn, "metadata for this function");
map.set(42, "metadata for number 42");

console.log(map.get(userObj)); // exact same object reference
console.log(map.size); // 3

const rawTags = ["js", "react", "js", "node", "react"];
const uniqueTags = [...new Set(rawTags)];
console.log(uniqueTags); // ["js", "react", "node"]

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5]);
const union = new Set([...setA, ...setB]);
const intersection = new Set([...setA].filter((x) => setB.has(x)));
console.log(union, intersection);
  `,

  interviewQA: [
    {
      q: "What is the difference between Map and a plain object?",
      a: "Map allows any key type without coercion, has a .size property, preserves insertion-order iteration, avoids prototype pollution issues, and is directly iterable. Plain objects are best for simple records with known string keys.",
    },
    {
      q: "What is a Set and what is its most common use case?",
      a: "A Set is a collection of unique values. Its most common use is deduplicating an array with [...new Set(array)], and it also provides fast membership checks with .has().",
    },
    {
      q: "What is the time complexity of Set.has() vs Array.includes()?",
      a: "Set.has() is generally O(1), like a hash lookup. Array.includes() is O(n) because it scans elements one by one, so Set is much better for frequent checks in large collections.",
    },
    {
      q: "Can you use an object as a Map key?",
      a: "Yes. Map uses object identity, not value equality. You must use the exact same object reference to retrieve the value; a new object with the same properties is a different key.",
    },
  ],
};
