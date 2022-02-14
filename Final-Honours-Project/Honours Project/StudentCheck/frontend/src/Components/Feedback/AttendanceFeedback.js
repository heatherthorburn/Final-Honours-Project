/**
 * Responsible for personalised feedback regarding attendance.
 * Cut offs are 80% for excellent, 70% for good, 50% for warning and anything below is concerning/
 * If the attendance is 100% there's no need for feedback as the feedback box won't be displayed.
 */

import React from "react";
import Alert from "react-bootstrap/Alert";

export default function AttendanceFeedback(props) {
  return (
    <>
      {props.stat === 100 ? null : props.stat >= 80 ? (
        <Alert style={{marginLeft: "1rem", marginRight: "1rem", textAlign: "center"}} variant="success">
          Attendance is very good, however the recorded absences can be seen
          below.
        </Alert>
      ) : props.stat >= 70 ? (
        <Alert style={{marginLeft: "1rem", textAlign: "center", marginRight: "1rem"}} variant="success">
          Attendance is fairly good, with attendance at most classes. Absenses
          are detailed below.
        </Alert>
      ) : props.stat >= 50 ? (
        <Alert style={{marginLeft: "1rem", marginRight: "1rem", textAlign: "center"}} variant="warning">
          Student attends most classes, however there may be room for
          improvement.
        </Alert>
      ) : (
        <Alert style={{marginLeft: "1rem", marginRight: "1rem", textAlign: "center"}} variant="dark">
          Attendance in recorded classes is poor. Absences can be seen below.
        </Alert>
      )}
    </>
  );
}
