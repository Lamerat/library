export const getUserByUsername = async (model, username) => {
  return await model.find({username: username});
}


export const createNewUser = async (model, username, password) => {
  try {
    const result = await model.create({username, password});
    return true;
  } catch (e) {
    return false;
  }
}


export const addTokenToBlackList = async (model, token) => {
  try {
    await model.create({token});
    return true;
  } catch (e) {
    return false;
  }
}


export const checkToken = async (model, token) => {
  return await model.find({token: token});
}