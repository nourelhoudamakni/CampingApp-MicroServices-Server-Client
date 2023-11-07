const { response } = require("express");
const User = require("../Models/User");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const accountSid = process.env.ACCOUNT_SID_TWILIO;
const authToken = process.env.AUTH_TOKEN_TWILIO;
const client = require('twilio')(accountSid, authToken);


// create json web token
const maxAge = 15 * 60

//function createToken the encoded data here is the id
const createToken = (id) => {
    return jwt.sign({ id }, 'Hamza :)', {    //secret key that is used to sign the jwt (should not share)
        expiresIn: maxAge
    })
}

const sendSms = async (phone) => {
    try {    
        client.messages.create({
            body: `mara7ba :D`,
            from: process.env.PHONE_NUMBER_TWILIO,
            to: `${phone}`
        }).then(res.json(console.log(code)))
    } catch (error) {
        console.log(error);
    }
}

const SignIn = async (req, res) => {
    const saltRounds = 10;
    const { email, password } = req.body;
    if(!email || !password){
        res.status(500).json("empty fields")
    }
    else{
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const passwordMatches = await bcrypt.compare(password, user.password);
            if ( passwordMatches) {
                const token1 = createToken(user._id);
                    // Update the user's token and get the updated document
                    const updatedUser = await User.findOneAndUpdate(
                        { email: email },
                        { $set: { token: token1 } },
                        { new: true } // This option returns the updated document
                    );
                    sendSms(updatedUser.phoneNumber);
                    res.status(200).json(updatedUser);
            }
            else {
                res.status(400).json("check your password");
            }
        }
        else {
            res.status(400).json("this email does not exist");
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}
}
module.exports={SignIn,sendSms};


