/**
 * Provides feedback in the class profile dependant on attendance statistics and grades.
 */

import React from "react";
import Card from "react-bootstrap/esm/Card";
import AttendanceFeedback from "../Feedback/AttendanceFeedback";
import moment from "moment";
import Table from "react-bootstrap/Table";
import CourseworkFeedback from "../Feedback/CourseworkFeedback";

export default function AttendanceInfo(props) {

  var attendanceStat = null;
  var weighted_grades = null;

  /* Despite attendance statistics/grades and enrolment having a 1:1 relationship it returns an array of length 1,
  so need to index at [0]*/

  if (props.data.attendance_stats.length > 0) {
     attendanceStat = Math.round(props.data.attendance_stats[0].attendance_stat);
  }
  if (props.data.weighted_grades.length > 0) {
    weighted_grades = Math.round(props.data.weighted_grades[0].coursework_average);
  }  

  return (
    <div className="attendance-container">
      <Card>
        <Card.Header>Attendance</Card.Header>
        <Card.Body >
          {attendanceStat == null ? <p style={{padding : "1rem", textAlign: "center"}}>There has not been any recorded classes yet.</p> :
          <>
          <div className="stat">{attendanceStat}%</div>
          <AttendanceFeedback stat={attendanceStat} />
          </>
          }
        </Card.Body>
      </Card>
      {/* No need to display this if there's no classes or absences*/}
      {attendanceStat === 100 || attendanceStat == null ? null : (
        <Card>
          <Card.Header>Absences</Card.Header>
          <Card.Body style = {{display: "flex", textAlign: "-webkit-center"}} className = "grid-gap attendance-card-body">
            <Table style = {{minWidth: "300px", width: "80%"}} bordered responsive>
              <thead></thead>
              <tbody>
                {props.data.attendances.map((current) =>
                  current.attended == 1 ? null : (
                    <tr key={current.id}>
                      <td className="table-title-cell">
                        {moment(current.lecture_session.class_date).format(
                          "MMMM Do YYYY"
                        )}
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
          {weighted_grades == null ? <p style={{padding : "1rem", textAlign: "center"}}>{props.data.forename} does not have any coursework marked yet.</p> : 
          <>
          <div className="stat">{weighted_grades}%</div>
          <CourseworkFeedback stat={weighted_grades} />
          </>
          }
        </Card.Body>
      </Card>

      {props.data.coursework_grades.length > 0 ?
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
              {props.data.coursework_grades.map((current) => (
                <tr key={current.coursework.id}>
                  <td>{current.coursework.title}</td>
                  <td>{current.coursework.weight}%</td>
                  <td>{!current.grade ? "-" : current.grade + "%"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      : null }
    </div>
  );
}
