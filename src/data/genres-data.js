import mongoose from 'mongoose';
import {addFields, lookUpQuery} from '../common/query-constants.js';


export const getGenreByIdQuery = async (model, id) => await model.find({_id: mongoose.Types.ObjectId(id)});

export const getAllGenresQuery = async (model) => await model.find({});

export const getBooksByGenreIdQuery = (model, id) => {
  return model.aggregate([
    lookUpQuery,
    addFields,
    {$unwind: '$genre'},
    {$match: {'genre._id': mongoose.Types.ObjectId(id)}},
  ]);
}


export const searchByGenreNameQuery = (model, pattern) => {
  const template = new RegExp(pattern, 'gi');

  return model.aggregate([
    lookUpQuery,
    addFields,
    {$unwind: '$genre'},
    {$match: {'genre.name': template}},
  ]);
}