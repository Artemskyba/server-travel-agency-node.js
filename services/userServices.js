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

  // nodemailerService(email);

  signUpUser();
});

const hashPassword = async (data) => {
  const salt = await bcrypt.genSalt(+SALT_NUMBER);
  const hash = bcrypt.hash(data, salt);
  return hash;
};

const checkUserExistsService = expressAsyncHandler(async (email) => {
  const checkUserQuery = `CALL sp_findUserByEmail(?)`;

  const checkExistsUSer = async () => {
    const [[data] = rows, _] = await connection.execute(checkUserQuery, [
      email,
    ]);
    return data[0];
  };

  const ifUserExists = await checkExistsUSer();
  if (ifUserExists)
    throw new HttpError(
      400,
      `User with email ${email} already exists. Please use any email.`,
    );
});
