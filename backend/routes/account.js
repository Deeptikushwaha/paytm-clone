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

    session.startTransaction();  // Start a transaction for safety
    const { amount, to } = req.body;

    try {
        // Find sender's account
        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        // Find recipient's account
        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Perform the transfer
        await Account.updateOne(
            { userId: req.userId }, 
            { $inc: { balance: -amount } }  // Decrease sender's balance
        ).session(session);

        await Account.updateOne(
            { userId: to }, 
            { $inc: { balance: amount } }   // Increase recipient's balance
        ).session(session);

        await session.commitTransaction();  // Commit the transaction
        res.json({
            message: "Transfer successful"
        });
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({
            message: "Transfer failed"
        });
    }
});

module.exports = accountRouter;