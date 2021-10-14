import { tokenModel } from '../common/schemas.js';
import { checkToken } from '../data/users-data.js';


export const tokenValidator = async (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  const tokenCheck = await checkToken(tokenModel, token);

  if (tokenCheck.length) {
    return res.status(403).send({ error: `Invalid token!` });
  }

  next();
}

