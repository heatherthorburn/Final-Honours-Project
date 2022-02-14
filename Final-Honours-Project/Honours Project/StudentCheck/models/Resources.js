const Sequelize = require('sequelize');
const db = require('../config/database');

const Resources = db.define('student_resources', {
    resource_id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncremement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: Sequelize.TEXT
    }
    },
    {
        timestamps: false,
        freezeTableName: true
    });

module.exports = Resources;