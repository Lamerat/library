import mongoose from 'mongoose';
import {addFields, lookUpQuery} from '../common/query-constants.js';


export const getAllBooksQuery = (model) => {
  return model.aggregate([
    lookUpQuery,
    addFields,
    {$unwind: '$genre'},
  ]);
}


export const getBookByIdQuery = (model, id) => {
  return model.aggregate([
    {$match: {'_id': mongoose.Types.ObjectId(id)}},
    lookUpQuery,
    addFields,
    {$unwind: '$genre'},
  ]);
}


export const searchByNameQuery = (model, pattern) => {
  const template = new RegExp(pattern, 'gi');
  return model.aggregate([
    {$match: {'name': template}},
    lookUpQuery,
    addFields,
    {$unwind: '$genre'},
  ]);
}