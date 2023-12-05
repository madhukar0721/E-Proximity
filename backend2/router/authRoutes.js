const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');

const db = require('./../DB/conn');
const User = require('../models/userModel');
const Orgs = require("../models/orgModel")
const authenticate = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ALPHA_NUMERIC_SET = process.env.ALPHA_NUMERIC_SET
const generateRefreshToken = () => jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });


router.post('/register', async (req, res) => {
    const { name, email, password, orgName } = req.body;


    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
                     role: 'admin'
        });

        await newUser.save();

        const timestamp = new Date();

        const newOrg = new Orgs({
            orgName: orgName,
            createdAt: timestamp,
        });
        await newOrg.save();


        console.log(newOrg);
        

        newUser.orgId = newOrg._id;
        await newUser.save();

        // Insert the user into the 'users' collection

        return res.status(200).json({
            message: `User signed up, organization created.`,
            user: newUser,
            email: email
        });
    } catch (err) {
        console.error('Error signing up', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const user = await User.findOne({ email }).maxTimeMS(5000);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        if (user.role !== role) {
            return res.status(401).json({ message: `Invalid role` });
        }


        // Include organization information in the token payload
        const authToken = jwt.sign(
            {
                email: user.email,
                orgId: user.orgId,
                // Add other user-related information if needed
            },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();


        return res.status(200).json({ token: authToken, refreshToken, user: { email: user.email, organizationId: user.organizationId } });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/signupNewUser/:inviteCode', async (req, res) => {

    const inviteCode = req.params.inviteCode;
    const { password } = req.body;
  
  
    try {
      const user = await User.findOne({ inviteCode: inviteCode });
  
      if (inviteCode !== user.inviteCode) {
        return res.status(404).json(
          {
            message: 'wrong invitation code'
          }
        );
  
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.inviteCode = "";
      user.save();
  
      res.status(200).json({
        message: 'User signed up. Go to login',
        email: user.email,
        'FAsecret': user.secret
      });
    } catch (err) {
      console.error('Error signing up', err);
      res.status(500).json({
        message: 'Internal Server Error',
        err: err
      });
    }
  });
  

router.post('/checkInviteCode/:inviteCode', async (req, res) => {

    const inviteCode = req.params.inviteCode;

    if (await User.findOne({ inviteCode: inviteCode })) {
        return res.status(200).json({ message: 'Invite Code exists' });
    }
    else {
        return res.status(400).json({ message: 'Invite Code Expired or Invalid' });
    }

});


router.post('/signupNewUser/:inviteCode', async (req, res) => {


    const { password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        const inviteCode = req.params.inviteCode;
        console.log(inviteCode);
        console.log(user);


        if (user.inviteCode !== inviteCode) {
            res.status(401).json({ 'message': 'wrong email or inviteCode' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.inviteCode = "";
        user.save();

        res.status(200).json({ 'message': `User Created. Go to login` });

    }


    catch (err) {

        return res.status(500).json({ 'message': 'Internal server error' });

    }


});

router.post('/student-dashboard', authenticate, async (req, res) => {

    res.status(200).json("hi");


});





module.exports = router;

