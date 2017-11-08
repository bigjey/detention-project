const router = require('express').Router();
const controller = require('./controller');

router.param('id', controller.preloadById);

router.route('/')
  .post(controller.create)
  .get(controller.getAll);

router.route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

module.exports = router;