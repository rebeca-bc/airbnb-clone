/** api back */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();
const userModel = require('./models/User.js');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const passSalt =  bcrypt.genSaltSync(11);
const jwtSecret = 'asdfghrebeca002ddfgyuikmnbv';

/** use json parser */
app.use(express.json());

app.use(cors({ 
    credentials: true,
    origin: 'http://localhost:5173',  
}));

/** connect to non relational db */
mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async  (req, res) => {
    /** lets grab the info being sent */
    const { fName, lName, email, password } = req.body;

    try 
    {
        const user = await userModel.create({ 
            fName, 
            lName, 
            email, 
            /** for security send it encrypted */
            password: bcrypt.hashSync(password, passSalt),
        });
        res.json(user);
    }
    catch (err)
    {
        /** unprossable entity */
        res.status(422).json(err);
    }
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    /** find user w this data */
    const user = await userModel.findOne({ email:email });
    if(user) 
    {
        /** compare password w encryption and all */
        const corrrectPass = bcrypt.compareSync(password, user.password);
        if (corrrectPass)
        {
            jwt.sign
            ({ email: user.email, id: user._id}, 
            jwtSecret, 
            {}, 
            (err, token) => 
            {
                if (err) {
                    console.error('Error generating token:', err);
                    return res.status(500).json('Error generating token');
                }

                res.cookie('token', token).json(user);
            })        
        }
        else
        {
            res.status(422).json('incorrect password');
        }
    }
    else
    {
        res.json('user not found');
    }
});

app.listen(4000);