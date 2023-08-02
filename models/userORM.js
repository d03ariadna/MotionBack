const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  host: "b6u2n4lxomwtivnohur7-mysql.services.clever-cloud.com",
  username: "u2vmfqukfp1vbi5j",
  password: "hCuIIlkokzvsHpMSQ8pJ",
  database: "b6u2n4lxomwtivnohur7",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

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
