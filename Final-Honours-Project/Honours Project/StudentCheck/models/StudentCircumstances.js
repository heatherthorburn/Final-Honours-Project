const Sequelize = require("sequelize");
const db = require("../config/database");
const Student = require("../models/Students");
const CircumstanceTypes = require("../models/CircumstanceTypes");

const StudentCircumstances = db.define(
  "extenuating_circumstances",
  {
    student_id: {
      type: Sequelize.STRING,
      references: {
        model: Student,
        key: "matric",
      },
      allowNull: false,
    },
    type: {
      type: Sequelize.INTEGER,
      references: {
        model: CircumstanceTypes,
        key: "id",
      },
    },
    date: {
      type: Sequelize.DATE,
    },
    details: {
      type: Sequelize.TEXT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

CircumstanceTypes.hasMany(StudentCircumstances, { foreignKey: "type" });
StudentCircumstances.belongsTo(CircumstanceTypes, { foreignKey: "type" });

Student.hasMany(StudentCircumstances, { foreignKey: "student_id" });
StudentCircumstances.belongsTo(Student, { foreignKey: "student_id" });

module.exports = StudentCircumstances;
