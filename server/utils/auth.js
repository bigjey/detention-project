const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = (password) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, 5, (err, hashed) => {
      if (err) reject(err);

      resolve(hashed);
    });
  });

const checkAuthorization = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) return res.status(403).end();

  jwt.verify(token, req.app.get('secret'), (err, decoded) => {
    if (err) return res.json({ success: false, err: err.message });

    req.userId = decoded.userId;
    next();
  });
};

module.exports = {
  hashPassword,
  checkAuthorization,
};
