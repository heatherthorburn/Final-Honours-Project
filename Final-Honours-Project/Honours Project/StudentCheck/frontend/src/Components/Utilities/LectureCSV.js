import React from "react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStudentsInClass } from "../../Actions/classActions";
import {
  logLectureAttendance
} from "../../Actions/lectureActions";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import Papa from "papaparse";

export default function LectureCSV(props) {
  /* declarations */

  const dispatch = useDispatch();
  const classList = useSelector((state) => state.studentClassList);
  const staffSignIn = useSelector((state) => state.staffSignIn);

  const [unrecognisedEntries, setUnrecognisedEntries] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileTypeError, setFileTypeError] = useState(false);
  const [headerError, setHeaderError] = useState(false);

  var matrics = [];
  var unrecognised = [];

  /* Get the list of students who are enrolled in this class */

  useEffect(() => {
    dispatch(listStudentsInClass(props.class_code, staffSignIn.staffInfo.token));
  }, [dispatch, props.class_code]);

  if (classList.students) {
    classList.students.data.students.forEach((element) => {
      matrics.push({ matric: element.matric, email: element.email });
    });
  }

  /* function to handle the csv file being uploaded by the user */

  function handleUploadClick() {
    if (selectedFile !== null) {
      if (selectedFile.name.split(".")[1] != "csv") {
        setFileTypeError(true)
      } else {
        setFileTypeError(false)
        Papa.parse(selectedFile, {
          skipEmptyLines: true,
          complete: showData,
          header: true,
        });
      }
    }
  }

  /* function to set the file to the current one uploaded but not yet submitted */

  function handleFileSelected(e) {
    setHeaderError(false);
    setSelectedFile(e.target.files[0]);
  }

  function showData(result) {
    // checks for neccessary header
    if (!result.meta.fields.includes("User Email") && !result.meta.fields.includes("Email" && !result.meta.fields.includes("ID"))) {
      setHeaderError(true)
    } else {
      var students = [];
      const resultsArr = result.data;

      resultsArr.forEach((element) => {
        if (element.hasOwnProperty("User Email")) {
          if (element["User Email"] !== "" && element["User Email"] !== null) {
            var result = classList.students.data.students.find((obj) => {
              return obj.email === element["User Email"];
            });
          }
          if (result) {
            students.push({
              student_id: result.matric,
              session_id: props.session_id,
              attended: 1,
            });
          } else {
            unrecognised.push(element["User Email"]);
          }
        }  
        
        else if (element.hasOwnProperty("ID")) {
          if (element["ID"] !== null && element["ID"] !== "") {
            var result = classList.students.data.students.find((obj) => {
              return obj.matric === element["Matric"];
            });
          }
          if (result) {
            students.push({
              student_id: result.matric,
              session_id: props.session_id,
              attended: 1,
            });
          } else {
            unrecognised.push(element["ID"]);
          }
        }

        if (element.hasOwnProperty("Email")) {
          if (element["Email"] !== "" && element["Email"] !== null) {
            var result = classList.students.data.students.find((obj) => {
              return obj.email === element["Email"];
            });
          }
          if (result) {
            students.push({
              student_id: result.matric,
              session_id: props.session_id,
              attended: 1,
            });
          } else {
            unrecognised.push(element["Email"]);
          }
        }  
      });

      classList.students.data.students.forEach((element) => {
        var result = students.find((obj) => {
          return obj.student_id === element.matric;
        });
        if (!result) {
          students.push({
            student_id: element.matric,
            session_id: props.session_id,
            attended: 0,
          });
        }
      });
      if (unrecognised.length == 0 || !unrecognisedEntries) {
        dispatch(logLectureAttendance(students));
      }
      else {
        if (unrecognised.length > 0) {
        setUnrecognisedEntries(unrecognised) }
      }
    }
  }

  return (
    <div>
      <Alert variant="info">
        Please ensure that your .csv includes students present at lecture. <br />
        Your file must include headers labelled "User Email" or "ID" with appropriate values.
      </Alert>
      {!fileTypeError ? null :
        <Alert variant="danger" style={{ textAlign: "center" }}>
          Your file must be type CSV!
      </Alert>
      }
      {!headerError ? null :
        <Alert variant="danger" style={{ textAlign: "center" }}>
          Your file must contain the header "User Email", "Email" or "ID"!
      </Alert>
      }
      <Form>
        <Form.File
          accept=".csv"
          onChange={handleFileSelected}
          label="Please upload the .csv file here"
        />
      </Form>
      {!unrecognisedEntries ? null :
        <div>
          <Alert variant="danger">
            There were some unrecognised entries in your file that cannot be logged. <br />
          Entries: {unrecognisedEntries.join(", ")} <br />
          Click below to proceed anyway.
          </Alert>
        </div>
        }
      <Button onClick={() => handleUploadClick()} className="button">
        Upload Attendance
      </Button>
    </div>
  );
}
