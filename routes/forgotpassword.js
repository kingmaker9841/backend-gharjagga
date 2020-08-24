const router = require('express').Router();
const nodemailer = require('nodemailer');
const Users = require('../models/Users');
const crypto = require('crypto');
const async = require('async');
const bcrypt = require('bcrypt');

router.post('/', (req,res)=>{
    let {email} = req.body;
    async.waterfall([
        (done)=>{
            crypto.randomBytes(10, (err,buf)=>{
                if (err){
                    console.log("Crypto Error: " + err);
                    return res.status(500).json('');
                }
                let token = buf.toString('hex');
                done(null, token);
            });
        },
        (token, done)=>{
            Users.findOne({email: email}, (err, user)=>{
                if (err){
                    console.log("Finding Error: " + err);
                    return res.status(500).json('');
                }
                if (!user){
                    console.log("User Not Found ");
                    return res.status(200).json("No User");
                }
                user.resetPasswordToken = token;
                user.resetPasswordTokenExpiresIn = Date.now() + 1000*60*60;
                user.save((err)=>{
                    if (err){
                        console.log("Saving Error: " + err);
                        return res.status(500).json('');
                    }
                });
                done(null, token, user);
            });
        },
        (token, user, done)=>{
            let transporter = nodemailer.createTransport({
                host: 'smtp.googlemail.com',
                port: process.env.NODEMAILER_PORT || 465,
                secure: true,
                auth: {
                    user: process.env.AUTH_USER,
                    pass: process.env.AUTH_PASSWORD
                }
            });
            let mailOptions = {
                from : process.env.MAIL_FROM,
                to : email,
                subject: "Password Reset Request",
                html: "Click on the link below to create a new Password <br/>" + 'http://localhost:3000'  + '/reset/' + token  +"<br/> <strong>If you did not initiate this request. Please contact our costumer support and reset your password</strong>"
            }
            transporter.sendMail(mailOptions, (err,info)=>{
                if (err){
                    console.log("Sending Mail Error: " + err);
                    return res.status(500).json('');
                }
                console.log("Success: " + info);
                
            });
            res.status(200).json("Success");
            return;
        }
    ], (err)=>{
        console.log("Error: " + err);
        return res.status(500).json('');
    })
});

router.post('/reset', (req,res)=>{
    let {token} = req.body;
    console.log(token);
    Users.findOne({resetPasswordToken: token, 
        resetPasswordTokenExpiresIn: { $gt :  Date.now()}}, (err, user)=>{
            if (err){
                console.log("Error: " + err);
                return res.status(500).json("");
            }
            console.log(user);
            if (!user){
                console.log("Not a User");
                return res.status(200).json("Password Expired");
            }
            return res.status(200).json("Success");
        })
});

router.post('/reset/password', (req,res)=>{
    let {password, token} = req.body;
    console.log("Token: " + token + " Password: " + password);
        Users.findOne({resetPasswordToken: token, 
            resetPasswordTokenExpiresIn: { $gt :  Date.now()}}, (err, user)=>{
                if (err){
                    console.log("Error: " + err);
                    return res.status(500).json("");
                }
                console.log(user);
                if (!user){
                    console.log("Not a User");
                    return res.status(200).json("Password Expired");
                }
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(password, salt, (err, hashed)=>{
                        if (err){
                            return err;
                        }
                        user.password = hashed;
                        user.resetPasswordToken = undefined;
                        user.resetPasswordTokenExpiresIn = undefined;
                        user.save((err)=>{
                        if (err){
                            console.log("Error while saving: " + err);
                            return res.status(500).json('');
                        }
                        res.status(200).json("Success");
                        });
                    });
                });
            })
})



module.exports = router;