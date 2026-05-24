export const typeCoercion = {
  id: "type-coercion",
  title: "Type Coercion",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: ["coercion", "implicit", "explicit", "== vs ===", "truthy", "falsy", "NaN", "loose equality"],

  definition:
    "Type coercion is JavaScript converting a value from one data type to another. It can happen automatically during operations or intentionally through functions like Number, String, and Boolean.",

  why:
    "JavaScript is weakly typed and tries to be forgiving when values of different types interact. This convenience can help with quick scripting, but it also creates confusing behavior unless you understand when the engine is guessing for you.",

  how: [
    "Step 1 - Implicit coercion happens automatically when JavaScript sees mismatched types",
    "Step 2 - The plus operator concatenates if either side is a string",
    "Step 3 - Minus multiply and divide convert both sides to numbers",
    "Step 4 - Loose equality with double equals coerces values before comparing",
    "Step 5 - Strict equality with triple equals compares both type and value without coercion",
    "Step 6 - In boolean contexts JavaScript converts values to true or false",
    "Step 7 - Explicit coercion uses Number String Boolean parseInt or parseFloat on purpose",
  ],

  diagram: `
flowchart TD
  A[Type Coercion] --> B[Implicit Automatic]
  A --> C[Explicit Manual]
  B --> D[plus with string String concatenation]
  B --> E[minus multiply divide Convert to Number]
  B --> F[double equals Loose equality types coerced]
  C --> G[Number parseInt parseFloat]
  C --> H[String toString]
  C --> I[Boolean double negation]
  A --> J[triple equals use strict equality no coercion]
  `,

  analogy:
    "Type coercion is like a translator who tries to help when two people speak different languages. Sometimes the translator guesses correctly and makes the conversation smooth. Other times the translator makes a strange assumption and changes the meaning completely. Using strict equality is like telling the translator not to guess and only compare exactly what you said.",

  code: `
console.log("5" + 3); // "53" -> plus sees a string, so it concatenates
console.log("5" - 3); // 2 -> minus converts both sides to numbers

console.log([] + []); // ""
console.log([] + {}); // "[object Object]"
console.log({} + []); // 0 in many consoles because of parsing rules
console.log(true + true); // 2
console.log(null + 1); // 1

console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(0 == false, 0 == "", false == ""); // true true true

console.log(Number("42")); // 42
console.log(Number("")); // 0
console.log(Number("abc")); // NaN
console.log(Boolean(0), Boolean([]), String(false)); // false true "false"
  `,

  interviewQA: [
    {
      q: "What is the difference between double equals and triple equals?",
      a: "Double equals performs loose equality and may coerce types before comparing, which can create surprising results like 0 == false being true. Triple equals compares both type and value exactly, so it is the safer default in real code.",
    },
    {
      q: "What are falsy values in JavaScript?",
      a: "There are exactly eight falsy values: false, 0, negative zero, 0n, empty string, null, undefined, and NaN. Everything else is truthy, including empty arrays and empty objects.",
    },
    {
      q: "What is the result of string five plus three and why?",
      a: "The result is the string 53 because the plus operator switches to concatenation when either operand is already a string. JavaScript converts the number 3 to a string and joins them together.",
    },
    {
      q: "When would you use explicit type conversion?",
      a: "You use it when input types are known to be wrong for the next operation, such as form input arriving as strings when you need numbers for math. Explicit conversion makes intent obvious and avoids accidental coercion bugs.",
    },
  ],
};
