import nodemailer from 'nodemailer';
import { HttpError } from '../helpers/HttpError.js';

const {
  MAIL_SERVICE_HOST,
  MAIL_SERVICE_PORT,
  MAIL_SERVICE_USER,
  MAIL_SERVICE_PASS,
} = process.env;

export const nodemailerService = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: MAIL_SERVICE_HOST,
      port: +MAIL_SERVICE_PORT,
      secure: true,
      auth: {
        user: MAIL_SERVICE_USER,
        pass: MAIL_SERVICE_PASS,
      },
    });

    const emailConfig = {
      from: MAIL_SERVICE_USER,
      to: email,
      subject: 'Nodemailer test',
      text: 'Test email',
    };

    await transporter.sendMail(emailConfig);
    console.log('Complited');
  } catch (err) {
    throw new HttpError(500, err);
  }
};
