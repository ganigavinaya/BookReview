var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var fs = require('fs');
var randomstring = require("randomstring");
var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('reviews');

var service = {};

service.add = create;
service.getAllReviewsForBook = getAllReviewsForBook;
service.getBookUserReviews = getBookUserReviews;

module.exports = service;


function getAllReviewsForBook(_id) {
  var deferred = Q.defer();

  db.reviews.find({
      bookId:_id
    }
    , function (err, reviews) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      reviews = _.map(reviews, function (review) {
        return review;
      });

      deferred.resolve(reviews);
    });
  return deferred.promise;
}


function getBookUserReviews(req) {
  var deferred = Q.defer();

  db.reviews.findOne(
    {
      bookId:req.param('bookId'),
      userId:req.param('userId')
    }
    ,
    function (err, review) {
      if (err) deferred.reject(err.name + ': ' + err.message);


      if (review) {
        deferred.resolve(review);
      } else {
        deferred.reject('review not found');
      }
    });
  return deferred.promise;
}

function create(reviewParam) {
  var deferred = Q.defer();


  var set = {
    bookId: reviewParam.bookId,
    userId: reviewParam.userId,
    //rating: reviewParam.rating,
    review: reviewParam.review
  };

  db.reviews.insert(
    set,
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });


  return deferred.promise;
}

