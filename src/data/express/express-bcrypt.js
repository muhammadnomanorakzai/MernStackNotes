export const expressBcrypt = {
  id: "express-bcrypt",
  title: "Password Hashing — Bcrypt, Salt & Hash",
  category: "Express",
  difficulty: "Intermediate",
  tags: ["Bcrypt", "Security", "Passwords", "Hashing", "Encryption", "Salt Rounds"],

  definition:
    "Bcrypt is a password-hashing function designed specifically to store user passwords securely. Instead of storing the password as plain text, Bcrypt uses a combination of 'Salting' (adding random data) and 'Hashing' (one-way encryption) to produce a long, unreadable string that cannot be reversed by hackers.",

  simpleExplanation:
    "Think of a password as a 'Juicy Steak'. If you leave it on the counter (Plain text), anyone can eat it (Steal it). 'Hashing' is like putting that steak into a mechanical blender (The Algorithm) until it becomes a formless 'Smoothie' (The Hash). You can't turn the smoothie back into the steak. When the user logs in later, you blend their new steak and check if the smoothie looks exactly like the one in your database. 'Salting' is like adding a different secret spice to every smoothie to make it unique.",

  romanUrduRevision:
    "Database mein passwords ko 'Plain Text' mein save karna sab se bari ghalti hai. Bcrypt ek tool hai jo passwords ko aese 'Hash' (unreadable string) mein convert kar deta hai jo reverse nahi kiya ja sakta. 'Salt rounds' jitne zyada honge, hacker ke liye password guess karna utna hi mushkil hoga (standard 10-12 hai). Jab user login karta hai, hum use naya password hash kar ke purane hash se 'bcrypt.compare()' use kar ke match karte hain.",

  why: "Security Compliance. If your database is ever hacked or leaked, and you stored plain-text passwords, every single user's account is compromised instantly. If you used Bcrypt, the hacker only gets useless hashes. It would take them years or even centuries to figure out the original passwords. This is the minimum industry standard for any professional application.",

  how: [
    "Step 1 - Install: 'npm install bcrypt'.",
    "Step 2 - Choose salt rounds (e.g., 10 or 12).",
    "Step 3 - Hash: 'bcrypt.hash(password, saltRounds)'.",
    "Step 4 - Store the resulting hash in your database.",
    "Step 5 - Compare: On login, use 'bcrypt.compare(enteredPassword, storedHash)'.",
  ],

  diagram: `
flowchart TD
    A[Plain Password: 'hello123'] --> B[Bcrypt Algorithm]
    B -- "Add Salt: #xyz" --> C[Hash: $2b$10$vI8...]
    C --> D[Save to Database]
    E[Login Input: 'hello123'] --> F[bcrypt.compare]
    D --> F
    F -- "Match?" --> G[Success/Fail]
    style B fill:#3498db,color:white
    style D fill:#2ecc71,color:white
  `,

  analogy:
    "Imagine a 'Fruit Salad'. You can easily see the strawberries and apples (Plain text). But if you put that salad in a industrial juicer, you get a 'Purple Liquid'. Looking at the liquid, you can't tell if it was 2 apples or 3 strawberries. But if you juice the same fruits again, you'll get the exact same shade of purple. That purple liquid is your 'Hash'.",

  realLifeExample:
    "Registration Flow: A user signs up with the password 'P@ssword123'. Your server runs it through bcrypt and gets '$2b$10$f6...'. You save THIS string to MongoDB. Even if you, the developer, look at the database, you have no idea what the user's password is. This protects the user's privacy and your liability.",

  code: `
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

const saltRounds = 10;

// 1. REGISTRATION (Hashing)
app.post('/register', async (req, res) => {
  const { password } = req.body;

  // Generate hash
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  // Save user in DB: { username, password: hashedPassword }
  console.log('Storing in DB:', hashedPassword);
  res.send('User registered!');
});

// 2. LOGIN (Comparing)
app.post('/login', async (req, res) => {
  const { password } = req.body;
  const storedHash = '$2b$10$vI8P...'; // Fetched from DB

  // Compare input vs stored
  const isMatch = await bcrypt.compare(password, storedHash);

  if (isMatch) {
    res.send('Login Successful!');
  } else {
    res.status(401).send('Invalid Credentials');
  }
});

app.listen(3000);
  `,

  commonMistake: [
    "Using 'bcryptjs' for very high-performance apps (it is slower than the native 'bcrypt' package, though easier to install on Windows).",
    "Setting salt rounds too high (e.g., 20+), which can make your server take seconds to hash a single password, leading to a self-DDoS.",
    "Forgetting to 'await' the bcrypt functions (they are asynchronous).",
    "Trying to 'Decrypt' a hash (you can't; you can only compare it with a new hash).",
  ],

  interviewSummary: [
    "Bcrypt is a slow hashing algorithm, which makes it resistant to brute-force attacks.",
    "A Salt is a random string added to the password before hashing to prevent rainbow table attacks.",
    "Hash functions are one-way (irreversible); encryption functions are two-way.",
    "Adaptive hashing (cost factors) allows the algorithm to remain secure as computers get faster.",
  ],
};
