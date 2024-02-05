
const { model } = require('mongoose');
const hospitalModel = require('../models/hospital.models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require('../error/errorHandler');
const sendEmail = require('../middleWares/sendEmail');

// Signing up hospital
const SignUpHosp = async (req, res, next) => {
    const { hospitalName, email, password, location } = req.body;
    try {
        const hospitalExists = await hospitalModel.findOne({ email: email });
        console.log(hospitalExists);
        if (hospitalExists) {
            return res.status(401).json({ message: "Hospital with this email already exists" });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const hospitalUser = new hospitalModel({
            hospitalName: hospitalName,
            email: email,
            password: hashedPassword,
            location: location
        });

        const savedHospital = await hospitalUser.save();
        res.status(201).json({ message: 'Account created!' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Wrong input, please try again', error: error.message });
    }
};

// Signing in hospital
const SignInHosp = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validHospitalUser = await hospitalModel.findOne({ email: email });
        if (!validHospitalUser) {
            return res.status(500).json({ message: "Hospital user not found" });
        }

        const validHospitalPassword = bcryptjs.compareSync(password, validHospitalUser.password);
        if (!validHospitalPassword) {
            return res.status(500).json({ message: "Wrong input!" });
        }

        const token = jwt.sign({ id: validHospitalUser._id, role: 'hospital' }, process.env.JWT_SECRET_KEY);
        console.log('Generated Token:', token);


        const { password: hashedPassword, ...rest } = validHospitalUser._doc;
        const expiryDate = new Date(Date.now() + 86400);

        console.log('Hospital User Data:', rest);


        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error! Please provide valid information" });
    }
};

// Resetting  password when forgotten
const ForgetPasswordHosp = async (req, res, next) => {
    try {
        const validHospitalUser = await hospitalModel.findOne({ email: req.body.email });
        if (!validHospitalUser) return next(errorHandler(401, "Invalid email"));

        var token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1800" });

        var recoveryLink = `Here is your recovery link:\n https://yourdomain.com/reset-password/${token}`;
        await sendEmail(validHospitalUser.email, "Reset Password", recoveryLink);

        res.status(200).json({ message: "Your password has been reset" });
    } catch (error) {
        res.status(500).json({ message: "password reset failed try again later" })
    };


};


module.exports = { SignUpHosp, SignInHosp, ForgetPasswordHosp };
