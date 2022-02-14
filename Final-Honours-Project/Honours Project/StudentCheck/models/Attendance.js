const Sequelize = require("sequelize");
const db = require("../config/database");
const Students = require("./Students");
const LectureSessions = require("./LectureSession");
const SubClassSessions = require("./SubClassSessions");

const Attendance = db.define(
  "attendance",
  {
    student_id: {
      type: Sequelize.STRING,
      references: {
        model: Students,
        key: "matric",
      },
      unique: "unique_key",
      allowNull: false,
    },
    session_id: {
      type: Sequelize.INTEGER,
      references: {
        model: LectureSessions,
        key: "session_id",
      },
      unique: "unique_key",
    },
    attended: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

Students.hasMany(Attendance, { foreignKey: "student_id" });
Attendance.belongsTo(Students, { foreignKey: "student_id" });

LectureSessions.hasMany(Attendance, { foreignKey: "session_id" });
Attendance.belongsTo(LectureSessions, { foreignKey: "session_id" });

SubClassSessions.hasMany(Attendance, { foreignKey: "session_id" });
Attendance.belongsTo(SubClassSessions, { foreignKey: "session_id" });

module.exports = Attendance;
