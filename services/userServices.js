import expressAsyncHandler from 'express-async-handler';
import { connection } from '../app.js';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import { nodemailerService } from './nodemailerService.js';
import { HttpError } from '../helpers/HttpError.js';
const { SALT_NUMBER } = process.env;

export const userSignUpService = expressAsyncHandler(async (registerData) => {
  const { name, surname, email, pass } = registerData;

  await checkUserExistsService(email);

  registerData.pass = await hashPassword(pass);
  registerData.verificationToken = v4();

  const signUpUserQuery = 'CALL sp_signUpUser(?, ?, ?, ?, ?)';

  const signUpUser = async () => {
    const [rows, _] = await connection.execute(
      signUpUserQuery,
      Object.values(registerData),
    );
  };

  await nodemailerService(email, registerData.verificationToken);

  signUpUser();
});

const hashPassword = async (data) => {
  const salt = await bcrypt.genSalt(+SALT_NUMBER);
  const hash = bcrypt.hash(data, salt);
  return hash;
};

const checkUserExistsService = expressAsyncHandler(async (email) => {
  const isUserExists = await findUserByEmailService(email);
  if (isUserExists)
    throw new HttpError(
      400,
      `User with email ${email} already exists. Please use any email.`,
    );
});

const findUserByEmailService = expressAsyncHandler(async (email) => {
  const findUserByEmailQuery = `CALL sp_findUserByEmail(?)`;

  const findUserByEmail = async () => {
    const [[data] = rows, _] = await connection.execute(findUserByEmailQuery, [
      email,
    ]);
    return data[0];
  };

  const userData = findUserByEmail();

  if (!userData) throw new HttpError(404, 'Not found');

  return userData;
});

export const verifyUserService = expressAsyncHandler(async (identifier) => {
  const checkUserVerifyQuery = 'CALL sp_findUserByVerificationToken(?)';
  const verificateUserQuery = 'CALL sp_verificateUser(?)';

  const checkUSerVerify = async () => {
    const [[data] = rows, _] = await connection.execute(checkUserVerifyQuery, [
      identifier,
    ]);

    return data[0];
  };

  const verificateUser = async () => {
    const [rows, _] = await connection.execute(verificateUserQuery, [
      identifier,
    ]);
  };

  const isUserNotVerify = await checkUSerVerify();

  if (!isUserNotVerify) throw new HttpError(404, 'Page not found');

  verificateUser();
});

export const resendEmailService = expressAsyncHandler(async (email) => {
  const { verificationToken } = await findUserByEmailService(email);

  if (!verificationToken)
    throw new HttpError(400, 'Your email already verificated');

  nodemailerService(email, verificationToken);
});

// !! RESEND VERIFICATION EMAIL LOGIC
