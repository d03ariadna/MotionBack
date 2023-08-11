const { Sequelize, DataTypes } = require("sequelize");
const data = require("../config/data");

const sequelize = new Sequelize(data);

const TaskORM = sequelize.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
  status: {
    type: DataTypes.TEXT,
  },
  idOwner: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
});

module.exports = TaskORM;
