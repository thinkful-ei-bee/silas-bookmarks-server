'use strict';

const express = require('express');

const router = express.Router();
const bodyParser = express.json();
const uuid = require('uuid');
const { bookmarks } = require('./store');

router
  .route('/')
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { name, url, rating, description } = req.body;

    if(!name) {
      return res
        .status(400)
        .send('Name Required');
    }

    if(!url) {
      return res
        .status(400)
        .send('URL Required');
    }

    const id = uuid();
    const bookmark = {
      id,
      name,
      url,
      rating,
      description
    };

    bookmarks.push(bookmark);

    res
      .status(204)
      .location(`http://localhost:8000/card/${id}`)
      .json(bookmark);
  });

router
  .route('/:id')
  .delete((req, res) => {
    const { id } = req.params;

    const bookmarkIndex = bookmarks.findIndex(b => b.id == id);

    if(bookmarkIndex === -1) {
      return res
        .status(404)
        .send('Not Found');
    }

    bookmarks.splice(bookmarkIndex, 1);

    res
      .status(204)
      .end();
  });