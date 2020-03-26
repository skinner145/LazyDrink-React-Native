/**
 * @Author: Arthur Skinner
 * @Date:   2020-02-25T17:26:25+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2020-03-10T17:54:47+00:00
 */



const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport')

const orderRoutes = require('./routes/order');
const typeRoutes = require('./routes/type');
const drinkRoutes = require('./routes/drink');
const authRoutes = require('./routes/auth');
// const paymentRoutes = require('./routes/payment')

const port = 4000;

require('dotenv').config();
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(bodyParser.json())

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('mongodb database connection established succesfully');
})

app.use('/orders', orderRoutes)
app.use('/types', typeRoutes)
app.use('/drinks', drinkRoutes)
app.use('/user', authRoutes)
// app.use('/payment', paymentRoutes)

app.listen(port, function() {
    console.log('Server running on port: ' + port);

})
