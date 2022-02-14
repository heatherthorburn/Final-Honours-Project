const Sequelize = require("sequelize");
const db = require("../config/database");
const NotificationTypes = require("./NotificationTypes");
const Staff = require("./Staff");

const Notification = db.define(
  "lecture_sessions",
  {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_read: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    message: {
      type: Sequelize.TEXT,
    },
    type_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Staff.hasMany(Notification, { foreignKey: "user_id" });
Notification.belongsTo(Staff, { foreignKey: "user_id" });

Notification.belongsTo(NotificationTypes, { foreignKey: "type_id" });
NotificationTypes.hasMany(Notification, { foreignKey: "type_id" });

module.exports = Notification;
