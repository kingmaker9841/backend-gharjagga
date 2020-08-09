const router = require('express').Router();
const Province = require('../models/Province');
const District = require('../models/District');
const Owner = require('../models/Owner');
const {ensureAuthenticated} = require('../config/EnsureAuthenticated');
const async = require('async');

router.post('/', ensureAuthenticated,  (req,res)=>{
    let {f_name,l_name,phone_number,prov_number,prov_name,district_name} = req.body;
    async.waterfall([
    (done)=>{
        Province.findOne({prov_number: prov_number}).then((prov_result)=>{
            done(null, prov_result);   
        });
    },
    (prov_result, done)=>{
        District.findOne({district_name: district_name}, (err,district_result)=>{
            if (err) console.log("District Finding Error: " + err);
            done(null, prov_result, district_result);
        });
    },
    (prov_result,district_result, done)=>{
        new Owner({
            f_name: f_name,
            l_name: l_name,
            phone_number: phone_number,
            prov_id: prov_result._id,
            district_id: district_result._id
        }).save((err,owner_result)=>{
            if (err) console.log("Owner Saving Error: " + err);
            console.log(owner_result);
            res.status(200).json(owner_result);
        });
    }
    ], (err)=> {
        if(err){
            console.log("Async Error: " + err)
        }
    });
});

module.exports = router;
