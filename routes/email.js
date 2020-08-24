const router = require('express').Router();
const nodemailer = require('nodemailer');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

router.post('/', (req,res)=>{
    let {fname, lname, phone_number, address, contact_type, service_type, description} = req.body;
    console.log("FName: " + fname + "Lname: " + lname + "PhoneNumber: " + phone_number + "Contact_type: " + contact_type);
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
        to: process.env.MAIL_TO,
        subject: "Contact Request from Saja.com",
        html: "Contact Request Info <br/>" + "First Name: " + fname + "<br/>" + "Last Name: " + lname + "<br/>" + "Address: " + address + "<br/>" + "Mobile Number: " + phone_number + "<br/>" + "Contact Type: " + contact_type + "<br/>" + "Service Type: " + service_type + "<br/>" + "Description: " + description 
    }
    transporter.sendMail(mailOptions, (err, info)=>{
        if (err){
            console.log("Error: " + err);
            return res.status(500).send("");
        }
        res.status(200).send("Success");
        
    })
});

module.exports = router;