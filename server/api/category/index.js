const router = require('express').Router();

const categoryModel = require('./model');
const controller = require('../../utils/crud')(categoryModel);

router.route('/')
  .post(controller.create)
  .get(controller.getAll);

module.exports = router;