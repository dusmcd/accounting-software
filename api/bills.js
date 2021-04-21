const router = require('express').Router();
const { Bill, BillingTransactions }  = require('../db');

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

function createTransactions(transactionList, invoiceNumber, billId) {
    const totalAmount = transactionList.reduce((sum, t) => sum + t.amount, 0);

    // adding bill id to each transaction and then incuding entry to A/P account
    return transactionList.map(t => ({...t, billId})).push({
        accountId: 20000, // Accounts Payable id number 
        billId: billId,
        amount: totalAmount,
        description: `Invoice Number ${invoiceNumber}`
    });

}



module.exports = router;