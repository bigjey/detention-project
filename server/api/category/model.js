var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var category = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 15
  },
  type: {
    type: String,
    enum: ['income', 'expense']
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  collection: 'categories'
});

module.exports = mongoose.model('Category', category)