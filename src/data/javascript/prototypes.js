export const prototypes = {
  id: "prototypes",
  title: "Prototypes & Prototype Chain",
  category: "JavaScript",
  difficulty: "Advanced",
  tags: [
    "prototype",
    "prototype chain",
    "__proto__",
    "Object.create",
    "inheritance",
    "class",
    "constructor function",
  ],

  definition:
    "In JavaScript, every object has an internal hidden link to another object called its prototype. When you try to access a property that does not exist on the current object, JavaScript looks for it in the prototype chain. This process continues until it finds the property or reaches null.",

  simpleExplanation:
    "JavaScript objects do not work alone. Every object is connected to another object through a hidden link called prototype.\n\nWhen you access a property, JavaScript first checks the object itself. If it does not find the property there, it goes to the object's prototype. If it still does not find it, it keeps moving up the chain until it reaches null.\n\nThis mechanism is called prototype chain and it is the core of inheritance in JavaScript. It allows objects to share behavior instead of copying everything again and again.",

  romanUrduRevision:
    "Har JavaScript object ke andar ek hidden link hota hai jise prototype kehte hain.\n\nJab koi property milti nahi hai to JavaScript us object ke prototype ko check karta hai aur upar upar jaata hai jab tak value mil na jaye ya null na aa jaye.",

  why: "JavaScript uses prototypes to implement inheritance in a lightweight way. Instead of copying methods into every object, JavaScript stores shared methods in prototype objects. This improves memory efficiency and allows powerful reuse of code across arrays, objects, functions, and classes.",

  how: [
    "Step 1 - Every object has an internal [[Prototype]] reference",
    "Step 2 - Object literals link to Object.prototype",
    "Step 3 - Arrays link to Array.prototype which itself links to Object.prototype",
    "Step 4 - Property lookup starts from the object itself",
    "Step 5 - If not found, JavaScript moves to prototype object",
    "Step 6 - This process continues until property is found or null is reached",
    "Step 7 - Constructor functions use their prototype for shared methods",
    "Step 8 - Class syntax is syntactic sugar over prototype-based inheritance",
    "Step 9 - Object.create allows manual prototype assignment",
  ],

  diagram: `
flowchart TD
  A[Instance Object]

  A --> B[Own Properties]
  A --> C[Prototype Object]

  C --> D[Parent Prototype]
  D --> E[Object.prototype]
  E --> F[null - End of Chain]

  A --> G[Property Lookup Flow]
  G --> H[Check Own Object]
  H --> I[Check Prototype]
  I --> J[Move Up Chain]
  J --> K[Stop when found or null]
  `,

  realLifeExample:
    "Think of a student solving a problem.\nFirst, the student checks their own notebook. If they do not find the answer, they ask their teacher. If the teacher does not know, they ask the principal.\nEach level represents a prototype chain where JavaScript keeps searching until it finds the value or reaches the top.",

  analogy:
    "The prototype chain is like a family tree of knowledge.\nYou first look at yourself, then your parents, then grandparents. If something is not found, you keep going up the family hierarchy until there is no one left.",

  code: `
const arr = [];

console.log(arr.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true

// Constructor function example
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  return "Hi " + this.name;
};

const ali = new Person("Ali");
console.log(ali.sayHi());

// Class example (same prototype system)
class Animal {
  speak() {
    return "sound";
  }
}

const cat = new Animal();
console.log(Object.getPrototypeOf(cat) === Animal.prototype);

// Object.create example
const proto = { role: "admin" };

const user = Object.create(proto);
user.name = "Sara";

console.log(user.role); // inherited
console.log(user.hasOwnProperty("role")); // false
console.log("role" in user); // true
  `,

  commonMistakes: [
    "Thinking methods are copied into every object instance",
    "Confusing __proto__ with prototype property",
    "Not understanding that class is just prototype-based syntax",
    "Assuming Object.prototype has null prototype",
    "Forgetting inherited properties are not own properties",
    "Using __proto__ instead of Object.getPrototypeOf",
    "Not understanding prototype chain lookup order",
  ],

  interviewQA: [
    {
      q: "What is a prototype in JavaScript?",
      a: "A prototype is an object that other objects inherit properties and methods from through the prototype chain.",
    },
    {
      q: "What is the prototype chain?",
      a: "It is the chain of objects that JavaScript traverses when a property is not found on the current object.",
    },
    {
      q: "What is the difference between __proto__ and prototype?",
      a: "__proto__ is the internal link of an object, while prototype is a property on constructor functions used for inheritance.",
    },
    {
      q: "How does JavaScript inheritance work?",
      a: "JavaScript uses prototype-based inheritance where objects delegate property access to their prototype chain instead of copying properties.",
    },
    {
      q: "What is at the end of the prototype chain?",
      a: "Object.prototype is the last prototype in the chain, and its prototype is null, which marks the end of lookup.",
    },
  ],

  realWorldUsage: [
    "Array methods like map, filter, reduce come from Array.prototype",
    "String methods come from String.prototype",
    "Object methods like hasOwnProperty come from Object.prototype",
    "Class inheritance in modern JavaScript",
    "Reusable method sharing in libraries and frameworks",
    "Performance optimization by avoiding method duplication",
  ],

  interviewSummary: [
    "Every object has a hidden prototype link.",
    "Prototype chain is used for property lookup.",
    "Lookup continues until property is found or null.",
    "Classes are built on prototype system.",
    "Methods are shared, not copied.",
    "__proto__ is instance link, prototype is constructor property.",
    "Object.prototype is the end of chain.",
  ],
};
