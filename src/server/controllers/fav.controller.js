var config = require('config.json');
var express = require('express');
var router = express.Router();
var favService = require('services/fav.service.js');

// routes
router.get('/:_id', getAllForUser);
router.post('/set', setFav);

module.exports = router;


function getAllForUser(req, res) {
  favService.getAllForUser(req.params._id)
    .then(function (users) {
      res.send(users);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}


function setFav(req, res) {
  favService.create(req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
