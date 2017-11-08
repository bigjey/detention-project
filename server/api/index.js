require('../models');

const router = require('express').Router();

const accountRouter = require('./account');
const categoryRouter = require('./category');
const transactionRouter = require('./transaction');

router.use('/account', accountRouter);
router.use('/category', categoryRouter);
router.use('/transaction', transactionRouter);

module.exports = router;