import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import { bookRouter } from './src/controllers/books-controller.js';
import { genreRouter } from './src/controllers/genres-controller.js';
import { userRouter } from './src/controllers/users-controller.js';
import jwtStrategy from './src/authentication/strategy.js';

const constants = dotenv.config().parsed;
const db_url = constants.DB_HOST;
const username = constants.DB_USER;
const password = constants.DB_PASS;
const maxPool = parseInt(constants.DB_LIMIT);

const port = parseInt(constants.EXPRESS_PORT) || 5000;
const app = express();
passport.use(jwtStrategy);
app.use(express.json());

mongoose.connect(db_url, {
  auth: { username, password },
  authSource: 'admin',
  maxPoolSize: maxPool,
});

app.use('/api/book', bookRouter);
app.use('/api/genre', genreRouter);
app.use('/api/user', userRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));