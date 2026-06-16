export const expressSsl = {
  id: "express-ssl",
  title: "HTTPS & SSL Certificates — Securing Traffic",
  category: "Express",
  difficulty: "Advanced",
  tags: ["HTTPS", "SSL", "TLS", "Certbot", "Let's Encrypt", "Security", "Encryption"],

  definition:
    "HTTPS (Hypertext Transfer Protocol Secure) is the secure version of HTTP. It uses SSL/TLS certificates to encrypt the data sent between a browser and a server, preventing hackers from reading sensitive information like passwords or credit card details during transmission.",

  simpleExplanation:
    "Imagine you are sending a secret letter. In HTTP, you send it in a clear envelope (anyone can read it). In HTTPS, you put the letter in a 'Locked Metal Box' (Encryption). Only the recipient has the key to open it. An SSL Certificate is like a 'ID Card' that proves who you are, so the browser knows they are talking to the real 'facebook.com' and not a fake one.",

  romanUrduRevision:
    "HTTPS ka matlab hai ke aapka data encrypt ho kar ja raha hai. Is ke liye humein 'SSL Certificate' ki zaroorat hoti hai. Aaj kal 'Let's Encrypt' se free certificates mil jate hain aur 'Certbot' tool isay Nginx mein auto-configure kar deta hai. Browser mein green lock icon isi wajah se aata hai.",

  realLifeExample:
    "E-Commerce Checkout: A user enters their credit card on your MERN site. If you use HTTP, a hacker on the same Wi-Fi could 'sniff' and steal those details. With HTTPS, even if they catch the data, it looks like random gibberish (e.g., 'x82!p9#...') because it's encrypted.",

  why: "Trust and Security. Without HTTPS, modern browsers like Chrome will mark your site as 'Not Secure', which scares away users. It is also a requirement for modern web features (like Geolocation or Service Workers) and significantly improves your SEO ranking on Google.",

  how: [
    "Step 1 - Point your Domain (A Record) to your server's IP.",
    "Step 2 - Install Certbot ('sudo apt install certbot python3-certbot-nginx').",
    "Step 3 - Run Certbot: 'sudo certbot --nginx -d yourdomain.com'.",
    "Step 4 - Certbot automatically verifies your domain and updates your Nginx config.",
    "Step 5 - Set up a Cron job (usually auto-done) to renew the certificate every 90 days.",
  ],

  diagram: `
sequenceDiagram
    participant User
    participant Nginx
    participant Express

    User->>Nginx: Request HTTPS Connection
    Nginx-->>User: Sends Public Key + SSL Cert
    User->>User: Verifies Cert with Authority
    User->>Nginx: Sends Encrypted Session Key
    Note over User,Nginx: Secure Encrypted Channel Established
    Nginx->>Express: Forwards Plain HTTP (internal)
    Express-->>Nginx: Response Data
    Nginx-->>User: Sends Encrypted Response
  `,

  analogy:
    "It's like a 'Passport'. When you travel (visit a site), the border agent (the Browser) asks for your ID. A passport (SSL Cert) is issued by a government authority (Certificate Authority) and has security stamps (Digital Signatures) that prove you are who you say you are.",

  code: `
# After running: sudo certbot --nginx -d myapp.com
# Your Nginx config will automatically look like this:

server {
    listen 443 ssl; # Listen on HTTPS port
    server_name myapp.com;

    # Certbot added these lines:
    ssl_certificate /etc/letsencrypt/live/myapp.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/myapp.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://localhost:3000;
        # ... other proxy headers
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name myapp.com;
    return 301 https://$host$request_uri;
}
  `,

  commonMistake: [
    "Forgetting to open Port 443 in your server firewall (UFW/AWS Security Group). If port 443 is closed, HTTPS won't work.",
    "Using 'Self-Signed' certificates in production. They show a big red warning to users saying 'This connection is not private'.",
    "Hardcoding 'http://' in your frontend API calls. Always use relative URLs or 'https://' to avoid 'Mixed Content' errors.",
    "Not automating the renewal. Let's Encrypt certificates expire every 90 days. Always verify that Certbot's auto-renewal timer is active.",
  ],

  interviewSummary:
    "HTTPS provides privacy, integrity, and authentication through TLS encryption. Let's Encrypt has democratized security by providing free, automated certificates. Nginx is the preferred place for 'SSL Termination', handling the encryption logic so the Express app stays lightweight.",

  interviewQA: [
    {
      q: "What is 'Mixed Content'?",
      a: "It's when a secure HTTPS page tries to load resources (like images or scripts) over an insecure HTTP connection. Browsers often block these insecure scripts for security reasons.",
    },
    {
      q: "What is HSTS (HTTP Strict Transport Security)?",
      a: "It's a security header that tells the browser to ONLY ever use HTTPS for that site, even if the user manually types 'http://', preventing downgrade attacks.",
    },
  ],
};
