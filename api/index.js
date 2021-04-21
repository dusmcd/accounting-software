const router = require('express').Router();

router.use('/contacts', require('./contacts'));
router.use('/accounts', require('./accounts'));
router.use('/bills', require('./bills'));

module.exports = router;