import errors from '../common/errors.js';
import { allBooks } from '../common/schemas.js';


export const getAllBooks = (booksData) => {
  try {
    console.log ('Getting books')
    booksData.getAllBooksQuery(allBooks)
  } catch (error) {

  }
};


export const getBookById = (booksData) => async (bookId) => {
  const result = await booksData.getBookByIdQuery(allBooks, bookId);

  if (!result.length) {
    return { error: errors.NOT_FOUND, result: null }
  }

  return { error: null, result: result[0] };
}


export const searchForBookName = (booksData) => (pattern) => booksData.searchByNameQuery(allBooks, pattern);