const router = require('express').Router();
const Users = require('../models/Users');
const Province = require('../models/Province');
const District = require('../models/District');
const async = require('async');
const {ensureAuthenticatedUser} = require('../config/EnsureAuthenticatedUser');
require('../config/EnsureAuthenticatedUser');

router.post('/', (req,res)=>{
    if (!req.session.user){
        return res.status(401).send("Not Authenticated");
    }
    let {f_name, l_name, province, district, phonenumber} = req.body;
    phonenumber = Number(phonenumber);
    async.waterfall([
        (done)=>{
            Province.findOne({prov_name: province}, (err,result1)=>{
                if (err){
                    return res.status(300).send("Not Found");
                }
                District.findOne({district_name: district}, (err,result2)=>{
                    if (err){
                        return res.status(300).send("Not Found");
                    }
                    done(null, result1,result2);
                });
            });
        },
        (result1,result2,done)=>{
            Users.findOneAndUpdate({_id: req.session.user}, {
                f_name: f_name,
                l_name: l_name,
                prov_id: result1._id,
                dist_id: result2._id,
                phone_number: phonenumber
            }, (err,result)=>{
                if (err){
                    return res.status(300).send("Not Completed");
                }
                console.log(result);
                return res.status(200).send("Successful");
            })
        }
    ], (err)=> {
        return console.log(err);
    });
});

module.exports = router;