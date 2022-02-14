const Sequelize = require('sequelize');
const db = require('../config/database');
const Course = require('./Course');
const Classes = require('./Classes');


const Coursework = db.define('coursework', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    coursework_description: {
        type: Sequelize.TEXT
    },
    class_code: {
        type: Sequelize.STRING,
        references: {
            model : Classes,
            key: 'class_code'
        },
        allowNull: false
    },
    weight: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    },
    {
        timestamps: false,
        freezeTableName: true
    });

Classes.hasMany(Coursework, {foreignKey: 'class_code', onDelete : 'CASCADE'});
Coursework.belongsTo(Classes, {foreignKey: 'class_code'});

module.exports = Coursework;