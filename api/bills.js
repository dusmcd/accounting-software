const router = require('express').Router();
const { Bill, BillingTransactions }  = require('../db');
const { createTransactions } = require('./helpers');

router.post('/', async (req, res, next) => {
    try {
        const newBill = await Bill.create({
            date: new Date(req.body.date),
            dueDate: new Date(req.body.dueDate),
            invoiceNumber: req.body.invoiceNumber
        });
        const newTransactions = createTransactions(req.body.transactions, req.body.invoiceNumber, newBill.id);
        await Promise.all(newTransactions.map(t => BillingTransactions.create(t)))
        res.json(newBill.id);

    } catch(err) {
        next(err);
    }
});





module.exports = router;