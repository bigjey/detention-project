const router = require('express').Router();

const transactionModel = require('./model');
const modelSettings = {
  populate: ['toAccount', 'fromAccount', 'category']
}
const controller = require('../../utils/crud')(transactionModel, modelSettings);

router.route('/')
  .post(controller.create)
  .get(controller.getAll);

module.exports = router;