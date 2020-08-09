const router = require('express').Router();
const Province = require('../models/Province');
const District = require('../models/District');
const Owner = require('../models/Owner');
const AdminLand = require('../models/AdminLand');
const Image = require('../models/Image');
const Location = require('../models/Location');
const multer = require('multer');
const fs = require('fs');
const async = require('async');
const { ensureAuthenticated } = require('../config/EnsureAuthenticated');
require('../config/EnsureAuthenticated');

const storage = multer.diskStorage({
    destination: (req,file,done)=>{
        let date = new Date();
        let year = date.getFullYear(), month = date.getMonth(), day = date.getDate();
        let folderName =  year + month + day + '-' + req.body.district_name + '-' + req.body.price + '-' + req.body.area + '-' + req.body.f_name + '-' + req.body.owner_phone_number;
        let path1 = `./upload/${folderName}/`;
        fs.exists(path1, (exists)=>{
            if (!exists){
                fs.mkdir(path1, (err)=>{
                    return done(null, path1);
                })
            }else{
               return done(null, path1);
            }
        });
    },
    filename: (req,file,done)=>{
        done(null, file.originalname);
    },
    fileFilter : (req,file,done)=>{
        if (file.mimetype !== 'image/jpeg' || file.mimetype !== 'image/png'){
            done(null, false);
        }else{
            done(null, true);
        }
    }
});
const upload = multer({storage: storage, limits: {
    fileSize: 1024*1024*15
}});

// Post a Land ad for session User

router.post('/', ensureAuthenticated ,upload.fields([{ name: 'mainImage', maxCount: 1 }, {name: 'galleryImage', maxCount: 8}]) ,(req,res)=>{
    let {prov_number, district_name, f_name, l_name, owner_phone_number, latitude, longitude} = req.body;
    let {price, area, near_by, description, title, address} = req.body;
    let imageArray = [];
    async.waterfall([
        (done)=>{
            Province.findOne({prov_number: prov_number}).then((prov_res)=>{
                done(null, prov_res);
            });
        },
        (prov_res,done)=>{
            District.findOne({district_name: district_name}).then((district_res)=>{
                done(null, prov_res, district_res);
            });
        },
        (prov_res,district_res, done)=>{
            new Owner({
                f_name: f_name,
                l_name: l_name,
                prov_id: prov_res._id,
                district_id: district_res._id,
                phone_number: owner_phone_number
            }).save().then((owner_res)=>{
                done(null, owner_res);
            });
        },
        (owner_res, done)=>{
            new Location({
                latitude: latitude,
                longitude: longitude
            }).save().then((location_res)=>{
                imageArray = req.files['galleryImage'].map((x)=>{
                    return x.path;
                })
                new Image({
                    main_image: req.files['mainImage'][0].path,
                    gallery_image: imageArray
                }).save().then((image_res)=>{
                    done(null, owner_res, location_res, image_res);
                })
                
            });
        },
        (owner_res, location_res, image_res ,done)=>{
            new AdminLand({
                owner_id: owner_res._id,
                price: price,
                area: area,
                title: title,
                near_by: near_by,
                description: description,
                location: location_res._id,
                image_info: image_res._id,
                address: address
            }).save().then((land_result)=>{
                console.log("Success Land Result: " + land_result);
                res.status(200).json(land_result);
            })
        }
    ], (err)=> console.log("Async Error: " + err));
});

//To get all posted Land Ad of session user

router.get('/', ensureAuthenticated, (req,res)=>{
    AdminLand.find({})
    .populate({path: 'owner_id', populate: [{path: 'prov_id'}, {path: 'district_id'}]})
    .populate('location')
    .populate('image_info')
    .then((result)=>{
        console.log("Success: " + result); 
        res.status(200).json(result);
    });
});

//To get specified Land with Land_ID

router.get('/:land_id', ensureAuthenticated, (req,res)=>{
    AdminLand.find({_id : req.params.land_id})
    .populate({path: 'owner_id', populate: [{path: 'prov_id'}, {path: 'district_id'}]})
    .populate('location')
    .populate('image_info')
    .then((result)=>{
        console.log("Success: " + result); 
        res.status(200).json(result);
    });
});

//To delete specific Land with LAND_ID

router.get('/delete/:land_id', ensureAuthenticated, (req,res)=>{
    AdminLand.findOneAndDelete({_id: req.params.land_id}, (err,result)=>{
        if (err){
            console.log("Deletion Error: " + err);
            return res.status(500);
        }
        console.log("Successful Deletion & The deleted Doc is : " + result);
        return res.status(200).json("Deleted!");
    });
});

//To update specific LAND with LAND_ID

router.post('/update/:land_id', ensureAuthenticated, (req,res)=>{
    let {prov_number, district_name, f_name, l_name, owner_phone_number, latitude, longitude} = req.body;
    let {price, area, near_by, description, title, address} = req.body;
    let imageArray = [];
    async.waterfall([
        (done)=>{
            Province.findOne({prov_number: prov_number}).then((prov_res)=>{
                done(null, prov_res);
            });
        },
        (prov_res,done)=>{
            District.findOne({district_name: district_name}).then((district_res)=>{
                done(null, prov_res, district_res);
            });
        },
        (prov_res,district_res, done)=>{
            new Owner({
                f_name: f_name,
                l_name: l_name,
                prov_id: prov_res._id,
                district_id: district_res._id,
                phone_number: owner_phone_number
            }).save().then((owner_res)=>{
                done(null, owner_res);
            });
        },
        (owner_res, done)=>{
            new Location({
                latitude: latitude,
                longitude: longitude
            }).save().then((location_res)=>{
                imageArray = req.files['galleryImage'].map((x)=>{
                    return x.path;
                })
                new Image({
                    main_image: req.files['mainImage'][0].path,
                    gallery_image: imageArray
                }).save().then((image_res)=>{
                    done(null, owner_res, location_res, image_res);
                })
                
            });
        },
        (owner_res, location_res, image_res ,done)=>{
            new AdminLand({
                owner_id: owner_res._id,
                price: price,
                area: area,
                title: title,
                near_by: near_by,
                description: description,
                location: location_res._id,
                image_info: image_res._id,
                address: address
            }).save().then((land_result)=>{
                console.log("Success Land Result: " + land_result);
                res.status(200).json(land_result);
            })
        }
    ], (err)=> console.log("Async Error: " + err));
})

module.exports = router;