var config = require('config.json');
var express = require('express');
var router = express.Router();
var bookService = require('services/book.service');

// routes
router.post('/add', add);
router.get('/', getAll);
router.put('/:_id', update);
router.delete('/:_id', _delete);
router.get('/title:_title', getByTitle);
router.get('/searchBook', searchBook);
router.get('/searchFilter', searchFilter);
router.get('/:_id', getById);


module.exports = router;

function add(req, res) {
  bookService.create(req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getAll(req, res) {
  bookService.getAll()
    .then(function (users) {
      res.send(users);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function update(req, res) {
  bookService.update(req.params._id, req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function _delete(req, res) {
  bookService.delete(req.params._id)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getByTitle(req, res) {
  bookService.getByTitle(req.params._title, req.body)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getById(req, res) {

  bookService.getById(req.params._id)
    .then(function (book) {
      if (book) {
        res.send(book);
      } else {
        res.sendStatus(404);
      }
    });
}
function searchBook(req, res) {
  bookService.searchBook(req)
    .then(function (book) {
      if (book) {
        res.send(book);
      } else {
        res.sendStatus(404);
      }
    })
}

function searchFilter(req, res) {
  bookService.searchFilter(req)
    .then(function (book) {
      if (book) {
        res.send(book);
      } else {
        res.sendStatus(404);
      }
    })
}
