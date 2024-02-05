const mongoose = require('mongoose');
const User = require('./user.models');
const Hospital = require('./hospital.models');

// const AppointmentSchema = new mongoose.Schema({
//     Useremail: {
//         type: String,  // Change this to String
//         required: true,
//     },
//     date: {
//         type: Date,
//         required: true,
//     },
//     hospitalemail: {
//         type: String,  // Change this to String
//         required: true,
//     },
// });
const AppointmentSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true
    },
    date: {
        type: Date,
        required: true
    },
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
})


module.exports = mongoose.model('Appointment', AppointmentSchema);