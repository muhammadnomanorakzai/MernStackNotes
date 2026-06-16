export const expressBullQueue = {
  id: "express-bull-queue",
  title: "Background Jobs — Bull Queue & Redis",
  category: "Express",
  difficulty: "Advanced",
  tags: ["Bull", "Redis", "Background Jobs", "Queue", "Asynchronous", "Workflows", "Task Management"],

  definition:
    "Bull is a powerful Node.js library for handling background jobs and message queues based on Redis. It allows you to offload time-consuming tasks (like sending emails, processing images, or generating reports) from the main Express request-response cycle to a background worker.",

  simpleExplanation:
    "Imagine you are a Chef in a restaurant. When a customer orders a pizza (HTTP Request), you don't make them wait while you also go out and deliver it. You hand the delivery box to a 'Delivery Boy' (Bull Queue) and immediately go back to cooking for the next customer. The delivery happens in the background. Bull keeps track of the 'to-do list' in Redis so that no orders are lost even if the power goes out.",

  romanUrduRevision:
    "Bull queue heavy tasks ko background mein chalane ke liye use hoti hai. Agar aap aik saath 1000 users ko email bhejna chahte hain, toh server handle nahi kar payega. Aap Bull use karke ye kaam queue mein daal dete hain aur server foran 'Processing' ka message de deta hai. Is ke liye Redis ka hona lazmi hai kyunke saari jobs wahin store hoti hain.",

  realLifeExample:
    "Welcome Emails: When a user signs up on your MERN app, instead of making the user wait 3-5 seconds for the email API to respond, you just add an 'email-job' to the Bull queue. The user sees the 'Success' page instantly, and the email is sent 2 seconds later in the background.",

  why: "Reliability and UX. Main thread blocking causes bad user experience. Background jobs ensure that even if a task takes 5 minutes, your API remains fast and responsive. Bull also handles 'Retries' automatically—if an email fails to send, Bull can try again 3 times with a delay.",

  how: [
    "Step 1 - Install 'bull' and make sure Redis is running on your system.",
    "Step 2 - Create a Queue instance: 'const myQueue = new Bull(\"name\", redisConfig)'.",
    "Step 3 - Add data to the queue inside a route: 'myQueue.add({ userId: 123 })'.",
    "Step 4 - Define a 'Process' function (worker) that listens for new jobs in the queue.",
    "Step 5 - Handle 'Completed' or 'Failed' events for logging and monitoring.",
  ],

  diagram: `
graph TD
    Client[User Request] -- "POST /register" --> API[Express Route]
    API -- "add job" --> Redis[(Redis Database)]
    Redis -- "notifies" --> Worker[Bull Worker Process]
    Worker -- "sends email" --> EmailService[Email API / AWS SES]
    API -- "200 Success" --> Client
    Worker -- "job completed" --> Redis
  `,

  analogy:
    "It's like a 'Dry Cleaner'. You drop off your clothes (Job), get a receipt, and leave (Response). The cleaner doesn't wash your clothes while you stand there; they put them in a pile (Queue) and process them later. You come back or get a notification when they are done.",

  code: `
const Queue = require('bull');

// 1. Create the Queue
const emailQueue = new Queue('send-emails', {
  redis: { port: 6379, host: '127.0.0.1' }
});

// 2. Add job to queue in an Express route
app.post('/register', async (req, res) => {
  const { email } = req.body;
  
  // Offload to background
  await emailQueue.add({ email }, {
    attempts: 3, // Retry up to 3 times if fails
    backoff: 5000 // Wait 5s before retry
  });

  res.status(200).json({ message: 'Welcome! Validating your email...' });
});

// 3. Worker: Process the jobs (Can be in a separate file)
emailQueue.process(async (job) => {
  const { email } = job.data;
  console.log('Sending email to: ' + email);
  
  // Real logic here (Nodemailer, SendGrid, etc.)
  await sendActualEmail(email); 
  
  return { status: 'Success' };
});

// 4. Monitoring Events
emailQueue.on('completed', (job) => {
  console.log(\`Job \${job.id} has completed!\`);
});
  `,

  commonMistake: [
    "Forgetting to start Redis before running the app—Bull will fail silently or throw connection errors.",
    "Processing jobs on the same main thread as Express during high traffic (best to have a separate 'worker' process to keep the CPU free).",
    "Not handling errors inside the 'process' function, which can lead to ghost jobs that never fail or complete.",
    "Adding huge objects/files to Redis. Redis is for metadata; store large files in S3 and just pass the file URL to the job.",
  ],

  interviewSummary:
    "Bull is the standard for Redis-backed queues in Node.js. It supports concurrency, delayed jobs, retries, and priority. It's essential for offloading heavy tasks from the Express main loop to maintain a highly responsive API.",

  interviewQA: [
    {
      q: "Why does Bull require Redis?",
      a: "Redis is used as the data store for the queue. It provides the speed and persistence needed to manage job states (waiting, active, completed, failed) reliably.",
    },
    {
      q: "What is 'Concurrency' in Bull?",
      a: "Concurrency allows you to process multiple jobs at the same time in parallel. For example, setting concurrency to 5 means the worker will handle 5 emails simultaneously.",
    },
  ],
};
