/**
 * Responsible for personalised feedback regarding attendance.
 * Cut offs are 80% for excellent, 60% for good, 40% for warning and anything below is concerning/
 */


import React from "react";
import Alert from "react-bootstrap/Alert";

export default function AttendanceFeedback(props) {
  return (
    <>
      {props.stat > 80 ? (
        <Alert style={{ marginLeft: "1rem", marginRight: "1rem", textAlign: "center" }} variant="success">
          Weighted coursework grade across coursework completed so far is very good!
        </Alert>
      ) : props.stat > 60 ? (
        <Alert style={{ marginLeft: "1rem", marginRight: "1rem",  textAlign: "center" }} variant="success">
          Weighted average across coursework completed so far is generally good.
        </Alert>
      ) : props.stat > 40 ? (
        <Alert style={{ marginLeft: "1rem", marginRight: "1rem", textAlign: "center" }} variant="warning">
          Student's weighted grade across coursework completed so far is above pass level, however there is room
          for improvement.
        </Alert>
      ) : (
        <Alert style={{ marginLeft: "1rem", marginRight: "1rem",  textAlign: "center" }} variant="dark">
          Weighted coursework grade across coursework completed is generally poor. A breakdown of grades can be seen below.
        </Alert>
      )}
    </>
  );
}
