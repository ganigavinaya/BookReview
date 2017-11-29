var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var fs = require('fs');
var randomstring = require("randomstring");
var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('books');

var service = {};

service.getAll = getAll;
service.getByTitle = getByTitle;
service.create = create;
service.update = update;
service.delete = _delete;
service.getById = getById;

module.exports = service;


function getAll() {
  var deferred = Q.defer();

  db.books.find().toArray(function (err, books) {
    if (err) deferred.reject(err.name + ': ' + err.message);


    books = _.map(books, function (book) {
      return book;
    });

    deferred.resolve(books);
  });

  return deferred.promise;
}

function getByTitle(_title) {
  var deferred = Q.defer();

  db.books.findOne(
    {title: _title}
    , function (err, book) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (book) {
      deferred.resolve(_);
    } else {
      deferred.reject(err.name + ': ' + err.message);
    }
  });

  return deferred.promise;
}

function getById(_id) {

  var deferred = Q.defer();

  db.books.findById(_id, function (err, book) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (book) {

      deferred.resolve(_.omit(book, 'hash'));
    } else {
      console.log("error");
      deferred.resolve("book not found");
    }
  });

  return deferred.promise;
}


function create(bookParam) {
    var deferred = Q.defer();

    // var imageName = "../img/"+randomstring.generate(7);
    // var bitmap = new Buffer(bookParam.image, 'base64');
    // fs.writeFile(imageName,bitmap,'binary', function(err){
    //   if (err) throw err
    //   console.log('File saved.')
    // });

    var set = {
      title: bookParam.title,
      authors: bookParam.authors,
      genre: bookParam.genre,
      desc:bookParam.desc,
      image: bookParam.image
    };

    console.log(bookParam);


    db.books.insert(
      set,
      function (err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve();
      });


  return deferred.promise;
}

function update(_id, bookParam) {
  var deferred = Q.defer();
  var set;
  if(bookParam.imageName != undefined){
    var imageName = '../img/'+randomstring.generate(7);
    fs.writeFile(imageName,bookParam.image,'binary', function(err){
      if (err) throw err
      console.log('File saved.')
    });

    set = {
      title: bookParam.title,
      authors: bookParam.authors,
      genre: bookParam.genre,
      imagePath: bookParam.imagePath,
      imageName:imageName
    };
  }
  else{

    set = {
      title: bookParam.title,
      authors: bookParam.authors,
      genre: bookParam.genre
    };

  }



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
