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
    "Template literals are a better way to write strings in JavaScript. Instead of using single or double quotes, you use backticks. This gives you three superpowers: you can embed any JavaScript expression directly inside the string using ${}, you can write strings across multiple lines without any special tricks, and you can use tagged templates which let a function process the string before it is returned. Tagged templates are used in real libraries like styled-components and GraphQL.",

  simpleExplanation:
    "Before template literals, if you wanted to build a string with variables, you had to use the + sign to join everything together. This got messy very fast. Template literals let you just write the string naturally and drop your variables directly inside using ${}. Need multiple lines? Just press Enter — no special characters needed. And tagged templates take it one step further — they let you pass the string through a function that can transform, sanitize, or do anything it wants before giving you the final result.",

  romanUrduRevision:
    "Template literals backticks use karte hain quotes ki jagah. ${} ke andar koi bhi JavaScript expression likh sakte ho. Multiline string ke liye kuch nahi karna, bas Enter maro. Tagged template matlab ek function jo template se pehle likhte hain — woh function string parts aur values alag alag receive karta hay aur kuch bhi return kar sakta hay. Styled-components isi tarike se kaam karta hay.",

  why: "When you build real applications, strings are everywhere — HTML templates, error messages, API URLs, SQL queries, user-facing text. Joining all of these with + signs makes code hard to read and easy to break, especially when variables or line breaks are involved. Template literals solve this by letting you write strings in a natural way. Tagged templates go even further — they power entire libraries. styled-components uses them to write CSS inside JavaScript. GraphQL uses them to write queries. Internationalization libraries use them to translate strings. Once you understand tagged templates, you understand how these major tools work under the hood.",

  how: [
    "Step 1 — Replace your opening and closing quote with a backtick character to create a template literal.",
    "Step 2 — Put any valid JavaScript expression inside ${}. This can be a variable, a function call, a ternary, or even math.",
    "Step 3 — Write multiline strings naturally by pressing Enter. No need for \\n or string joining.",
    "Step 4 — Nest template literals when an expression inside ${} itself needs dynamic values.",
    "Step 5 — Use String.raw when you need backslashes to be treated as literal characters, for example in file paths or regex patterns.",
    "Step 6 — To create a tagged template, write a function name directly before the opening backtick with no space or parentheses.",
    "Step 7 — The tag function receives two things: an array of the plain string parts, and the evaluated values of each ${} expression as separate arguments.",
    "Step 8 — The tag function can combine, transform, sanitize, or completely change the output — it can even return something that is not a string at all.",
  ],

  diagram: `
flowchart TD
  A[Template Literal with expressions] --> B[JavaScript splits it automatically]
  B --> C[strings array - the plain text parts]
  B --> D[values array - the evaluated expressions]
  C --> E[Tag Function receives both]
  D --> E
  E --> F{What does the tag do?}
  F --> G[highlight tag - wraps values in strong tags]
  F --> H[sql tag - sanitizes values to prevent injection]
  F --> I[styled tag - generates CSS class and React component]
  G --> J[Returns safe HTML string]
  H --> K[Returns safe SQL query]
  I --> L[Returns styled React component]
  `,

  analogy:
    "A template literal is like a form letter with blanks already marked. You hand it the values and it fills them in automatically — no glue or tape needed. A tagged template is like giving that same form letter to a smart editor before it is sent out. The editor can check the blanks for dangerous content, translate the text to another language, wrap certain words in bold, or completely reformat the output. The editor gets the plain text parts and the filled-in values separately, so they have full control over the final result.",

  code: `
// ─── Basic Template Literal vs Old Concatenation ─────────────────────────────

const user = { name: "Ali", age: 25 };

// Old way — noisy and easy to mess up
const oldGreeting = "Hello " + user.name + "! You are " + user.age + " years old.";

// New way — clean and readable
const greeting = \`Hello \${user.name}! You are \${user.age} years old.\`;


// ─── Expressions Inside ───────────────────────────────────────────────────

const price  = 100;
const tax    = 0.1;

// You can put any expression, not just variables
const total  = \`Total with tax: \${price + price * tax} PKR\`;
const status = \`Account: \${user.age >= 18 ? "Adult" : "Minor"}\`;
const upper  = \`Name in caps: \${user.name.toUpperCase()}\`;


// ─── Multiline String ─────────────────────────────────────────────────────────

// Old way — you had to manually add \\n everywhere
const oldHtml = "<div>\\n  <h2>" + user.name + "</h2>\\n</div>";

// New way — just press Enter, it works naturally
const html = \`
  <div class="card">
    <h2>\${user.name}</h2>
    <p>Age: \${user.age}</p>
  </div>
\`;


// ─── String.raw — backslashes as literal characters ───────────────────────────

// Normal string — \\n becomes a newline character
const normal = \`C:\\new_folder\`;     // C: + newline + ew_folder (bug!)

// String.raw — \\n stays as backslash + n
const path = String.raw\`C:\\new_folder\`; // C:\\new_folder (correct)


// ─── Tagged Template — highlight important values ─────────────────────────────

// The tag function receives:
// strings → ["Name: ", ", Age: ", ""]  — plain text parts
// values  → ["Ali", 25]               — evaluated expressions

function highlight(strings, ...values) {
  return strings.reduce((result, str, index) => {
    const value = values[index] ?? "";
    return result + str + (value ? \`<strong>\${value}</strong>\` : "");
  }, "");
}

// Call the tag by placing it before the backtick — no parentheses
const output = highlight\`Name: \${user.name}, Age: \${user.age}\`;
// Result: "Name: <strong>Ali</strong>, Age: <strong>25</strong>"


// ─── Tagged Template — SQL sanitizer (prevents injection) ─────────────────────

function sql(strings, ...values) {
  // Replace each value with a safe placeholder — never trust user input
  const query  = strings.reduce((q, str, i) => q + str + (i < values.length ? "?" : ""), "");
  return { query, params: values };
}

const userId = 42;
const result = sql\`SELECT * FROM users WHERE id = \${userId}\`;
// { query: "SELECT * FROM users WHERE id = ?", params: [42] }


// ─── How styled-components uses tagged templates (simplified) ─────────────────

// In real styled-components:
// const Button = styled.button\`
//   background: \${props => props.primary ? "blue" : "white"};
//   color: black;
// \`;
//
// styled.button is the tag function. It receives the CSS strings and
// the dynamic prop functions, generates a real CSS class, and returns
// a React component with that class applied automatically.
  `,

  ommonMistakes: [
    {
      mistake: "Using ${} inside regular quotes instead of backticks",
      explanation:
        "The ${} interpolation only works inside backticks. If you accidentally use single or double quotes, JavaScript treats ${} as a plain string and prints it literally instead of evaluating the expression inside.",
      wrong: `
const name = "Noman";
const msg  = "Hello \${name}!"; // prints: Hello \${name}!  — not what you want`,
      right: `
const name = "Noman";
const msg  = \`Hello \${name}!\`; // prints: Hello Noman!`,
    },
    {
      mistake:
        "Forgetting that the tag function receives strings and values separately",
      explanation:
        "New developers often think a tag function receives the fully assembled string. It does not. It receives two things: an array of the plain text parts between the expressions, and the evaluated values of each expression as individual arguments. The strings array always has one more item than the values array.",
      wrong: `
function myTag(fullString) {
  console.log(fullString); // undefined or wrong — this is not how it works
}
myTag\`Hello \${name}\`;`,
      right: `
function myTag(strings, ...values) {
  console.log(strings); // ["Hello ", ""]
  console.log(values);  // ["Noman"]
}
myTag\`Hello \${name}\`;`,
    },
    {
      mistake:
        "Using template literals for every string even when a simple quote is cleaner",
      explanation:
        "Template literals are great when you need expressions, multiline content, or tags. But for a simple static string with no variables, using backticks adds no value and can confuse readers who expect to see an expression or tag. Use the right tool for the job.",
      wrong: `
const status = \`active\`;          // backtick adds nothing here
const url    = \`/api/users\`;      // no expressions — just noise`,
      right: `
const status = "active";           // clean and clear
const url    = "/api/users";
const msg    = \`Hello \${name}!\`;  // backtick earns its place here`,
    },
  ],

  interviewQA: [
    {
      q: "What are template literals?",
      a: "Template literals are strings written with backticks instead of quotes. They allow you to embed any JavaScript expression directly inside the string using ${}, write multiline strings naturally without escape sequences, and use tagged templates for custom string processing. They were introduced in ES6 and are now the standard way to build dynamic strings in JavaScript.",
    },
    {
      q: "What is a tagged template literal?",
      a: "A tagged template is a template literal with a function placed directly before the opening backtick. JavaScript calls that function automatically and passes it two things: an array of the plain string parts and the evaluated values of each expression as separate arguments. The function can combine, transform, sanitize, or return anything — it does not have to return a string. This is how libraries like styled-components and GraphQL tag their templates.",
    },
    {
      q: "How does styled-components use tagged templates?",
      a: "styled-components uses a tag function like styled.button before a backtick containing CSS. When the template is evaluated, styled-components receives the CSS string parts and any dynamic values — such as functions that read component props. It generates a unique CSS class, injects the styles into the document, and returns a React component with that class already applied. The developer writes CSS naturally and gets a fully styled component back.",
    },
    {
      q: "What is String.raw and when would you use it?",
      a: "String.raw is a built-in tag function that returns the raw string content with all backslashes preserved as literal characters. Normally in a string, backslash sequences like \\n are interpreted as a newline. With String.raw, \\n stays as two characters — backslash and n. This is useful for Windows file paths, regular expressions, or any situation where you need backslashes to be treated literally.",
    },
    {
      q: "What is the difference between strings and values inside a tag function?",
      a: "When JavaScript calls a tag function, it splits the template literal at every ${} expression. The plain text pieces between those expressions become the strings array. The evaluated results of each expression become the values, passed as individual arguments after strings. The strings array always has exactly one more item than the values array — including an empty string at the start or end when an expression appears at the boundary of the template.",
    },
  ],

  interviewSummary:
    "Template literals use backticks and allow expression interpolation with ${}, natural multiline strings, and tagged templates. Any valid JavaScript expression can go inside ${}. Tagged templates place a function before the backtick — JavaScript calls that function with the plain string parts as an array and each evaluated expression as a separate argument. The tag can return any value, not just a string. Real-world uses include styled-components for CSS-in-JS, GraphQL for writing queries, and sanitization libraries for preventing injection attacks. String.raw is a built-in tag that preserves backslashes literally. Common mistakes: using ${} inside regular quotes instead of backticks, assuming the tag function receives the assembled string instead of parts and values separately, and overusing backticks for simple static strings that have no expressions.",
};
