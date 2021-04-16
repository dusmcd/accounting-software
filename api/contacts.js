const router = require('express').Router();
const { Contact } = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const contacts = await Contact.findAll();
        res.json(contacts);
    } catch(err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const contact = await Contact.findByPk(req.params.id);
        res.json(contact);
    } catch(err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const contact = {name: req.body.name, phoneNumber: req.body.phoneNumber, email: req.body.email};
        const newContact = await Contact.create(contact);
        res.json(newContact.id);
    } catch(err) {
        next(err);
    }
});



module.exports = router;