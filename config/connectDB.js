import mysql from 'mysql2/promise';
import 'dotenv/config';
import 'colors';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

export const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
});

export let connection = null;

export const connectDB = async () => {
  try {
    if (!connection) {
      connection = await pool.getConnection();
    }
    console.log('DB is connected'.green.bold);
    return connection;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
