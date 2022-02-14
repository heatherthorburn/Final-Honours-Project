/**
 * Displays successful attendance in a table
 * used for after CSV attendance and manual.
 */

import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getLectureAttendance } from "../../Actions/lectureActions";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "../Tables/tableStyle";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import Alert from "react-bootstrap/Alert";
import {
  LOG_ATTENDANCE_RESET,
  ADD_LECTURE_RESET,
} from "../../Constants/lectureConstants";
import { CSSTransition } from "react-transition-group";

export default function DisplayAttendanceCSV(props) {
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state.getAttendance);
  const { classes } = attendance;

  var filtered = [];

  useEffect(() => {
    dispatch(getLectureAttendance(props.session_id));

    //clean up state after unmount
    return function cleanup() {
      dispatch({ type: LOG_ATTENDANCE_RESET });
      dispatch({ type: ADD_LECTURE_RESET });
    };
  }, [dispatch, props.session_id]);

  //once class attendance has been loaded, convert to readable format for react data table 
  //component
  if (classes) {
    var temprows = [];
    classes.data.forEach((element) => {
      temprows.push({
        id: element.student.matric,
        matric: element.student.matric,
        forename: element.student.forename,
        surname: element.student.surname,
        attended: element.attended,
      });
    });
    filtered = temprows;
  }

  //defines columns for react-data-table props
  const columns = [
    { name: "Matric", selector: "matric", sortable: false, hide: "md" },
    {
      name: "Forename",
      selector: "forename",
      sortable: false,
    },
    {
      name: "Surname",
      selector: "surname",
      sortable: false,
    },
    {
      name: "Attended",
      selector: "attended",
      cell: (row) => <AttendanceIndicator attended={row.attended} />,
    },
  ];

  //returns a red cross for absent, green tick for attendanced
  function AttendanceIndicator(props) {
    const attended = props.attended;
    if (attended == 0) {
      return <AiOutlineClose className="danger" />;
    } else {
      return <AiOutlineCheck className="excellent" />;
    }
  }

  return (
    <div>
      {classes ? (
        <CSSTransition
          appear={true}
          in={classes}
          timeout={300}
          classNames="fade"
        >
          <div>
            <Alert style={{ textAlign: "center" }} variant="info">
              Attendance recorded!
            </Alert>
            <div className="max-width-900">
              <DataTable
                noDataComponent={null}
                noHeader={true}
                className="data-table"
                columns={columns}
                data={filtered}
                customStyles={customStyles}
                noContextMenu="true"
              />
            </div>
          </div>
        </CSSTransition>
      ) : null}
    </div>
  );
}
