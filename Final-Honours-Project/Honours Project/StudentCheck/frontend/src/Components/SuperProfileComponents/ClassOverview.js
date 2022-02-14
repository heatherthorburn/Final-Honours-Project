/**
 * Academic info for a class in super profile,
 * summarises student statistics for a class.
 */

import React from "react";
import Card from "react-bootstrap/esm/Card";
import Table from "react-bootstrap/Table";
import AttendanceFeedback from "../Feedback/AttendanceFeedback";
import CourseworkFeedback from "../Feedback/CourseworkFeedback";
import moment from "moment";

export default function ClassOverview(props) {

  var attendanceStat = null;
  var weighted_grades = null;

  if (props.data.attendance_stats.length > 0) {
    attendanceStat = Math.round(props.data.attendance_stats[0].attendance_stat);
  }
  if (props.data.weighted_grades.length > 0) {
    weighted_grades = Math.round(
      props.data.weighted_grades[0].coursework_average
    );
  }

  return (
    <div className="table-container-grid">
      <Card>
        <Card.Header>Attendance</Card.Header>
        <Card.Body>
          {attendanceStat == null ? (
            <p style={{ textAlign: "center", padding: "1rem" }}>
              No classes have been recorded!
            </p>
          ) : (
            <>
              <div className="stat">{attendanceStat}%</div>
              <AttendanceFeedback stat={attendanceStat} />
            </>
          )}
        </Card.Body>
      </Card>
      {attendanceStat === 100 || attendanceStat == null ? null : (
        <Card>
          <Card.Header>Absences</Card.Header>
          <Card.Body className ="grid-gap attendance-card-body">
            <Table bordered responsive>
              <thead></thead>
              <tbody>
                {props.data.lecture_sessions.map((current) =>
                  current.attendances[0].attended === 1 ? null : (
                    <tr key={current.id}>
                      <td className="table-title-cell">Lecture</td>
                      <td className="table-title-cell">
                        {moment(current.class_date).format("MMMM Do YYYY")}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
      <Card>
        <Card.Header>Average Coursework Grade</Card.Header>
        <Card.Body>
          {weighted_grades == null ? (
            <p style={{ padding: "1rem", textAlign: "center" }}>
              {props.student ? "You do" : props.forename + "does"} not have any coursework marked yet.
            </p>
          ) : (
            <>
              <div className="stat">{weighted_grades}%</div>
              <CourseworkFeedback stat={weighted_grades} />
            </>
          )}
        </Card.Body>
      </Card>
      {props.data.courseworks.length === 0 ? null : 
      <Card>
        <Card.Header>Coursework Breakdown</Card.Header>
        <Card.Body>
          <Table bordered responsive>
            <thead>
              <tr>
                <td className="table-title-cell">Title</td>
                <td className="table-title-cell">Weight</td>
                <td className="table-title-cell">Grade</td>
              </tr>
            </thead>
            <tbody>
              {props.data.courseworks.map((current) => (
                <tr key={current.id}>
                  <td>{current.title}</td>
                  <td>{current.weight}%</td>
                  <td>
                    {!current.coursework_grades[0].grade
                      ? "-"
                      : current.coursework_grades[0].grade + "%"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    }
    </div>
  );
}
