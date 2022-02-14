const Sequelize = require("sequelize");
const db = require("../config/database");

const CircumstanceTypes = db.define(
  "circumstances_types",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = CircumstanceTypes;
