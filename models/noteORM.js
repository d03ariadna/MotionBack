const { Sequelize, DataTypes } = require("sequelize");
const data = require("../config/data");

const sequelize = new Sequelize(data);

const NoteORM = sequelize.define("notes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
  },
  idProject: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
});

module.exports = NoteORM;
