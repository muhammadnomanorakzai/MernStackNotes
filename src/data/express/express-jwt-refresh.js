export const expressJwtRefresh = {
  id: "express-jwt-refresh",
  title: "JWT Refresh Token — Rotation Strategy",
  category: "Express",
  difficulty: "Advanced",
  tags: ["JWT", "Refresh Token", "Rotation", "Security", "Authentication", "Session"],

  definition:
    "A Refresh Token is a special token used to obtain a new Access Token without requiring the user to log in again. Refresh Token Rotation is a security strategy where a new refresh token is issued every time the old one is used. This prevents stolen refresh tokens from being used indefinitely.",

  simpleExplanation:
    "Imagine your Access Token is a 'Temporary Pass' that lasts 15 minutes. When it expires, you go to the desk (the Refresh Endpoint) and show your 'Membership VIP Card' (the Refresh Token). The desk gives you a new 15-minute pass AND a brand new VIP card, and cancels the old one. If a thief steals your old VIP card, it's useless because you've already rotated it. This keeps your account safe while keeping you logged in.",

  romanUrduRevision:
    "Refresh Tokens user login experience ko behtar banate hain. Access token hamesha short-lived (e.g., 15 mins) rakha jata hai taake security bani rahe. Jab wo expire ho jaye, toh client background mein 'Refresh Token' bhej kar naya access token le leta hai. 'Rotation' ka matlab hai ke har baar naya refresh token milega aur purana invalid ho jayega. Isse agar koi hacker purana token chura bhi le, toh wo use nahi kar payega.",

  why: "Security without compromise. If you use a long-lived access token (e.g., 30 days), a hacker who steals it has control for 30 days. But if you use 15-minute access tokens and a rotatable refresh token, the window of attack is tiny. If the same refresh token is used twice (indicating a theft), your server can automatically invalidate the entire session to protect the user.",

  how: [
    "Step 1 - Upon Login: Issue a short-lived 'Access Token' (15m) and a long-lived 'Refresh Token' (7d).",
    "Step 2 - Store: Access Token in memory/state; Refresh Token in a secure, httpOnly cookie.",
    "Step 3 - Refresh: Create an endpoint '/refresh' that verifies the Refresh Token.",
    "Step 4 - Rotate: In the '/refresh' route, generate a NEW access token AND a NEW refresh token.",
    "Step 5 - Cleanup: Delete or invalidate the old refresh token in your database/store.",
  ],

  diagram: `
flowchart TD
    A[Access Token Expired] --> B[Client calls /refresh]
    B -- Sends Refresh Token --> C{Verify & Check DB}
    C -- "Already used?" --> D[SECURITY ALERT: Log out all sessions]
    C -- "Valid & New" --> E[Generate NEW Access Token]
    E --> F[Generate NEW Refresh Token]
    F --> G[Update DB & Cookie]
    G --> H[Response: Success]
    style D fill:#e74c3c,color:white
    style E fill:#27ae60,color:white
  `,

  analogy:
    "Think of a 'Secret Handshake'. Every time you meet, you agree on a NEW secret handshake for the next time. If someone watches you and tries to use the old handshake, the guard knows they are a spy because the handshake has already changed. This is the essence of token rotation.",

  realLifeExample:
    "Professional Banking or SaaS: You notice you stay logged into Slack or your Bank app even if you close the tab. But you never see a long Token in the URL. They are using Refresh Tokens in secure cookies. Behind the scenes, every time your app starts, it fetches a fresh 15-minute access token using the 'silent refresh' pattern.",

  code: `
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// --- THE LOGIC ---
app.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  // 1. Verify token
  try {
    const user = jwt.verify(refreshToken, REFRESH_SECRET);
    
    // 2. Check DB if used (Rotation check)
    const isUsed = await TokenModel.findOne({ token: refreshToken, used: true });
    if (isUsed) {
      // THEFT DETECTED: Clear all user tokens
      await TokenModel.deleteMany({ userId: user.id });
      return res.status(403).send('Security breach detected. Please log in again.');
    }

    // 3. Mark old token as used and generate new ones
    await TokenModel.update({ token: refreshToken }, { used: true });

    const newAccessToken = jwt.sign({ id: user.id }, SECRET, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: '7d' });

    // 4. Send back in secure cookie
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken: newAccessToken });
    
  } catch (err) {
    res.sendStatus(403);
  }
});

app.listen(3000);
  `,

  commonMistake: [
    "Storing refresh tokens in localStorage (they are vulnerable to XSS; use httpOnly cookies).",
    "Not implementing 'Rotation' (using the same refresh token forever makes it as dangerous as a password).",
    "Not handling cross-tab synchronization (if you have two tabs, they might try to refresh at the same time and trigger a false 'theft' alert).",
    "Forgetting to invalidate old refresh tokens in the database.",
  ],

  interviewSummary: [
    "Refresh tokens allow for persistent sessions with short-lived access tokens.",
    "Token rotation is a core defense against 'Replay Attacks'.",
    "Automatic Reuse Detection (ARD) is a pattern where the server detects if an old refresh token is used.",
    "Refresh tokens should always be stored in httpOnly, Secure, and SameSite:Strict cookies.",
  ],
};
