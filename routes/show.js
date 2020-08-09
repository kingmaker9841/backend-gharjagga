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

// router.get('/owner', (req,res)=>{
//     Owner.find({})
//     .populate({path: 'prov_id', select: 'prov_name -_id'})
//     .populate({path: 'district_id', select: 'district_name -_id'})
//     .then((result)=>{
//         res.status(200).json(result);
//     })
// });

// router.get('/users', (req,res)=>{
//     Users.find({})
//     .populate('prov_id')
//     .populate('dist_id')
//     .then((result)=>{
//         res.status(200).json(result);
//     })
// });

router.get('/all', (req,res)=>{
    let brr = [], crr = [];
    AdminGhar.find({})
    .select('price area title')
    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
    .populate('image_info', 'main_image')
    .then((result_adminGhar)=>{
        console.log("Success: " + result_adminGhar); 
        AdminLand.find({})
            .select('price area title')
            .populate({path: 'owner_id', select: ['f_name', 'l_name']})
            .populate('image_info', 'main_image')
            .then((result_adminLand)=>{
                console.log("Success: " + result_adminLand); 
                AdminApartment.find({})
                    .select('price title')
                    .populate({path: 'owner_id', select: ['f_name', 'l_name']})
                    .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
                    .populate('image_info', 'main_image')
                    .then((result_adminApartment)=>{
                        console.log("Success: " + result_adminApartment); 
                        brr = result_adminGhar.concat(result_adminLand, result_adminApartment);
                        Ghar.find({})
                        .select('price title area')
                        .populate({path : 'ghar_room_info', select: ['floor', 'bedroom', 'bathroom', 'living'], populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'living'}] })
                        .populate('image_info', 'main_image')
                        .then((result_ghar)=>{
                            Land.find({})
                            .select('price area title')
                            .populate('image_info', 'main_image')
                            .then((result_land)=>{
                                Apartment.find({})
                                .select('price title')
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
                                                        return res.status(200).json(result_land);
                                                    }
                                                });
                                            }else{
                                                return res.status(200).json(result_apartment);
                                            }
                                        });
                                }else{
                                    return res.status(200).json(result_ghar);
                                }
                            });
                        }else{
                            return res.status(200).json(result_adminApartment);
                        }
                    });
                }else{
                    return res.status(200).json(result_adminLand);
                }
            });
        }else{
            return res.status(200).json(result);
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
})

module.exports = router;