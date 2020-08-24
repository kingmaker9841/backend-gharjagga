const router = require('express').Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

router.post('/login', (req,res)=>{  
    let {email, password} = req.body;
    Admin.findOne({email: email}, (err,admin)=>{
        if (err){
            console.log("Error While Finding Admin: " + admin);
            return res.status(500).send("");
        }
        if (!admin){
            console.log("Not A Admin");
            return res.status(200).json('Not Admin');
        }
        bcrypt.compare(password, admin.password, (err, same)=>{
            if (err){
                console.log("Something went Wrong while comparing PW!");
                res.status(500).json("");
            }else{
                if (!same){
                    console.log("Incorrect Password");
                    return res.status(200).json('Incorrect Password');
                }
                console.log("Admin Logged In");
                req.session.admin = admin._id;
                res.status(200).send("Admin");
            }
        }); 
    });
});

router.get('/logout', (req,res)=>{
    req.session.destroy();
    console.log("Logged Out!");
    res.status(200).send("Logged Out");
});

router.use('/adminpostghar', require('./adminpostghar'));
router.use('/adminpostland', require('./adminpostland'));
router.use('/adminpostapartment', require('./adminpostapartment'));

module.exports = router;