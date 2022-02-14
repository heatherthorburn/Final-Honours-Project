const express = require("express");
const staffRouter = express.Router();
const Staff = require("../models/Staff");
const Classes = require("../models/Classes");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Student = require("../models/Students");
const DepartmentNotifications = require("../models/DepartmentNotifications");
const Department = require("../models/DepartmentHeads");
const LowAttendance = require("../models/LowAttendance");
const LowGrades = require("../models/LowGrades");
const SubClassGroups = require("../models/SubClassGroups");
const ClassesTypes = require("../models/ClassTypes");
const bcrypt = require("bcrypt");
const saltRounds = 10;


staffRouter.get(
  "/notifications",
  asyncHandler(async (req, res) => {
    var staff_id = req.query.staff_id;
    Staff.findOne({
      where: {
        staff_id: staff_id
      },
      include: [{
        model: Classes,
        include: [{
          model: LowAttendance,
          include: {
            model: Student,
          }
        },
        {
          model: LowGrades,
          include: {
            model: Student,
          }
        },
        ]
      }, {
        model: Department,
        include: {
          model: DepartmentNotifications,
          include: {
            model: Student
          }
        }
      },
      {
        model: Student,
        //where : { advisor : staff_id },
        include: {
          model: DepartmentNotifications,
          required: true,
          include: {
            model: Student
          }
        }
      }
      ],
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err))
  })
);

staffRouter.get(
  "/taughtClasses",
  asyncHandler(async (req, res) => {
    var staff_id = req.query.staff_id;
    Staff.findOne({
      include: [{ model: Classes }, { model: Department }, { model: Student }],
      //attributes: ['classes.class_code', 'classes.class_title'],
      where: {
        staff_id: staff_id,
      },
    }).then((result) => res.send(result));
  })
);



staffRouter.get(
  "/advisees",
  asyncHandler(async (req, res) => {
    var staff_id = req.query.staff_id;
    Student.findAll({
      include: [{ model: Staff }],
      where: {
        advisor: staff_id,
      },
    }).then((result) => res.send(result));
  })
);

staffRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    var staff_id = req.body.staff_id;
    var password = req.body.password;
    var hashed = bcrypt.hashSync(password, saltRounds)

    const user = await Staff.findOne({
      where: {
        staff_id: staff_id
      }
    })

    if (!user.password) {
      user.password = hashed;
      await user.save();
    }

  })
);

staffRouter.post(
  "/signin",
  asyncHandler(async (req, res) => {

    const user = await Staff.findOne({
      where: {
        staff_id: req.body.email,
      },
      include: [
        {
          model: Classes,
          required: false,
          through: { attributes: [] },
          attributes: ["class_code", "class_title"],
          order: ["class_code", 'DESC'],
          include: {
            required: false,
            model: SubClassGroups,
            attributes: ["type_id"],
            include: {
              required: false,
              model: ClassesTypes,
              attributes: ["type_title"],
            },
          },
        },
        {
          model: Department,
          required: false,
          through: { attributes: [] },
          attributes: ["dept_id", "dept_title"],
        },
      ],
    });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const data = {
          staff_id: user.staff_id,
          forename: user.forename,
          surname: user.surname,
          email: user.email,
          admin: user.admin,
          advisor: user.advisor,
          department_head: user.department_head,
          teacher: user.teacher,
          year_head: user.year_head,
          classes: user.classes,
          departments: user.departments,
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

module.exports = staffRouter;
