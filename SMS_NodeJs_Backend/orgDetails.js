const {INTEGER,STRING} = require("sequelize");
const { sequelize } = require("./database");

const Organization = sequelize.define("OrganizationDetails", {
    id:{
        type : INTEGER,
        primaryKey : true,
        autoIncrement: true,
    },
    OrgId : {
        type : STRING,
        unique: true,
        allowNull : false,
    },
    OrgName : {
        type : STRING,
        allowNull : false,
    },
    Address : {
        type : STRING,
        allowNull : false,
    },
    Contact : {
        type : STRING,
        allowNull : false,
    },
    Status : {
        type : STRING,
        allowNull : false,
    },
}, { timestamps : false , freezeTableName : false });

module.exports = {Organization}