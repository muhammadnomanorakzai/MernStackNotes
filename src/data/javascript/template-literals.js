export const templateLiterals = {
  id: "template-literals",
  title: "Template Literals & Tagged Templates",
  category: "JavaScript",
  difficulty: "Beginner",
  tags: [
    "template literals",
    "template strings",
    "tagged templates",
    "interpolation",
    "multiline",
    "ES6",
    "styled-components",
    "backtick",
  ],

  definition:
    "Template literals use backticks instead of quotes and support embedded expressions with ${}, multiline strings, and tagged templates for custom string processing.",

  why:
    "String concatenation with + becomes noisy and error-prone when variables, HTML, or newlines are involved. Template literals make string building readable, and tagged templates unlock patterns like CSS-in-JS, escaping, SQL builders, and i18n.",

  how: [
    "Use backticks to create a template literal",
    "Place any valid JavaScript expression inside ${}",
    "Write multiline strings naturally without manual newline escape sequences",
    "Nest template literals when a dynamic expression itself needs templating",
    "Use String.raw when you need backslashes preserved exactly",
    "Call a tag function before a template to receive string parts and evaluated values",
    "The tag can return a processed string or any other value",
  ],

  diagram: `
flowchart LR
  A[Template Hello name count] --> B[strings array]
  A --> C[values array]
  B --> D[Hello comma you have messages]
  C --> E[name count]
  D --> F[Tag function]
  E --> F
  F --> G[Processed output]
  H[highlight tag] --> I[Wrap values in strong tags]
  I --> G
  `,

  analogy:
    "Template literals are like form letters with blanks that fill themselves at runtime. Tagged templates are a smart form processor: instead of only filling blanks, the processor can sanitize values, translate text, wrap values in markup, or generate CSS classes.",

  code: `
const user = { name: "Ali", age: 25 };

const oldGreeting = "Hello " + user.name + "! You are " + user.age + ".";
const greeting = \`Hello \${user.name}! You are \${user.age}.\`;

const html = \`
  <div class="card">
    <h2>\${user.name}</h2>
    <p>Age: \${user.age}</p>
  </div>
\`;

function highlight(strings, ...values) {
  return strings.reduce((result, str, index) => {
    const value = values[index] ?? "";
    return result + str + (value ? \`<strong>\${value}</strong>\` : "");
  }, "");
}

console.log(highlight\`Name: \${user.name}, Age: \${user.age}\`);
  `,

  interviewQA: [
    {
      q: "What are template literals?",
      a: "Template literals use backticks and support embedded expressions with ${}, multiline strings, and runtime expression evaluation. They make dynamic strings much cleaner than concatenation.",
    },
    {
      q: "What is a tagged template literal?",
      a: "A tagged template is a template literal preceded by a function. The function receives the literal string parts and evaluated expression values, then can transform, sanitize, or return any value.",
    },
    {
      q: "How does styled-components use tagged templates?",
      a: "styled-components uses template tags like styled.button to receive CSS strings and dynamic prop-based values. The tag function generates a real CSS class and returns a React component with that class applied.",
    },
  ],
};
