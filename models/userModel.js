import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/connectDB.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('root', 'admin', 'user'),
      allowNull: false,
      defaultValue: 'user',
    },
    verificationToken: {
      type: DataTypes.STRING(36),
      allowNull: true,
    },
    pass: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    tableName: 'users',
  },
);

export default User;
