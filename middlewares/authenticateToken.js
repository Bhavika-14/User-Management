const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ error: 'Unauthorized - Token missing' });

  jwt.verify(token, config.secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden - Invalid token' });

    req.user = user;
    next();
  });
};
