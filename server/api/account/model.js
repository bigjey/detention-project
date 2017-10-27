var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var account = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    require: true
  },
  balance: {
    type: Number,
    default: 0,
  },
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  collection: 'accounts'
});

module.exports = mongoose.model('Account', account)