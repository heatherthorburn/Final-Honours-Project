const Sequelize = require('sequelize');
const db = require('../config/database');
const Classes = require('./Classes')

const LectureSessions = db.define('lecture_sessions', {
    class_code: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    class_date: {
        type: Sequelize.DATE, 
        allowNull: false
    },
    class_time: {
        type: Sequelize.TIME,
        allowNull: false
    }},
    {
        timestamps: false,
        freezeTableName: true
    });

Classes.hasMany(LectureSessions, {foreignKey: 'class_code'});
LectureSessions.belongsTo(Classes, {foreignKey: 'class_code'});

module.exports = LectureSessions;