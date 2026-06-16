export const typeCoercion = {
  id: "type-coercion",
  title: "Type Coercion",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: [
    "coercion",
    "implicit",
    "explicit",
    "== vs ===",
    "truthy",
    "falsy",
    "NaN",
    "loose equality",
  ],

  definition:
    "Type Coercion is the process where JavaScript automatically or manually converts a value from one data type to another. This happens when different types interact in an operation, comparison, or boolean condition.",

  simpleExplanation:
    "JavaScript is a loosely typed language, which means it does not always require values to be of the same type before performing an operation. When JavaScript encounters different data types together, it often tries to convert one value into another type so the operation can continue. This behavior is called Type Coercion.\n\nType Coercion can be helpful because JavaScript tries to make code work without throwing errors. However, it can also produce unexpected results if you do not understand how the conversion rules work.\n\nFor example, when a string and a number are added together, JavaScript converts the number into a string and joins them. On the other hand, mathematical operators like minus (-), multiply (*), and divide (/) usually convert values into numbers before performing calculations.\n\nUnderstanding Type Coercion is important because many interview questions and real-world bugs are caused by unexpected automatic conversions.",

  romanUrduRevision:
    "JavaScript mukhtalif data types ko operation karne ke liye automatically convert kar sakta hai, is process ko Type Coercion kehte hain.\nInterview aur real projects mein sab se zyada confusion == aur automatic conversions ki wajah se hoti hai.",

  why: "JavaScript was designed to be flexible and beginner-friendly. Instead of immediately throwing errors when different data types interact, it tries to convert values automatically. While this can make coding easier, it can also lead to confusing results, which is why developers should understand coercion rules and prefer strict equality (===) in most situations.",

  how: [
    "Step 1 - JavaScript detects values of different data types",
    "Step 2 - It attempts automatic conversion when necessary",
    "Step 3 - The plus (+) operator prefers string concatenation if one operand is a string",
    "Step 4 - Mathematical operators (-, *, /) usually convert values to numbers",
    "Step 5 - Double equals (==) performs type conversion before comparison",
    "Step 6 - Triple equals (===) compares value and type without conversion",
    "Step 7 - Conditions like if statements convert values into true or false",
    "Step 8 - Developers can manually convert values using Number(), String(), and Boolean()",
  ],

  diagram: `
flowchart TD
  A[Type Coercion] --> B[Implicit Automatic]
  A --> C[Explicit Manual]

  B --> D[String + Number]
  B --> E[Math Operators]
  B --> F[Double Equals ==]

  C --> G[Number()]
  C --> H[String()]
  C --> I[Boolean()]

  A --> J[Triple Equals === No Conversion]
  `,

  realLifeExample:
    "Imagine two people speaking different languages. A translator stands between them and automatically converts one language into another so communication can continue. Most of the time the translator helps, but sometimes the translation is incorrect and creates confusion. JavaScript Type Coercion works in a similar way.",

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
    "Type Coercion is like a translator who tries to help when two people speak different languages. Sometimes the translator guesses correctly and makes communication easy. Other times the translator makes assumptions and changes the meaning completely. Using strict equality (===) is like telling the translator not to guess and compare things exactly as they are.",

  code: `
// String + Number
console.log("5" + 3);
// "53"
// Number 3 becomes string "3" and gets concatenated

// String - Number
console.log("5" - 3);
// 2
// Both values become numbers

// Boolean Conversion
console.log(true + true);
// 2
// true becomes 1

console.log(false + 1);
// 1
// false becomes 0

// Null Conversion
console.log(null + 1);
// 1

// Loose Equality
console.log(0 == false);
// true

console.log("" == false);
// true

console.log(null == undefined);
// true

// Strict Equality
console.log(0 === false);
// false

console.log(null === undefined);
// false

// Explicit Conversion
console.log(Number("42"));
// 42

console.log(Boolean(0));
// false

console.log(String(false));
// "false"

// NaN Example
console.log(Number("abc"));
// NaN
  `,

  truthyFalsyNotes: {
    truthy:
      "Values that become true in a boolean context are called truthy values.",

    examples: ["'hello'", "[]", "{}", "42", "-1", "true"],

    falsy:
      "Values that become false in a boolean context are called falsy values.",

    falsyValues: ["false", "0", "-0", "0n", "''", "null", "undefined", "NaN"],
  },

  interviewQA: [
    {
      q: "What is Type Coercion in JavaScript?",
      a: "Type Coercion is the automatic or manual conversion of a value from one data type to another when JavaScript performs operations, comparisons, or evaluates conditions.",
    },

    {
      q: "What is the difference between implicit and explicit coercion?",
      a: "Implicit coercion happens automatically by JavaScript, while explicit coercion is performed intentionally by the developer using functions like Number(), String(), or Boolean().",
    },

    {
      q: "What is the difference between == and === ?",
      a: "Double equals (==) converts values to compatible types before comparison. Triple equals (===) compares both value and type without any conversion, making it safer and more predictable.",
    },

    {
      q: "Why is === preferred in production applications?",
      a: "Because it avoids unexpected type conversions and produces more predictable results, reducing bugs in large codebases.",
    },

    {
      q: "What are falsy values in JavaScript?",
      a: "The eight falsy values are false, 0, -0, 0n, empty string (''), null, undefined, and NaN. Everything else is truthy.",
    },

    {
      q: "What is the result of '5' + 3 and why?",
      a: "The result is '53' because the plus operator performs string concatenation when one operand is already a string.",
    },

    {
      q: "What is NaN?",
      a: "NaN stands for Not-a-Number. It represents an invalid numeric result, such as converting 'abc' into a number.",
    },

    {
      q: "When should explicit conversion be used?",
      a: "When the expected type is known beforehand, such as converting form input strings into numbers before performing calculations.",
    },
  ],

  interviewSummary: [
    "JavaScript automatically converts types when necessary.",
    "The + operator often performs string concatenation.",
    "Math operators usually convert values into numbers.",
    "== allows coercion before comparison.",
    "=== compares type and value exactly.",
    "Falsy values are frequently asked in interviews.",
    "Use explicit conversion when possible for predictable code.",
  ],
};
