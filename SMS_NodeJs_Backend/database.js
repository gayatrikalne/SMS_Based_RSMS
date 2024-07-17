const Sequelize = require("sequelize");
//database file
const sequelize = new Sequelize("SMSBasedRSMS" , "root" , "kalne" , {
    host : "127.0.0.1",
    port : 3306,
    dialect : "mysql",
});

module.exports = {sequelize};
