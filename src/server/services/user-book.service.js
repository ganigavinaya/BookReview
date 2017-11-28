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
        return _.omit(review, 'hash');
      });

      deferred.resolve(reviews);
    });
  return deferred.promise;
}


function getBookUserReviews(_id) {
  var deferred = Q.defer();

  db.reviews.find(
    {
      userId:_id
    }
    , function (err, reviews) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      reviews = _.map(reviews, function (review) {
        return _.omit(review, 'hash');
      });

      deferred.resolve(reviews);
    });
  return deferred.promise;
}

function create(reviewParam) {
  var deferred = Q.defer();


  var set = {
    bookId: reviewParam.bookId,
    userId: reviewParam.userId,
    rating: reviewParam.rating,
    review: reviewParam.review
    //imageName: bookParam.imageName
  };

  db.books.insert(
    set,
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });


  return deferred.promise;
}

