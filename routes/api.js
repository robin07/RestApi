const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninjas');

router.get('/ninjas', function (req, res, next) {
    Ninja.aggregate().near({
        near:
        {
            'type': 'Point',
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: "dis"
    }
    ).then(function (ninjas) {
        res.send(ninjas);
    });

});

router.post('/ninjas', function (req, res, next) {
    Ninja.create(req.body).then(function (result) {
        res.send(result);
    }).catch(next);
});

router.put('/ninjas/:id', function (req, res, next) {
    Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        Ninja.findOne({ _id: req.params.id }).then(function (result) {
            res.send(result);
        });
    });
});

router.delete('/ninjas/:id', function (req, res, next) {
    Ninja.findByIdAndRemove({ _id: req.params.id }).then(function (result) {
        res.send(result);
    });
});

module.exports = router;
