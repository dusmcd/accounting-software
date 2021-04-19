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
        const accounts = await Type.findAll({
            include: Account
        });
        res.json(accounts);
    } catch(err) {
        next(err);
    }
});

module.exports = router;