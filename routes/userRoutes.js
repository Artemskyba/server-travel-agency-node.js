import express from 'express';
import { signUpUser, verifyUser } from '../controllers/userControllers.js';

export const userRouter = express.Router();

userRouter.post('/signUp', signUpUser);

userRouter.get('/verify/:identifier', verifyUser);
