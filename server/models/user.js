const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { hashPassword } = require('../utils/auth');

var Schema = mongoose.Schema;

var User = new Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  settings: {
    header: String
  },
  created: {
    type: Date
  },
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  collection: 'users'
});


User.pre('save', function(next) {
  if (!this.created) {
    hashPassword(this.password)
      .then(hashed => {
        this.created = Date.now();
        this.password = hashed;
        next();
      })
      .catch(err => console.log(err));
  } else {
    next();
  }
})

User.methods.comparePassword = function(password, cb) {
  return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', User);