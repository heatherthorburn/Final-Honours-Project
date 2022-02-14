const Sequelize = require("sequelize");
const db = require("../config/database");
const Students = require("./Students");
const Classes = require("./Classes");

const LowGrades = db.define(
  "low_grades",
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

Classes.hasMany(LowGrades, {foreignKey: 'class_code'});
LowGrades.belongsTo(Classes, {foreignKey: 'class_code'});

Students.hasMany(LowGrades, {foreignKey: 'matric'});
LowGrades.belongsTo(Students, {foreignKey: 'matric'});

module.exports = LowGrades;