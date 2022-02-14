const Sequelize = require("sequelize");
const db = require("../config/database");

const Classes = db.define(
  "classes",
  {
    class_code: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    class_title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    course: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = Classes;
