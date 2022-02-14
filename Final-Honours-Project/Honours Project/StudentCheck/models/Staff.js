const Sequelize = require('sequelize');
const db = require('../config/database');

const Staff = db.define('staff', {
    staff_id: {
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true, 
        primaryKey: true
    },
    forename: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    email: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    password: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    admin: {
        type: Sequelize.BOOLEAN
    },
    advisor: {
        type: Sequelize.BOOLEAN
    },
    department_head: {
        type: Sequelize.BOOLEAN
    },
    teacher: {
        type: Sequelize.BOOLEAN
    },
    year_head: {
        type: Sequelize.BOOLEAN
    }},
    {
        timestamps: false,
        freezeTableName: true
    });

module.exports = Staff;