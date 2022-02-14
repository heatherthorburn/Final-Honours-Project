const express = require("express");
const enrolmentRouter = express.Router();
const db = require("../config/database");
const Enrolment = require("../models/Enrolment");
const Classes = require("../models/Classes");
const Students = require("../models/Students");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Attendance = require("../models/Attendance");
const CourseworkGrades = require("../models/CourseworkGrades");
const LectureSessions = require("../models/LectureSession");
const Coursework = require("../models/Coursework");
const LowAttendance = require("../models/LowAttendance");
const StudentClassGrades = require("../models/StudentClassGrade");
const StudentClassAttendance = require("../models/StudentClassAttendance");
var authorisationTools = require("../authorisation");

enrolmentRouter.get(
  "/classRegister", authorisationTools.authenticateToken, authorisationTools.authenticateTeacher,
  asyncHandler(async (req, res) => {
    var class_code = req.query.class_code;
     const register = await Classes.findOne({
      include: [
        {
          model: Students,
          attributes: ["forename", "surname", "matric", "email"],
          include: [
            {
              model: Attendance,
              attributes: ["attended"],
              include: [
                {
                  model: LectureSessions,
                  atrributes: [],
                  where: {
                    class_code: class_code,
                  },
                },
              ],
            },
            {
              model: StudentClassGrades,
              required: false,
              where : {
                class_code : class_code
              } 
            },
            {
              model: StudentClassAttendance,
              required: false,
              where : {
                class_code : class_code
              } 
            },
            {
              model: CourseworkGrades,
              attributes: ["grade"],
              include: [
                {
                  model: Coursework,
                  attributes: ["weight"],
                  where: {
                    class_code: class_code,
                  },
                },
              ],
            },
          ],
        },
      ],
      where: {
        class_code: class_code,
      },
    });

    if (register) {
      res.send(register);
    } else {
      res.status(404);
    }
  }
  )
);

module.exports = enrolmentRouter;
