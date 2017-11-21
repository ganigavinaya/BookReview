var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('books');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;


function getAll() {
  var deferred = Q.defer();

  db.books.find().toArray(function (err, book) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (book) {
      deferred.resolve(_);
    }
    deferred.resolve(_);
  });

  return deferred.promise;
}

function getById(_id) {
  var deferred = Q.defer();

  db.books.findById(_id, function (err, book) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (book) {
      deferred.resolve(_);
    } else {
      deferred.reject(err.name + ': ' + err.message);
    }
  });

  return deferred.promise;
}

function create(bookParam) {
  var deferred = Q.defer();


    db.books.insert(
      bookParam,
      function (err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve();
      });


  return deferred.promise;
}

function update(_id, bookParam) {
  var deferred = Q.defer();

  // fields to update
  var set = {
    name: bookParam.name,
    desc: bookParam.desc,
    author: bookParam.author,
    genre: bookParam.genre
  };


  db.books.update(
    {_id: mongo.helper.toObjectID(_id)},
    {$set: set},
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });


  return deferred.promise;
}

function _delete(_id) {
  var deferred = Q.defer();

  db.books.remove(
    {_id: mongo.helper.toObjectID(_id)},
    function (err) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

  return deferred.promise;
}
