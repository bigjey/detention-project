const router = require('express').Router();

const accountModel = require('./model');
const controller = require('../../utils/crud')(accountModel);

router.route('/')
  .post(controller.create)
  .get(controller.getAll);

module.exports = router;