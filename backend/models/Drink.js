const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Type = require('./Type')

let DrinkSchema = mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type'}
})

module.exports = mongoose.model('Drink', DrinkSchema)
