import express from 'express';
import * as booksData from '../data/books-data.js';
import errors from '../common/errors.js';
import searchPatterValidator from '../validators/search-pattern-validator.js';
import { objectIdValidator } from '../middlewares/objectId-validator.js';
import { getAllBooks, getBookById, searchForBookName } from '../services/books-services.js';
import { bodyValidator } from '../middlewares/body-validator.js';
import { convertSearchPattern } from '../common/convert-search-pattern.js';
import { authenticator } from '../middlewares/authenticator.js';
import { tokenValidator } from '../middlewares/token-validator.js';

export const bookRouter = express.Router();
bookRouter.use(authenticator, tokenValidator);

bookRouter.get('/', async (_, res) => {
  try {
    const result = await getAllBooks(booksData);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({ error: 'service is not available, please try again later!'});
  }
});


bookRouter.post('/search', bodyValidator(searchPatterValidator), async (req, res) => {
  const pattern = convertSearchPattern(req.body.pattern);
  const result = await searchForBookName(booksData)(pattern);
  res.status(200).send(result)
});


bookRouter.get('/:id', objectIdValidator, async (req, res) => {
  const { id } = req.params;
  const { error, result } = await getBookById(booksData)(id);

  if (error === errors.NOT_FOUND) {
    return res.status(404).send({ error: `Book with id ${id} don't exists!` });
  }

  if (error === errors.SERVER_PROBLEM) {
    res.status(500).send({ error: 'service is not available, please try again later!'});
  }

  res.status(200).send(result);
});



