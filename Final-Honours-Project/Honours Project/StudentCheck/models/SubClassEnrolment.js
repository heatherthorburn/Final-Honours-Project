const Sequelize = require('sequelize');
const db = require('../config/database');
const Enrolment = require('./Enrolment');
const SubClassGroups = require('./SubClassGroups');
const Students = require('./Students');

const SubClassEnrolment = db.define('subclass_enrolment', {
    enrolment_id: {
        type: Sequelize.INTEGER, 
    },
    subclass_group_id: {
        type: Sequelize.STRING,
    }},
    {
        timestamps: false,
        freezeTableName: true,
    });

SubClassGroups.belongsToMany(Enrolment, { foreignKey : 'subclass_group_id', through: SubClassEnrolment});
Enrolment.belongsToMany(SubClassGroups, { foreignKey : 'enrolment_id', through: SubClassEnrolment});

SubClassEnrolment.belongsTo(SubClassGroups, {foreignKey : 'subclass_group_id'});
SubClassEnrolment.belongsTo(Enrolment, {foreignKey : 'enrolment_id'});
SubClassGroups.hasMany(SubClassEnrolment, {foreignKey : 'subclass_group_id'});
Enrolment.hasMany(SubClassEnrolment, {foreignKey : 'enrolment_id'});

module.exports = SubClassEnrolment;