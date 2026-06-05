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
    "JavaScript classes are ES6 syntactic sugar over prototype-based inheritance. They provide a clean syntax for constructor methods, inheritance, super, static methods, getters, setters, and true private fields with #.",

  why:
    "Before ES6 classes, JavaScript developers used constructor functions and manual prototype wiring for object-oriented code. Classes make those patterns easier to read, reuse, and explain while keeping JavaScript's prototype model underneath.",

  how: [
    "class Name declares a reusable blueprint, but it is still a function internally",
    "constructor() runs automatically when new Name() creates an instance",
    "Methods in the class body are placed on Name.prototype and shared by all instances",
    "extends creates an inheritance relationship between child and parent classes",
    "super() must run before this inside a child constructor because it initializes the parent part",
    "static methods belong to the class itself, not to individual instances",
    "Private fields use #name syntax and are only accessible inside the class body",
    "Getters and setters expose property-like access while running validation or computed logic",
  ],

  diagram: `
flowchart TD
  A[Animal Base Class] --> B[Properties name age]
  A --> C[Methods eat sleep toString]
  D[Dog extends Animal] --> E[Inherits parent methods]
  D --> F[Adds breed bark fetch]
  A --> D
  D --> G[new Dog creates dogInstance]
  G --> H[Own properties name age breed]
  G --> I[Prototype chain lookup]
  I --> J[Dog prototype]
  J --> K[Animal prototype]
  K --> L[Object prototype]
  L --> M[null]
  `,

  analogy:
    "A class is a blueprint for building houses. new builds an actual house from the blueprint. extends is a luxury blueprint that starts with the basic house and adds extras. static methods are tools owned by the architect, not by any specific house. Private fields are locked rooms only the blueprint owner can access.",

  code: `
class Animal {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  get name() { return this.#name; }
  set age(value) {
    if (value < 0) throw new RangeError("Age cannot be negative");
    this.#age = value;
  }

  eat() { return \`\${this.#name} is eating\`; }
  static create(name, age) { return new Animal(name, age); }
}

class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age);
    this.breed = breed;
  }

  bark() { return \`\${this.name} says: Woof!\`; }
}

const dog = new Dog("Buddy", 3, "Labrador");
console.log(dog.bark());
console.log(dog instanceof Animal); // true
console.log(typeof Dog); // "function"
  `,

  interviewQA: [
    {
      q: "What is a class in JavaScript?",
      a: "A class is ES6 syntax over JavaScript's prototype-based inheritance. It gives a familiar way to define constructors, methods, inheritance, static utilities, and private fields, but methods still live on the prototype under the hood.",
    },
    {
      q: "What does super() do?",
      a: "super() calls the parent class constructor from a child class. In a child constructor it must run before accessing this, because the parent initialization has to happen first.",
    },
    {
      q: "What is the difference between a static method and an instance method?",
      a: "Instance methods are called on objects created from the class, like dog.bark(). Static methods are called on the class itself, like Animal.create(), and are useful for factory or utility behavior that does not need instance data.",
    },
    {
      q: "Are JavaScript classes true class-based OOP?",
      a: "They provide OOP-style syntax, but JavaScript remains prototype-based. A class is fundamentally a function, and methods are shared through the prototype chain rather than copied into each instance.",
    },
    {
      q: "What are private class fields?",
      a: "Private fields use the # prefix, such as #balance. They are enforced by the language and are only accessible inside the class body, unlike underscore naming which is only a convention.",
    },
  ],
};
