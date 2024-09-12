import expressAsyncHandler from 'express-async-handler';
import {
  resendEmailService,
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

export const resendEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  await resendEmailService(email);

  res.status(200).json({
    message: 'Verification link has been re-sent to your email address.',
  });
});
