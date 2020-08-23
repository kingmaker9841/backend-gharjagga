const router = require('express').Router();
const Users = require('../models/Users');

router.get('/', (req,res)=>{
    if (!req.session.user){
        console.log("Empty: ")
        return res.status(401).send('');
    }
    Users.findById(req.session.user, (err,result)=>{
        if (err){
            return res.status(500).send('');
        }
        console.log(result.f_name);
        return res.send(result.f_name);
        
    });
});

module.exports = router;