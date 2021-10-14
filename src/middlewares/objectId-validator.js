import mongoose from 'mongoose';

export const objectIdValidator = (req, res, next) => {
  const { id } = req.params;
  const objectIdType = mongoose.Types.ObjectId;

  if (!objectIdType.isValid(id)) {
    return res.status(400).send({ error: `${id} is not a valid Object ID!` });
  }

  next();
}
