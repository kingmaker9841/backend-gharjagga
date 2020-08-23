const router = require('express').Router();
const passport = require('passport');

router.post('/', passport.authenticate('local'), (req,res)=>{
     req.session.user = req.user._id;
     res.status(200).json("Successfully logged in!");
});

module.exports = router;