const { Sequelize, DataTypes } = require("sequelize");
const data = require("../config/data");

const sequelize = new Sequelize(data);

const UpORM = sequelize.define("user_projects", {
  idRel: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idUser: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  idPro: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  type: {
    type: DataTypes.INTEGER,
  },
});

module.exports = UpORM;
