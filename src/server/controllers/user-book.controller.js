var config = require('config.json');
var express = require('express');
var router = express.Router();
var userBookService = require('services/user-book.service');

// routes
router.post('/add', add);
router.get('/user', getBookUserReviews);
router.get('/:_id', getAllReviewsForBook);

module.exports = router;

function add(req, res) {
  userBookService.add(req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getAllReviewsForBook(req, res) {
  userBookService.getAllReviewsForBook(req.params._id)
    .then(function (reviews) {
      if (reviews) {
        res.send(reviews);
      } else {
        res.sendStatus(404);
      }
    })
}


function getBookUserReviews(req, res) {
  userBookService.getBookUserReviews(req)
    .then(function (review) {
      if (review) {
        res.send(review);
      } else {
        console.log("error");
        res.sendStatus(404);
      }
    })
}
