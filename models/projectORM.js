const { Sequelize, DataTypes } = require("sequelize");
const data = require("../config/data");

const sequelize = new Sequelize(data);

const ProjectORM = sequelize.define("projects", {
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
  startDate: {
    type: DataTypes.DATEONLY,
  },
  endDate: {
    type: DataTypes.DATEONLY,
  },
});

module.exports = ProjectORM;
