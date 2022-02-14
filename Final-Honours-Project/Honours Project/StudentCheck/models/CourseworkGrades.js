const Sequelize = require('sequelize');
const db = require('../config/database');
const Coursework = require('./Coursework');
const Student = require('./Students');

const CourseworkGrades = db.define('coursework_grades', {
    matric: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: "unique_coursework",
    },
    coursework_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: "unique_coursework",
    },
    grade: {
        type: Sequelize.INTEGER,
        allowNull : true
    },
    feedback: {
        type: Sequelize.TEXT,
        allowNull : true
    }},
    {
        timestamps: false,
        freezeTableName: true
    })

Coursework.CourseworkGrades = Coursework.hasMany(CourseworkGrades, {foreignKey: 'coursework_id'});
CourseworkGrades.Coursework = CourseworkGrades.belongsTo(Coursework, {foreignKey: 'coursework_id'});

Student.CourseworkGrades = Student.hasMany(CourseworkGrades, {foreignKey: 'matric'});
CourseworkGrades.Student = CourseworkGrades.belongsTo(Student, {foreignKey: 'matric'});

module.exports = CourseworkGrades;
