const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // use a secure key in production

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Auth Header:', authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Token:', token);

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log('Token Error:', err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole,
};
