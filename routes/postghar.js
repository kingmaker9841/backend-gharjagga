const router = require('express').Router();
const Province = require('../models/Province');
const District = require('../models/District');
const Owner = require('../models/Owner');
const Facilities = require('../models/Facilities');
const Ghar = require('../models/Ghar');
const GharRoomInfo = require('../models/GharRoomInfo');
const Image = require('../models/Image');
const Location = require('../models/Location');
const Numbers = require('../models/Number');
const TrueFalse = require('../models/TrueFalse');
const multer = require('multer');
const fs = require('fs');
const async = require('async');
const { ensureAuthenticatedUser } = require('../config/EnsureAuthenticatedUser');
require('../config/EnsureAuthenticatedUser');

const storage = multer.diskStorage({
    destination: (req,file,done)=>{
        let date = new Date();
        let year = date.getFullYear(), month = date.getMonth(), day = date.getDate();
        let folderName =  year + month + day + '-' + req.body.district_name + '-' + req.body.price + '-' + req.body.area + '-' + req.body.f_name + '-' + req.body.owner_phone_number + '-' + req.body.bedroom + '-' + req.body.bathroom + '-' + req.body.solar;
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

// Post a ghar ad for session User

router.post('/', ensureAuthenticatedUser ,upload.fields([{ name: 'mainImage', maxCount: 1 }, {name: 'galleryImage', maxCount: 8}]) ,(req,res)=>{
    let {prov_number, district_name, f_name, l_name, owner_phone_number, floor, bedroom, bathroom, kitchen, living, hall, puja, balcony, solar, wifi, tv, furniture, water_supply, latitude, longitude} = req.body;
    let {price, area, near_by, description} = req.body;
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
            Numbers.findOne({number: floor}).then((floor_res)=>{
                Numbers.findOne({number: bedroom}).then((bedroom_res)=>{
                    Numbers.findOne({number: bathroom}).then((bathroom_res)=>{
                        Numbers.findOne({number: kitchen}).then((kitchen_res)=>{
                            Numbers.findOne({number: living}).then((living_res)=>{
                                Numbers.findOne({number: hall}).then((hall_res)=>{
                                    Numbers.findOne({number: puja}).then((puja_res)=>{
                                        new GharRoomInfo({
                                            floor: floor_res._id,
                                            bedroom: bedroom_res._id,
                                            bathroom: bathroom_res._id,
                                            kitchen: kitchen_res._id,
                                            living: living_res._id,
                                            hall: hall_res._id,
                                            puja: puja_res._id
                                      }).save().then((ghar_room_info_res)=>{
                                          done(null, owner_res, ghar_room_info_res);
                                      })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        },
        (owner_res,ghar_room_info_res, done)=>{
            TrueFalse.findOne({true_false: balcony}).then((balcony_res)=>{
                TrueFalse.findOne({true_false: solar}).then((solar_res)=>{
                    TrueFalse.findOne({true_false: wifi}).then((wifi_res)=>{
                        TrueFalse.findOne({true_false: tv}).then((tv_res)=>{
                            TrueFalse.findOne({true_false: furniture}).then((furniture_res)=>{
                                TrueFalse.findOne({true_false: water_supply}).then((water_supply_res)=>{
                                    new Facilities({
                                        balcony: balcony_res._id,
                                        solar: solar_res._id,
                                        wifi: wifi_res._id,
                                        tv: tv_res._id,
                                        furniture: furniture_res._id,
                                        water_supply: water_supply_res._id
                                    }).save().then((facilities_res)=>{
                                        done(null, owner_res,ghar_room_info_res, facilities_res);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        },
        (owner_res, ghar_room_info_res, facilities_res, done)=>{
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
                    done(null, owner_res, ghar_room_info_res, facilities_res, location_res, image_res);
                })
                
            });
        },
        (owner_res, ghar_room_info_res, facilities_res, location_res, image_res ,done)=>{
            new Ghar({
                owner_id: owner_res._id,
                ghar_room_info: ghar_room_info_res._id,
                facilities_info: facilities_res._id,
                price: price,
                area: area,
                near_by: near_by,
                description: description,
                location: location_res._id,
                user_id: req.session.user ,
                image_info: image_res._id
            }).save().then((ghar_result)=>{
                console.log("Success Ghar Result: " + ghar_result);
                res.status(200).json(ghar_result);
            })
        }
    ], (err)=> console.log("Async Error: " + err));
});

//To get all posted Ghar Ad of session user

router.get('/', ensureAuthenticatedUser, (req,res)=>{
    Ghar.find({user_id : req.session.user})
    .populate({path: 'owner_id', populate: [{path: 'prov_id'}, {path: 'district_id'}]})
    .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
    .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
    .populate('location')
    .populate('image_info')
    .then((result)=>{
        console.log("Success: " + result); 
        res.status(200).json(result);
    });
});

//To get specified ghar with GHAR_ID

router.get('/:ghar_id', ensureAuthenticatedUser, (req,res)=>{
    Ghar.find({_id : req.params.ghar_id, user_id: req.session.user})
    .populate({path: 'owner_id', populate: [{path: 'prov_id'}, {path: 'district_id'}]})
    .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
    .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
    .populate('location')
    .populate('image_info')
    .then((result)=>{
        console.log("Success: " + result); 
        res.status(200).json(result);
    });
});

//To delete specific ghar with GHAR_ID

router.get('/delete/:ghar_id', ensureAuthenticatedUser, (req,res)=>{
    Ghar.findOneAndDelete({_id: req.params.ghar_id, user_id: req.session.user}, (err,result)=>{
        if (err){
            console.log("Deletion Error: " + err);
            return res.status(500);
        }
        console.log("Successful Deletion & The deleted Doc is : " + result);
        return res.status(200).json("Deleted!");
    });
});

//To update specific ghar with GHAR_ID

router.post('/update/:ghar_id', ensureAuthenticatedUser, (req,res)=>{
    let {prov_number, district_name, f_name, l_name, owner_phone_number, floor, bedroom, bathroom, kitchen, living, hall, puja, balcony, solar, wifi, tv, furniture, water_supply, latitude, longitude} = req.body;
    let {price, area, near_by, description} = req.body;
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
            Numbers.findOne({number: floor}).then((floor_res)=>{
                Numbers.findOne({number: bedroom}).then((bedroom_res)=>{
                    Numbers.findOne({number: bathroom}).then((bathroom_res)=>{
                        Numbers.findOne({number: kitchen}).then((kitchen_res)=>{
                            Numbers.findOne({number: living}).then((living_res)=>{
                                Numbers.findOne({number: hall}).then((hall_res)=>{
                                    Numbers.findOne({number: puja}).then((puja_res)=>{
                                        new GharRoomInfo({
                                            floor: floor_res._id,
                                            bedroom: bedroom_res._id,
                                            bathroom: bathroom_res._id,
                                            kitchen: kitchen_res._id,
                                            living: living_res._id,
                                            hall: hall_res._id,
                                            puja: puja_res._id
                                      }).save().then((ghar_room_info_res)=>{
                                          done(null, owner_res, ghar_room_info_res);
                                      })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        },
        (owner_res,ghar_room_info_res, done)=>{
            TrueFalse.findOne({true_false: balcony}).then((balcony_res)=>{
                TrueFalse.findOne({true_false: solar}).then((solar_res)=>{
                    TrueFalse.findOne({true_false: wifi}).then((wifi_res)=>{
                        TrueFalse.findOne({true_false: tv}).then((tv_res)=>{
                            TrueFalse.findOne({true_false: furniture}).then((furniture_res)=>{
                                TrueFalse.findOne({true_false: water_supply}).then((water_supply_res)=>{
                                    new Facilities({
                                        balcony: balcony_res._id,
                                        solar: solar_res._id,
                                        wifi: wifi_res._id,
                                        tv: tv_res._id,
                                        furniture: furniture_res._id,
                                        water_supply: water_supply_res._id
                                    }).save().then((facilities_res)=>{
                                        done(null, owner_res,ghar_room_info_res, facilities_res);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        },
        (owner_res, ghar_room_info_res, facilities_res, done)=>{
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
                    done(null, owner_res, ghar_room_info_res, facilities_res, location_res, image_res);
                })
                
            });
        },
        (owner_res, ghar_room_info_res, facilities_res, location_res, image_res ,done)=>{
            Ghar.findOneAndUpdate({_id: req.params.ghar_id , user_id: req.session.user} ,{
                owner_id: owner_res._id,
                ghar_room_info: ghar_room_info_res._id,
                facilities_info: facilities_res._id,
                price: price,
                area: area,
                near_by: near_by,
                description: description,
                location: location_res._id,
                user_id: req.session.user ,
                image_info: image_res._id
            }).save().then((ghar_result)=>{
                console.log("Success Ghar Result: " + ghar_result);
                res.status(200).json(ghar_result);
            })
        }
    ], (err)=> console.log("Async Error: " + err));
})

module.exports = router;