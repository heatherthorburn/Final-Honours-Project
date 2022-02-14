/**
 * Main screen for attendance. Displays user with datepickers and submission to create lecture
 * Upon successful entry into database, they are presented with tabs to choose their method of 
 * taking attendance.
 * The methods of taking components are seperate components.
 */

import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

import ManualAttendanceTable from "../../Components/Tables/ManualAttendanceTable";
import { addLecture, defaultAttendance } from "../../Actions/lectureActions";
import {
  ADD_LECTURE_RESET,
  LOG_ATTENDANCE_RESET,
} from "../../Constants/lectureConstants";
import { useDispatch, useSelector } from "react-redux";

import LectureQR from "../../Components/Utilities/LectureQR";
import LectureCSV from "../../Components/Utilities/LectureCSV";

import "react-datepicker/dist/react-datepicker.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { FaUndo } from "react-icons/fa";

import { listStudentsInClass } from "../../Actions/classActions";
import DisplayAttendanceCSV from "../../Components/Tables/DisplayAttendanceCSV";

import { CSSTransition } from "react-transition-group";
import moment from "moment"

export default function ManualLectureAttendanceScreen() {
  const dispatch = useDispatch();
  const staffSignIn = useSelector((state) => state.staffSignIn);
  const lecture = useSelector((state) => state.addLectureToDB);
  const { classes: lectureDone } = lecture;
  const classList = useSelector((state) => state.studentClassList);
  const { students, error } = classList;
  const attendance = useSelector((state) => state.logLectureAttendance);
  const { success: attendanceSuccess } = attendance;

  let { class_code} = useParams();

  /* State initialisation */
  const [startDate, setStartDate] = useState(false);
  const [startTime, setStartTime] = useState(false);
  const [dateValidated, setDateValidated] = useState(null);
  const [timeValidated, setTimeValidated] = useState(null);
  const [qrConfirmed, setQRConfirmed] = useState(false);

  useEffect(() => {
    /* reinitialise state if lecture has been created or attendance has been submitted*/
    if (attendanceSuccess || lectureDone) {
      setStartDate(false);
      setStartTime(false);
      setDateValidated(null);
      setTimeValidated(null);
      dispatch({ type: ADD_LECTURE_RESET });
      dispatch({ type: LOG_ATTENDANCE_RESET });
      dispatch(listStudentsInClass(class_code, staffSignIn.staffInfo.token));
    } else if (timeValidated && dateValidated) {
      dispatch(
        addLecture(
          class_code,
          startDate.toISOString().split("T")[0],
          startTime.toISOString().split("T")[1].substring(0, 8)
        )
      );
    }
    if (!students || students.data.class_code !== class_code) {
      dispatch(listStudentsInClass(class_code, staffSignIn.staffInfo.token));
    }

    /* if component unmounts (clears), reset the attendance and lecture state */
    return function cleanup() {
      dispatch({ type: ADD_LECTURE_RESET });
      dispatch({ type: LOG_ATTENDANCE_RESET });
    }
  }, [timeValidated, dateValidated, dispatch, class_code]);

  /**
   * Error checking for the dates. The datepicker does the error checking itself
   * for ensuring the user does not enter a date in the future or too far
   * (1+) years in the past. Otherwise set as validated so that lecture can be dispatched
   * and added.
   */
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

  /**
   * Undo function was added incase the user adds the wrong data. This function just
   * clears the all related states.
   */
  function handleUndoClick() {
    setDateValidated(false);
    setTimeValidated(false);
    dispatch({ type: LOG_ATTENDANCE_RESET });
    dispatch({ type: ADD_LECTURE_RESET });
  }

  /**
   * 
   * @param {*} session_id
   * If QR option is selected then dispatch an action to the serverside so that all students are
   * marked absent until they log their own attendance.
   * Confirming QR as attendance taking method disables other methods.
   */
  function handleQRClick(session_id) {
    setQRConfirmed(true);
    var temp = [];
    for (var i = 0; i < students.data.students.length; i++) {
      temp.push({student_id : students.data.students[i].matric, session_id : session_id, attended: 0})
    } 
    dispatch(defaultAttendance(temp));
  }

  return (
    error ? <Alert style = {{marginTop: "2rem"}} variant = "danger">{error}</Alert> :
    <CSSTransition appear={true} in={true} timeout={300} classNames="fade">
      <div
        style={{ flexDirection: "column" }}
        className="page-margin default-padding"
      >
        <Card style={{ margin: "auto" }}>
          <Card.Header>{class_code.toUpperCase()} - Lecture</Card.Header>
          <Card.Body className="manual-attendance-card">
            {students && students.data && students.data.students.length == 0 ?
              <Alert style={{ margin: "1rem" }} variant="warning">There are no students enrolled in this class!</Alert>
              :
              <div className="time-date-select-wrapper">
                <div>
                  Date: <br />
                  <DatePicker
                    chooseDayAriaLabelPrefix="lecture-date"
                    ariaLabelledBy="lecture-date"
                    minDate = {moment().subtract(1, "year").toDate() /** Limits lower user selection to today minus 1 year */}
                    maxDate = {moment().toDate() /** Limits upper user selection to today */}
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
                    <Alert className="lecture-alert" variant="success">
                      Lecture created!
                  </Alert>
                    <Button
                      onClick={() => handleUndoClick()}
                      className="dark-button margin-left-auto"
                    >
                      <FaUndo />
                    </Button>
                  </div>
                ) : (
                    <Button
                      aria-label="submit-lecture-button"
                      onClick={() => handleAddLectureClick()}
                      className="button"
                    >
                      Create Lecture
                    </Button>
                  )}
              </div>
            }
          </Card.Body>
        </Card>

        {attendanceSuccess ? (
          <Card
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "1rem",
            }}
          >
            <DisplayAttendanceCSV session_id={lectureDone.data.id} />
          </Card>
        ) : lectureDone && !attendanceSuccess ? (
          <CSSTransition
            appear={true}
            in={true}
            timeout={300}
            classNames="fade"
          >
            <div>
              <Card
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "1rem",
                }}
              >
                <Tabs className="attendance-tabs" defaultActiveKey="manual">
                  {qrConfirmed ? null :
                    <Tab eventKey="manual" title="Manual">
                      <div className="max-width-900">
                        <ManualAttendanceTable
                          session_id={lectureDone.data.id}
                          className="manual-table"
                          class_code={class_code}
                        />{" "}
                      </div>
                    </Tab>
                  }
                  <Tab eventKey="qr" title="QR Code">
                    <div className="max-width-900">
                      {qrConfirmed ? null :
                        <>
                        <Alert variant = "info">Click confirm to log attendance via QR Code. This will log your students as absent until they check in!</Alert>
                        <Button style={{marginLeft: "auto", marginRight: "auto", marginBottom: "1rem"}} className="profile-button" onClick={() => handleQRClick(lectureDone.data.id)}>Confirm</Button>
                        </>
                      }
                      <LectureQR
                        confirmed={qrConfirmed}
                        session_id={lectureDone.data.id}
                        class_code={class_code}
                      />
                    </div>
                  </Tab>
                  {qrConfirmed ? null :
                    <Tab eventKey="csv" title="Upload CSV">
                      <div className="max-width-900">
                        <LectureCSV
                          session_id={lectureDone.data.id}
                          class_code={class_code}
                        />{" "}
                      </div>
                    </Tab>
                  }
                </Tabs>
              </Card>
            </div>
          </CSSTransition>
        ) : null}
      </div>
    </CSSTransition>
  );
}
