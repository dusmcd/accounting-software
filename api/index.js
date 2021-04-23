const router = require('express').Router();
const { Account, Contact } = require('../db');

router.get('/accounts-contacts', async (req, res, next) => {
    try {
        const data = await Promise.all([Account.findAll(), Contact.findAll()])
        res.json({accounts: data[0], contacts: data[1]});
    } catch(err) {
        next(err);
    }
});

router.use('/contacts', require('./contacts'));
router.use('/accounts', require('./accounts'));
router.use('/bills', require('./bills'));

module.exports = router;