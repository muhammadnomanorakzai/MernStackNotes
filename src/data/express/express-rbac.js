export const expressRbac = {
  id: "express-rbac",
  title: "RBAC — Role-Based Access Control",
  category: "Express",
  difficulty: "Advanced",
  tags: ["RBAC", "Authorization", "Security", "Roles", "Permissions", "Admin", "User"],

  definition:
    "Role-Based Access Control (RBAC) is an authorization strategy that grants or denies permissions to users based on their assigned role (e.g., 'admin', 'editor', 'user'). While 'Authentication' checks WHO you are, 'RBAC' (part of Authorization) checks WHAT you are allowed to do once you're inside the system.",

  simpleExplanation:
    "Think of a 'Hospital Building'. Authentication is the 'ID Badge' that lets you enter the front door. RBAC is the 'Access Level' on that badge. A patient's badge (User role) only lets them open the door to their room. A doctor's badge (Admin role) lets them open the surgery room and the pharmacy. RBAC ensures that a regular user cannot delete another user's account just by changing a URL.",

  romanUrduRevision:
    "RBAC (Role-Based Access Control) authorization ka sab se popular system hai. Is mein hum users ko different 'Roles' assign karte hain. Maslan ek simple user sirf apni posts dekh sakta hai, lekin ek Admin saari posts delete bhi kar sakta hai. Express mein hum ek 'authorizeRoles' middleware banate hain jo 'req.user.role' check karta hai aur agar user ka role allowed nahi hai toh 403 Forbidden error bhej deta hai.",

  why: "Granular Security. In any real-world app (like an E-commerce dashboard or a School system), you have different types of users. You don't want a regular customer to see the 'Total Sales' analytics or delete orders. RBAC allows you to define these restrictions once and apply them globally using simple middleware, making your application professional and secure.",

  how: [
    "Step 1 - Include a 'role' field in your user database schema (default: 'user').",
    "Step 2 - When generating a JWT, include the 'role' in the payload.",
    "Step 3 - Create an 'authorize' middleware that takes an array of allowed roles.",
    "Step 4 - Protect your sensitive routes: 'app.delete(\"/user\", authorize([\"admin\"]), ...)'.",
    "Step 5 - The middleware checks 'req.user.role' and calls 'next()' ONLY if it matches the list.",
  ],

  diagram: `
flowchart TD
    A[Request to /delete-user] --> B[Auth Middleware]
    B -- "Logged in?" --> C[RBAC Middleware]
    C -- "Check Role" --> D{Is Admin?}
    D -- "Yes" --> E[Process Delete]
    D -- "No" --> F[Status 403: Forbidden]
    style C fill:#3498db,color:white
    style F fill:#e74c3c,color:white
  `,

  analogy:
    "Imagine a 'Hotel'. Everyone with a key can enter the lobby (Authentication). But your key only opens 'Room 304'. It doesn't open the 'Staff Lounge' or the 'Manager's Office'. The physical lock on the Manager's office that checks if your key has 'Manager Level' permission is the RBAC system.",

  realLifeExample:
    "A Blog Platform: A 'Subscriber' can read posts. An 'Editor' can write and edit posts. An 'Admin' can delete users and change site settings. By using RBAC, the platform developer can ensure that even if a Subscriber finds the URL for the '/admin/delete-user' page, the server will block them automatically.",

  code: `
const express = require('express');
const app = express();

// 1. REUSABLE RBAC MIDDLEWARE
const authorize = (roles = []) => {
  return (req, res, next) => {
    // We assume 'verifyToken' ran before and set 'req.user'
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Forbidden: You do not have permission for this action'
      });
    }
    next();
  };
};

// 2. DEFINE ROUTES WITH DIFFERENT PERMISSIONS

// Accessible by everyone logged in
app.get('/api/profile', verifyToken, (req, res) => {
  res.send('Profile Data');
});

// Accessible ONLY by Admins
app.delete('/api/users/:id', verifyToken, authorize(['admin']), (req, res) => {
  res.send('User Deleted by Admin');
});

// Accessible by Admin AND Moderator
app.put('/api/posts/:id', verifyToken, authorize(['admin', 'moderator']), (req, res) => {
  res.send('Post updated!');
});

app.listen(3000);
  `,

  commonMistake: [
    "Hardcoding roles in your database (use an ENUM or constant list for consistency).",
    "Forgetting that RBAC depends on Authentication (you must verify the user's ID before you can check their role).",
    "Neglecting to handle higher-role hierarchy (e.g., assuming an Admin can't do what a Moderator can; use nested checks if needed).",
    "Client-side RBAC only: Hide buttons in React for users, but ALWAYS double-check the role on the server, as hackers can unhide buttons via DevTools.",
  ],

  interviewSummary: [
    "RBAC manages permissions based on user categories (Roles).",
    "Authorization is checking permissions, while Authentication is checking identity.",
    "The 403 Forbidden status code is the semantic response for RBAC failures.",
    "Roles should be stored in the JWT or session to avoid frequent database lookups.",
  ],
};
