import express from 'express';
import errors from '../common/errors.js';
import userCredentialsValidator from '../validators/user-credentials-validator.js';
import { bodyValidator } from '../middlewares/body-validator.js';
import * as usersData from '../data/users-data.js';
import { userLogin, userRegister, userLogout } from '../services/users-services.js';
import { authenticator } from '../middlewares/authenticator.js';
import { tokenValidator } from '../middlewares/token-validator.js';


export const userRouter = express.Router();

userRouter.post('/register', bodyValidator(userCredentialsValidator), async (req, res) => {
  const { username, password } = req.body;
  const { error } = await userRegister(usersData)(username, password);

  if (error === errors.DUPLICATE_RECORD) {
    return res.status(409).send({ error: `This username already exists!` });
  }

  res.status(201).send({ message: `User ${username} was successful created!` });
});


userRouter.post('/login', bodyValidator(userCredentialsValidator), async (req, res) => {
  const { username, password } = req.body;
  const { error, result } = await userLogin(usersData)(username, password);

  if (error === errors.NOT_FOUND) {
    return res.status(404).send({ error: `This username don't exists!` });
  }

  if (error === errors.WRONG_CREDENTIALS) {
    return res.status(403).send({ error: `Invalid credentials!` });
  }

  res.status(200).send(result);
});


userRouter.post('/logout', authenticator, tokenValidator, async (req, res) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  
  const { error, result } = await userLogout(usersData)(token);

  if (error === errors.SERVER_PROBLEM) {
    return res.status(403).send({ error: `service is not available, please try again later!` });
  }

  res.status(200).send(result);
});