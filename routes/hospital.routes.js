
// routes/hospital.routes.js
const express = require('express');
const authenticateHospital = require('../middleWares/authenticated')

const hospitalRoute = express.Router();

// hospitalRoute.use(authenticateHospital);

const { SignInHosp, 
        SignUpHosp, 
        ForgetPasswordHosp 
      } = require('../controllers/hospital.controllers');

hospitalRoute.post('/signup', SignUpHosp);
 

hospitalRoute.post('/signin', SignInHosp);
hospitalRoute.post('/forgetpassword', ForgetPasswordHosp);


module.exports = hospitalRoute;

