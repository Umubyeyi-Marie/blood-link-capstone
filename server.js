// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const allRoutes = require('./routes');
const cookieParser = require('cookie-parser');

dotenv.config();



const app = express();
const PORT = process.env.PORT || 8080;

app.use(cookieParser());
app.use(express.json());


mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.use('/api/BL/v1/', allRoutes);
    app.listen(PORT, () => {
      console.log(`> Listening on port ${PORT}`.bgMagenta.white);
    });
  })
  .catch((err) => console.error("> Couldn't connect to MongoDB...".bgRed, err));


app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log(`> listening on port ${process.env.PORT}`.bgMagenta.white);
    })
    .catch(err => console.log("> Couldn't connect to MongoDB...".bgRed));
});

app.use('/api/BL/v1/', allRoutes);

// app.use('/api/BL/v1/', allRoutes);

