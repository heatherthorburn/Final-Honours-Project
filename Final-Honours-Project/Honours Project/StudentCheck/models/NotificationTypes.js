const Sequelize = require('sequelize');
const db = require('../config/database');

const NotificationTypes = db.define('notification_types', {
    name: {
        type: Sequelize.TEXT,
        defaultValue : false 
    }},
    {
        timestamps: false,
        freezeTableName: true
    });

module.exports = NotificationTypes;