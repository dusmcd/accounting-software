const router = require('express').Router();
const { Bill, BillingTransactions, db, Account, Contact }  = require('../db');
const { Op } = require('sequelize');
const { createTransactions, formatTransactions } = require('./helpers');

router.post('/', async (req, res, next) => {
    try {
        const result = await db.transaction(async t => {
            const newBill = await Bill.create({
                date: new Date(req.body.date),
                dueDate: new Date(req.body.dueDate),
                invoiceNumber: req.body.invoiceNumber,
                ContactId: req.body.ContactId
            }, { transaction: t });
            const formattedTransactions = formatTransactions(req.body.transactions);
            const newTransactions = createTransactions(formattedTransactions, req.body.invoiceNumber, newBill.id);
            await Promise.all(newTransactions.map(billingT => BillingTransactions.create(billingT, { transaction: t })))
            
            return newBill.id;
        })
        res.json(result);

    } catch(err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const bill = await Bill.findByPk(req.params.id, {
            include: [{
                model: Account,
                where: {
                    id: {
                        [Op.ne]: 7
                    }
                }
            }, Contact]
        });
        res.json(bill);
    } catch(err) {
        next(err);
    }
});





module.exports = router;