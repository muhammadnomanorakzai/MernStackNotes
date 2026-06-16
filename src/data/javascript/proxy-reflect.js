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
    "A Proxy is a wrapper around any JavaScript object. It sits in between your code and the real object, and intercepts operations like reading a property, writing a value, or deleting a key. These interceptions happen through special functions called traps, which you define inside a handler object. Reflect is a built-in JavaScript tool that gives you the default way to perform those same operations — so inside your trap, you can still let the normal thing happen using Reflect.",

  simpleExplanation:
    "Imagine you have a plain object like a user profile. Normally, when someone reads or writes to it, JavaScript just does it directly. But with Proxy, you put a middleman in front of that object. Every time someone tries to read or write, your middleman runs first. You can log it, block it, change the value, or just let it pass through normally. Reflect is the helper that does the 'let it pass through normally' part correctly.",

  romanUrduRevision:
    "Proxy ek security guard ki tarah hay jo tumhare object ke samne khara hota hay. Jab bhi koi property read ya write karna chaha, pehle guard ke pass ata hay. Guard check karta hay — log karta hay, validate karta hay, ya rokta hay. Agar sab theek hay tu Reflect use karo jo original kaam sahi tarike se karta hay. Simple words mein: Proxy = guard, Reflect = original rulebook.",

  why: "Real applications often need extra control over how objects behave. For example, you want to stop someone from setting an invalid age like -5. Or you want to log every time a sensitive field is read. Or you want to automatically trigger a UI update when data changes — which is exactly what Vue 3 does. Without Proxy, you would need to manually add this logic everywhere in your code. Proxy lets you define this behavior once, in one place, and it automatically applies to every interaction with that object.",

  how: [
    "Step 1 — Create your target object, which is the real object you want to protect or monitor.",
    "Step 2 — Create a handler object that contains your trap functions like get and set.",
    "Step 3 — Use new Proxy(target, handler) to create the proxy wrapper.",
    "Step 4 — The get trap fires automatically every time someone reads a property from the proxy.",
    "Step 5 — The set trap fires automatically every time someone tries to assign a value to a property.",
    "Step 6 — Inside the set trap, you can validate the value and throw an error if it is wrong.",
    "Step 7 — Use Reflect.get(target, key) and Reflect.set(target, key, value) to perform the actual default operation after your custom logic.",
    "Step 8 — Vue 3 uses exactly this pattern — the set trap detects a state change and tells Vue to re-render the component.",
  ],

  diagram: `
flowchart TD
  A[Code reads proxy.name] --> B[get trap runs inside handler]
  B --> C[You can log or validate the read]
  C --> D[Reflect.get runs the normal read]
  D --> E[Value is returned to caller]
  F[Code sets proxy.age = 25] --> G[set trap runs inside handler]
  G --> H[Validate: is age a number between 0 and 150?]
  H --> I{Valid?}
  I -- Yes --> J[Reflect.set saves the value]
  I -- No --> K[Throw RangeError and block the write]
  J --> L[In Vue 3 - trigger component re-render]
  `,

  analogy:
    "Think of a Proxy like the front desk receptionist at a company office. The actual office staff are the target object. Every visitor who wants to meet someone must pass through the receptionist first. The receptionist can check their ID, write their name in the visitor log, tell them the person is not available, or guide them inside. Reflect is like the company's official visitor policy — it tells the receptionist exactly how a normal visit should happen. The receptionist follows that policy by default unless there is a specific reason not to.",

  code: `
// ─── Example 1: Validation Proxy ───────────────────────────────────────────
// Real use case: stop invalid data from entering your object

const createValidatedUser = (obj) =>
  new Proxy(obj, {
    set(target, key, value) {
      if (key === "age") {
        if (typeof value !== "number" || value < 0 || value > 150) {
          throw new RangeError("Age must be a number between 0 and 150. You gave: " + value);
        }
      }

      if (key === "name") {
        if (typeof value !== "string" || value.trim() === "") {
          throw new TypeError("Name must be a non-empty string.");
        }
      }

      // Everything is fine — do the actual assignment
      return Reflect.set(target, key, value);
    },
  });

const user = createValidatedUser({});
user.name = "Noman";   // works fine
user.age  = 25;        // works fine
// user.age = -5;      // throws RangeError
// user.name = 123;    // throws TypeError


// ─── Example 2: Logging Proxy ──────────────────────────────────────────────
// Real use case: debug or audit every read and write on an object

function createLogged(obj, label) {
  return new Proxy(obj, {
    get(target, key) {
      console.log("[" + label + "] Reading property: " + String(key));
      return Reflect.get(target, key);
    },

    set(target, key, value) {
      console.log("[" + label + "] Writing property: " + String(key) + " =", value);
      return Reflect.set(target, key, value);
    },
  });
}

const config = createLogged({ theme: "dark" }, "AppConfig");
config.theme;           // logs: [AppConfig] Reading property: theme
config.language = "ur"; // logs: [AppConfig] Writing property: language = ur


// ─── Example 3: Default Values Proxy ──────────────────────────────────────
// Real use case: return a fallback value when a key does not exist

const withDefaults = (obj, defaults) =>
  new Proxy(obj, {
    get(target, key) {
      // If key exists on real object, return it. Otherwise return default.
      return key in target ? Reflect.get(target, key) : defaults[key];
    },
  });

const settings = withDefaults({ fontSize: 18 }, { theme: "light", lang: "en" });
console.log(settings.fontSize); // 18    (from real object)
console.log(settings.theme);    // light (from defaults, key did not exist)
console.log(settings.lang);     // en    (from defaults)


// ─── Example 4: How Vue 3 uses Proxy (simplified version) ─────────────────
// Vue 3 wraps your reactive() object in a Proxy
// The set trap detects changes and triggers re-render

function reactive(obj) {
  return new Proxy(obj, {
    set(target, key, value) {
      const result = Reflect.set(target, key, value);
      console.log("State changed! Re-rendering UI for key:", key);
      // In real Vue 3, this schedules a component update
      return result;
    },
  });
}

const state = reactive({ count: 0 });
state.count = 1; // logs: State changed! Re-rendering UI for key: count
  `,

  ommonMistakes: [
    {
      mistake: "Forgetting to return true inside the set trap",
      explanation:
        "The set trap must return true to tell JavaScript that the assignment was successful. If you forget to return anything, it returns undefined which is falsy, and JavaScript throws a TypeError in strict mode saying the assignment failed.",
      wrong: `
set(target, key, value) {
  target[key] = value; // directly assigning — bypasses Reflect, and forgot to return true
}`,
      right: `
set(target, key, value) {
  return Reflect.set(target, key, value); // correct — returns true automatically
}`,
    },
    {
      mistake:
        "Modifying the target directly inside the trap instead of using Reflect",
      explanation:
        "When you do target[key] = value directly inside a trap, it still works, but it can cause bugs with inherited objects or prototype chains. Reflect.set handles all those edge cases correctly for you.",
      wrong: `
set(target, key, value) {
  target[key] = value; // may cause prototype chain bugs
  return true;
}`,
      right: `
set(target, key, value) {
  return Reflect.set(target, key, value); // handles all edge cases correctly
}`,
    },
    {
      mistake: "Using Proxy on a class instance and losing the this context",
      explanation:
        "When you proxy a class instance, method calls inside the class may lose the correct 'this' binding. You need to bind methods properly or handle this inside the get trap.",
      wrong: `
const proxied = new Proxy(new MyClass(), handler);
proxied.myMethod(); // 'this' inside myMethod may be the proxy, not the instance`,
      right: `
get(target, key) {
  const value = Reflect.get(target, key);
  // Bind method to original target so 'this' works correctly
  if (typeof value === "function") return value.bind(target);
  return value;
}`,
    },
  ],

  interviewQA: [
    {
      q: "What is a Proxy in JavaScript?",
      a: "A Proxy is a wrapper around an object that intercepts fundamental operations like reading, writing, and deleting properties. You define a handler object with trap functions like get and set. Every time those operations happen on the proxy, your trap runs first. You can validate, log, block, or modify behavior, and then use Reflect to perform the actual default operation.",
    },
    {
      q: "What is the difference between Proxy and Object.defineProperty?",
      a: "Object.defineProperty only works on one specific property at a time that you know in advance. It cannot intercept properties added later. Proxy intercepts all operations on the entire object dynamically, including properties that do not exist yet. This is why Vue 3 switched from Object.defineProperty to Proxy — it handles dynamic properties and arrays correctly without extra workarounds.",
    },
    {
      q: "What is Reflect and why do we use it inside traps?",
      a: "Reflect is a built-in JavaScript object that provides methods matching every Proxy trap — Reflect.get, Reflect.set, Reflect.deleteProperty, and so on. Inside a trap, you use Reflect to perform the original default operation. It handles prototype chains and edge cases correctly. Without Reflect, you would have to manually handle those cases, which is error-prone.",
    },
    {
      q: "How does Vue 3 use Proxy?",
      a: "Vue 3 wraps your reactive() object in a Proxy. The get trap tracks which component is currently reading which piece of state — this is called dependency tracking. The set trap detects when a value changes and notifies Vue to schedule a re-render for any component that depends on that changed value. This entire reactivity system is built on top of Proxy traps.",
    },
    {
      q: "What traps are available in Proxy besides get and set?",
      a: "Proxy supports 13 traps in total. The most commonly used are get (reading a property), set (writing a property), has (the 'in' operator), deleteProperty (delete keyword), apply (calling a function), and construct (the new keyword). Each trap corresponds to a fundamental JavaScript operation.",
    },
  ],

  interviewSummary:
    "Proxy is a wrapper around an object that intercepts operations through trap functions defined in a handler. The most common traps are get for reading and set for writing. Inside every trap, use Reflect to perform the actual default operation correctly. Proxy is used for validation, logging, default values, and access control. Vue 3 uses Proxy to build its entire reactivity system — the get trap tracks dependencies, and the set trap triggers re-renders when data changes. Key difference from Object.defineProperty: Proxy works across the whole object dynamically, including properties added later, which is why Vue 3 replaced Object.defineProperty with Proxy.",
};
