const Sequelize = require("sequelize");
const db = require("../config/database");
const Classes = require("./Classes");
const ClassesTypes = require("./ClassTypes");

const SubClassGroups = db.define(
  "subclass_groups",
  {
    class_code: {
      type: Sequelize.STRING,
      references: {
        model: Classes,
        key: "class_code",
      },
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    type_id: {
      type: Sequelize.STRING,
      references: {
        model: ClassesTypes,
        key: "type_id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Classes.hasMany(SubClassGroups, {foreignKey: 'class_code'});
SubClassGroups.belongsTo(Classes, {foreignKey: 'class_code'});

ClassesTypes.hasMany(SubClassGroups, {foreignKey: 'type_id'});
SubClassGroups.belongsTo(ClassesTypes, {foreignKey: 'type_id'});


module.exports = SubClassGroups;
