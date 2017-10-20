const router = require('express').Router();

const categoryRouter = require('./category');
const transactionRouter = require('./transaction');
const accountRouter = require('./account');

router.use('/category', categoryRouter);
router.use('/transaction', transactionRouter);
router.use('/account', accountRouter);


module.exports = router;