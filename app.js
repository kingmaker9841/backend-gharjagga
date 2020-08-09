const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./config/Passport')();

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}, (err)=>{
    if (err){
        console.log("Err" + err);
    }else{
        console.log("Mongoose Connected");
    }
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.get('/', (req,res)=>{
    res.status(200).send("home");
});
app.use('/add', require('./routes/add'));
app.use('/show', require('./routes/show'));
app.use('/register', require('./routes/register'));
app.use('/api', require('./routes/api'));

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server Started...");
});