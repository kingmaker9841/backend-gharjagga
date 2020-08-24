const router = require('express').Router();
const Province = require('../models/Province');
const District = require('../models/District');
const Owner = require('../models/Owner');
const Facilities = require('../models/Facilities');
const AdminGhar = require('../models/AdminGhar');
const AdminApartment = require('../models/AdminApartment');
const Ghar = require('../models/Ghar');
const Apartment = require('../models/Apartment');
const Land = require('../models/Land');
const GharRoomInfo = require('../models/GharRoomInfo');
const Image = require('../models/Image');
const Location = require('../models/Location');
const Numbers = require('../models/Number');
const TrueFalse = require('../models/TrueFalse');
const async = require('async');
const AdminLand = require('../models/AdminLand');
const Users = require('../models/Users');

router.get('/users', (req,res)=>{
    if (!req.session.user){
        return res.status(401).json("Unauthorized");
    }
    Users.findById(req.session.user)
    .populate('prov_id')
    .populate('dist_id')
    .then((result)=>{
        console.log(result);
        res.status(200).json(result);
    })
});

router.get('/only/adminhouse', (req,res)=>{
    AdminGhar.find({})
    .select('price area title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
    .populate('image_info', 'main_image')
    .then((result_adminGhar)=>{
        res.status(200).json(result_adminGhar);
    }).catch((err)=>{
        console.log("Admin Ghar Err: " + err);
        return ;
    });
});
router.get('/only/special/adminhouse', (req,res)=>{
    AdminGhar.find({property_listing: 'Special'})
    .select('price area title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
    .populate('image_info', 'main_image')
    .then((result_adminGhar)=>{
        res.status(200).json(result_adminGhar);
    }).catch((err)=>{
        console.log("Admin Ghar Err: " + err);
        return ;
    });
});

router.get('/only/featured/adminhouse', (req,res)=>{
    AdminGhar.find({property_listing: 'Featured'})
    .select('price area title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
    .populate('image_info', 'main_image')
    .then((result_adminGhar)=>{
        res.status(200).json(result_adminGhar);
    }).catch((err)=>{
        console.log("Admin Ghar Err: " + err);
        return ;
    });
});

router.get('/only/normal/adminhouse', (req,res)=>{
    AdminGhar.find({property_listing: 'Normal'})
    .select('price area title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
    .populate('image_info', 'main_image')
    .then((result_adminGhar)=>{
        res.status(200).json(result_adminGhar);
    }).catch((err)=>{
        console.log("Admin Ghar Err: " + err);
        return ;
    });
});

router.get('/only/house', (req,res)=>{
    Ghar.find({})
        .select('price title area address purpose views property_type')
        .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
        .populate('image_info', 'main_image')
        .then((result_ghar)=>{
            res.status(200).json(result_ghar);
        }).catch((err)=>{
            console.log("Ghar Err: " + err);
            return ;
        })
});

router.get('/only/adminapartment', (req,res)=>{
    AdminApartment.find({})
    .select('price title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
    .populate('image_info', 'main_image')
    .then((result_adminApartment)=>{
        res.status(200).json(result_adminApartment);
    }).catch((err)=>{
        console.log("Admin Apartment Error: " + err);
        return;
    });
});

router.get('/only/special/adminapartment', (req,res)=>{
    AdminApartment.find({property_listing: 'Special'})
    .select('price title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
    .populate('image_info', 'main_image')
    .then((result_adminApartment)=>{
        res.status(200).json(result_adminApartment);
    }).catch((err)=>{
        console.log("Admin Apartment Error: " + err);
        return;
    });
});

router.get('/only/featured/adminapartment', (req,res)=>{
    AdminApartment.find({property_listing: 'Featured'})
    .select('price title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
    .populate('image_info', 'main_image')
    .then((result_adminApartment)=>{
        res.status(200).json(result_adminApartment);
    }).catch((err)=>{
        console.log("Admin Apartment Error: " + err);
        return;
    });
});

router.get('/only/normal/adminapartment', (req,res)=>{
    AdminApartment.find({property_listing: 'Normal'})
    .select('price title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
    .populate('image_info', 'main_image')
    .then((result_adminApartment)=>{
        res.status(200).json(result_adminApartment);
    }).catch((err)=>{
        console.log("Admin Apartment Error: " + err);
        return;
    });
});

router.get('/only/apartment', (req,res)=>{
    Apartment.find({})
        .select('price title address purpose views property_type')
        .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
        .populate('image_info', 'main_image')
        .then((result_apartment)=>{
            res.status(200).json(result_apartment);
        }).catch((err)=>{
            console.log("Apartment Error: " + err);
            return;
        });
});

router.get('/only/adminland', (req,res)=>{
    AdminLand.find({})
    .select('price area title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate('image_info', 'main_image')
    .then((result_adminLand)=>{ 
        res.status(200).json(result_adminLand);
    }).catch((err)=>{
        console.log("Only Land Error: " + err);
        return ;
    });
});

router.get('/only/special/adminland', (req,res)=>{
    AdminLand.find({property_listing: 'Special'})
    .select('price area title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate('image_info', 'main_image')
    .then((result_adminLand)=>{ 
        res.status(200).json(result_adminLand);
    }).catch((err)=>{
        console.log("Only Land Error: " + err);
        return ;
    });
});

router.get('/only/featured/adminland', (req,res)=>{
    AdminLand.find({property_listing: 'Featured'})
    .select('price area title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate('image_info', 'main_image')
    .then((result_adminLand)=>{ 
        res.status(200).json(result_adminLand);
    }).catch((err)=>{
        console.log("Only Land Error: " + err);
        return ;
    });
});

router.get('/only/normal/adminland', (req,res)=>{
    AdminLand.find({property_listing: 'Normal'})
    .select('price area title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate('image_info', 'main_image')
    .then((result_adminLand)=>{ 
        res.status(200).json(result_adminLand);
    }).catch((err)=>{
        console.log("Only Land Error: " + err);
        return ;
    });
});

router.get('/only/land', (req,res)=>{
    Land.find({})
        .select('price area title address purpose views property_type')
        .populate('image_info', 'main_image')
        .then((result_land)=>{
            res.status(200).json(result_land);
        }).catch((err)=>{
            console.log("Only Land Error: " + err);
            return;
        })
})

router.get('/all', (req,res)=>{
    let brr = [], crr = [];
    AdminGhar.find({})
    .select('price area title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
    .populate('image_info', 'main_image')
    .then((result_adminGhar)=>{ 
        AdminLand.find({})
            .select('price area title address purpose views property_type')
            .populate({path: 'owner_id', select: ['f_name', 'l_name']})
            .populate('image_info', 'main_image')
            .then((result_adminLand)=>{   
                AdminApartment.find({})
                    .select('price title address purpose views property_type')
                    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
                    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
                    .populate('image_info', 'main_image')
                    .then((result_adminApartment)=>{
                        brr = result_adminGhar.concat(result_adminLand, result_adminApartment);
                        Ghar.find({})
                        .select('price title area address purpose views property_type')
                        .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
                        .populate('image_info', 'main_image')
                        .then((result_ghar)=>{
                            Land.find({})
                            .select('price area title address purpose views property_type')
                            .populate('image_info', 'main_image')
                            .then((result_land)=>{
                                Apartment.find({})
                                .select('price title address purpose views property_type')
                                .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
                                .populate('image_info', 'main_image')
                                .then((result_apartment)=>{
                                    crr = result_ghar.concat(result_land, result_apartment);
                                    res.status(200).send(brr.concat(crr));
                                });
                            });
                        });
                    });
            });

    });
});

router.get('/:ghar_id', (req,res)=>{

    AdminGhar.find({_id : req.params.ghar_id})
    .populate({path: 'owner_id', populate: [{path: 'prov_id'}, {path: 'district_id'}]})
    .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
    .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
    .populate('location')
    .populate('image_info')
    .then((result)=>{
        console.log("Success: " + result); 
        if (result.length === 0){
            AdminLand.find({_id : req.params.ghar_id})
            .populate({path: 'owner_id', populate: [{path: 'prov_id'}, {path: 'district_id'}]})
            .populate('location')
            .populate('image_info')
            .then((result_adminLand)=>{
                console.log("Success: " + result_adminLand);
                if (result_adminLand.length === 0){
                    AdminApartment.find({_id : req.params.ghar_id})
                    .populate({path: 'owner_id', populate: [{path: 'prov_id'}, {path: 'district_id'}]})
                    .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                    .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                    .populate('image_info')
                    .populate('location')
                    .then((result_adminApartment)=>{
                        console.log("Success AdminApartment: " + result_adminApartment);
                        if (result_adminApartment.length === 0){
                            Ghar.find({_id : req.params.ghar_id})
                            .populate({path: 'owner_id', populate: [{path: 'prov_id'}, {path: 'district_id'}]})
                            .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                            .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                            .populate('location')
                            .populate('image_info')
                            .then((result_ghar)=>{
                                console.log("Success Ghar: " + result_ghar);
                                if (result_ghar.length === 0){
                                    Apartment.find({_id : req.params.ghar_id})
                                        .populate({path: 'owner_id', populate: [{path: 'prov_id'}, {path: 'district_id'}]})
                                        .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                                        .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                                        .populate('image_info')
                                        .populate('location')
                                        .then((result_apartment)=>{
                                            console.log("Success Apartment: " + result_apartment);
                                            if (result_apartment.length === 0){
                                                Land.find({_id : req.params.ghar_id})
                                                .populate({path: 'owner_id', populate: [{path: 'prov_id'}, {path: 'district_id'}]})
                                                .populate('location')
                                                .populate('image_info')
                                                .then((result_land)=>{
                                                    console.log("Success Land: " + result_land);
                                                    if (result_land.length === 0){
                                                        return res.status(400).json("Could NOt Find");
                                                    }else{
                                                        Land.findOneAndUpdate({_id : req.params.ghar_id}, { $inc : { views: 1}}, (err, data)=>{
                                                            if (err){
                                                                console.log(err);
                                                            }
                                                            return res.status(200).json(result_land);
                                                        });
                                                    }
                                                });
                                            }else{
                                                Apartment.findOneAndUpdate({_id : req.params.ghar_id}, { $inc : { views: 1}}, (err,data)=>{
                                                    if (err){
                                                        console.log("Apartment Error: " + err);
                                                    }
                                                    return res.status(200).json(result_apartment);
                                                });
                                            }
                                        });
                                }else{
                                    Ghar.findOneAndUpdate({_id : req.params.ghar_id}, { $inc : { views: 1}}, (err,data)=>{
                                        if (err){
                                            return err;
                                        }
                                        return res.status(200).json(result_ghar);
                                    });
                                }
                            });
                        }else{
                            AdminApartment.findOneAndUpdate({_id : req.params.ghar_id}, { $inc : { views: 1}}, (err,data)=>{
                                if (err){
                                    return err;
                                }
                                return res.status(200).json(result_adminApartment);
                            });
                        }
                    });
                }else{
                    AdminLand.findOneAndUpdate({_id : req.params.ghar_id}, { $inc : { views: 1}}, (err,data)=>{
                        if (err){
                            return err;
                        }
                        return res.status(200).json(result_adminLand);
                    });
                }
            });
        }else{
            AdminGhar.findOneAndUpdate({_id : req.params.ghar_id}, { $inc : { views: 1}}, (err,data)=>{
                if (err){
                    return err;
                }
                return res.status(200).json(result);
            });
            
        }
        
    }).catch((err)=>{
        if (err) console.log("Error:" + err);
        return res.status(400).send("Bad Request");
    });
});

router.get('/district/districtname', (req,res)=>{
    let arr = [];
    District.find({}).then((result)=>{
        result.forEach((item)=>{
            arr.push(item.district_name);
        });
        res.status(200).send(arr.sort());
    });
});

router.get('/province/name', (req,res)=>{
    let arr = [];
    Province.find({}).then((result)=>{
        result.forEach((item)=>{
            arr.push(item.prov_name);
        });
        res.status(200).send(arr);
    })
});

router.get('/get/special', (req,res)=>{
    let brr = [];
    AdminGhar.find({property_listing: 'Special'})
    .select('price area title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
    .populate('image_info', 'main_image')
    .then((result_adminGhar)=>{ 
        AdminLand.find({property_listing: 'Special'})
            .select('price area title address purpose views property_type')
            .populate({path: 'owner_id', select: ['f_name', 'l_name']})
            .populate('image_info', 'main_image')
            .then((result_adminLand)=>{ 
                AdminApartment.find({property_listing: 'Special'})
                    .select('price title address purpose views property_type')
                    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
                    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
                    .populate('image_info', 'main_image')
                    .then((result_adminApartment)=>{ 
                        brr = result_adminGhar.concat(result_adminLand, result_adminApartment);
                        res.status(200).send(brr);
                    })
                    .catch((err)=>{
                        console.log("Error: " + err);
                        res.send("Some Error" + err);
                    })
                });
            });
});

router.get('/get/featured', (req,res)=>{
    let brr = [];
    AdminGhar.find({property_listing: 'Featured'})
    .select('price area title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
    .populate('image_info', 'main_image')
    .then((result_adminGhar)=>{ 
        AdminLand.find({property_listing: 'Featured'})
            .select('price area title address purpose views property_type')
            .populate({path: 'owner_id', select: ['f_name', 'l_name']})
            .populate('image_info', 'main_image')
            .then((result_adminLand)=>{ 
                AdminApartment.find({property_listing: 'Featured'})
                    .select('price title address purpose views property_type')
                    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
                    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
                    .populate('image_info', 'main_image')
                    .then((result_adminApartment)=>{ 
                        brr = result_adminGhar.concat(result_adminLand, result_adminApartment);
                        res.status(200).send(brr);
                    })
                    .catch((err)=>{
                        console.log("Error: " + err);
                        res.send("Some Error" + err);
                    })
                });
            });
});

router.get('/get/normal', (req,res)=>{
    let brr = [];
    AdminGhar.find({property_listing: 'Normal'})
    .select('price area title address purpose views property_type')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
    .populate('image_info', 'main_image')
    .then((result_adminGhar)=>{ 
        AdminLand.find({property_listing: 'Normal'})
            .select('price area title address purpose views property_type')
            .populate({path: 'owner_id', select: ['f_name', 'l_name']})
            .populate('image_info', 'main_image')
            .then((result_adminLand)=>{ 
                AdminApartment.find({property_listing: 'Normal'})
                    .select('price title address purpose views property_type')
                    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
                    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
                    .populate('image_info', 'main_image')
                    .then((result_adminApartment)=>{ 
                        brr = result_adminGhar.concat(result_adminLand, result_adminApartment);
                        res.status(200).send(brr);
                    })
                    .catch((err)=>{
                        console.log("Error: " + err);
                        res.send("Some Error" + err);
                    })
                });
            });
});

router.get('/get/other', (req,res)=>{
    let crr = []
    Ghar.find({})
    .select('price title area address purpose views property_type')
    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
    .populate('image_info', 'main_image')
    .then((result_ghar)=>{
        Land.find({})
        .select('price area title address purpose views property_type')
        .populate('image_info', 'main_image')
        .then((result_land)=>{
            Apartment.find({})
            .select('price title address purpose views property_type')
            .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
            .populate('image_info', 'main_image')
            .then((result_apartment)=>{
                crr = result_ghar.concat(result_land, result_apartment);
                res.status(200).send(crr);
            })
            .catch((err)=>{
                console.log("Error: " + err);
                res.send("Some Error" + err);
            })
        });
    });
            
})

module.exports = router;