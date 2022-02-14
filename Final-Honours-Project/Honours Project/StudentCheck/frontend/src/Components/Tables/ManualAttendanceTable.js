/**
 * The component is responsible for attendance via checklist
 */

import React from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { customStyles } from "./tableStyle";
import { useSelector } from "react-redux";
import { logLectureAttendance } from "../../Actions/lectureActions";
import Button from "react-bootstrap/Button";

export default function ManualAttendanceTable(props) {
  const dispatch = useDispatch();
  const classList = useSelector((state) => state.studentClassList);
  const { students: studentsList } = classList;
  const lecture = useSelector((state) => state.addLectureToDB);
  const { classes: lectureDone } = lecture;

  var notAttended = [];
  var attended = [];
  var matrics = [];
  var filtered = [];

  /**
   * conditional on whether this is a smaller class such as tutoral or a lecture
   * converts to readable object array for react-data-table-component
   */
  if (props.group_id && props.students) {
    var temprows = [];
    props.students.subclass_enrolments.forEach((element) => {
      temprows.push({
        id: element.enrolment.student.matric,
        matric: element.enrolment.student.matric,
        forename: element.enrolment.student.forename,
        surname: element.enrolment.student.surname,
      });
      matrics.push(element.enrolment.student.matric);
    });
    filtered = temprows;
  } else if (studentsList) {
    var temprows = [];
    studentsList.data.students.forEach((element) => {
      temprows.push({
        id: element.matric,
        matric: element.matric,
        forename: element.forename,
        surname: element.surname,
      });
      matrics.push(element.matric);
    });
    filtered = temprows;
  }

  //defines columns for the react-data-table-component
  const columns = [
    { name: "Matric", selector: "matric", sortable: true },
    {
      name: "Forename",
      selector: "forename",
      sortable: true,
    },
    {
      name: "Surname",
      selector: "surname",
      sortable: true,
    },
  ];

  //converts the selected rows into an object array for the bulk create on server side.
  //after conversion dispatches action to log attendance
  function handleSubmitClick() {
    var students = [];
    notAttended = matrics.filter((x) => !attended.includes(x));
    notAttended.forEach((student) => {
      students.push({
        session_id: props.session_id ? props.session_id : lectureDone.data.id,
        student_id: student,
        attended: 0,
      });
    });
    attended.forEach((student) => {
      students.push({
        session_id: props.session_id ? props.session_id : lectureDone.data.id,
        student_id: student,
        attended: 1,
      });
    });
    dispatch(logLectureAttendance(students/*, studentsList.data.class_code*/));
  }

  function handleSelect(rows) {
    attended = [];
    rows.selectedRows.forEach((element) => {
      attended.push(element.matric);
    });
  }

  return (
    <>
      {filtered.length > 0 && (
        <div className="manual-attendance-table-container">
          <DataTable
            noHeader={true}
            className="data-table"
            columns={columns}
            data={filtered}
            selectableRows={true}
            selectableRowSelected={(row) => row.selected}
            customStyles={customStyles}
            noDataComponent={null}
            noContextMenu="true"
            onSelectedRowsChange={(selectedRows) => handleSelect(selectedRows)}
          />
          <Button className="button" onClick={() => handleSubmitClick()}>
            Submit Attendance
          </Button>
        </div>
      )}
    </>
  );
}
