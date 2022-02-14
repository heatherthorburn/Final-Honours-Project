const Sequelize = require('sequelize');
const db = require('../config/database');
const Students = require('./Students')
const Classes = require('./Classes')

const Enrolment = db.define('enrolment', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey : true, 
        autoIncrement : true,
    },
    student_matric: {
        type: Sequelize.STRING, 
        references: {
            model : Students,
            key: 'matric'
        },
        allowNull: false
    },
    class_code: {
        type: Sequelize.STRING,
        references: {
            model: Classes,
            key: 'class_code'
        },
        allowNull: false
    }},
    {
        timestamps: false,
        freezeTableName: true
    });

Classes.belongsToMany(Students, { foreignKey: 'class_code', through: Enrolment});
Students.belongsToMany(Classes, { foreignKey: 'student_matric',through: Enrolment});

Enrolment.belongsTo(Students, { foreignKey: 'student_matric'})
Enrolment.belongsTo(Classes, { foreignKey: 'class_code'})

Classes.hasMany(Enrolment, { foreignKey: 'class_code'})
Students.hasMany(Enrolment, { foreignKey: 'student_matric'})

module.exports = Enrolment;