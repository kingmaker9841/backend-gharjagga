const router = require('express').Router();

router.use('/login', require('./login'));
router.use('/logout', require('./logout'));
router.use('/admin', require('./admin'));
router.use('/postghar', require('./postghar'));
router.use('/postapartment', require('./postapartment'));
router.use('/postland', require('./postland'));

module.exports = router;