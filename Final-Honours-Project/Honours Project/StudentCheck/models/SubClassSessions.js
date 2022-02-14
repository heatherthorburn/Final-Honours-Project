const Sequelize = require('sequelize');
const db = require('../config/database');
const Classes = require('./Classes');
const SubClassGroups = require('./SubClassGroups');

const SubClassSessions = db.define('subclass_sessions', {
    class_code: {
        type: Sequelize.STRING, 
        allowNull: false,
        references : {
            model : Classes,
            key : 'class_code'
        }
    },
    group_id: {
        type: Sequelize.INTEGER,
        references : {
            model : SubClassGroups,
            key : 'id'
        }
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

Classes.hasMany(SubClassSessions, {foreignKey: 'class_code'});
SubClassSessions.belongsTo(Classes, {foreignKey: 'class_code'});

SubClassGroups.hasMany(SubClassSessions, {foreignKey: 'id'});
SubClassSessions.belongsTo(SubClassGroups, {foreignKey: 'id'});

module.exports = SubClassSessions;