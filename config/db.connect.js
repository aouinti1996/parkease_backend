const Sequelize = require('sequelize');
require('dotenv').config();

const user = process.env.USER || 'root'; // Fixed the syntax here
const sequelize = new Sequelize('parkease', user, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false,
   sync:true,
});

sequelize
    .query("CREATE DATABASE IF NOT EXISTS `parkease`;")
    .then(() => {
        console.log('Database created or already exists');
    })
    .catch((err) => {
        console.log('Unable to create the database:', err); // Fixed the logging statement here
        sequelize.close();
    });

module.exports = sequelize;
