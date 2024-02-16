const {INTEGER , STRING} = require("sequelize");
const { sequelize } = require("./database");

const ServerInfo = sequelize.define("ServerDetails", {
    id : {
        type : INTEGER,
        primaryKey : true,
        autoIncrement: true,
    },
    ServerId : {
        type : STRING,
        allowNull : false,
    },
    EmpId : {
        type : STRING,
        allowNull : false,
    },
    OrgId : {
        type : STRING,
        allowNull : false,
    },
    ServerName : {
        type : STRING,
        allowNull : false,
    },
    IPAddress : {
        type : STRING,
        allowNull : false,
    },
    Status: {
        type : STRING,
        allowNull : false,
    },
    Reason: {
        type : STRING,
        allowNull : false,
    },
}, { timestamps : false , freezeTableName : false });

module.exports = {ServerInfo}