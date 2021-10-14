import express from 'express';
import * as genreData from '../data/genres-data.js';
import errors from '../common/errors.js';
import searchPatterValidator from '../validators/search-pattern-validator.js';
import { objectIdValidator } from '../middlewares/objectId-validator.js';
import { getAllBooksByGenreId, getAllGenres, searchByGenreName } from '../services/genres-services.js';
import { bodyValidator } from '../middlewares/body-validator.js';
import { convertSearchPattern } from '../common/convert-search-pattern.js';
import { authenticator } from '../middlewares/authenticator.js';
import { tokenValidator } from '../middlewares/token-validator.js';

export const genreRouter = express.Router();
genreRouter.use(authenticator, tokenValidator);

genreRouter.get('/', async (_, res) => {
  const result = await getAllGenres(genreData);
  res.status(200).send(result);
});


genreRouter.post('/search', bodyValidator(searchPatterValidator), async (req, res) => {
  const pattern = convertSearchPattern(req.body.pattern);
  const result = await searchByGenreName(genreData)(pattern);
  res.status(200).send(result);
});

genreRouter.get('/:id', objectIdValidator, async (req, res) => {
  const { id } = req.params;
  const { error, result} = await getAllBooksByGenreId(genreData)(id);

  if (error === errors.NOT_FOUND) {
    return res.status(404).send({ error: `Genre with id ${id} don't exists!` });
  }

  res.status(200).send(result);
});