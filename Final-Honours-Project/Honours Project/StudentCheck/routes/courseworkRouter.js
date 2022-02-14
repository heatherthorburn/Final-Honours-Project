const express = require("express");
const courseworkRouter = express.Router();
const db = require("../config/database");
const Coursework = require("../models/Coursework");
const CourseworkGrades = require("../models/CourseworkGrades");
const Students = require("../models/Students");
const Classes = require("../models/Classes");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Sequelize = require("sequelize");
const Student = require("../models/Students");
var authorisationTools = require("../authorisation");


courseworkRouter.put(
  "/batchUploadCoursework",
  asyncHandler(async (req, res) => {
    const students = req.body.params.students;
    CourseworkGrades.bulkCreate(students, {
      fields: ["matric", "coursework_id", "grade", "feedback"],
      updateOnDuplicate: ["grade", "feedback"],
    })
      .then((result) => res.send(result))
      .catch((error) => res.status(400).send({ message: "Error uploading coursework marks to database." }));
  })
);

courseworkRouter.put(
  "/updateStudentCourseworkMarks",
  asyncHandler(async (req, res) => {
    const student_id = req.body.params.student_id;
    const coursework_id = req.body.params.coursework_id;
    const grade = req.body.params.grade;
    const feedback = req.body.params.feedback;

    CourseworkGrades.update(
      {
        grade: grade,
        feedback: feedback,
      },
      {
        returning: true,
        where: {
          coursework_id: coursework_id,
          matric: student_id,
        },
      }
    )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        res.status(400).send({ message: "Error uploading coursework mark to database." });
      });
  })
);

courseworkRouter.put(
  "/updateCoursework",
  asyncHandler(async (req, res) => {
    const id = req.body.params.id;
    const title = req.body.params.title;
    const description = req.body.params.description;
    const weight = req.body.params.weight;

    const cw = await Coursework.update(
      {
        title: title,
        coursework_description: description,
        weight: weight,
      },
      {
        returning: true,
        where: { id: id },
      }
    );

    if (cw) {
      res.send(cw);
    } else {
      res.status(400).send({ message: "Error updating coursework to database." });
    }
  })
);

courseworkRouter.get(
  "/getStudentCourseworkMarks", authorisationTools.authenticateToken, authorisationTools.authenticateTeacher,
  asyncHandler(async (req, res) => {
    var coursework_id = req.query.cw_id;
    var student_id = req.query.student_id;

    CourseworkGrades.findOne({
      where: {
        matric: student_id,
        coursework_id: coursework_id,
      },

      include: [
        {
          model: Coursework,
          attributes: ["title"],
        },
      ],
    })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => res.status(400).send({ message: "Error retreiving students coursework mark" }));
  })
);

courseworkRouter.delete(
  "/deleteCoursework",
  asyncHandler(async (req, res) => {
    const id = req.query.id;
    Coursework.destroy({
      where: {
        id: id,
      },
    }).then(
      function (rowDeleted) {
        if (rowDeleted === 1) {
          res.send({ message: "Coursework Deleted" });
        }
      },
      function (err) {
        res.status(400).send({ message: "Error deleting coursework" });
      }
    );
  })
);

courseworkRouter.get(
  "/getClassCoursework", authorisationTools.authenticateToken, authorisationTools.authenticateTeacher,
  asyncHandler(async (req, res) => {
    var class_code = req.query.class_code;
    /*const auth = await authorisationTools.authoriseTeacher(req.query.token, req.query.class_code)
    if (!auth) {
      res.status(401).send({message: "You are not authorised to manage this class' coursework!"})
    } else { */ 
    Coursework.findAll({
      where: {
        class_code: class_code,
      },
    })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => res.status(400).send({ message: "Error retrieiving coursework from database." }));
  })
);

courseworkRouter.get(
  "/getCourseworkMarks", authorisationTools.authenticateToken, authorisationTools.authenticateTeacher,
  asyncHandler(async (req, res) => {
    var id = req.query.id;
    //var class_code = req.query.class_code;

    Coursework.findOne({
      attributes: ["title"],
      include: [
        {
          model: CourseworkGrades,
          attributes: ["grade"],
          raw: true,
          include: [
            {
              model: Student,
              attributes: ["matric", "forename", "surname"],
            },
          ],
          where: {
            coursework_id: id,
          },
        },
      ],
    })
      .then((result) => {
        res.send(result);
      })
      .catch((error) => res.status(400).send({ message: "Error retrieving coursework marks from database." }));
  })
);

courseworkRouter.get(
  "/getCourseworkByID", authorisationTools.authenticateToken, authorisationTools.authenticateTeacher,
  asyncHandler(async (req, res) => {
    var id = req.query.id;
    const cw = await Coursework.findByPk(id);
    if (cw) {
      res.send(cw);
    } else {
      res.status(404).send({ message: "Coursework not found" });
    }
  })
);

courseworkRouter.post(
  "/addCoursework",
  asyncHandler(async (req, res) => {
    var class_code = req.body.params.class_code;
    var title = req.body.params.title;
    var coursework_description = req.body.params.description;
    var weight = req.body.params.weight;

    const students = await Students.findAll({
      include: [
        {
          model: Classes,
          where: { class_code: class_code },
          attributes: [],
          through: {
            attributes: [],
          },
        },
      ],
      raw: true,
      attributes: ["matric"],
    });

    const cw = await Coursework.create(
      {
        title: title,
        coursework_description: coursework_description,
        class_code: class_code,
        weight: weight,
        coursework_grades: students,
      },
      {
        include: [CourseworkGrades],
      }
    );

    if (cw) {
      res.send(cw);
    } else {
      res.status(400).send({ message: "Error adding coursework to database." });
    }
  })
);

module.exports = courseworkRouter;
