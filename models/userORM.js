const { Sequelize, DataTypes } = require("sequelize");
const data = require('../config/data');

const sequelize = new Sequelize(data);

const UserORM = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.TEXT,
  },
  password: {
    type: DataTypes.TEXT,
  },
  avatar: {
    type: DataTypes.TEXT,
  },
});

module.exports = UserORM;
