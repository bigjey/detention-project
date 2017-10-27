const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('mongoose').model('User');

const jwtOptions = {
  expiresIn: '5m'
}

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({email})
    .then(user => {
      if (!user) return res.json({success: false, err: {password: 'Wrong email or password'}})

      user.comparePassword(password)
        .then((isMatch) => {
          if (!isMatch) return res.json({success: false, err: {password: 'Wrong email or password'}})

          const payload = {userId: user._id};

          const token = jwt.sign(payload, req.app.get('secret'), jwtOptions)

          res.json({success: true, token})
        })
        .catch(err => res.json({success: false, err}))
    })
    .catch(err => {
      res.json({success: false, err: 'could not findOne'})
    });
}

const register = (req, res) => {
  const { email, password } = req.body;

  User.create({email, password})
    .then((user) => {
      res.json({success: true, user})
    })
    .catch(err => {
      if (err.code === 11000) {
        res.json({success: false, err: {
          email: 'This email is already registered'
        }})
      } else {
        res.json({success: false, err})
      }
    })
}

const validate = (req, res) => {
  const { token } = req.body;

  jwt.verify(token, req.app.get('secret'), (err, decoded) => {
    if (err) {
      return res.json({success: false, err: err.message})
    };

    const payload = {userId: decoded.userId};

    const token = jwt.sign(payload, req.app.get('secret'), jwtOptions);

    res.send({success: true, token});
  });
}

module.exports = {
  login,
  register,
  validate
}