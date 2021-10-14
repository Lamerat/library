import { genreModel, allBooks } from '../common/schemas.js';
import errors from '../common/errors.js';

export const getAllBooksByGenreId = (genreData) => async (genreId) => {
  const checkGenre = await genreData.getGenreByIdQuery(genreModel, genreId);

  if (!checkGenre.length) {
    return { error: errors.NOT_FOUND, result: null }
  }

  const result = await genreData.getBooksByGenreIdQuery(allBooks, genreId);
  return { error: null, result: result }
}


export const getAllGenres = async (genreData) => await genreData.getAllGenresQuery(genreModel);


export const searchByGenreName = (genreData) => async (pattern) => await genreData.searchByGenreNameQuery(allBooks, pattern);
