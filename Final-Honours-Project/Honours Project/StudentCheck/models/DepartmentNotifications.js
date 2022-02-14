const Sequelize = require("sequelize");
const db = require("../config/database");
const Students = require("./Students");
const Department = require("./Department");

const DepartmentNotifications = db.define(
  "department_notifications",
  {
    matric: {
      type: Sequelize.STRING,
      primaryKey: true, 
      references: {
        model : Students,
        key: 'matric'
    },
    },
    dept_id: {
      type: Sequelize.STRING,
      primaryKey : true,
      references: {
        model : Department,
        key: 'dept_id'
      }
    },
    cumulative_attendance: {
        type: Sequelize.DOUBLE
    },
    cumulative_grades: {
        type: Sequelize.DOUBLE
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Department.hasMany(DepartmentNotifications, {foreignKey: 'dept_id'});
DepartmentNotifications.belongsTo(Department, {foreignKey: 'dept_id'});

Students.hasMany(DepartmentNotifications, {foreignKey: 'matric'});
DepartmentNotifications.belongsTo(Students, {foreignKey: 'matric'});

module.exports = DepartmentNotifications;