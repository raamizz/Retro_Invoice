const jwt = require("jsonwebtoken")
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'youraccesstokensecret';
const ACCESS_TOKEN_EXPIRES_IN = '15m';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    // Check if token is about to expire (less than 2 minutes left)
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = user.exp - now;
    if (timeLeft < 120) { // less than 2 minutes
      const payload = { id: user.id, email: user.email, role: user.role };
      const newToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
      res.setHeader('x-new-token', newToken);
    }
    next();
  });

  
}

module.exports = authenticateToken;