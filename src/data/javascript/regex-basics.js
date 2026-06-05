export const regexBasics = {
  id: "regex-basics",
  title: "Regular Expressions (RegEx)",
  category: "JavaScript",
  difficulty: "Intermediate",
  tags: [
    "regex",
    "regular expression",
    "pattern matching",
    "test",
    "match",
    "replace",
    "groups",
    "flags",
    "validation",
    "g",
    "i",
    "m",
  ],

  definition:
    'A regular expression is a pattern that describes a set of strings. In JavaScript, regex literals use /pattern/flags or the RegExp constructor, and they are used for validation, searching, replacing, and extracting text.',

  why:
    'String methods like includes() only match literal text. RegEx can match patterns such as an email address, a date format, uppercase words, repeated spaces, or all numbers inside a paragraph.',

  how: [
    "Use /pattern/flags for regex literals or new RegExp() for dynamic patterns",
    "Use test() when you only need a true or false answer",
    "Use match() or matchAll() when you need to extract matches or capture groups",
    "Use replace() with the g flag to transform all matching text",
    "Use flags like g for global, i for case-insensitive, m for multiline, s for dotAll, and u for Unicode",
    "Use character classes like \\d, \\w, \\s, [a-z], and [^abc] to describe allowed characters",
    "Use quantifiers like *, +, ?, {n}, and {n,m} to describe repetition",
    "Use groups to capture parts of a match, including named groups with (?<name>...)",
  ],

  diagram: `
flowchart TD
  A[Email regex anatomy] --> B[Start anchor]
  B --> C[Username chars one or more]
  C --> D[Literal at sign]
  D --> E[Domain chars one or more]
  E --> F[Escaped literal dot]
  F --> G[Top level domain two or more letters]
  G --> H[End anchor]
  H --> I[Matches common email shape]
  H --> J[Fails incomplete email shape]
  `,

  analogy:
    "A regex is like a stencil for text. Wherever the text fits the stencil, it matches. \\d is a digit-shaped slot, [a-z] is a lowercase-letter slot, + means one or more, and ^ plus $ pin the match to the start and end.",

  code: `
function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/.test(email);
}

const text = "Order 123 has 45 items costing $678.90";
console.log(text.match(/\\d+\\.?\\d*/g)); // ["123", "45", "678.90"]

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\\s-]/g, "")
    .replace(/\\s+/g, "-")
    .replace(/-+/g, "-");
}

const dateRegex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const match = "2024-03-15".match(dateRegex);
console.log(match.groups.year, match.groups.month, match.groups.day);

"Hello    World   !".replace(/\\s+/g, " ").trim();
  `,

  interviewQA: [
    {
      q: "What is a regular expression?",
      a: "A regular expression is a pattern used to match text. It is useful for validation, searching, extraction, and replacement when literal string methods are not powerful enough.",
    },
    {
      q: "What is the difference between regex.test() and string.match()?",
      a: "test() returns a boolean and is best for validation. match() returns matched text or null, and can include capture groups when the regex does not use the global flag.",
    },
    {
      q: "Write a regex to validate a common email shape.",
      a: "A common practical pattern is /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/. It checks a username, @, domain, literal dot, and a two-or-more-letter top-level domain, though production systems should use battle-tested validation.",
    },
  ],
};
