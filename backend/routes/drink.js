const router = require('express').Router();

let Drink = require('../models/Drink');

router.route('/').get(function(req, res){
    Drink.find(function(err, drinks){
        if(err){
            console.log(err)
        }
        else{
            res.json(drinks)
        }
    }).populate('type')
})

router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Drink.findById(id, function(err, drink){
        res.json(drink)
    }).populate('type')
})

router.route('/').post(function(req, res){
   let drink = req.body;

   if(!drink.name){
       res.status(400).json({
           message: 'Drink name cannot be blank'
       })
   }

   let newDrink = new Drink(drink);

   newDrink.save()
   .then(data => {
       res.json(data)
   })
   .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;