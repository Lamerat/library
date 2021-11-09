import mongoose from 'mongoose';

const booksSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: 'string',
  author: 'string',
  image: { type: String },
  createOn: 'string',
  lastUpdateOn: 'string',
  genre: mongoose.ObjectId,
});

const genresSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: 'string',  
  createOn: 'string',
  lastUpdateOn: 'string',
});

const userSchema = new mongoose.Schema({  
  username: 'string',
  password: 'string',
});

const tokenSchema = new mongoose.Schema({
  token: 'string',
});


export const allBooks = mongoose.model('books', booksSchema);
export const genreModel = mongoose.model('genre', genresSchema);
export const userModel = mongoose.model('user', userSchema);
export const tokenModel = mongoose.model('tokens_black_list', tokenSchema);

