const router = require('express').Router();
const Province = require('../models/Province');
const District = require('../models/District');
const Owner = require('../models/Owner');
const Users = require('../models/Users');
const async = require('async');
const bcrypt = require('bcrypt');

router.post('/', (req,res)=>{
    let {f_name,l_name,prov_number,district_name,email,password,phone_number} = req.body;
    Users.findOne({email: email}).then((email_result)=>{
        if (email_result){
            res.status(200).send("Email Already Registered");
        }else{
            async.waterfall([
                (done)=>{
                    Province.findOne({prov_number: prov_number}, (err, prov_result)=>{
                        if (err){
                            done(err);
                        }else{
                            done(null, prov_result);
                        }
                    });
                },
                (prov_result, done)=>{
                    District.findOne({district_name: district_name}, (err, district_result)=>{
                        if (err){
                            done(err);
                        }else{
                            done(null, prov_result, district_result);
                        }
                    });
                },
                (prov_result, district_result, done)=>{
                    bcrypt.genSalt(10, (err,salt)=>{
                        bcrypt.hash(password, salt, (err, hash)=>{
                            if (err){
                                console.log("Error while hashing: " + err);
                            }else{
                                new Users({
                                    f_name: f_name,
                                    l_name: l_name,
                                    prov_id: prov_result._id,
                                    dist_id: district_result._id,
                                    email: email,
                                    password: hash,
                                    phone_number: phone_number,
                                }).save((err,users_result)=>{
                                    if (err){
                                        console.log("Error while saving: " + err);
                                    }else{
                                        console.log("Success" + users_result);
                                        res.status(200).json(users_result);
                                    }
                                });
                            }
                        });
                    });
                }
            ], (err)=> console.log("Error :" + err));
        }
    })
})

module.exports = router;