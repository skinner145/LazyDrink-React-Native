const router = require('express').Router();

let Type = require('../models/Type');

router.route('/').get(function(req, res){
    Type.find(function(err, types){
        if(err){
            console.log(err)
        }
        else{
            res.json(types)
        }
    })
})

module.exports = router;