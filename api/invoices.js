const router = require('express').Router();

router.post('/', (req, res, next) => {
    res.json(1);
});

module.exports = router;