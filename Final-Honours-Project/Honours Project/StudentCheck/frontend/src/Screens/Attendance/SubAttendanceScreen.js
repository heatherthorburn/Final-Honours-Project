/**
 * Screen for taking attendance for smaller classes
 */

import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ManualAttendanceTable from "../../Components/Tables/ManualAttendanceTable";
import { getSubClassesRegister, addSub } from "../../Actions/lectureActions";
import { useDispatch, useSelector } from "react-redux";
import { FaUndo } from "react-icons/fa";
import {
  ADD_SUB_RESET,
  ADD_LECTURE_RESET,
  LOG_ATTENDANCE_RESET,
} from "../../Constants/lectureConstants";
import { CSSTransition } from "react-transition-group";

export default function SubClassAttendanceScreen(props) {
  let { class_code, group_id } = useParams();
  const dispatch = useDispatch();

  const lecture = useSelector((state) => state.addSubClass);
  const { classes: lectureDone } = lecture;
  const sub = useSelector((state) => state.subClassesRegister);
  const attendance = useSelector((state) => state.logLectureAttendance);
  const { success: attendanceSuccess } = attendance;

  const [startDate, setStartDate] = useState(false);
  const [startTime, setStartTime] = useState(false);
  const [dateValidated, setDateValidated] = useState(null);
  const [timeValidated, setTimeValidated] = useState(null);


  useEffect(() => {
    if (!sub.students) {
      dispatch(getSubClassesRegister(group_id));
    }

    if (attendanceSuccess || lectureDone) {
      setStartDate(false);
      setStartTime(false);
      setDateValidated(null);
      setTimeValidated(null);
      dispatch({ type: ADD_SUB_RESET });
      dispatch({ type: LOG_ATTENDANCE_RESET });
      dispatch(getSubClassesRegister(group_id));
    } else if (timeValidated && dateValidated) {
      dispatch(
        addSub(
          class_code,
          startDate.toISOString().split("T")[0],
          startTime.toISOString().split("T")[1].substring(0, 8),
          group_id
        )
      );
    }

    return function cleanup() {
      dispatch({ type: ADD_LECTURE_RESET });
      dispatch({ type: LOG_ATTENDANCE_RESET });
    };
  }, [timeValidated, dateValidated, dispatch, class_code, group_id]);

  function handleAddLectureClick() {
    if (!startDate) {
      setDateValidated(false);
    } else {
      setDateValidated(true);
    }

    if (!startTime) {
      setTimeValidated(false);
    } else {
      setTimeValidated(true);
    }
  }

  function handleUndoClick() {
    setDateValidated(false);
    setTimeValidated(false);
    dispatch({ type: LOG_ATTENDANCE_RESET });
    dispatch({ type: ADD_LECTURE_RESET });
  }

  return (
    <CSSTransition appear={true} in={true} timeout={300} classNames="fade">
      <div
        style={{ flexDirection: "column" }}
        className="page-margin default-padding"
      >
        <Card style={{ margin: "auto" }}>
          <Card.Header>
            {class_code.toUpperCase()}{" "}
            {props.location.state.type
              ? " - " + props.location.state.type
              : null}{" "}
            {props.location.state.group_name
              ? " - " + props.location.state.group_name
              : null}
          </Card.Header>
          <Card.Body className="manual-attendance-card">
            <div className="time-date-select-wrapper">
              <div>
                Date: <br />
                <DatePicker
                  chooseDayAriaLabelPrefix="lecture-date"
                  ariaLabelledBy="lecture-date"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  disabled={lectureDone}
                />
                {dateValidated === false ? "Please enter a date" : " "}
              </div>

              <div>
                Time: <br />
                <DatePicker
                  ariaLabelClose="lecture-time"
                  selected={startTime}
                  onChange={(time) => setStartTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
                  timeCaption="Time"
                  dateFormat="h aa"
                  disabled={lectureDone}
                />
                {timeValidated === false ? "Please enter a time" : " "}
              </div>

              {/* EITHER CREATE LECTURE OR DISPLAY ALERT THAT LECTURE HAS BEEN (UN)SUCCESSFULLY CREATED */}
              {lectureDone ? (
                <div className="flex lecture-alert-container">
                  <Alert
                    style={{
                      fontSize: "3rem",
                      height: "100%",
                      marginBottom: "0",
                    }}
                    className="lecture-alert"
                    variant="success"
                  >
                    Class created!
                  </Alert>
                  {attendanceSuccess ? null : (
                    <Button
                      onClick={() => handleUndoClick()}
                      className="dark-button margin-left-auto"
                    >
                      <FaUndo />
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  aria-label="submit-lecture-button"
                  onClick={() => handleAddLectureClick()}
                  className="button"
                >
                  Create Class
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>

        {attendanceSuccess ? (
          <CSSTransition
            appear={true}
            in={true}
            timeout={300}
            classNames="fade"
          >
            <Card
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "1rem",
                padding: "1rem",
              }}
            >
              <Alert
                style={{
                  marginBottom: "0",
                  textAlign: "center",
                  fontSize: "x-large",
                }}
                variant="info"
              >
                Attendance successfully recorded for this class!
              </Alert>
            </Card>
          </CSSTransition>
        ) : !lectureDone ? null : (
          <CSSTransition
            appear={true}
            in={true}
            timeout={300}
            classNames="fade"
          >
            <Card
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "1rem",
                padding: "1rem",
              }}
            >
              <ManualAttendanceTable
                group_id={group_id}
                session_id={lectureDone.data.id}
                students={sub.students.data}
              />
            </Card>
          </CSSTransition>
        )}
      </div>
    </CSSTransition>
  );
}
