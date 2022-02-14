const Sequelize = require("sequelize");
const db = require("../config/database");

const ClassesTypes = db.define(
  "class_types",
  {
    type_id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    type_title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = ClassesTypes;
