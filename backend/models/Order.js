const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Drink = require('./Drink')
const User = require('./User')

let OrderSchema = mongoose.Schema({
    drinks: [{
        drink: {type: mongoose.Schema.Types.ObjectId, ref: 'Drink' },
        price : { type: Number },
        quantity: { type: Number },
        sum: { type: Number }
    }],
    tableNumber: { type: Number },
    totalPrice: { type: Number },
    time: {type: Date, default: Date.now },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Order', OrderSchema)
