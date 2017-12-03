var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('favorites');

var service = {};

service.setFav = setFav;
service.getAllForUser = getAllForUser;
service.getOneForUser = getOneForUser;
service.delete = _delete;


module.exports = service;


function setFav(userParam) {
  var deferred = Q.defer();
  var user = {
    bookId: userParam.bookId,
    userId: userParam.userId
  };

  db.favorites.insert(
    user,
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

  return deferred.promise;
}


function getAllForUser(_id) {
  var deferred = Q.defer();

  db.favorites.find( {userId:_id} ).toArray(function (err, favs) {
    if (err) deferred.reject(err.name + ': ' + err.message);


    favs = _.map(favs, function (fav) {
      return fav;
    });

    deferred.resolve(favs);
  });

  return deferred.promise;

}


function getOneForUser(req) {
  var deferred = Q.defer();

  db.favorites.findOne(
    {
      bookId:req.param('bookId'),
      userId:req.param('userId')
    },
    function (err, fav) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      if (fav) {

        deferred.resolve(_.omit(fav, 'hash'));
      } else {
        console.log("error");
        deferred.resolve("fav not found");
      }
    });

  return deferred.promise;
}

function _delete(req) {
  var deferred = Q.defer();

  db.favorites.remove(
    { bookId:req.param('bookId'),
      userId:req.param('userId')},
    function (err) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

  return deferred.promise;
}

