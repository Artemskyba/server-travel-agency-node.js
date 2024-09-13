import expressAsyncHandler from 'express-async-handler';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import { nodemailerService } from './nodemailerService.js';
import { HttpError } from '../helpers/HttpError.js';
import User from '../models/userModel.js';
import { findOneByFilter, updateValuesByFilter } from '../config/api.js';
const { SALT_NUMBER } = process.env;

export const userSignUpService = expressAsyncHandler(async (registerData) => {
  const { email, pass } = registerData;

  await checkUserExistsService(email);

  registerData.pass = await hashPassword(pass);
  registerData.verificationToken = v4();

  await nodemailerService(email, registerData.verificationToken);

  await User.create(registerData);
});

const hashPassword = async (data) => {
  const salt = await bcrypt.genSalt(+SALT_NUMBER);
  const hash = bcrypt.hash(data, salt);
  return hash;
};

const checkUserExistsService = expressAsyncHandler(async (email) => {
  const isUserExists = await findOneByFilter({ email: email });
  if (isUserExists)
    throw new HttpError(
      400,
      `User with email ${email} already exists. Please use any email.`,
    );
});

export const verifyUserService = expressAsyncHandler(async (identifier) => {
  const isUserNotVerify = await findOneByFilter({
    verificationToken: identifier,
  });

  if (!isUserNotVerify) throw new HttpError(404, 'Page not found');

  await updateValuesByFilter(
    { verificationToken: null },
    { verificationToken: identifier },
  );
});

export const resendEmailService = expressAsyncHandler(async (email) => {
  const userData = await findOneByFilter({ email: email });

  if (!userData) throw new HttpError(404, 'Not found');

  if (!userData.verificationToken)
    throw new HttpError(400, 'Your email already verificated');

  await nodemailerService(email, verificationToken);
});

export const forgotEmailService = expressAsyncHandler(async () => {});
