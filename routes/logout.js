const passport = require('passport');

const router = require('express').Router();

router.get('/', (req,res)=>{
    req.session.destroy();
    res.status(200).json("loggedOut");
});

module.exports = router;