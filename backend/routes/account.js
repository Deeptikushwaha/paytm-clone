const express = require('express');
const {Account} = require('../db');
const { authmware } = require('../middleware');
const { default: mongoose } = require('mongoose');
const accountRouter = express.Router();

accountRouter.get("/balance", authmware, async (req, res) => {
    console.log("Requesting balance for userId:", req.userId);
    console.log("userId type:", typeof req.userId);
    
    try {
        const account = await Account.findOne({
            userId: req.userId
        });

        console.log("Found account:", account);

        if (!account) {
            console.log("No account found for userId:", req.userId);
            return res.status(404).json({
                message: "Account not found"
            });
        }

        res.json({
            balance: account.balance
        });
    } catch (err) {
        console.error("Error fetching balance:", err);
        console.error("Full error:", JSON.stringify(err, null, 2));
        res.status(500).json({
            message: "Error fetching balance"
        });
    }
});

accountRouter.post("/transfer", authmware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

module.exports = accountRouter;