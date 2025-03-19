// backend/api/index.js
const express = require("express");

const userRouter = require('./user');
const accountRouter = require('/account');

const router = express.Router();

router.use('/user', userRouter)
router.use('/account', accountRouter)

module.exports = router;


// /api/v1/user  -> userRouter
// /api/v1/transaction... -> accountRouter

