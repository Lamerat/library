
export const bodyValidator = (validator) => async (req, res, next) => {
  const errorMessages = [];

  Object.keys(validator).forEach(x => {
    if(validator[x](req.body[x]) !== true) {
      errorMessages.push(validator[x](req.body[x]));
    }
  });
    
  if (errorMessages.length) {
    return res.status(400).json({ error: errorMessages.join(`; `) });
  }
  
  next();
};

