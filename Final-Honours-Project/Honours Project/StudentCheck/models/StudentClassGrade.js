const Sequelize = require("sequelize");
const db = require("../config/database");
const Students = require("./Students");
const Classes = require("./Classes");

const StudentClassGrades = db.define(
  "weighted_grades",
  {
    matric: {
      type: Sequelize.STRING,
      primaryKey: true, 
      references: {
        model : Students,
        key: 'matric'
    },
    },
    class_code: {
      type: Sequelize.STRING,
      primaryKey : true,
      references: {
        model : Classes,
        key: 'class_code'
      }
    },
    coursework_average: {
        type: Sequelize.DOUBLE
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Students.hasMany(StudentClassGrades, {foreignKey: 'matric'});
StudentClassGrades.hasMany(Students, {foreignKey: 'matric'});

Classes.hasMany(StudentClassGrades, {foreignKey: 'class_code'});
StudentClassGrades.hasMany(Classes, {foreignKey: 'class_code'});

module.exports = StudentClassGrades;