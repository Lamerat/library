import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import { bookRouter } from './src/controllers/books-controller.js';
import { genreRouter } from './src/controllers/genres-controller.js';
import { userRouter } from './src/controllers/users-controller.js';
import jwtStrategy from './src/authentication/strategy.js';

import http from 'http'

// const constants = dotenv.config().parsed;
// const db_url = constants.DB_HOST;
// const username = constants.DB_USER;
// const password = constants.DB_PASS;
// const maxPool = parseInt(constants.DB_LIMIT);


const port = 5000;
const db_url = 'mongodb+srv://cluster0.7zjjw.mongodb.net/library?retryWrites=true&w=majority'
const username = 'root1'
const password = 'k4rbur4tor'
const maxPool = 5



// const port = parseInt(constants.EXPRESS_PORT) || 5000;
const app = express();

// const http = require('http').Server(app)
const elka = http.Server(app)

passport.use(jwtStrategy);
app.use(express.json());

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

console.log('Test')

elka.listen(5000, () => console.log(`Listening on port ${port}`));
// app.listen(port, () => console.log(`Listening on port ${port}`));
