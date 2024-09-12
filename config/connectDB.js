import { Sequelize } from 'sequelize';
import 'dotenv/config';
import 'colors';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB is connected'.bgBlack.bold);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
