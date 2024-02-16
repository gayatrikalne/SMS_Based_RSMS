const {INTEGER , STRING} = require("sequelize");
const { sequelize } = require("./database");

const Notification = sequelize.define("NotificationDetails", {
    NotificationId : {
        type : STRING,
        primaryKey : true,
        autoIncrement: true,
    },
    id : {
        type : INTEGER,
        allowNull : false,
    },
    Date: {
        type : STRING,
        allowNull : false,
    },

}, { timestamps : false , freezeTableName : false });

module.exports = {Notification}