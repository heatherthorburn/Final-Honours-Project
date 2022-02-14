/**
 * This is the file that sets up the connection with the database and initialises the ORM.
 * The values here can be replaced with another database, and the database type.
 * The Sequelize docs can be consulted to get the dialect names for the different databases. You will also
 * need to consult the npm docs to install the dialect on the server-side, e.g. npm install my-sql
 */


const Sequelize = require('sequelize');

module.exports = new Sequelize('gtb17118', 'gtb17118', 'aiBaeC2Quei8', {
    host: 'devweb2020.cis.strath.ac.uk',
    dialect: 'mysql'
})