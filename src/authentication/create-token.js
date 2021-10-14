import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const JWT_KEY = dotenv.config().parsed.JWT_KEY;
const TOKEN_LIFE = dotenv.config().parsed.TOKEN_LIFE;

const createToken = (payLoad) => jwt.sign(payLoad, JWT_KEY, { expiresIn: TOKEN_LIFE });

export default createToken;