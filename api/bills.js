const router = require('express').Router();
const { Bill, BillingTransactions, db }  = require('../db');
const { createTransactions } = require('./helpers');

router.post('/', async (req, res, next) => {
    try {
        const result = await db.transaction(async t => {
            const newBill = await Bill.create({
                date: new Date(req.body.date),
                dueDate: new Date(req.body.dueDate),
                invoiceNumber: req.body.invoiceNumber,
                ContactId: req.body.ContactId
            }, { transaction: t });
            const newTransactions = createTransactions(req.body.transactions, req.body.invoiceNumber, newBill.id);
            await Promise.all(newTransactions.map(billingT => BillingTransactions.create(billingT, { transaction: t })))
            
            return newBill.id;
        })
        res.json(result);

    } catch(err) {
        next(err);
    }
});





module.exports = router;