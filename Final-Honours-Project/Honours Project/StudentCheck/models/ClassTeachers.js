const Sequelize = require("sequelize");
const db = require("../config/database");
const Staff = require("../models/Staff");
const Classes = require("../models/Classes");

const ClassTeachers = db.define(
  "class_teachers",
  {
    staff_id: {
      type: Sequelize.STRING,
      references: {
        model: Staff,
        key: "staff_id",
      },
      allowNull: false,
    },
    class_code: {
      type: Sequelize.STRING,
      references: {
        model: Classes,
        key: "class_code",
      },
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Classes.belongsToMany(Staff, {
  foreignKey: "class_code",
  through: ClassTeachers,
});
Staff.belongsToMany(Classes, {
  foreignKey: "staff_id",
  through: ClassTeachers,
});

module.exports = ClassTeachers;
