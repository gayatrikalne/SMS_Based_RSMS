const express = require("express");
const cors = require("cors");
const router = require("./router");
const bodyParser = require("body-parser");
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require("./database"); // Import the sequelize instance

const server = express();

server.use(cors());

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Use the Sequelize store for sessions
const sequelizeStore = new SequelizeStore({ db: sequelize });

const sessionSecret = "your_static_secret_key_here";

server.use(session({
  secret: sessionSecret, // Set the secret key using the generated random string
  resave: false,
  saveUninitialized: false,
  store: sequelizeStore // Set the store option to use Sequelize session store
}));

//After setting up the session middleware, sync the session store with the database
sequelizeStore.sync();

server.use(router);

server.all("*",(req,res)=>{
    res.json("Invalid Path");
});

server.listen(5000,(error) => {
    if(error)
    console.log(error);
    else
    console.log("server is running");
});
