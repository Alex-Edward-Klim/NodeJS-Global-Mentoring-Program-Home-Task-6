import 'dotenv/config';
import { Sequelize } from 'sequelize';

const URL = process.env.CONNECTION_STRING;
if (!URL) {
  throw new Error('No connection string from .env');
}
const dataBase = new Sequelize(URL, { logging: false });

export default dataBase;
