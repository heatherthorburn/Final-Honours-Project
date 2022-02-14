const Sequelize = require("sequelize");
const db = require("../config/database");
const Students = require("./Students");
const Classes = require("./Classes");

const StudentClassAttendance = db.define(
  "attendance_stats",
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
    attendance_stat: {
        type: Sequelize.DOUBLE
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Students.hasMany(StudentClassAttendance, {foreignKey: 'matric'});
StudentClassAttendance.hasMany(Students, {foreignKey: 'matric'});

Classes.hasMany(StudentClassAttendance, {foreignKey: 'class_code'});
StudentClassAttendance.hasMany(Classes, {foreignKey: 'class_code'});

module.exports = StudentClassAttendance;