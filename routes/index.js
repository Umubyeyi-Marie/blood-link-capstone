
const express = require('express');
const authRoute = require('./auth.routes');
const hospitalRoute = require('./hospital.routes');
const bloodReqRoute = require('./bldreq.routes')

const hospitalRoute = require('./hospital.routes')

const express = require('express');






const appointRoute = require('./appointment.routes');
const allRoutes = express.Router();


allRoutes.use('/auth', authRoute);
allRoutes.use('/request-blood', bloodReqRoute);
allRoutes.use('/bldreq', bloodReqRoute);
allRoutes.use('/hospital', hospitalRoute);
allRoutes.use('/appointment', appointRoute);








module.exports = allRoutes;

module.exports = allRoutes;

