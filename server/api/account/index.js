const router = require('express').Router();

const accountModel = require('mongoose').model('Account');
const controller = require('../../utils/crud')(accountModel);

router.param('id', controller.preloadById);

router.route('/').post(controller.create).get(controller.getAll);

router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

module.exports = router;
