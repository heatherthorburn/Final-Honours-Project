/**
 * Screen for handling uploading attendance via CSV
 * Validates user input before being dispatched.
 */

import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Papa from "papaparse";
import Alert from "react-bootstrap/Alert";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useDispatch, useSelector } from "react-redux";

import { batchUploadCoursework } from "../../Actions/courseworkActions";
import { listStudentsInClass } from "../../Actions/classActions";

import { useParams } from "react-router";
import { BATCH_UPLOAD_MARKS_CLEANUP } from "../../Constants/courseworkConstants";
import { Link } from 'react-router-dom'

export default function CourseworkCSVScreen() {
  let { class_code, id } = useParams();
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [studentsError, setStudentsError] = useState(false);

  const uploadMarks = useSelector((state) => state.batchUploadMarks);
  const { loading, marks, error } = uploadMarks
  const enrolled = useSelector((state) => state.studentClassList);
  const [fileTypeError, setFileTypeError] = useState(false);
  const [headerError, setHeaderError] = useState(false);

  useEffect(() => {
    if (
      !enrolled.students ||
      enrolled.students.data.class_code.toLowerCase() !==
      class_code.toLowerCase()
    ) {
      dispatch(listStudentsInClass(class_code));
    } else {
      let temp = enrolled.students.data.students.map((a) => a.matric);
      setEnrolledStudents(temp);
    }

    return function cleanup() {
      dispatch({ type: BATCH_UPLOAD_MARKS_CLEANUP })
    }
  }, [dispatch, enrolled.students, class_code]);


  function handleFileSelected(e) {
    setHeaderError(false)
    setSelectedFile(e.target.files[0]);
  }

  function handleUploadClick() {
    if (selectedFile !== null) {
      if (selectedFile.name.split(".")[1] != "csv") {
        setFileTypeError(true)
      } else {
        Papa.parse(selectedFile, {
          skipEmptyLines: true,
          complete: parseData,
          header: true.valueOf,
        });
      }
    }
  }

  function parseData(result) {
    //check the headers needed are available
    if (!result.meta.fields.includes("Matric") || !result.meta.fields.includes("Grade") || !result.meta.fields.includes("Feedback")) {
      setHeaderError(true)
    } else {
      var students = [];
      var studentsErrorTemp = [];

      result.data.forEach((student) => {
        // Check that the Student ID field is not null. Feedback and Grade are nullable.

        if (
          student["Matric"] !== "" &&
          student["Matric"] !== null &&
          student["Matric"] &&
          enrolledStudents.includes(student["Matric"])
        ) {
          students.push({
            coursework_id: id,
            matric: student["Matric"],
            grade: student["Grade"],
            feedback: student["Feedback"],
          });
        } else if (!enrolledStudents.includes(student["Matric"])) {
          studentsErrorTemp.push(student["Matric"]);
        }
      });
      if (studentsErrorTemp.length > 0) {
      setStudentsError(studentsErrorTemp); }
      dispatch(batchUploadCoursework(students));
    }
  }

  return (
    <div>
      <Card style={{ marginLeft: "auto", marginRight: "auto", marginTop: "1rem" }}>
        <Card.Header>{class_code.toUpperCase()} - #{id}</Card.Header>
        {marks ? (
          <div style={{ padding: "1rem" }}>
            <Alert variant="success">Coursework grades have been uploaded!</Alert>
            {!studentsError || studentsError.length == 0 ? null : (
              <>
                <Alert variant="warning">
                  There were some unrecognised entries in your file that could not
                be entered. <br />
                  <br />
                  {studentsError.map((element) =>
                    <p>{element}</p>
                  )}
                </Alert>
                <Link to={'/coursework/' + class_code + '/grades/' + id} >
                  <Button className="button">Return to Coursework</Button>
                </Link>
              </>
            )}
          </div>
        ) : (
            <Form>
              <Alert variant="info">
                You can upload multiple students feedback for this coursework
              here. <br /> <br /> Please ensure that your file contains the
              fields "Matric", "Grade" and "Feedback" with appropriate values
              for a successful upload.
            </Alert>
              {!fileTypeError ? null :
                <Alert variant="danger" style={{ textAlign: "center" }}>
                  Your file must be type CSV!
      </Alert>
              }
              {!headerError ? null :
                <Alert variant="danger" style={{ textAlign: "center" }}>
                  Please check your headers. Your file must contain the headers "Matric", "Grade" and "Feedback"!
      </Alert>
              }
              <Form.Group>
                <Form.File
                  accept=".csv"
                  style={{ padding: "2rem" }}
                  onChange={handleFileSelected}
                  label="Please upload the .csv file here"
                />
              </Form.Group>
              <Button onClick={handleUploadClick} className="button">
                Upload Feedback
            </Button>
            </Form>
          )}
      </Card>
    </div>
  );
}
