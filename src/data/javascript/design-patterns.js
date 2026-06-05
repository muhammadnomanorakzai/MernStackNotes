export const designPatterns = {
  id: "design-patterns",
  title: "JavaScript Design Patterns",
  category: "JavaScript",
  difficulty: "Advanced",
  tags: [
    "singleton",
    "observer",
    "factory",
    "module pattern",
    "decorator",
    "pub-sub",
    "design patterns",
    "reusable solutions",
  ],

  definition:
    "Design patterns are proven reusable templates for solving recurring software design problems. In JavaScript interviews, the most important patterns include Singleton, Observer, Factory, Module, and Decorator.",

  why:
    "Design patterns show whether you can recognize common architecture problems and choose a stable solution. Many patterns already appear in daily JavaScript work, including event emitters, React context updates, module exports, middleware, and higher-order functions.",

  how: [
    "Step 1 - Singleton ensures only one shared instance exists",
    "Step 2 - Observer lets subscribers react when a publisher emits events",
    "Step 3 - Factory centralizes object creation based on requested type",
    "Step 4 - Module pattern hides private state and exposes a public API",
    "Step 5 - Decorator wraps behavior around an existing function or object",
    "Step 6 - Patterns should solve real design pressure, not be added for decoration",
  ],

  diagram: `
flowchart TD
  A[Design Patterns] --> B[Singleton one instance]
  A --> C[Observer publish subscribe]
  A --> D[Factory create by type]
  A --> E[Module private state public API]
  A --> F[Decorator wrap behavior]
  C --> G[Subscribers notified]
  D --> H[Caller does not know construction details]
  F --> I[Original stays unchanged]
  `,

  analogy:
    "Singleton is one shared app-wide sun. Observer is a subscription channel where listeners react to new posts. Factory is a vending machine that returns the right item based on your button. Module is a remote control that exposes buttons while hiding the circuits. Decorator is adding features to coffee without changing the original recipe.",

  code: `
class Config {
  static instance = null;
  settings = {};
  static getInstance() {
    if (!Config.instance) Config.instance = new Config();
    return Config.instance;
  }
  set(key, value) { this.settings[key] = value; }
  get(key) { return this.settings[key]; }
}

class EventEmitter {
  listeners = {};
  on(event, fn) { (this.listeners[event] ??= []).push(fn); }
  off(event, fn) { this.listeners[event] = this.listeners[event]?.filter((l) => l !== fn); }
  emit(event, data) { this.listeners[event]?.forEach((fn) => fn(data)); }
}

function createUser(role, name) {
  const base = { name, createdAt: new Date() };
  if (role === "admin") return { ...base, canDelete: true };
  if (role === "guest") return { ...base, canDelete: false };
  throw new Error("Unknown role");
}

function withLogging(fn) {
  return function (...args) {
    console.log("Calling", fn.name, args);
    return fn.apply(this, args);
  };
}
  `,

  interviewQA: [
    {
      q: "What is the Singleton pattern? Give a real use case.",
      a: "Singleton ensures only one instance exists and all callers receive that same instance. It is useful for app configuration, loggers, shared stores, and connection pools.",
    },
    {
      q: "What is the Observer pattern? Where does React use it?",
      a: "Observer separates publishers from subscribers. React uses observer-like ideas in Context updates, subscriptions in effects, and libraries that notify components when cached state changes.",
    },
    {
      q: "What is a Factory pattern?",
      a: "A Factory creates objects for callers without exposing construction details. The caller asks for a type, and the factory returns the correct object shape or instance.",
    },
    {
      q: "What is a Decorator pattern and how is it used in JavaScript?",
      a: "A Decorator wraps an existing function or object to add behavior without modifying the original. JavaScript uses this idea in higher-order functions, middleware, logging wrappers, memoization, and React HOCs.",
    },
  ],
};
