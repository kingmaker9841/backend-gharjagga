const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/Users');
const bcrypt = require('bcrypt');

module.exports = ()=>{
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (username, password, done)=>{
        Users.findOne({email: username }, (err, user)=>{
            if (err){
                console.log("Users Finding Error: " + err);
                return done(err);
            }
            if (!user){
                console.log("Not a registered User!");
                return done(null, false);
            }
            bcrypt.compare(password, user.password, (err, bool)=>{
                if (err){
                    console.log("Error while decrypting PW: " + err);
                    return done(null, false);
                }
                if (!bool){
                    console.log("Incorrect Password!");
                    return done(null, false)
                }
                
                return done(null, user);
            })
            
        });
    }));
    
    passport.serializeUser((user, done)=>{
        return done(null, user._id);
    });
    passport.deserializeUser((id, done)=>{
        Users.findById(id, (err, user)=>{
            if (err){
                console.log("Error Deserializing because ID not found!");
                return done(err);
            }
            return done(null, user);
        });
    });
}

