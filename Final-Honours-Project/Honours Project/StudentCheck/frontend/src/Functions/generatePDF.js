/**
 * contains the functions needed to generate PDFs for both the class profiles and 
 * the super profiles.
 * PDFs are generated on the client side.
 */

import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export function superGeneratePDF(profile) {
  alert("");

  var doc = new jsPDF("p", "pt");

  function getClasses(cw) {
    var temp = [];
    cw.forEach((current) => {
      temp.push([
        current.title,
        current.weight + "%",
        current.coursework_grades[0].grade == null
          ? "Not marked"
          : current.coursework_grades[0].grade + "%",
      ]);
    });
    return temp;
  }

  doc.autoTable({
    margin: { bottom: 10 },
    head: [["Report for " + profile.forename + " " + profile.surname, "Issued on: " + moment().format('MMMM Do YYYY')]],
    columnStyles: { 0: 150, 1: 30 },
    body: [
      ["Name:", profile.forename + " " + profile.surname],
      ["E-mail:", profile.email],
      ["Course:", profile.course.course_title],
      ["Academic Year:", profile.year],
      [
        "Department:",
        profile.course ? profile.course.department.dept_title : "-",
      ],
      [
        "Advisor: ",
        profile.staff
          ? profile.staff.forename + " " + profile.staff.surname
          : "-",
      ],
    ],
  });

  profile.classes.forEach((element) => {
    doc.autoTable({
      margin: { bottom: 10 },
      columnStyles: { 0: 150, 1: 30 },
      head: [
        ["Report for " + element.class_code + " - " + element.class_title, ""],
      ],
      body: [
        [
          "Weighted Grade: ",
          element.weighted_grades.length > 0
            ? Math.round(element.weighted_grades[0].coursework_average) + "%"
            : "No data",
        ],
        [
          "Attendance:",
          element.attendance_stats.length > 0
            ? Math.round(element.attendance_stats[0].attendance_stat) + "%"
            : "No data",
        ],
      ],
    });
  });

  profile.classes.forEach((element) => {
    if (element.courseworks.length > 0) {
      doc.autoTable({
        margin: { bottom: 10 },
        head: [
          [
            "Coursework for " +
              element.class_code +
              " - " +
              element.class_title,
            "Weight",
            "Grade",
          ],
        ],
        body: getClasses(element.courseworks),
      });
    }
  });

  doc.save("profile.pdf");
}

export function classPDFGenerator(profile, class_code) {
  const data = profile.details.data;

  function getName() {
    return data.forename + " " + data.surname;
  }

  function getEmail() {
    return data.email;
  }

  function getCourse() {
    if (data.course !== null) {
      return data.course.course_title;
    } else {
      return "-";
    }
  }

  function getDepartment() {
    if (data.course !== null) {
      return data.course.department.dept_title;
    } else {
      return "-";
    }
  }

  function getAcademicYear() {
    return data.year;
  }

  function getAdvisor() {
    if (data.staff !== null) {
      return data.staff.forename + " " + data.staff.surname;
    } else {
      return "-";
    }
  }

  function getClasses() {
    var temp = [];
    for (var i = 0; i < data.classes.length; i++) {
      temp.push([data.classes[i].class_code, data.classes[i].class_title]);
    }
    return temp;
  }

  function getCourseworkGrades() {
    var temp = [];
    for (var i = 0; i < data.coursework_grades.length; i++) {
      var current = data.coursework_grades[i];
      if (current.grade !== null) {
        temp.push([
          current.coursework.title,
          current.coursework.weight + "%",
          current.grade + "%",
          current.feedback,
        ]);
      } else {
        temp.push([
          current.coursework.title,
          current.coursework.weight + "%",
          "-",
          "-",
        ]);
      }
    }
    return temp;
  }

  function getAbsences() {
    var temp = [];
    for (var i = 0; i < data.attendances.length; i++) {
      var current = data.attendances[i];
      if (current.attended === 0) {
        temp.push([
          "Lecture",
          moment(current.lecture_session.class_date).format("MMMM do YYYY"),
        ]);
      }
    }
    return temp;
  }

  var doc = new jsPDF("p", "pt");

  doc.autoTable({
    margin: { bottom: 10 },
    head: [["Report for " + class_code.toUpperCase(), "Issued on: " + moment().format('MMMM Do YYYY')]],
    body: [
      ["Name:", getName()],
      ["E-mail:", getEmail()],
      ["Course:", getCourse()],
      ["Academic Year:", getAcademicYear()],
      ["Department:", getDepartment()],
      ["Advisor: ", getAdvisor()],
    ],
  });

  doc.autoTable({
    margin: { bottom: 10 },
    head: [["Enrolments", ""]],
    body: getClasses(),
  });

  doc.autoTable({
    margin: { bottom: 10 },
    head: [["Statistics", ""]],
    body: [
      ["Attendance", data.attendance_stats.length > 0 ? Math.round(data.attendance_stats[0].attendance_stat) + "%" : "No data"],
      [
        "Weighted Average Grade",
        data.weighted_grades.length > 0 ? Math.round(data.weighted_grades[0].coursework_average) + "%" : "No data"
      ],
    ],
  });

  if (data.coursework_grades.length > 0) {
    doc.autoTable({
      margin: { bottom: 10 },
      head: [["Coursework", "Weight", "Grade", "Feedback"]],
      body: getCourseworkGrades(),
    });
  }

  if (getAbsences().length > 0) {
    doc.autoTable({
      margin: { bottom: 10 },
      head: [["Absence", ""]],
      body: getAbsences(),
    });
  }
  doc.save("profile.pdf");
}
