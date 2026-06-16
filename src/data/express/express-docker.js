export const expressDocker = {
  id: "express-docker",
  title: "Dockerizing Express — Containers & Dockerfiles",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Docker", "Containers", "Dockerfile", "DevOps", "Microservices", "Deployment", "Isolation"],

  definition:
    "Docker is a platform for 'containerizing' applications. It packages your Express app, its dependencies (Node.js, npm packages), and its environment configuration into a single 'Image'. This image can then be run as a 'Container' on any machine (Local, AWS, DigitalOcean) and will behave exactly the same way every time.",

  simpleExplanation:
    "Imagine you are moving to a new house. Instead of packing 500 small boxes, you put everything into one 'Shipping Container'. Inside that container, everything is exactly where you left it. When the container arrives at the new house, you just plug in the power, and everything works. Docker is that container for your code. It solves the 'It works on my machine' problem forever.",

  romanUrduRevision:
    "Docker aapki app ko aik 'dibbay' (container) mein band kar deta hai. Is mein Node.js version, code, aur environment bilkul fixed hota hai. Aap aik 'Dockerfile' likhte hain jo recipe ki tarah kaam karti hai. Phir aap kahin bhi deploy karein (Windows, Linux, Cloud), app bilkul sahi chalegi kyunke environment fix hai.",

  realLifeExample:
    "Version Conflicts: You are working on 3 projects. Project A needs Node 14, Project B needs Node 18, and Project C needs Node 20. Instead of constantly switching Node versions on your laptop, you give each project its own Docker container with the exact Node version it needs. They run side-by-side without ever conflicting.",

  why: "Consistency and Portability. In a professional team, everyone might have different laptops. Docker ensures that everyone is coding on the exact same environment as the production server. It also makes scaling easy—if you need 10 copies of your app, you just spin up 10 containers.",

  how: [
    "Step 1 - Create a 'Dockerfile' in the root directory.",
    "Step 2 - Specify a base image ('FROM node:18-alpine').",
    "Step 3 - Set the working directory ('WORKDIR /app').",
    "Step 4 - Copy 'package.json' and run 'npm install'.",
    "Step 5 - Copy the rest of the code and set the 'CMD' to run the server.",
  ],

  diagram: `
graph TD
    Code[Your Express Code] -- "Instructions" --> DF["Dockerfile"]
    DF -- "Build" --> Image[Docker Image (Snapshot)]
    Image -- "Ship" --> Hub[Docker Hub / Registry]
    Hub -- "Pull & Run" --> Prod[Production Server]
    subgraph Container [Running Container]
      Node[Node.js Runtime]
      Deps[npm modules]
      App[Your App]
    end
    Prod -- "Host" --> Container
  `,

  analogy:
    "It's like a 'Frozen Dinner'. The box (Docker Image) contains the food, the instructions, and the required seasoning. No matter whose microwave (Server) you put it in, the meal (Running App) will taste exactly the same because everything was pre-packaged in the factory.",

  code: `
# --- Dockerfile ---
# 1. Use lightweight Node image
FROM node:18-alpine

# 2. Create app directory
WORKDIR /usr/src/app

# 3. Copy package files first (for efficient caching)
COPY package*.json ./

# 4. Install production dependencies only
RUN npm install --only=production

# 5. Copy your actual code
COPY . .

# 6. Expose the port your app runs on
EXPOSE 3000

# 7. Command to start the app
CMD ["node", "src/server.js"]

# --- .dockerignore ---
node_modules
npm-debug.log
.env
.git
`,

  commonMistake: [
    "Not using a '.dockerignore' file. This causes Docker to copy the massive 'node_modules' folder from your laptop into the container, making the image huge and slowing down the build.",
    "Using a heavy base image. Always use '-alpine' versions of Node images to keep your container size small (e.g., 100MB vs 900MB).",
    "Hardcoding environment variables (like DB passwords) inside the Dockerfile. Use 'ENV' or pass them during runtime using '-e' flags.",
    "Running as 'root' user inside the container. Best practice is to use the 'node' user for better security.",
  ],

  interviewSummary:
    "Docker enables immutable infrastructure. By defining the application environment in a Dockerfile, developers ensure cross-platform compatibility and simplify the deployment workflow. It is the core building block of modern DevOps and Microservices.",

  interviewQA: [
    {
      q: "What is an Image vs a Container?",
      a: "An Image is a read-only template (like a blueprint). A Container is a running instance of that image (like the actual building).",
    },
    {
      q: "What is the benefit of copying 'package.json' before the source code in a Dockerfile?",
      a: "This allows Docker to 'cache' the 'npm install' layer. If you only change your code but not your dependencies, Docker skips the install step, making the build much faster.",
    },
  ],
};
