import expressAsyncHandler from 'express-async-handler';
import { userSignUpService } from '../services/userServices.js';

export const signUpUser = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  await userSignUpService(req.body);

  res.status(200).json({
    message: 'Verification link has been sent to your email',
  });
});
