import expressAsyncHandler from 'express-async-handler';
import { connection } from '../app.js';
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import { nodemailerService } from './nodemailerService.js';
const { SALT_NUMBER } = process.env;

export const userSignUpService = expressAsyncHandler(async (registerData) => {
  const { name, surname, email, pass } = registerData;

  registerData.pass = await hashPassword(pass);
  registerData.verificationToken = v4();

  const signUpUserQuery = 'CALL sp_signUpUser(?, ?, ?, ?, ?)';

  const signUpUser = async () => {
    const [rows, _] = await connection.execute(
      signUpUserQuery,
      Object.values(registerData),
    );
    console.log(rows);
  };

  nodemailerService(email);

  signUpUser();
});

const hashPassword = async (data) => {
  const salt = await bcrypt.genSalt(+SALT_NUMBER);
  const hash = bcrypt.hash(data, salt);
  return hash;
};

// !! CHECK USER EXIST SERVICE
