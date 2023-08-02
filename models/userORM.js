const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    host: "localhost",
    username: "root",
    password: "1234",
    database: "motion",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

const UserORM = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT
    },
    email: {
        type: DataTypes.TEXT
    },
    password: {
        type: DataTypes.TEXT
    },
    avatar: {
        type: DataTypes.TEXT
    }
});

module.exports = UserORM;