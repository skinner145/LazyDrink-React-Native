// const router = require('express').Router();
//
// const stripe = require('stripe')('sk_test_rn8hLY0ssvfzojoMICOriqy400K2j5OB6x')
//
// let Payment = require('../models/Payment');
//
// router.route('/').post(function(res, req) {
//   return stripe.charges
//     .create({
//       amount: req.body.amount,
//       currency: 'eur',
//       source: req.body.tokenId,
//       description: 'test payment'
//     })
//     .then(result => res.status(200).json(result));
// })
//
// module.exports = router
