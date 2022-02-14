const Sequelize = require("sequelize");
const db = require("../config/database");
const Department = require("./Department");

const Course = db.define(
  "course",
  {
    course_id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    course_title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dept_id: {
      type: Sequelize.STRING,
      references: {
        model: Department,
        key: "dept_id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Department.hasMany(Course, { foreignKey: "dept_id" });
Course.belongsTo(Department, { foreignKey: "dept_id" });

module.exports = Course;
