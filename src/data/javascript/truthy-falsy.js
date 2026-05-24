export const truthyFalsy = {
  id: "truthy-falsy",
  title: "Truthy & Falsy Values",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: ["truthy", "falsy", "boolean", "conditionals", "implicit coercion", "!!"],

  definition:
    "In JavaScript, every value acts as either truthy or falsy when used in a boolean context like an if statement. There are exactly eight falsy values and everything else is truthy.",

  why:
    "JavaScript lets any value appear inside conditionals, not just true or false. Knowing which values are falsy helps you avoid bugs where values like 0 or an empty string accidentally choose the wrong branch of your logic.",

  how: [
    "Step 1 - When JavaScript sees if value it internally runs Boolean on that value",
    "Step 2 - There are exactly eight falsy values in the language",
    "Step 3 - Those eight values behave like false in conditionals and loops",
    "Step 4 - Everything else is truthy even if it looks empty or strange",
    "Step 5 - Double negation converts any value into its real boolean form",
    "Step 6 - Short circuit operators like and and or also rely on truthy and falsy behavior",
  ],

  diagram: `
flowchart TD
  A[JS runs Boolean value in every if condition]
  A --> B[FALSY false 0 negative zero 0n empty string null undefined NaN]
  A --> C[TRUTHY string zero empty array empty object negative one Infinity false string new Date]
  B --> D[Condition acts false]
  C --> E[Condition acts true]
  `,

  analogy:
    "Think of JavaScript as a nightclub bouncer with a very short blacklist. That blacklist has exactly eight names, and only those values are denied entry to the if block. Everyone else gets in, even suspicious looking guests like empty arrays or the string zero. Double negation is like asking the bouncer for the final yes or no decision.",

  code: `
if (false) console.log("never");
if (0) console.log("never");
if (-0) console.log("never");
if (0n) console.log("never");
if ("") console.log("never");
if (null) console.log("never");
if (undefined) console.log("never");
if (NaN) console.log("never");

if ("0") console.log("string zero is truthy");
if ([]) console.log("empty array is truthy");
if ({}) console.log("empty object is truthy");
if (Infinity) console.log("Infinity is truthy");

console.log(!!0, !!null, !!"hello", !![], !!undefined);

const user = { name: "" };
const name = user.name || "Anonymous";
console.log(name); // "Anonymous"

const maybeUser = { save() { console.log("saved"); } };
maybeUser && maybeUser.save();
// React gotcha: items.length && <List /> renders 0 when length is 0
  `,

  interviewQA: [
    {
      q: "What are the falsy values in JavaScript?",
      a: "There are eight falsy values: false, 0, negative zero, 0n, empty string, null, undefined, and NaN. Every other value in JavaScript is truthy.",
    },
    {
      q: "Is an empty array truthy or falsy?",
      a: "An empty array is truthy because it is still an object that exists in memory. If you need to know whether an array has items, check array.length instead of relying on if array.",
    },
    {
      q: "What does double negation do?",
      a: "Double negation converts any value to its real boolean equivalent. The first exclamation mark flips the truthiness and the second flips it back, leaving you with an actual true or false.",
    },
  ],
};
