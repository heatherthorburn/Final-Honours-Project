const Sequelize = require('sequelize');
const db = require('../config/database');
const Staff = require('./Staff');
const Course = require('./Course')

const Student = db.define('students', { 
    matric: {
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true, 
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    forename: {
        type: Sequelize.STRING
    },
    surname: {
        type: Sequelize.STRING
    },
    advisor: {
        type: Sequelize.STRING
    },
    year: {
        type: Sequelize.INTEGER
    },
    course_id: {
        type: Sequelize.STRING,
        references: {
            model : Course,
            key: 'course_id'
        },
    },
    password : {
        type: Sequelize.STRING
    }
    },
    {
        timestamps: false
    }
    
    );

Staff.hasMany(Student, {foreignKey: 'advisor'});
Student.belongsTo(Staff, {foreignKey: 'advisor'});

Course.hasMany(Student, {foreignKey: 'course_id'});
Student.belongsTo(Course, {foreignKey: 'course_id'});

module.exports = Student;