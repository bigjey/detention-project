const router = require('express').Router();

const categoryModel = require('./model');
const controller = require('../../utils/crud')(categoryModel);

router.param('id', controller.preloadById);

router.route('/')
  .post(controller.create)
  .get(controller.getAll);

router.route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

module.exports = router;