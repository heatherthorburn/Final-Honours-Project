const express = require("express");
const studentsRouter = express.Router();
const db = require("../config/database");
const Students = require("../models/Students");
const asyncHandler = require("express-async-handler");
const Student = require("../models/Students");
const Staff = require("../models/Staff");
const Course = require("../models/Course");
const Department = require("../models/Department");
const Classes = require("../models/Classes");
const Attendance = require("../models/Attendance");
const LectureSessions = require("../models/LectureSession");
const Coursework = require("../models/Coursework");
const CourseworkGrades = require("../models/CourseworkGrades");
const CircumstanceTypes = require("../models/CircumstanceTypes");
const CircumstanceResources = require("../models/CircumstanceResources");
const Resources = require("../models/Resources");
const jwt = require("jsonwebtoken");
const StudentCircumstances = require("../models/StudentCircumstances");
const sequelize = require("sequelize");
const StudentClassAttendance = require("../models/StudentClassAttendance");
const StudentClassGrades = require("../models/StudentClassGrade");
var authorisationTools = require("../authorisation");
const DepartmentNotifications = require("../models/DepartmentNotifications");
const LowGrades = require("../models/LowGrades");
const LowAttendance = require("../models/LowAttendance");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// department students

studentsRouter.get(
  "/getDepartmentStudents", authorisationTools.authenticateToken, authorisationTools.authenticateDepartment,
  asyncHandler(async (req, res) => {
    const students = await Student.findAll({
      include: [
        {
          model: Course,
          where: {
            dept_id: req.query.dept_id,
          },
        },
        {
          model: DepartmentNotifications
        }
      ],
    });

    if (students) {
      res.send(students);
    } else {
      res.status(404);
    }
  }
  )
);
// Get list of Students

studentsRouter.post(
  "/signin",
  asyncHandler(async (req, res) => {
    const user = await Student.findOne({ include: { model: Staff }, where: { matric: req.body.id } });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const data = {
          matric: user.matric,
          forename: user.forename,
          surname: user.surname,
          advisor: user.staff.forename + " " + user.staff.surname,
          advisor_email: user.staff.email
        };
        const token = jwt.sign(data, (process.env.JWT_SECRET = "coffee"), {
          expiresIn: "1d",
        });
        res.send({ token: token, data: data });
      }
      else {
        res.status(401).send({ message: "Email or password is not recognised." });
      }
    } else {
      res.status(401).send({ message: "Email or password is not recognised." });
    }
  })
);

studentsRouter.get(
  "/getStudentGeneralInfo", authorisationTools.authenticateToken, authorisationTools.authenticateTeacher,
  asyncHandler(async (req, res) => {
    const class_code = req.query.class_code;
    const matric = req.query.matric;

    const student = await Student.findOne({
      where: {
        matric: matric,
      },

      include: [
        {
          model: Attendance,
          required: false,
          include: {
            model: LectureSessions,
            where: {
              class_code: class_code,
            },
          },
        },

        {
          model: CourseworkGrades,
          required: false,
          include: {
            model: Coursework,
            where: {
              class_code: class_code,
            },
          },
        },

        {
          model: StudentClassAttendance,
          required: false,
          where: {
            class_code: class_code,
          },
        },

        {
          model: StudentClassGrades,
          required: false,
          where: {
            class_code: class_code,
          },
        },

        {
          model: Classes,
        },

        {
          model: Staff,
        },

        {
          model: Course,
          include: {
            model: Department,
          },
        },

        {
          model: StudentCircumstances,
          include: {
            model: CircumstanceTypes,
            include: {
              model: Resources,
            },
          },
        },
      ],
      order: [[StudentCircumstances, "date", "ASC"]],
    });

    if (student) {
      res.send(student);
    } else {
      res.status(404);
    }
  })
);

studentsRouter.get(
  "/advisees",
  asyncHandler(async (req, res) => {
    const staff_id = req.query.staff_id;

    res.send(
      await Student.findAll({
        include: [{ model: Course }, { model: DepartmentNotifications }],
        where: {
          advisor: staff_id,
        },
      })
    );
  })
);

studentsRouter.get(
  "/detailedProfile", authorisationTools.authenticateToken,
  asyncHandler(async (req, res) => {
    const id = req.query.matric;

    const student = await Student.findOne({
      include: [
        {
          model: Classes,
          include: [
            {
              model: StudentClassGrades,
              required: false,
              where: {
                matric: id,
              },
            },
            {
              model: StudentClassAttendance,
              required: false,
              where: {
                matric: id,
              },
            },
            {
              model: LectureSessions,
              include: {
                model: Attendance,
                attributes: ["attended"],
                where: {
                  student_id: id,
                },
              },
            },
            {
              model: Coursework,
              include: [
                {
                  model: CourseworkGrades,
                  where: {
                    matric: id,
                  },
                },
              ],
            },
          ],
        },
        {
          model: Course,
          include: {
            model: Department,
          },
        },
        {
          model: Staff,
        },
        {
          model: StudentCircumstances,
          include: {
            model: CircumstanceTypes,
            include: {
              model: Resources,
            },
          },
        },
      ],
      where: {
        matric: id,
      },
    });

    if (student) {
      var auth = false;
      if (req.user.departments) {
        if (req.user.departments.some(item => item.dept_id.toLowerCase() == student.course.dept_id.toLowerCase())) {
          auth = true;
          res.send(student)
        }
      }
      else if (req.user.staff_id) {
        if (req.user.staff_id == student.advisor) {
          auth = true;
          res.send(student)
        }
      }
      else if (req.user.matric) {
        if (req.user.matric == student.matric) {
          auth = true;
          res.send(student)
        }
      }

      if (auth == false) {
        res.status(401).send({ message: "Not authorised to view this profile!" })
      }
    } else {
      res.status(404).send({ message: "Student not found." });
    }
  })
);

studentsRouter.get(
  "/getCircumstanceTypes",
  asyncHandler(async (req, res) => {
    const result = await CircumstanceTypes.findAll({
      include: {
        model: Resources,
      },
    });
    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ message: "Resources not found." });
    }
  })
);

studentsRouter.post(
  "/submitCircumstance",
  asyncHandler(async (req, res) => {
    const result = await StudentCircumstances.create({
      student_id: req.body.params.student_id,
      type: req.body.params.type,
      details: req.body.params.details,
      date: req.body.params.date,
    });

    if (result) {
      res.send(result);
    } else {
      res.status(401).send({ message: "Error" });
    }
  })
);

studentsRouter.get(
  "/getCircumstanceSubmissions",
  asyncHandler(async (req, res) => {
    const result = await StudentCircumstances.findAll({
      where: {
        student_id: req.query.student_id,
      },
      include: {
        model: CircumstanceTypes,
        include: {
          model: Resources,
          /*include: {
            model:
              CircumstanceResources,
          }, */
        },
      },
    });

    if (result) {
      res.send(result);
    } else {
      res.status(401).send({ message: "No results found" });
    }
  })
);

studentsRouter.get("/notifications",
  asyncHandler(async (req, res) => {
    const notifications = await Student.findOne({
      include: [{
        model: LowGrades,
        include: {
          model: Student
        }
      },
      {
        model:
          LowAttendance,
        include: {
          model: Student
        }
      }],
      where: {
        matric: req.query.student_id
      },
    })

    if (notifications) {
      res.send(notifications)
    } else {
      res.send("Student not found")
    }
  })
);

studentsRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    var student_id = req.body.student_id;
    var password = req.body.password;
    var hashed = bcrypt.hashSync(password, saltRounds)

    const user = await Student.findOne({
      where: {
        matric: student_id
      }
    })

    if (!user.password) {
      user.password = hashed;
      await user.save();
    }
  })
);

module.exports = studentsRouter;
