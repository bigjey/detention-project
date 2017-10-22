const router = require('express').Router();

const transactionModel = require('./model');
const modelSettings = {
  populate: ['toAccount', 'fromAccount', 'category']
}
const controller = require('../../utils/crud')(transactionModel, modelSettings);

router.param('id', controller.preloadById);

router.route('/')
  .post(controller.create)
  .get(controller.getAll);

router.route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

module.exports = router;