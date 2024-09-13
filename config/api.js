import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const findOneByFilter = expressAsyncHandler(async (filter) => {
  return await User.findOne({
    where: filter,
  });
});

export const updateValuesByFilter = expressAsyncHandler(
  async (data, filter) => {
    return await User.update(data, { where: filter });
  },
);
