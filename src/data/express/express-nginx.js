export const expressNginx = {
  id: "express-nginx",
  title: "Reverse Proxy with Nginx",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Nginx", "Reverse Proxy", "Load Balancing", "Production", "Security", "Static Serving"],

  definition:
    "A Reverse Proxy is a server that sits in front of one or more web servers (like your Express app), intercepting requests and forwarding them to the appropriate back-end. Nginx is the most popular reverse proxy because it is extremely fast, handles SSL/TLS termination, and can serve static files much more efficiently than Node.js.",

  simpleExplanation:
    "Think of Nginx as the 'Front Desk Receptionist' of a large company. Visitors (Browsers) don't go directly to the CEO's office (Express Server). They talk to the receptionist first. The receptionist handles the security check (SSL), shows them the brochures (Static Files), and only directs them to the CEO if they need a specific meeting (Dynamic API Data). This keeps your Express server safe and focused on its job.",

  romanUrduRevision:
    "Nginx aik reverse proxy hai jo Express server ke aage lagayi jati hai. Express direct internet par nahi chora jata, balke Nginx requests ko catch karke Express ko pass karti hai. Nginx static files (images, CSS) ko Express se bohot fast serve karti hai aur security provide karti hai.",

  realLifeExample:
    "Multi-Service Routing: You have an Express API on port 5000 and an Admin Dashboard on port 5001. Using Nginx, you can route 'myapp.com/api' to the Express app and 'myapp.com/admin' to the dashboard, all under a single domain name and a single SSL certificate.",

  why: "Performance and Reliability. Nginx can handle thousands of simultaneous connections with very little memory. By offloading 'SSL/HTTPS calculations' and 'Static File Serving' to Nginx, you free up your Node.js CPU to focus purely on business logic. It also provides an extra layer of security against DDoS attacks.",

  how: [
    "Step 1 - Install Nginx on your Linux server ('sudo apt install nginx').",
    "Step 2 - Create a configuration file in '/etc/nginx/sites-available/'.",
    "Step 3 - Use 'proxy_pass' to forward traffic to 'http://localhost:3000'.",
    "Step 4 - Set headers like 'Host', 'X-Real-IP', and 'X-Forwarded-For' so Express knows the original user's IP.",
    "Step 5 - Symlink the file to 'sites-enabled' and restart Nginx.",
  ],

  diagram: `
graph LR
    User[Internet / User] -- "HTTP/HTTPS (Port 80/443)" --> Nginx[Nginx Reverse Proxy]
    Nginx -- "Serves Images/CSS" --> Disk[(Static Files)]
    Nginx -- "Forwards API calls (Port 3000)" --> Express[Express Server]
    Express -- "Data" --> Nginx
    Nginx -- "Response" --> User
  `,

  analogy:
    "It's like a 'Shield'. Your Express app is the soldier. Nginx is the shield. The shield takes the impact of many small attacks (SSL handshakes, static requests) so the soldier stays fresh and ready for the real battle (Processing API logic).",

  code: `
# Example Nginx Config File: /etc/nginx/sites-available/myapp
server {
    listen 80;
    server_name myapp.com;

    # 1. Serving Static Files (High performance)
    location /static/ {
        alias /var/www/myapp/public/;
        expires 30d;
    }

    # 2. Reverse Proxy to Express
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # 3. Pass original user IP to Express
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
  `,

  commonMistake: [
    "Not setting 'proxy_set_header Host $host;'. Without this, Express might not know which domain the request was intended for, causing routing issues.",
    "Trying to serve large files through Express when Nginx is available. Express is slow for large file reads; Nginx is built for it.",
    "Forgetting to update 'app.set(\"trust proxy\", 1)' in Express. If you don't do this, req.ip will always be '127.0.0.1' (the Nginx IP) instead of the actual user's IP.",
    "Using Nginx in Development. Nginx is for Production; in dev, just use 'localhost:3000'.",
  ],

  interviewSummary:
    "Nginx acts as the front-facing entry point for Node.js applications in production. It provides critical benefits including SSL termination, static file caching, load balancing, and enhanced security, ensuring the Express application remains performant and isolated.",

  interviewQA: [
    {
      q: "What is 'SSL Termination' in Nginx?",
      a: "It means Nginx handles the encryption/decryption of HTTPS traffic. The traffic between Nginx and Express remains plain HTTP (internally on the server), which saves the Express CPU from doing expensive crypto math.",
    },
    {
      q: "What is the 'proxy_pass' directive?",
      a: "It is the core Nginx command used to forward an incoming request to another server, specified by a URL (e.g., http://localhost:3000).",
    },
  ],
};
