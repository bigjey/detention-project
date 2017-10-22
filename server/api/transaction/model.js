var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const transactionTypes = ['income', 'expense', 'transfer'];

var transaction = new Schema({
  type: {
    type: String,
    require: true,
    enum: transactionTypes,
    default: 'income'
  },
  amount: {
    type: Number,
    default: 0,
    require: true
  },
  fromAccount: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    default: null,
    required: function() {
      return this.type !== 'income'
    }
  },
  toAccount: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    default: null,
    required: function() {
      return this.type !== 'expense' 
    }
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
    required: function() {
      return this.type !== 'transfer'
    }
  },
  description: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now()
  },
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  collection: 'transactions'
});

module.exports = mongoose.model('Transaction', transaction)
module.export = {
  transactionTypes
}