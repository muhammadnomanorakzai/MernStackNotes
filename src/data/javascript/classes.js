export const classes = {
  id: "classes",
  title: "Classes & OOP in JavaScript",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "class",
    "constructor",
    "extends",
    "super",
    "static",
    "private fields",
    "inheritance",
    "OOP",
    "prototype",
    "getter",
    "setter",
  ],

  definition:
    "A class in JavaScript is a blueprint for creating objects. It was introduced in ES6 and gives us a clean, readable way to write object-oriented code. Behind the scenes, JavaScript still uses its old prototype system — classes are just a nicer way to write the same thing. A class can have a constructor to set up initial values, methods that all objects share, private fields that nobody outside can touch, and the ability to extend another class to inherit its behavior.",

  simpleExplanation:
    "Think of a class like a house blueprint. The blueprint itself is not a house — it just describes how to build one. Every time you use new, you build an actual house from that blueprint. If you want a luxury version with extra rooms, you extend the blueprint. Static methods are tools that belong to the architect, not to any specific house. Private fields are locked rooms that only the blueprint defines — no outsider can open them.",

  romanUrduRevision:
    "Class ek blueprint hay jaise ghar ka naqsha. new use karo tu actual object banta hay. extends matlab parent class se features lo aur apne features add karo. super() parent ka constructor chalata hay — child constructor mein pehle super() likhna zaroori hay warna error ata hay. static methods class ke apne hote hain, kisi object ke nahi. Private fields # se shuru hoti hain aur sirf class ke andar access hoti hain.",

  why: "Before ES6, writing object-oriented JavaScript was messy. Developers had to manually set up constructor functions and wire prototypes together, which was confusing and hard to read. Classes fix this. They give you a clean structure where everything — the initial setup, shared methods, inheritance, and private data — is written in one organized place. This makes your code easier to read, reuse, and explain to other developers.",

  how: [
    "Step 1 — Write class ClassName to declare a reusable blueprint. Internally it is still a function, but the syntax is much cleaner.",
    "Step 2 — The constructor() method runs automatically the moment you call new ClassName(). It sets up the initial properties of the object.",
    "Step 3 — Methods you write inside the class body are placed on ClassName.prototype automatically. This means all instances share one copy instead of each having their own.",
    "Step 4 — Use extends to make one class inherit from another. The child class gets all the parent's methods for free.",
    "Step 5 — In a child constructor, you must call super() before using this. It runs the parent constructor first to set up the inherited part of the object.",
    "Step 6 — Static methods are defined with the static keyword. You call them on the class itself like Animal.create(), not on an object instance.",
    "Step 7 — Private fields use the # symbol like #balance or #name. JavaScript enforces this at the language level — no code outside the class can read or write them.",
    "Step 8 — Getters and setters let you access a private field like a normal property while running validation or extra logic behind the scenes.",
  ],

  diagram: `
flowchart TD
  A[Animal - Base Class] --> B[Private Fields: #name, #age]
  A --> C[Methods: eat, sleep, toString]
  A --> D[Static: Animal.create()]
  E[Dog extends Animal] --> F[Inherits: eat, sleep, toString]
  E --> G[Adds: breed, bark, fetch]
  A --> E
  E --> H[new Dog - creates dogInstance]
  H --> I[Own properties: name, age, breed]
  H --> J[Prototype Chain Lookup]
  J --> K[Dog.prototype]
  K --> L[Animal.prototype]
  L --> M[Object.prototype]
  M --> N[null - end of chain]
  `,

  analogy:
    "Imagine a class as a house blueprint kept by an architect. The blueprint describes how many rooms there are, where the kitchen goes, and what the structure looks like. When you say new, a construction company builds an actual house following that blueprint. If you want a luxury version, you extend the blueprint — it starts with everything from the original and adds a swimming pool and rooftop. Static methods are tools like measuring tape that belong to the architect's office, not to any single house. Private fields are locked storage rooms — only the blueprint specifies who can access them, and nobody else can break in.",

  realLifeExample:
    "Think of a 'User Management' system. You have a 'User' class for everyone. Then you have an 'Admin' class that 'extends' User because admins are people too, but they have extra powers like 'deleteUser'. You don't rewrite the login/logout logic for Admin; you just inherit it from the User class.",

  code: `
// ─── Base Class with Private Fields, Getter, Setter ─────────────────────────

class Animal {
  // Private fields — only accessible inside this class
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age  = age;
  }

  // Getter — read #name like a normal property: animal.name
  get name() {
    return this.#name;
  }

  // Setter — validate before saving: animal.age = 25
  set age(value) {
    if (value < 0) throw new RangeError("Age cannot be negative");
    this.#age = value;
  }

  // Instance method — shared on Animal.prototype
  eat() {
    return this.#name + " is eating";
  }

  // Static method — belongs to the class, not any instance
  // Usage: Animal.create("Leo", 5)
  static create(name, age) {
    return new Animal(name, age);
  }
}


// ─── Child Class using extends and super ─────────────────────────────────────

class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age); // must come first — sets up the Animal part
    this.breed = breed;
  }

  bark() {
    // this.name works because we have a getter on Animal
    return this.name + " says: Woof!";
  }

  fetch(item) {
    return this.name + " fetched the " + item + "!";
  }
}


// ─── Usage Examples ───────────────────────────────────────────────────────────

const dog = new Dog("Buddy", 3, "Labrador");

console.log(dog.bark());           // Buddy says: Woof!
console.log(dog.eat());            // Buddy is eating  (inherited from Animal)
console.log(dog.fetch("ball"));    // Buddy fetched the ball!
console.log(dog instanceof Dog);   // true
console.log(dog instanceof Animal);// true  (inheritance chain)
console.log(typeof Dog);           // "function"  (classes are functions under the hood)

dog.age = 4;                       // setter runs validation
// dog.age = -1;                   // throws RangeError: Age cannot be negative
// dog.#name;                      // SyntaxError: private field is not accessible outside

const lion = Animal.create("Leo", 7); // static method — no new Animal() needed manually
console.log(lion.eat());              // Leo is eating
  `,

  commonMistakes: [
    {
      mistake: "Calling this before super() in a child constructor",
      explanation:
        "When a child class extends a parent, JavaScript does not create the 'this' object until super() runs. If you try to use 'this' before calling super(), you get a ReferenceError. Always call super() as the very first line in a child constructor.",
      wrong: `
class Dog extends Animal {
  constructor(name, age, breed) {
    this.breed = breed; // ReferenceError — this does not exist yet
    super(name, age);
  }
}`,
      right: `
class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age);   // parent sets up 'this' first
    this.breed = breed; // now 'this' is safe to use
  }
}`,
    },
    {
      mistake: "Trying to access a private field from outside the class",
      explanation:
        "Private fields with # are enforced by JavaScript itself — they are not just a naming convention. Any attempt to read or write them outside the class body throws a SyntaxError at parse time, before your code even runs.",
      wrong: `
const dog = new Dog("Buddy", 3, "Labrador");
console.log(dog.#name); // SyntaxError — private field not accessible here`,
      right: `
// Add a getter inside the class to expose it in a controlled way
get name() {
  return this.#name; // only the class can read #name
}
console.log(dog.name); // works — using the getter`,
    },
    {
      mistake: "Calling a static method on an instance instead of the class",
      explanation:
        "Static methods do not exist on instances — they belong to the class itself. Calling a static method on an object will give you 'TypeError: is not a function'. Always call static methods directly on the class name.",
      wrong: `
const dog = new Dog("Buddy", 3, "Labrador");
dog.create("Leo", 5); // TypeError — create is not on the instance`,
      right: `
Animal.create("Leo", 5); // correct — call on the class itself`,
    },
  ],

  interviewQA: [
    {
      q: "What is a class in JavaScript?",
      a: "A class is ES6 syntax that provides a clean way to write object-oriented code in JavaScript. It lets you define a constructor, instance methods, static methods, private fields, and inheritance all in one organized block. Under the hood, JavaScript still uses its prototype system — a class is fundamentally a function, and its methods live on the prototype, not on each individual instance.",
    },
    {
      q: "What does super() do and why must it come first in a child constructor?",
      a: "super() calls the parent class constructor from inside a child class constructor. JavaScript does not create the 'this' object for a child class until the parent constructor runs. So if you try to use 'this' before calling super(), you get a ReferenceError. Super must always be the first line in a child constructor so the parent can set up the object properly before the child adds its own properties.",
    },
    {
      q: "What is the difference between a static method and an instance method?",
      a: "Instance methods are called on objects you create from a class — for example dog.bark(). They have access to the instance's data through 'this'. Static methods are called on the class itself — for example Animal.create() — and they do not have access to any instance. They are useful for factory functions, utility helpers, or logic that belongs to the class concept but not to any specific object.",
    },
    {
      q: "Are JavaScript classes true class-based OOP like Java or C++?",
      a: "No. JavaScript classes look like class-based OOP but the engine still uses prototype-based inheritance underneath. When you write a class, it creates a function. Methods go on the prototype and are shared by all instances through the prototype chain. There is no actual copying of methods into each object like in some other languages.",
    },
    {
      q: "What are private class fields and how are they different from underscore naming?",
      a: "Private class fields use the # prefix like #balance or #name. They are enforced at the language level — JavaScript itself blocks any access from outside the class and throws a SyntaxError. Underscore naming like _balance is just a developer convention meaning 'please do not touch this' — but nothing actually prevents outside code from reading or writing it.",
    },
  ],

  interviewSummary:
    "A JavaScript class is a clean ES6 syntax over the prototype system — under the hood, it is still a function. The constructor runs when you call new and sets up the object. Methods are shared on the prototype, not copied into each instance. Use extends to inherit from a parent class, and always call super() first in the child constructor before touching 'this'. Static methods belong to the class itself, not to instances. Private fields use # and are enforced by JavaScript — they cannot be accessed outside the class body at all. Getters and setters let you expose private data in a controlled way with validation. The prototype chain lookup order is: instance → child prototype → parent prototype → Object.prototype → null.",
};
