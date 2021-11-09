import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// const JWT_KEY = dotenv.config().parsed.JWT_KEY;
const JWT_KEY = 'R4DI4TOR';
// const TOKEN_LIFE = dotenv.config().parsed.TOKEN_LIFE;
const TOKEN_LIFE = '24h';

const createToken = (payLoad) => jwt.sign(payLoad, JWT_KEY, { expiresIn: TOKEN_LIFE });

export default createToken;