const {STRING} = require("sequelize");
const { sequelize } = require("./database");

const Admin = sequelize.define("AdminDetails", {
    AdminId : {
        type : STRING,
        primaryKey : true,
        autoIncrement: true,
    },
    AdminName : {
        type : STRING,
        allowNull : false,
    },
    Password : {
        type: STRING(255),
        allowNull : false,
    },
    EmailID : {
        type : STRING,
        allowNull : false,
    },
    Contact : {
        type : STRING,
        allowNull : false,
    },
}, { timestamps : false , freezeTableName : false });

module.exports = {Admin};