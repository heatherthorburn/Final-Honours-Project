import React, { useEffect, useState } from "react";
import {
  getStudentCoursework,
  updateCourseworkMarks,
} from "../../Actions/courseworkActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { CSSTransition } from "react-transition-group";
import {Link} from 'react-router-dom'
import { GET_STUDENT_COURSEWORK_RESET, UPDATE_COURSEWORK_MARKS_RESET } from "../../Constants/courseworkConstants";



export default function EditCourseworkGradeScreen(props) {
  let { class_code, coursework_id, student_id } = useParams();
  const dispatch = useDispatch();
  const cw = useSelector((state) => state.studentCoursework);
  const update = useSelector((state) => state.updateCourseworkMarks);


  const [feedback, setFeedback] = useState("");
  const [grade, setGrade] = useState("");
  const [gradeError, setGradeError] = useState(false);
  const [feedbackError, setFeedbackError] = useState(false);



  useEffect(() => {
    //neccessary so that if the user updates, navigates back and returns to page, the values are updated
    if (!cw.marks || update.success || cw.marks.data.matric !== student_id) {
      //destroys any state in the updatevalue variable in store
      dispatch({type : UPDATE_COURSEWORK_MARKS_RESET})
      dispatch(getStudentCoursework(coursework_id, student_id, class_code));
    } else {
      //adds data as default values for input
      if (cw.marks.data.feedback != null) {
        setFeedback(cw.marks.data.feedback);
      }
      if (cw.marks.data.grade != null) {
        setGrade(cw.marks.data.grade);
      }
    }

  }, [dispatch, cw.marks, coursework_id, student_id]);

  function handleFeedbackChange(e) {
    setFeedback(e.target.value);
  }

  function handleGradeChange(e) {
    setGrade(e.target.value);
  }

  /**
   * handles user input.
   * checks that values are a valid type, and so that
   * the percentage does not exceed 100%
   */

  function handleUpdateSubmit() {
    if (grade < 0 || grade > 100 || (isNaN(grade)) || grade == "" || grade == null ) {
      setGradeError("Please enter a valid grade of 0-100")
    } else if (feedback == "" || feedback == null) {
        setFeedbackError("Please enter some feedback for the student.")
      }
    
    else {
      dispatch(updateCourseworkMarks(coursework_id, student_id, grade, feedback));
      setFeedbackError(false)
      setGradeError(false)
    }
  }

  return (
    <CSSTransition appear={true} in={true} timeout={300} classNames="fade">
      <div className="default-padding">
        <Card style={{ margin: "auto" }}>
          <Card.Header>Editing Coursework - Student {student_id} {props.location.state.name ? " - " + props.location.state.name : null } </Card.Header>
          <Form className="add-coursework-form">
            Grade:
            <InputGroup>
              <Form.Control
                value={grade}
                className="search-bar"
                onChange={handleGradeChange}
                type="text"
              ></Form.Control>
              <InputGroup.Append>
                <InputGroup.Text className="percentage-prepend">
                  %
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <span className="error-message">{gradeError}</span> <br />
            Feedback:
            <Form.Control
              value={feedback}
              as="textarea"
              className="search-bar"
              rows="4"
              onChange={handleFeedbackChange}
              type="textarea"
            ></Form.Control>
            <span className="error-message">{feedbackError}</span> <br />
            {!update.success ? (
              <Button className="button" onClick={() => handleUpdateSubmit()}>
                {" "}
                Update{" "}
              </Button>
            ) : (
              <div>
                <Alert variant="success">Successfully updated</Alert>
                <Link style={{padding: "0"}} to={'/coursework/' + class_code + '/grades/' + coursework_id}>
                <Button className="button">Return to Grades</Button>
                </Link>
              </div>
            )}
          </Form>
        </Card>
      </div>
    </CSSTransition>
  );
}
