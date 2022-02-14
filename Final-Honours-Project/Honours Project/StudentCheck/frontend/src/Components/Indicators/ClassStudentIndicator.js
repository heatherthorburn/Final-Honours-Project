import React from "react";
import StatsIndicator from "./StatsIndicator";

export default function ClassStudentIndicator(props) {
  const attendance = props.attendance;
  const grade = props.grade;

  return (
    <div>
      <div>
        Attendance:
        <StatsIndicator stat={attendance} />
        Coursework:
        <StatsIndicator stat={grade} />
      </div>
    </div>
  );
}
