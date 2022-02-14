const Sequelize = require('sequelize');
const Department = require('./Department');
const Staff = require('./Staff')
const db = require('../config/database');

const YearHeads = db.define('year_head', {
    staff_id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
            model : Staff,
            key: 'staff_id'
        },
    },
    dept_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model : Department,
            key: 'dept_id'
        },
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    }},
    {
        timestamps: false,
        freezeTableName: true
    });

module.exports = Department;