const Appointment = require('../models/appointment.models');
const User = require('../models/user.models');
const Hospital = require('../models/hospital.models');
const nodeSchedule = require('node-schedule');
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});



const sendAppointmentReminder = async (req, res, next) => {

    const { UserId, date, hospitalId } = req.body;
    try {
        const user = await User.findById(UserId);
        const hospital = await Hospital.findById(hospitalId);
        if (!user || !hospital) {
            console.error('User or hospital not found.');
            return 
        }


        if (!user.email || !user.fullName || !hospital.email || !hospital.hospitalName) {
            console.error('User or hospital object is missing expected properties.');
            return;
        }

    
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Appointment Reminder',
            text: `Hi ${user.fullName},\nYour appointment is scheduled for ${date} at ${hospital.hospitalName}.`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(info);
        console.log('Appointment reminder sent successfully:', info.response);
        return res.status(200).json({ message: 'Appointment reminder sent successfully.'});
    } catch (error) {
        console.error('Error sending appointment reminder:', error);
    }
};

// const scheduleAppointmentReminders = (appointment) => {
//     nodeSchedule.scheduleJob(appointment.date, () => {
//         sendAppointmentReminder(appointment);
//     });
// };

// const Schedule = async (req, res, next) => {
//     const { Useremail, date, hospitalemail } = req.body;

//     try {
//         const user = await User.findOne({ email: Useremail });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         const hospital = await Hospital.findOne({ email: hospitalemail });
//         if (!hospital) {
//             return res.status(404).json({ message: 'Hospital not found.' });
//         }


//         const newAppointment = new Appointment({
//             Useremail,
//             date,
//             hospitalemail,
//         });

//         const savedAppointment = await newAppointment.save();
//         scheduleAppointmentReminders(savedAppointment);

//         res.status(201).json({ message: 'Appointment saved', data: savedAppointment });
//     } catch (error) {
//         next(error); // Pass the error to the error handling middleware
//     }
// };

// Error handling middleware
// router.use((err, req, res, next) => {
//     console.error('Error:', err);
//     res.status(500).json({ message: 'Internal Server Error', error: err.message });
// });

module.exports = sendAppointmentReminder;
