const Account = require('mongoose').model('Account');
const Transaction = require('mongoose').model('Transaction');

const controller = require('../../utils/crud')(Transaction, {
  populate: ['toAccount', 'fromAccount', 'category']
});

controller.create = async (req, res) => {
  try {
    const transaction = await Transaction.create(Object.assign({}, req.body, {userId: req.userId}));
    const accounts = await transaction.apply();
    const populated = await Transaction.populate(transaction, 'toAccount fromAccount category');

    res.json({
      success: true,
      item: populated,
      accounts
    })
  } catch (e) {
    console.log(e);
    res.json({success: false, e})
  }
}

controller.deleteOne = async (req, res) => {
  const transaction = req.itemFromMiddleware;

  try {
    await transaction.remove();
    const accounts = await transaction.revert();
    
    res.json({
      success: true,
      item: transaction,
      accounts
    });

  } catch (e) {
    console.log(e);
    res.json({success: false, e})
  }
}

module.exports = controller;
