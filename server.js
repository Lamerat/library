import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import { bookRouter } from './src/controllers/books-controller.js';
import { genreRouter } from './src/controllers/genres-controller.js';
import { userRouter } from './src/controllers/users-controller.js';
import jwtStrategy from './src/authentication/strategy.js';
import cors from 'cors'

import http from 'http'

// const constants = dotenv.config().parsed;
// const db_url = constants.DB_HOST;
// const username = constants.DB_USER;
// const password = constants.DB_PASS;
// const maxPool = parseInt(constants.DB_LIMIT);

const db_url = 'mongodb+srv://cluster0.7zjjw.mongodb.net/library?retryWrites=true&w=majority'
const username = 'root'
const password = 'k4rbur4tor'
const maxPool = 5

const app = express();

passport.use(jwtStrategy);
app.use(express.json());
app.use(cors());

try {
  mongoose.connect(db_url, {
    auth: { username, password },
    authSource: 'admin',
    maxPoolSize: maxPool,
  });
} catch (error) {
  console.log (error)
}

app.use('/api/book', bookRouter);
app.use('/api/genre', genreRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;



  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


