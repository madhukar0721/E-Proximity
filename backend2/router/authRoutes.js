const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');

const db = require('./../DB/conn');
const User = require('../models/userModel');
const authenticate = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;


router.post('/register', async (req, res) => {
    const { name, email, role } = req.body;


    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'email already exists' });
        }

        const inviteCode = speakeasy.generateSecret({ length: 6 }).base32;
        
        // Create a new user

        const user = {
            name: name,
            email: email,
            role: role,
            inviteCode: inviteCode
        }
        // Insert the user into the 'users' collection
        const newUser = new User(user).save();

        return res.status(200).json({
            message: `Invite Code = ${inviteCode}`,

        });
    } catch (err) {
        console.error('Error signing up, creating organization, and generating 2FA secret:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



router.post('/signup-newuser/:inviteCode', async (req, res) => {


    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    const inviteCode = req.params.inviteCode;
    console.log(inviteCode);
    console.log(user);


    if (user.inviteCode !== inviteCode)
        res.status(401).json({ 'message': 'wrong email or inviteCode' });


    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    await User.updateOne({ _id: user._id }, { $set: { password: hashedPassword, inviteCode: "" } });

    res.status(200).json({ 'message': `User Created` });
});





router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {

        const accessToken = jwt.sign({ email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: '120s' });
        res.json({
            'message': `Successfully loginned`,
            'accessToken': `${ accessToken }`});
    }
    else {
    res.json({ 'message': 'error' })

}

});

router.post('/student-dashboard', authenticate, async (req, res) => {

    res.status(200).json("hi");


});





module.exports = router;

