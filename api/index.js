const router = require('express').Router();

router.use('/contacts', require('./contacts'));
router.use('/accounts', require('./accounts'));

module.exports = router;