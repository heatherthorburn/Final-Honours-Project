/**
 * Used for testing, not used in application
 */

const express = require("express");
const classRouter = express.Router();
const db = require("../config/database");
const Classes = require("../models/Classes");
const Students = require("../models/Students");
const Enrolment = require("../models/Enrolment");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const LectureSession = require("../models/LectureSession");

classRouter.get(
  "/",
  asyncHandler(async (req, res) =>
    Classes.findAll()
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => console.log(err))
  )
);

module.exports = classRouter; 
