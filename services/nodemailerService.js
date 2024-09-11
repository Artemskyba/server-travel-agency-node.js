import nodemailer from 'nodemailer';
import { HttpError } from '../helpers/HttpError.js';
import { verificationEmailConfigSchema } from '../schemas/mailShemas.js';

const {
  MAIL_SERVICE_HOST,
  MAIL_SERVICE_PORT,
  MAIL_SERVICE_USER,
  MAIL_SERVICE_PASS,
} = process.env;

export const nodemailerService = async (email, idenifier) => {
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

    await transporter.sendMail(
      verificationEmailConfigSchema(MAIL_SERVICE_USER, email, idenifier),
    );
  } catch (err) {
    throw new HttpError(500, err);
  }
};
