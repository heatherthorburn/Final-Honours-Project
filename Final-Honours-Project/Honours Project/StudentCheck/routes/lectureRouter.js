const express = require("express");
const lectureRouter = express.Router();
const db = require("../config/database");
const asyncHandler = require("express-async-handler");
const LectureSessions = require("../models/LectureSession");
const Attendance = require("../models/Attendance");
const Student = require("../models/Students");
const Classes = require("../models/Classes");
const ClassTeachers = require("../models/ClassTeachers");
const { raw } = require("body-parser");
const sequelize = require("sequelize");
const SubClassGroups = require("../models/SubClassGroups");
const Enrolment = require("../models/Enrolment");
const SubClassEnrolment = require("../models/SubClassEnrolment")
const SubClassSessions = require("../models/SubClassSessions");
const ClassTypes = require("../models/ClassTypes")

lectureRouter.post(
  "/addStudentsLecture",
  asyncHandler(async (req, res) => {
    const students = req.body.students;
    Attendance.bulkCreate(students).then((result) => res.send(result)).catch((error) => res.send(req.body))
  }))




lectureRouter.post(
  "/studentQRAttendance",
  asyncHandler(async (req, res) => {
    var session_id = req.body.params.session_id;
    var matric = req.body.params.matric;
    const record = await Attendance.findOne({
      where: {
        student_id: matric,
        session_id: session_id,
      }
    })
    if (!record) {
      Attendance.create({
        student_id: matric,
        session_id: session_id,
        attended: 1,
      })
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          res.status(401).send({ message: "Student ID or Lecture ID not recognised."});
        });
    } else {
      record.attended = "1"
      await record.save();
      res.send(record);
    }

  })
);


lectureRouter.post(
  "/addSubClass",
  asyncHandler(async (req, res) => {
    var class_code = req.body.params.class_code;
    var date = req.body.params.date;
    var time = req.body.params.time;
    var group_id = req.body.params.group_id;
    SubClassSessions.create({
      class_code: class_code,
      class_date: date,
      class_time: time,
      group_id: group_id,
    })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.send(error);
      });
  })
);

lectureRouter.get(
  "/getSubClasses",
  asyncHandler(async (req, res) => {
    SubClassGroups.findAll({
      include: {
        model: ClassTypes
      },
      where: {
        class_code: req.query.class_code
      }
    }).then((result) => {
      res.send(result);
    });
  })
);

lectureRouter.get(
  "/getSubClassesRegister",
  asyncHandler(async (req, res) => {
    SubClassGroups.findOne({
      attributes: ["id"],
      include: {
        model: SubClassEnrolment,
        include: {
          model: Enrolment,
          include: {
            model: Student
          }
        },
      },
      where: {
        id: 1
      }
    }).then((result) => {
      res.send(result);
    });
  })
);



lectureRouter.get(
  "/getLectureSessions",
  asyncHandler(async (req, res) => {
    var class_code = req.query.class_code;
    LectureSessions.findAll({
      where: {
        class_code: class_code,
      },
    }).then((result) => {
      res.send(result);
    });
  })
);

lectureRouter.post(
  "/getLectureAttendance",
  asyncHandler(async (req, res) => {
    var session_id = req.body.params.session_id;
    Attendance.findAll({
      include: [{ model: Student }],
      where: {
        session_id: session_id,
      },
    })
      .then((result) => res.send(result))
      .catch((error) => console.log(error));
  })
);

lectureRouter.post(
  "/logAttendance",
  asyncHandler(async (req, res) => {
    var students = req.body.params.students;
    var class_code = req.body.params.class_code;

    const attendance = await Attendance.bulkCreate(students, {
      fields: ["student_id", "session_id", "attended"],
      updateOnDuplicate: ["attended"],
      raw: true,
    });

    if (attendance) {
      res.send(attendance);
    } else {
      res.status(404).send({ message: "Attendance not found" });
    }

    if (attendance) {
      for (const s of students) {
        var result = await Student.findAll({
          include: {
            model: Classes
          },
          where: {
            matric: s.student_id
          }
        })

        for (const r of result) {
          var query = await sequelize.query('SELECT SUM(attended) / COUNT(*) FROM attendance INNER JOIN lecture_sessions WHERE attendance.student_id = ' + s.student_id + " AND lecture_sessions.class_code = " + r.classes.class_code)
        }




      }
    }
  })
);

lectureRouter.post(
  "/logAttendanceEmail",
  asyncHandler(async (req, res) => {
    var attended = req.body.params.attended;
    var notAttended = req.body.params.notAttended;
    var session_id = req.body.params.session_id;

    if (attended.length > 0) {
      attended.forEach((element) => {
        Student.findAll({
          raw: true,
          attributes: ["matric"],
          where: {
            email: element,
          },
        }).then((result) => {
          if (typeof result !== undefined && result !== []) {
            Attendance.create({
              session_id: session_id,
              student_id: result[0].matric,
              attended: true,
            });
          }
        });
      });
    }

    if (notAttended.length > 0) {
      notAttended.forEach((element) => {
        Student.findAll({
          raw: true,
          attributes: ["matric"],
          where: {
            email: element,
          },
        }).then((result) => {
          if (typeof result !== undefined && result !== []) {
            Attendance.create({
              session_id: session_id,
              student_id: result[0].matric,
              attended: false,
            });
          }
        });
      });
    }
    res.send("success");
  })
);

lectureRouter.post(
  "/addLecture",
  asyncHandler(async (req, res) => {
    var class_code = req.body.params.class_code;
    var date = req.body.params.date;
    var time = req.body.params.time;
    LectureSessions.create({
      class_code: class_code,
      class_date: date,
      class_time: time,
    })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.send(error);
      });
  })
);

lectureRouter.get(
  "/",
  asyncHandler(async (req, res) =>
    LectureSession.findAll()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err))
  )
);

lectureRouter.get(
  "/getClassDates",
  asyncHandler(async (req, res) => {
    var class_code = req.query.class_code;
    LectureSession.findAll({
      attributes: ["class_date"],
      where: {
        class_code: class_code,
      },
    }).then((result) => {
      res.send(result);
    });
  })
);

lectureRouter.get(
  "/getClassTimes",
  asyncHandler(async (req, res) => {
    var class_code = req.query.class_code;
    var class_date = req.query.class_date;
    LectureSession.findAll({
      attributes: ["class_time"],
      where: {
        class_code: class_code,
        class_date: class_date,
      },
    }).then((result) => {
      res.send(result);
    });
  })
);

lectureRouter.get(
  "/getClassSessions",
  asyncHandler(async (req, res) => {
    var class_code = req.query.class_code;
    LectureSession.findAll({
      attributes: ["session_id", "class_time", "class_date"],
      where: {
        class_code: class_code,
      },
    }).then((result) => {
      res.send(result);
    });
  })
);

lectureRouter.get(
  "/getSessionID",
  asyncHandler(async (req, res) => {
    var class_code = req.query.class_code;
    var class_date = req.query.class_date;
    var class_time = req.query.class_time;
    LectureSession.findAll({
      attributes: [session_id],
      where: {
        class_code: class_code,
        class_date: class_date,
        class_time: class_time,
      },
    }).then((result) => {
      res.send(result);
    });
  })
);

module.exports = lectureRouter;
