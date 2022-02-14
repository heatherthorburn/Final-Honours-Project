const Sequelize = require('sequelize');
const db = require('../config/database');

const Department = db.define('department', {
    dept_id: {
        type: Sequelize.STRING, 
        primaryKey: true,
        allowNull: false
    },
    dept_title: {
        type: Sequelize.STRING,
        allowNull: false
    }},
    {
        timestamps: false,
        freezeTableName: true
    });

module.exports = Department;