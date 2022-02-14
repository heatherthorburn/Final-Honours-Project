const Sequelize = require("sequelize");
const db = require("../config/database");
const CircumstanceTypes = require("../models/CircumstanceTypes");
const Resources = require("../models/Resources");

const CircumstanceResources = db.define(
  "circumstances_resources",
  {
    circumstance_type_id: {
      type: Sequelize.INTEGER,
      references: {
        model: CircumstanceTypes,
        key: "circumstance_type_id",
      },
      allowNull: false,
    },
    resource_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Resources,
        key: "resource_id",
      },
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Resources.belongsToMany(CircumstanceTypes, {
  foreignKey: "resource_id",
  through: CircumstanceResources,
});
CircumstanceTypes.belongsToMany(Resources, {
  foreignKey: "circumstance_type_id",
  through: CircumstanceResources,
});

module.exports = CircumstanceResources;
