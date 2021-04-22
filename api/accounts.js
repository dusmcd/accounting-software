const router = require('express').Router();
const { Account, Type } = require('../db');

router.post('/', async (req, res, next) => {
    try {
        const newAccount = await Account.create({name: req.body.name, TypeId: req.body.typeId, accountNumber: req.body.accountNumber})
        res.json(newAccount.id);
    } catch(err) {
        next(err);
    }
});


router.get('/', async (req, res, next) => {
    try {
        const accounts = await Account.findAll();
        res.json(accounts);
    } catch (err) {
        next(err);
    }
});

router.get('/types', async (req, res, next) => {
    try {
        let accounts;
        if (req.query.getDetails === 'true') {
            accounts = await Type.findAll({
                include: Account
            });
        } else {
            accounts = await Type.findAll();
        }
        res.json(accounts);
    } catch(err) {
        next(err);
    }
});

module.exports = router;