const router = require('express').Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

router.post('/login', (req,res)=>{  
    let {email, password} = req.body;
    Admin.findOne({email: email}, (err,admin)=>{
        if (err){
            console.log("Error While Finding Admin: " + admin);
            return res.status(500).send("Internal Server Error");
        }
        if (!admin){
            console.log("Not A Admin");
            return res.status(401);
        }
        bcrypt.compare(password, admin.password, (err, same)=>{
            if (err){
                console.log("Something went Wrong while comparing PW!");
                res.status(500).json("Internal Server Error");
            }else{
                if (!same){
                    console.log("Incorrect Password");
                    return res.status(400);
                }
                console.log("Admin Logged In");
                req.session.admin = admin._id;
                res.status(200).send("Admin Logged IN");
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