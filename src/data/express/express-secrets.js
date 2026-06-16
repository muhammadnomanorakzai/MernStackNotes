export const expressSecrets = {
  id: "express-secrets",
  title: "Secrets Management in Production",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Secrets Management", "Vault", "AWS Secrets Manager", "Environment Variables", "Security", "Production"],

  definition:
    "Secrets Management is the strategy and set of tools used to securely store and inject sensitive information—such as database passwords, API keys, and private certificates—into a production environment without exposing them in source code or insecure logs.",

  simpleExplanation:
    "In development, you use a '.env' file. But in a big company with many servers, '.env' files are hard to manage and insecure. Secrets Management is like a 'High-Security Safe' (e.g., AWS Secrets Manager or HashiCorp Vault). Your app has a key to the safe and 'asks' for the password only when it starts up. This way, the password is never saved in a file where a hacker could find it.",

  romanUrduRevision:
    "Secrets management ka matlab hai sensitive data (passwords, keys) ko secure tarike se handle karna. Production mein hum '.env' files committing se bachtay hain. Is ke bajaye hum platforms ke built-in secret managers use karte hain (jaise Github Secrets ya Heroku config vars). Ye ensure karta hai ke aapka sensitive data kabhi bhi galat hath mein na jaye.",

  realLifeExample:
    "Rotating Database Passwords: Your company policy says your database password must change every 30 days. Instead of manually editing '.env' files on 10 different servers, you update the password in 'AWS Secrets Manager'. When the Express apps restart, they automatically pull the new password from the manager.",

  why: "Security and Compliance. Hardcoded secrets are the most common cause of security breaches. If you commit a secret to GitHub, it is compromised forever. Secrets managers provide 'Auditing' (seeing who accessed a secret) and 'Rotation' (automatic changes), which are vital for professional enterprise applications.",

  how: [
    "Step 1 - NEVER commit '.env' files or secrets to Git.",
    "Step 2 - For Cloud (AWS/Azure/GCP), use their native 'Secrets Manager' services.",
    "Step 3 - For Kubernetes, use 'K8s Secrets' which are injected as env variables.",
    "Step 4 - For CI/CD, use 'GitHub Secrets' to inject keys during build/test time.",
    "Step 5 - Use a dedicated 'config' module in Express to aggregate all secrets in one place.",
  ],

  diagram: `
graph TD
    Safe[Secrets Manager: AWS / Vault] -- "Securely Stores" --> P[DB_PASSWORD=xxxx]
    Safe -- "Injected at Runtime" --> Container[Running Express Container]
    Container -- "Reads from" --> process_env["process.env"]
    process_env -- "Auth" --> DB[(Database)]
    Dev[Developer] -- "Has no access to" --> P
    Dev -- "Writes" --> Code[Express App]
  `,

  analogy:
    "It's like a 'Hotel Key'. The hotel (Secrets Manager) has all the master keys. When you check-in (Server Starts), you are given a temporary key (Secret) to your room. You don't take the lock home with you; you just use the key while you are there.",

  code: `
// config.js - Centralized configuration
const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const getSecrets = async () => {
  const client = new SecretsManagerClient({ region: "us-east-1" });
  const response = await client.send(
    new GetSecretValueCommand({ SecretId: "prod/MyApp/Secrets" })
  );
  return JSON.parse(response.SecretValue);
};

// server.js
const startServer = async () => {
  try {
    const secrets = await getSecrets();
    
    // Inject secrets into environment
    process.env.DB_URL = secrets.DB_URL;
    process.env.API_KEY = secrets.API_KEY;

    app.listen(3000, () => console.log('Server started with secure secrets'));
  } catch (err) {
    console.error('Failed to load secrets', err);
    process.exit(1);
  }
};
  `,

  commonMistake: [
    "Storing secrets in 'Dockerfile' or 'docker-compose.yml' files (which are often checked into Git).",
    "Logging environment variables to the console for debugging (hackers can find these in the server logs).",
    "Not using 'Encryption at Rest' for secrets. Professional managers encrypt the data while it sits on their disks.",
    "Sharing the same secrets across Development, Testing, and Production (Always use unique keys for each environment).",
  ],

  interviewSummary:
    "Secrets management is a critical pillar of production security. It involves move from file-based configuration to centralized, encrypted, and audited secret stores. This minimizes the risk of accidental exposure and simplifies large-scale configuration management.",

  interviewQA: [
    {
      q: "What is 'Secret Rotation'?",
      a: "It is the process of periodically changing a password or key automatically to reduce the amount of time an attacker can use a stolen secret.",
    },
    {
      q: "Why is Git-crypt or Dotenv-vault used?",
      a: "They allow you to encrypt your secrets before committing them to Git, so only people with the decryption key can read the actual values.",
    },
  ],
};
