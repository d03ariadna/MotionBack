const { Sequelize, DataTypes } = require("sequelize");
const data = require("../config/data");

const sequelize = new Sequelize(data);

const TaskORM = sequelize.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    notnull: true,
  },
  name: {
    type: DataTypes.TEXT,
    notnull: true,
  },
  description: {
    type: DataTypes.TEXT,
    notnull: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    notnull: true,
  },
  status: {
    type: DataTypes.TEXT,
    notnull: true,
  },
});

module.exports = TaskORM;
