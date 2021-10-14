import bcrypt from 'bcrypt';
import createToken from '../authentication/create-token.js';
import errors from '../common/errors.js';
import { tokenModel, userModel } from '../common/schemas.js';

export const userRegister = (usersData) => async (username, password) => {
  const checkUser = await usersData.getUserByUsername(userModel, username);

  if (checkUser.length) {
    return { error: errors.DUPLICATE_RECORD, result: null };
  }

  password = await bcrypt.hash(password, 10);
  await usersData.createNewUser(userModel, username, password);  
  return { error: null, result: true };
}


export const userLogin = (usersData) => async (username, password) => {
  const checkUser = await usersData.getUserByUsername(userModel, username);

  if (!checkUser.length) {
    return { error: errors.NOT_FOUND, result: null };
  }

  if (!await bcrypt.compare(password, checkUser[0].password)) {
    return { error: errors.WRONG_CREDENTIALS, result: null };
  }

  const token = createToken({
    id: checkUser[0]._id.toString(),
    username: checkUser[0].username,
  });

  return { error: null, result: { token } }
}


export const userLogout = (userData) => async (token) => {
  const result = await userData.addTokenToBlackList(tokenModel, token);

  if (!result) {
    return { error: errors.SERVER_PROBLEM, result: null };
  }

  return { error: null, result: { message: 'Successful logout!' } };
}