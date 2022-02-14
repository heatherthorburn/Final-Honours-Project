const Sequelize = require('sequelize');
const Department = require('./Department');
const Staff = require('./Staff')
const db = require('../config/database');

const DepartmentHeads = db.define('department_head', {
    staff_id: {
        type: Sequelize.STRING, 
        references: {
            model : Staff,
            key: 'staff_id'
        },
        allowNull: false
    },
    dept_id: {
        type: Sequelize.STRING,
        references: {
            model: Department,
            key: 'dept_id'
        },
        allowNull: false
    }},
    {
        timestamps: false,
        freezeTableName: true
    });

Department.belongsToMany(Staff, { foreignKey: 'dept_id', through: DepartmentHeads});
Staff.belongsToMany(Department, { foreignKey: 'staff_id',through: DepartmentHeads});

module.exports = Department;