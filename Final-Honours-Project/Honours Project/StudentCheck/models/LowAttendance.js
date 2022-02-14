const Sequelize = require("sequelize");
const db = require("../config/database");
const Students = require("./Students");
const Classes = require("./Classes");

const LowAttendance = db.define(
  "low_attendance",
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

Classes.hasMany(LowAttendance, {foreignKey: 'class_code'});
LowAttendance.belongsTo(Classes, {foreignKey: 'class_code'});

Students.hasMany(LowAttendance, {foreignKey: 'matric'});
LowAttendance.belongsTo(Students, {foreignKey: 'matric'});

module.exports = LowAttendance;
