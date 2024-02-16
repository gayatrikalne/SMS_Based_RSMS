const {INTEGER , STRING} = require("sequelize");
const { sequelize } = require("./database");

const Employee = sequelize.define("EmployeeDetails", {
    id:{
        type : INTEGER,
        primaryKey : true,
        autoIncrement: true,
    },
    EmpId : {
        type : STRING,
        unique: true,
        allowNull : false,
    },
    OrgId : {
        type : STRING,
        allowNull : false,
    },
    EmpName : {
        type : STRING,
        allowNull : false,
    },
    Password : {
        type : STRING,
        allowNull : false,
    },
    EmailId : {
        type : STRING,
        allowNull : false,
    },
    Contact : {
        type : STRING,
        allowNull : false,
    },
    Address : {
        type : STRING,
        allowNull : false,
    },
}, { timestamps : false , freezeTableName : false });

module.exports = {Employee}