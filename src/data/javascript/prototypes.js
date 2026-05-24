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
    "Every JavaScript object has a hidden prototype link to another object. When a property is missing on the object itself, JavaScript walks up that chain until it finds the property or reaches null.",

  why:
    "JavaScript uses prototypes for inheritance and method sharing. Instead of copying methods into every instance, shared behavior lives on prototype objects, which is why arrays, functions, and plain objects all inherit built in methods.",

  how: [
    "Step 1 - Objects created with literals link to Object.prototype",
    "Step 2 - Arrays link to Array.prototype which links to Object.prototype",
    "Step 3 - Property lookup checks own properties first",
    "Step 4 - If missing, lookup moves to the current prototype object",
    "Step 5 - Lookup continues upward until a match is found or null is reached",
    "Step 6 - Constructor functions use their prototype object for instances created with new",
    "Step 7 - Class syntax is built on the same prototype mechanism",
    "Step 8 - Object.create lets you choose a specific prototype directly",
  ],

  diagram: `
flowchart TD
  A[dog instance name breed] --> B[Dog prototype bark eat]
  B --> C[Animal prototype breathe sleep]
  C --> D[Object prototype toString hasOwnProperty]
  D --> E[null end of chain]
  A --> F[Lookup walks up prototype links]
  `,

  analogy:
    "Think of a family recipe book passed through generations. You check your own notes first. If the recipe is not there, you ask your parent, then your grandparent. Array methods like map live in the array family recipe book, not inside each specific array instance.",

  code: `
const arr = [];
console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__ === Object.prototype); // true

function Person(name) { this.name = name; }
Person.prototype.sayHi = function () { return "Hi " + this.name; };
const ali = new Person("Ali");
console.log(ali.sayHi());

class Animal {
  speak() { return "sound"; }
}
const cat = new Animal();
console.log(Object.getPrototypeOf(cat) === Animal.prototype); // true

const proto = { role: "admin" };
const user = Object.create(proto);
user.name = "Sara";
console.log("role" in user, user.hasOwnProperty("role")); // true false
  `,

  interviewQA: [
    {
      q: "What is the prototype chain?",
      a: "It is the linked chain of objects JavaScript searches when a property is not found on the current object. Lookup starts on the object itself, moves through each prototype, and stops at null.",
    },
    {
      q: "What is the difference between __proto__ and prototype?",
      a: "__proto__ is an instance side accessor that points to an object's actual prototype link. prototype is a property on constructor functions and classes that becomes the prototype for instances created with new.",
    },
    {
      q: "How does class syntax relate to prototypes?",
      a: "Class syntax is just a cleaner layer over JavaScript's existing prototype system. Methods declared in a class are stored on the class prototype object and shared by all instances.",
    },
    {
      q: "What is the end of the prototype chain?",
      a: "Object.prototype is the final common object for normal objects, and its own prototype is null. That null marks the end of property lookup.",
    },
  ],
};
