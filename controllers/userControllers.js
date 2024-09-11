import expressAsyncHandler from 'express-async-handler';
import {
  userSignUpService,
  verifyUserService,
} from '../services/userServices.js';

export const signUpUser = expressAsyncHandler(async (req, res) => {
  await userSignUpService(req.body);

  res.status(201).json({
    message: 'Verification link has been sent to your email',
  });
});

export const verifyUser = expressAsyncHandler(async (req, res) => {
  const { identifier } = req.params;
  await verifyUserService(identifier);

  res.status(200).json({
    message: 'Your email has been verificated',
  });
});
