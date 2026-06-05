export const logicalAssignment = {
  id: "logical-assignment",
  title: "Logical Assignment & Short-Circuit Evaluation",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "&&=",
    "||=",
    "??=",
    "short circuit",
    "logical operators",
    "default values",
    "ES2021",
    "guard clause",
  ],

  definition:
    "Short-circuit evaluation means JavaScript stops evaluating a logical expression as soon as the result is certain. Logical assignment operators combine logical checks with assignment using ||=, &&=, and ??=.",

  why:
    "Common patterns like setting defaults or updating a value only when it exists used to require repetitive if statements. Logical assignment makes those patterns concise, but the difference between falsy and nullish values matters a lot.",

  how: [
    "&& returns the first falsy value or the last value if all are truthy",
    "|| returns the first truthy value or the last value if all are falsy",
    "?? returns the right side only when the left side is null or undefined",
    "x ||= y assigns y only when x is falsy",
    "x &&= y assigns y only when x is truthy",
    "x ??= y assigns y only when x is null or undefined",
    "Use ??= instead of ||= when 0, false, or empty string are valid values",
  ],

  diagram: `
flowchart TD
  A[a and b] --> B[Evaluate a]
  B --> C{a is falsy}
  C -->|Yes| D[Return a and skip b]
  C -->|No| E[Evaluate and return b]
  F[a or b] --> G[Evaluate a]
  G --> H{a is truthy}
  H -->|Yes| I[Return a and skip b]
  H -->|No| J[Evaluate and return b]
  K[a nullish b] --> L{a is null or undefined}
  L -->|Yes| M[Return b]
  L -->|No| N[Return a]
  `,

  analogy:
    "Short-circuiting is like a relay race with backup rules. && only sends the second runner if the first succeeds. || only sends the backup if the first fails. ?? is more specific: it only replaces the runner if nobody showed up at all, not if they scored zero or said false.",

  code: `
user && user.save(); // guard: only save if user exists
config.debug && console.log("Debug info:", data);

const name = inputName || "Anonymous";

let timeout = 0; // valid: no timeout
timeout ||= 5000; // bug: 0 is falsy, overwritten

let safeTimeout = 0;
safeTimeout ??= 5000; // correct: 0 is preserved

function initSettings(settings = {}) {
  settings.darkMode ??= false;
  settings.fontSize ??= 16;
  settings.language ??= "en";
  return settings;
}

const result = null || undefined || 0 || "" || "found!";
console.log(result); // "found!"
  `,

  interviewQA: [
    {
      q: "What is short-circuit evaluation?",
      a: "It means JavaScript stops evaluating once the result is known. With &&, a falsy left value skips the right side. With ||, a truthy left value skips the right side.",
    },
    {
      q: "What is the difference between ||= and ??=?",
      a: "||= assigns when the current value is any falsy value, including 0, false, and empty string. ??= assigns only when the current value is null or undefined, so it preserves valid falsy values.",
    },
    {
      q: "What is a practical use case for &&=?",
      a: "&&= updates a variable only if it already has a truthy value. For example, user &&= refreshUser(user) safely refreshes only when user exists.",
    },
  ],
};
