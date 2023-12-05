const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');

const db = require('../DB/conn');
const User = require('../models/userModel');
const authenticate = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRole');
const Timetable = require("../models/timeTableModel");


const router = express.Router();


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ALPHA_NUMERIC_SET = process.env.ALPHA_NUMERIC_SET


router.post('/registerNewUser', authenticate, async (req, res) => {
    // const { name, email, role, branch, course } = req.body;
    const { email, role } = req.body;

    try {
        // Check if the username is already taken
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'email already exists' });
        }

        const token1 = req.header('Authorization');
        const token = token1.split(" ")[1]
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);


        // Generate Invite Code 

        function randomString(length, chars) {
            let result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }
        let inviteCode = randomString(7, ALPHA_NUMERIC_SET);

        while (await User.findOne({ inviteCode: inviteCode })) {
            inviteCode = randomString(7, ALPHA_NUMERIC_SET);
        }

        const orgId = decoded['orgId'];
        console.log(orgId);

        // Create a new user
        // const newUser = new User({
        //     name: name,
        //     email: email,
        //     role: role,
        //     inviteCode: inviteCode,
        //     organizationId: organizationId,
        //     branch: branch,
        //     course: course
        // });

        const newUser = new User({
            email: email,
            role: role,
            inviteCode: inviteCode,
            orgId: orgId,
        });



        // Save the user to the database
        await newUser.save();

        return res.status(200).json({
            message: `New User Registered.`,
            inviteCode: inviteCode
        });
    } catch (err) {
        console.error('Error signing up:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



router.post('/timeTable', authenticate, async (req, res) => {

    const { day, startTime, endTime, course, room, professor } = req.body;

    const timeTable = {
        day: day,
        startTime: startTime,
        endTime: endTime,
        course: course,
        room: room,
        professor: professor
    }

    const newTimeTable = await new Timetable(timeTable).save();



});
























module.exports = router;