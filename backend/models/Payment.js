const mongoose = require('mongoose');


let PaymentSchema = mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Payment', PaymentSchema);
