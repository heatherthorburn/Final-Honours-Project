/**
 * Card for displaying notification for a class.
 * Used for teachers and students. Displays the concerning statistics
 * within the card.
 */

import React from "react";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

export default function NotificationCard(props) {
  const data = props.data;
  var stat = 0;
  if (props.type == "attendance") {
    stat = data.attendance_stat
  } else if (props.type == "average grade") {
    stat = data.coursework_average
  }

  return (
    <div style = {{marginBottom: "1rem"}} className = "notification-holder">
      <p style = {{marginTop: "auto", marginBottom: "auto"}}> {props.student ? "You have " : data.student.forename + " " + data.student.surname + " has " } a recorded {props.type} of{" "}
      <span style={{fontWeight: "bolder", color: "red"}}> {Math.round(stat)}% </span> in the class{" "}
      <span style={{fontWeight: "bolder"}}>{data.class_code.toUpperCase()}. </span> </p>
      {props.student ? null : <Link style = {{height: "100%"}}
        className="profile-button-link"
        to={"/profile/" + data.class_code.toLowerCase() + "/" + data.matric}
      >
        <Button style = {{height: "100%"}} className="profile-button">Go to Profile</Button>
  </Link> }
    </div>
  );
}
