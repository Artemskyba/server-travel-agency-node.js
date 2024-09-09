import express from 'express';
import { signUpUser } from '../controllers/userControllers.js';

export const userRouter = express.Router();

userRouter.post('/signUp', signUpUser);
