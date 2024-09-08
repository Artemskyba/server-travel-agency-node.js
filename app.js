import { connectDB } from './config/connectDB.js';
import express, { urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'colors';

const app = express();

export const connection = await connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(urlencoded({ extended: false }));

app.use((_, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message: message });
});

app.listen(3000, () => {
  console.log('Server is running. Use our API on port: 3000'.bgBlack.bold);
});
