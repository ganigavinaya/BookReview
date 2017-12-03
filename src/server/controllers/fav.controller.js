var config = require('config.json');
var express = require('express');
var router = express.Router();
var favService = require('services/fav.service.js');

// routes
router.get('/', getOneForUser);
router.post('/add', setFav);
router.get('/:_id', getAllForUser);
router.delete('/',deleteFav);

module.exports = router;

function getAllForUser(req, res) {

  favService.getAllForUser(req.params._id)
    .then(function (favs) {
      res.send(favs);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getOneForUser(req, res) {
  favService.getOneForUser(req)
    .then(function (favs) {
      res.send(favs);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}


function setFav(req, res) {
  favService.setFav(req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}


function deleteFav(req, res) {
  favService.delete(req)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
