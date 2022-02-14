/**
 * These functions were not used in application used for testing.
 */

const express = require("express");
const attendanceRouter = express.Router();
const Attendance = require("../models/Enrolment");
const asyncHandler = require("express-async-handler");

attendanceRouter.get(
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

attendanceRouter.put(
  "/submitAttendance",
  asyncHandler(async (req, res) => {
    var attendedList = req.body.params.attendedList;
    Attendance.bulkCreate([]).then(console.log("HERE"));
  })
);

module.exports = attendanceRouter; 
