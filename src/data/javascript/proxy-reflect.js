export const proxyReflect = {
  id: "proxy-reflect",
  title: "Proxy & Reflect",
  category: "JavaScript",
  difficulty: "Advanced",
  tags: [
    "proxy",
    "reflect",
    "trap",
    "handler",
    "get trap",
    "set trap",
    "validation",
    "meta-programming",
    "Vue 3 reactivity",
  ],

  definition:
    "Proxy wraps an object and intercepts core operations through handler functions called traps. Reflect provides methods for performing the normal default operation inside those traps.",

  why:
    "Proxy enables meta-programming: code that controls how other code interacts with objects. It powers patterns like validation, logging, access control, default values, and Vue 3 style reactivity without rewriting the original object.",

  how: [
    "Step 1 - Create a proxy with new Proxy target and handler",
    "Step 2 - The get trap runs whenever a property is read",
    "Step 3 - The set trap runs whenever a property is assigned",
    "Step 4 - Other traps can intercept in checks, deletion, and function calls",
    "Step 5 - Reflect.get and Reflect.set perform the normal default operation",
    "Step 6 - Validation proxies can reject invalid assignments",
    "Step 7 - Logging proxies can record reads and writes automatically",
    "Step 8 - Vue 3 uses Proxy set traps to detect state changes",
  ],

  diagram: `
flowchart TD
  A[Code reads proxy name] --> B[get trap runs]
  B --> C[Log or validate access]
  C --> D[Reflect get target name]
  D --> E[Return value]
  F[Code sets proxy age] --> G[set trap runs]
  G --> H[Validate value]
  H --> I[Reflect set target age]
  I --> J[Trigger reactive update]
  `,

  analogy:
    "A Proxy is like a security desk in front of an office. Every read or write must pass the desk first. The guard can log the visit, validate the request, block it, or let the person proceed normally. Reflect is the official rulebook for doing the normal operation correctly after the guard has checked it.",

  code: `
const createValidatedUser = (obj) => new Proxy(obj, {
  set(target, key, value) {
    if (key === "age" && (typeof value !== "number" || value < 0 || value > 150)) {
      throw new RangeError("Invalid age: " + value);
    }
    if (key === "name" && typeof value !== "string") {
      throw new TypeError("Name must be a string");
    }
    return Reflect.set(target, key, value);
  },
});

function createLogged(obj, label) {
  return new Proxy(obj, {
    get(target, key) {
      console.log("[" + label + "] Reading " + String(key));
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      console.log("[" + label + "] Writing " + String(key));
      return Reflect.set(target, key, value);
    },
  });
}

const withDefaults = (obj, defaults) => new Proxy(obj, {
  get(target, key) { return key in target ? Reflect.get(target, key) : defaults[key]; },
});
  `,

  interviewQA: [
    {
      q: "What is a Proxy in JavaScript?",
      a: "A Proxy wraps an object and intercepts fundamental operations through traps like get, set, deleteProperty, and apply. This lets you add custom behavior before delegating to the normal operation.",
    },
    {
      q: "What is the difference between Proxy and Object.defineProperty?",
      a: "Object.defineProperty targets one known property at a time. Proxy intercepts operations across the whole object dynamically, including properties added later.",
    },
    {
      q: "How does Vue 3 use Proxy?",
      a: "Vue 3 wraps reactive state in Proxies. The get trap tracks dependencies and the set trap detects changes, allowing Vue to schedule updates for components that depend on changed data.",
    },
  ],
};
