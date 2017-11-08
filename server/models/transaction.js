var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Account = mongoose.model('Account');

const transactionTypes = ['income', 'expense', 'transfer'];

var Transaction = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
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

Transaction.methods.apply = function(dx = 1) {
  const promises = [];

  if (this.toAccount) {
    promises.push(Account.findById(this.toAccount)
      .then((account) => {
        account.balance += this.amount * dx;
        return account.save();
      })
    )
  }

  if (this.fromAccount) {
    promises.push(Account.findById(this.fromAccount)
      .then((account) => {
        account.balance -= (this.amount * dx);
        return account.save();
      })
    )
  }

  return Promise.all(promises);
}

Transaction.methods.revert = function() {
  return this.apply(-1);
}

module.exports = mongoose.model('Transaction', Transaction)
module.export = {
  transactionTypes
}