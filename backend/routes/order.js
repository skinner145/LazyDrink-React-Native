const router = require('express').Router();

let Order = require('../models/Order')

router.route('/').get(function(req, res){
    Order.find(function(err, orders){
        if(err){
            console.log(err);

        }
        else{
            res.json(orders)
        }
    }).sort({"time": -1}).populate('drinks.drink')
})

router.route('/').post(function(req, res){
    let newOrder = new Order(req.body)

    newOrder.save()
    .then(newOrder => {
        res.status(200).json({'order': 'order added succesfully'})
    })
    .catch(err => {
        res.status(400).send('adding new order failed')
    })
})

module.exports = router
