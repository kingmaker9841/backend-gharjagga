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


router.get('/', (req,res)=>{
    res.send("Search");
});

//Accepts parameter "type", "price" and "address"
//eg.
// {
// typeProduct : 'ghar',
// price : '10000-50000',
// address: {
//      name : 'kathmandu, Nayabasti',
//      constraint: 'exact' //or 'similar' [Must be either one of 'exact' or 'similar']
//}
//}

router.post('/', (req,res)=>{
    let {typeProduct,price, address} = req.body;

    //************************* Address Matching Config ********************************/
    let singleWord = /^[a-zA-z]+$/gi;
    let twoWordsSeparatedWithSpace = /^[a-zA-Z]+[\s]{1}[a-zA-Z]+$/gi;
    let twoWordSeparatedWithCommaAndSpace = /^[a-zA-Z]+[,]{1}[\s]{1}[a-zA-Z]+$/gi;
    let twoWordSeparatedWithCommaOnly = /^[a-zA-Z]+[,]{1}[a-zA-Z]+$/gi;
    let twoWordSeparatedWithSpaceAndCommaAndSpace = /^[a-zA-Z]+[\s]{1}[,]{1}[\s]{1}[a-zA-Z]+$/gi;
    let word = '', word1 = '', word2 = '';
    let pattern = new RegExp();
    let pattern2 = new RegExp();

    // For EXACT match, i.e. address.constraint = 'exact'
    if (address.name.match(singleWord) && address.constraint === 'exact'){
        pattern = new RegExp(address.name, 'i');
        pattern2 = new RegExp(address.name, 'i');
        console.log("Pattern is 1: " +pattern);
    }else if (address.name.match(twoWordsSeparatedWithSpace) && address.constraint === 'exact'){
        pattern = new RegExp(address.name, 'i');
        pattern2 = new RegExp(address.name, 'i');
        console.log("Pattern is 2: " +pattern);
    }else if (address.name.match(twoWordSeparatedWithCommaAndSpace) && address.constraint === 'exact'){
        pattern = new RegExp(address.name, 'i');
        pattern2 = new RegExp(address.name, 'i');
        console.log("Pattern is 3: " +pattern);
    }else if (address.name.match(twoWordSeparatedWithCommaOnly) && address.constraint === 'exact'){
        pattern = new RegExp(address.name, 'i');
        pattern2 = new RegExp(address.name, 'i');
        console.log("Pattern is 4: " +pattern);
    }else if (address.name.match(singleWord) && address.constraint === 'similar'){
        word = address.name.slice(0,3);
        pattern = new RegExp(word, 'i');
        pattern2 = new RegExp(address.name, 'i');
        console.log("Pattern is 5: " +pattern);
    }else if (address.name.match(twoWordsSeparatedWithSpace) && address.constraint === 'similar'){
        word1 = address.name.slice(0,3);
        let index = address.name.indexOf(' ');
        word2 = address.name.slice(index + 1, index+4);
        console.log("Word1: " + word1 + ' ' + "Word2: " + word2);
        pattern = new RegExp(word1, 'i');
        pattern2 = new RegExp(word2, 'i');
        console.log("Pattern is 6: " +pattern);
        console.log("Pattern is 6: " +pattern2);
    }else if (address.name.match(twoWordSeparatedWithCommaAndSpace) && address.constraint === 'similar'){
        word1 = address.name.slice(0,3);
        let index = address.name.indexOf(' ');
        word2 = address.name.slice(index + 1, index+4);
        console.log("Word1: " + word1 + ' ' + "Word2: " + word2);
        pattern = new RegExp(word1, 'i');
        pattern2 = new RegExp(word2, 'i');
        console.log("Pattern is 7: " +pattern);
        console.log("Pattern is 7: " +pattern2);
    }else if (address.name.match(twoWordSeparatedWithCommaOnly) && address.constraint === 'similar'){
        word1 = address.name.slice(0,3);
        let index = address.name.indexOf(',');
        word2 = address.name.slice(index + 1, index+4);
        console.log("Word1: " + word1 + ' ' + "Word2: " + word2);
        pattern = new RegExp(word1, 'i');
        pattern2 = new RegExp(word2, 'i');
        console.log("Pattern is 8: " +pattern);
        console.log("Pattern is 8: " +pattern2);
    }else if (address.name.match(twoWordSeparatedWithSpaceAndCommaAndSpace) && address.constraint === 'similar'){
        word1 = address.name.slice(0,3);
        let index = address.name.lastIndexOf(' ');
        word2 = address.name.slice(index + 1, index+4);
        console.log("Word1: " + word1 + ' ' + "Word2: " + word2);
        pattern = new RegExp(word1, 'i');
        pattern2 = new RegExp(word2, 'i');
        console.log("Pattern is 9: " +pattern);
        console.log("Pattern is 9: " +pattern2);
    }else if (address.name.split(' ').length > 2){
        word = address.name.slice(0,3);
        pattern = new RegExp(word, 'i');
        pattern2 = new RegExp(address.name, 'i');
        console.log("Pattern is 10: " +pattern);
    }
    //************************* Address Matching Config  Closed ********************************/
    

    //***************************************GHAR*****************************************/
    if (typeProduct === 'ghar'){
        //Execute search for "type" : 'ghar'

        if (address.name == '' && price.split('').length>0){
            // For GHAR and PRICE only

            let arr = [];
            arr = price.split('-');
            arr[0] = Number(arr[0]);
            arr[1] = Number(arr[1]);

            AdminGhar.find({price: { $gte : arr[0], $lte : arr[1]}})
            .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
            .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
            .populate('location')
            .populate('image_info', 'main_image')
            .then((adminghar_price_result)=>{

                Ghar.find({price: { $gte : arr[0], $lte : arr[1]}})
                    .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                    .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                    .populate('location')
                    .populate('image_info', 'main_image')
                    .then((ghar_price_result)=>{

                        return res.status(200).send(adminghar_price_result.concat(ghar_price_result));
                    }).catch((err)=>{
                        console.log("Error GHAR_PRICE: " + err);
                        return res.status(400).send("Bad Request! ");
            });

            }).catch((err)=>{
                console.log("Error ADMINGHAR_PRICE: " + err);
                return res.status(400).send("Bad Request! ");
            });
        } // if address.name === ''

        if (price === '' && address.name.split('').length > 0){
            // For GHAR and ADDRESS ONLY
            console.log(address);
            console.log("Address Name: " + address.name + ' ' + "Address Constraint: " + address.constraint);
            
            address.name = address.name.trim();
            console.log("Trimmed: " +address.name);

                AdminGhar.find(  { $or :[{ address: { $regex: pattern} }, { address: { $regex: pattern2 } } ] }  )
                .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                .populate('location')
                .populate('image_info', 'main_image')
                .then((adminghar_exactAddress_result)=>{

                    Ghar.find({address: singleWord})
                    .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                    .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                    .populate('location')
                    .populate('image_info', 'main_image')
                    .then((ghar_exactAddress_result)=>{

                        return res.status(200).send(adminghar_exactAddress_result.concat(ghar_exactAddress_result));
                    }).catch((err)=>{
                        console.log("Error GHAR_ADDRESS: " + err);
                        return res.status(400).send("Bad Request! ");
                    });

                }).catch((err)=>{
                    console.log("Error ADMINGHAR_ADDRESS: " + err);
                    return res.status(400).send("Bad Request! ");
                });

        } // price === '' && address.name.split('').length > 0

        if (price === '' && address.name.split('').length === 0){
            AdminGhar.find({})
                .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                .populate('location')
                .populate('image_info', 'main_image')
                .then((adminghar_result)=>{

                    Ghar.find({})
                    .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                    .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                    .populate('location')
                    .populate('image_info', 'main_image')
                    .then((ghar_result)=>{

                        return res.status(200).send(adminghar_result.concat(ghar_result));
                    }).catch((err)=>{
                        console.log("Error ghar_result: " + err);
                         return res.status(400).send("Bad Request! ");
                    });
                }).catch((err)=>{
                    console.log("Error ADMINGHAR_Result: " + err);
                    return res.status(400).send("Bad Request! ");
                });
        } // price === '' && address.name.split('').length === 0

        if (price !== '' && address.name !== ''){

            let arr = [];
            arr = price.split('-');
            arr[0] = Number(arr[0]);
            arr[1] = Number(arr[1]);

            console.log("Inside Price && address.name")
           
            AdminGhar.find({
                $and : [
                    {
                        $and: 
                        [
                            { price: {$gte : arr[0]}},
                            { price: {$lte : arr[1]}}
                        ]
                    },
                    {
                        $or: 
                        [
                            { address: { $regex: pattern} }, 
                            { address: { $regex: pattern2} }
                        ]
                    }
                ]
            })            
                .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                .populate('location')
                .populate('image_info', 'main_image')
                .then((adminghar_result)=>{

                    Ghar.find({
                        $and : [
                            {$and: 
                                [
                                    { price: {$gte : arr[0]}},
                                    { price: {$lte : arr[1]}}
                                ]
                            },
                            {
                                $or: [
                                    { address: { $regex: pattern} }, 
                                    { address: { $regex: pattern2} }
                                ]
                            }
                        ]
                    })
                    .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                    .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                    .populate('location')
                    .populate('image_info', 'main_image')
                    .then((ghar_result)=>{

                        return res.status(200).send(adminghar_result.concat(ghar_result));
                    }).catch((err)=>{
                        console.log("Error ghar_result: " + err);
                         return res.status(400).send("Bad Request! ");
                    });
                }).catch((err)=>{
                    console.log("Error ADMINGHAR_Result: " + err);
                    return res.status(400).send("Bad Request! ");
                });

        } // price !== '' && address.name !== '' 

 
    } // typeProduct === 'ghar'
    //***************************************GHAR Closed*****************************************/

    //***************************************APARTMENT*****************************************/
    if (typeProduct === 'apartment'){
        //Execute search for "type" : 'apartment'

         if (address.name == '' && price.split('').length>0){
            // For Apartment and PRICE only

            let arr = [];
            arr = price.split('-');
            arr[0] = Number(arr[0]);
            arr[1] = Number(arr[1]);

            AdminApartment.find({price: { $gte : arr[0], $lte : arr[1]}})
            .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
            .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
            .populate('location')
            .populate('image_info', 'main_image')
            .then((result1)=>{

                Apartment.find({price: { $gte : arr[0], $lte : arr[1]}})
                    .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                    .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                    .populate('location')
                    .populate('image_info', 'main_image')
                    .then((result2)=>{

                        return res.status(200).send(result1.concat(result2));
                    }).catch((err)=>{
                        console.log("Error Apartment_PRICE: " + err);
                        return res.status(400).send("Bad Request! ");
            });

            }).catch((err)=>{
                console.log("Error AdminApartment_PRICE: " + err);
                return res.status(400).send("Bad Request! ");
            });
        } // if address.name === ''

        if (price === '' && address.name.split('').length > 0){
            // For APARTMENT and ADDRESS ONLY
            console.log(address);
            console.log("Address Name: " + address.name + ' ' + "Address Constraint: " + address.constraint);
            
            address.name = address.name.trim();
            console.log("Trimmed: " +address.name);

                AdminApartment.find(  { $or :[{ address: { $regex: pattern} }, { address: { $regex: pattern2 } } ] }  )
                .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                .populate('location')
                .populate('image_info', 'main_image')
                .then((result1)=>{

                    Apartment.find({address: singleWord})
                    .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                    .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                    .populate('location')
                    .populate('image_info', 'main_image')
                    .then((result2)=>{

                        return res.status(200).send(result1.concat(result2));
                    }).catch((err)=>{
                        console.log("Error Apartment_ADDRESS: " + err);
                        return res.status(400).send("Bad Request! ");
                    });

                }).catch((err)=>{
                    console.log("Error ADMINApartment_ADDRESS: " + err);
                    return res.status(400).send("Bad Request! ");
                });

        } // price === '' && address.name.split('').length > 0

        if (price === '' && address.name.split('').length === 0){
            AdminApartment.find({})
                .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                .populate('location')
                .populate('image_info', 'main_image')
                .then((result1)=>{

                    Apartment.find({})
                    .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                    .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                    .populate('location')
                    .populate('image_info', 'main_image')
                    .then((result2)=>{

                        return res.status(200).send(result1.concat(result2));
                    }).catch((err)=>{
                        console.log("Error Apartment_result: " + err);
                         return res.status(400).send("Bad Request! ");
                    });
                }).catch((err)=>{
                    console.log("Error ADMINApartment_Result: " + err);
                    return res.status(400).send("Bad Request! ");
                });
        } // price === '' && address.name.split('').length === 0

        if (price !== '' && address.name !== ''){

            let arr = [];
            arr = price.split('-');
            arr[0] = Number(arr[0]);
            arr[1] = Number(arr[1]);

            console.log("Inside Price && address.name")
           
            AdminApartment.find({
                $and : [
                    {
                        $and: 
                        [
                            { price: {$gte : arr[0]}},
                            { price: {$lte : arr[1]}}
                        ]
                    },
                    {
                        $or: 
                        [
                            { address: { $regex: pattern} }, 
                            { address: { $regex: pattern2} }
                        ]
                    }
                ]
            })            
                .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                .populate('location')
                .populate('image_info', 'main_image')
                .then((result1)=>{

                    Apartment.find({
                        $and : [
                            {$and: 
                                [
                                    { price: {$gte : arr[0]}},
                                    { price: {$lte : arr[1]}}
                                ]
                            },
                            {
                                $or: [
                                    { address: { $regex: pattern} }, 
                                    { address: { $regex: pattern2} }
                                ]
                            }
                        ]
                    })
                    .populate({path : 'ghar_room_info', populate: [{path: 'floor'}, {path: 'bedroom'}, {path: 'bathroom'}, {path: 'kitchen'}, {path: 'living'}, {path: 'hall'}, {path: 'puja'}] })
                    .populate({path: 'facilities_info', populate: [{path: 'balcony'}, {path: 'solar'}, {path: 'wifi'}, {path: 'tv'}, {path: 'furniture'}, {path: 'water_supply'}] })
                    .populate('location')
                    .populate('image_info', 'main_image')
                    .then((result2)=>{

                        return res.status(200).send(result1.concat(result2));
                    }).catch((err)=>{
                        console.log("Error Apartment_result: " + err);
                         return res.status(400).send("Bad Request! ");
                    });
                }).catch((err)=>{
                    console.log("Error ADMINApartment_Result: " + err);
                    return res.status(400).send("Bad Request! ");
                });

        } // price !== '' && address.name !== '' 


        
    } // typeProduct === 'apartment'
    //***************************************APARTMENT CLOSED*****************************************/

    //***************************************LAND*****************************************/
    if (typeProduct === 'land'){
        //Execute search for "type" : 'land'

        if (address.name == '' && price.split('').length>0){
            // For LAND and PRICE only

            let arr = [];
            arr = price.split('-');
            arr[0] = Number(arr[0]);
            arr[1] = Number(arr[1]);

            AdminLand.find({price: { $gte : arr[0], $lte : arr[1]}})
            .populate('location')
            .populate('image_info', 'main_image')
            .then((result1)=>{

                Land.find({price: { $gte : arr[0], $lte : arr[1]}})
                    .populate('location')
                    .populate('image_info', 'main_image')
                    .then((result2)=>{

                        return res.status(200).send(result1.concat(result2));
                    }).catch((err)=>{
                        console.log("Error Land_PRICE: " + err);
                        return res.status(400).send("Bad Request! ");
            });

            }).catch((err)=>{
                console.log("Error AdminLand_PRICE: " + err);
                return res.status(400).send("Bad Request! ");
            });
        } // if address.name === ''

        if (price === '' && address.name.split('').length > 0){
            // For LAND and ADDRESS ONLY
            console.log(address);
            console.log("Address Name: " + address.name + ' ' + "Address Constraint: " + address.constraint);
            
            address.name = address.name.trim();
            console.log("Trimmed: " +address.name);

                AdminLand.find(  { $or :[{ address: { $regex: pattern} }, { address: { $regex: pattern2 } } ] }  )
                .populate('location')
                .populate('image_info', 'main_image')
                .then((result1)=>{

                    Land.find({address: singleWord})
                    .populate('location')
                    .populate('image_info', 'main_image')
                    .then((result2)=>{

                        return res.status(200).send(result1.concat(result2));
                    }).catch((err)=>{
                        console.log("Error Land_ADDRESS: " + err);
                        return res.status(400).send("Bad Request! ");
                    });

                }).catch((err)=>{
                    console.log("Error ADMINLand_ADDRESS: " + err);
                    return res.status(400).send("Bad Request! ");
                });

        } // price === '' && address.name.split('').length > 0

        if (price === '' && address.name.split('').length === 0){
            AdminLand.find({})
                .populate('location')
                .populate('image_info', 'main_image')
                .then((result1)=>{

                    Land.find({})
                    .populate('location')
                    .populate('image_info', 'main_image')
                    .then((result2)=>{

                        return res.status(200).send(result1.concat(result2));
                    }).catch((err)=>{
                        console.log("Error Land_result: " + err);
                         return res.status(400).send("Bad Request! ");
                    });
                }).catch((err)=>{
                    console.log("Error ADMINLand_Result: " + err);
                    return res.status(400).send("Bad Request! ");
                });
        } // price === '' && address.name.split('').length === 0

        if (price !== '' && address.name !== ''){

            let arr = [];
            arr = price.split('-');
            arr[0] = Number(arr[0]);
            arr[1] = Number(arr[1]);

            console.log("Inside Price && address.name")
           
            AdminLand.find({
                $and : [
                    {
                        $and: 
                        [
                            { price: {$gte : arr[0]}},
                            { price: {$lte : arr[1]}}
                        ]
                    },
                    {
                        $or: 
                        [
                            { address: { $regex: pattern} }, 
                            { address: { $regex: pattern2} }
                        ]
                    }
                ]
            })            
                .populate('location')
                .populate('image_info', 'main_image')
                .then((result1)=>{

                    Land.find({
                        $and : [
                            {$and: 
                                [
                                    { price: {$gte : arr[0]}},
                                    { price: {$lte : arr[1]}}
                                ]
                            },
                            {
                                $or: [
                                    { address: { $regex: pattern} }, 
                                    { address: { $regex: pattern2} }
                                ]
                            }
                        ]
                    })
                    .populate('location')
                    .populate('image_info', 'main_image')
                    .then((result2)=>{

                        return res.status(200).send(result1.concat(result2));
                    }).catch((err)=>{
                        console.log("Error Land_result: " + err);
                         return res.status(400).send("Bad Request! ");
                    });
                }).catch((err)=>{
                    console.log("Error ADMINLand_Result: " + err);
                    return res.status(400).send("Bad Request! ");
                });

        } // price !== '' && address.name !== '' 
        
    } // typeProduct === 'land'
    //***************************************LAND CLOSED*****************************************/

});

module.exports = router;