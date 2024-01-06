module.exports = {
    authorizeAdmin: (req, res, next) => {
      if (req.user && req.user.role === 'Admin') {
        return next();
      } else {
        return res.status(403).json({ error: 'Forbidden - Admin access required' });
      }
    },
    authorizeUser: (req, res, next) => {
      if (req.user && req.user.role === 'User') {
        return next();
      } else {
        return res.status(403).json({ error: 'Forbidden - User access required' });
      }
    },
  };
  