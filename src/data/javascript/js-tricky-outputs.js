export const jsTrickyOutputs = {
  id: "js-tricky-outputs",
  title: "Tricky Output Questions",
  category: "JavaScript",
  difficulty: "Advanced",
  tags: [
    "output questions",
    "interview",
    "coercion",
    "hoisting",
    "event loop",
    "closures",
    "tricky",
    "this",
    "NaN",
    "typeof",
  ],

  definition:
    "JavaScript output questions test deep understanding of coercion, hoisting, closures, the Event Loop, and this binding. The goal is not only knowing the output, but explaining why the engine produces it.",

  why:
    "Almost every JavaScript interview includes a few 'what does this print?' questions. Interviewers use them to quickly separate surface-level memorization from real execution-model understanding.",

  how: [
    "Run all synchronous code first on the Call Stack",
    "Apply hoisting rules before evaluating declarations and expressions",
    "Track whether variables are function-scoped, block-scoped, or closed over",
    "Apply coercion rules carefully for +, ==, Boolean contexts, and typeof",
    "Resolve this from how the function is called, not where it is written",
    "After sync code, drain the entire Microtask Queue before running macrotasks",
  ],

  diagram: `
flowchart TD
  A[Code runs] --> B[Run synchronous code]
  B --> C[Call Stack becomes empty]
  C --> D[Drain all microtasks]
  D --> E[Run one macrotask]
  E --> F[Drain new microtasks]
  F --> G[Run next macrotask]
  G --> C
  `,

  analogy:
    "This topic is less about analogy and more about calm tracing. Treat every snippet like a detective scene: identify scope, queue, coercion, and this binding before guessing the answer.",

  code: `
// 1. Event Loop order
console.log("start");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("end");
// Output: start, end, promise, timeout

// 2. var closure bug
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 100);
// Output: 3, 3, 3

// 3. let closure fix
for (let j = 0; j < 3; j++) setTimeout(() => console.log(j), 100);
// Output: 0, 1, 2

// 4. typeof surprises
console.log(typeof null, typeof [], typeof NaN, typeof function () {});
// Output: object, object, number, function

// 5. NaN comparison
console.log(NaN === NaN, isNaN("hello"), Number.isNaN("hello"));
// Output: false, true, false

// 6. Hoisting
console.log(typeof foo); // function
console.log(typeof bar); // undefined
function foo() {}
var bar = function () {};

// 7. Lost this
const obj = { value: 42, getValue() { return this.value; } };
const fn = obj.getValue;
console.log(obj.getValue()); // 42
console.log(fn()); // undefined in modules or strict mode

// 8. Coercion
console.log(1 + "2", "3" - 1, true + true, [] + []);
// Output: "12", 2, 2, ""

// 9. Loose equality
console.log(null == undefined, 0 == false, [] == false);
// Output: true, true, true

// 10. Closure private state
function makeCounter() {
  let count = 0;
  return { increment: () => ++count, value: () => count };
}
const counter = makeCounter();
counter.increment();
counter.increment();
console.log(counter.value(), counter.count); // 2, undefined
  `,

  interviewQA: [
    {
      q: "What does this output?\nconsole.log('start'); setTimeout(() => console.log('timeout'), 0); Promise.resolve().then(() => console.log('promise')); console.log('end');",
      a: "Output: start, end, promise, timeout. Synchronous logs run first. Promise callbacks are microtasks, which run before setTimeout macrotasks.",
    },
    {
      q: "What does this output?\nfor (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }",
      a: "Output: 3, 3, 3. var is function-scoped, so all callbacks share the same i. By the time timers run, the loop has finished and i is 3.",
    },
    {
      q: "What does this output?\nfor (let i = 0; i < 3; i++) { setTimeout(() => console.log(i), 100); }",
      a: "Output: 0, 1, 2. let creates a fresh block-scoped binding for each loop iteration, so each callback closes over its own i.",
    },
    {
      q: "What does typeof print for null, undefined, functions, arrays, and NaN?",
      a: 'Output: typeof null is "object", typeof undefined is "undefined", typeof function(){} is "function", typeof [] is "object", and typeof NaN is "number". null is a historical bug; arrays are objects; NaN is still the number type.',
    },
    {
      q: "What does this output?\nconsole.log(NaN === NaN); console.log(isNaN('hello')); console.log(Number.isNaN('hello'));",
      a: "Output: false, true, false. NaN is the only value not equal to itself. global isNaN coerces first, while Number.isNaN checks without coercion.",
    },
    {
      q: "What happens with hoisted function declarations and var function expressions?",
      a: "Function declarations are fully hoisted, so typeof foo is function and foo() works before its definition. var function expressions are hoisted as undefined, so calling bar() before assignment throws TypeError.",
    },
    {
      q: "What does this output?\nconst fn = obj.getValue; console.log(obj.getValue()); console.log(fn());",
      a: "obj.getValue() returns the object value because this is obj. fn() loses the object context, so this is undefined in strict mode or global in sloppy mode.",
    },
    {
      q: "What does this output?\nconsole.log(1 + '2'); console.log('3' - 1); console.log(true + true); console.log([] + []);",
      a: 'Output: "12", 2, 2, "". + concatenates when a string is involved; -, *, and / coerce to numbers. true becomes 1 and arrays stringify before concatenation.',
    },
    {
      q: "What does loose equality output for null == undefined, 0 == false, '' == false, and [] == false?",
      a: "They are true except null comparisons only loosely equal undefined. Booleans coerce to numbers, empty strings become 0, and [] becomes an empty string then 0.",
    },
    {
      q: "Why is count private in makeCounter?",
      a: "The returned methods close over count from makeCounter's lexical scope. count is not a property on the returned object, so counter.count is undefined, but the methods can still read and update it.",
    },
  ],
};
